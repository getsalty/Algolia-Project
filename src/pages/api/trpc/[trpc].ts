import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import { copyRulesFromSourceToDestination, getAllIndices, getAllRules } from '~/services/algolia';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export const t = initTRPC.create();

const { procedure, router } = t;

export const appRouter = router({
  allIndices: procedure.query(async ({ ctx }) => {
    verifySession(ctx, 'You must be logged in to see indices');

    const indices = await getAllIndices();
    validateServiceResult(indices);

    return indices;
  }),

  allRulesForIndexName: procedure.input(z.string()).query(async ({ input, ctx }) => {
    verifySession(ctx, `You must be logged in to see the rules for the index ${input}`);

    const rules = await getAllRules(input);
    validateServiceResult(rules);

    return rules;
  }),

  addRulesToIndex: procedure
    .input(
      z.object({
        sourceIndexName: z.string(),
        destinationIndexName: z.string(),
        ruleObjectIDs: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      verifySession(ctx, `You must be logged in to see the rules for the index ${input}`);

      const rules = await copyRulesFromSourceToDestination(
        input.sourceIndexName,
        input.destinationIndexName,
        input.ruleObjectIDs,
      );
      validateServiceResult(rules);

      return rules;
    }),
});

/**
 * Validates the result from the service and asserts the result is a valid datatype.
 * @param result  The result from the service call
 * @throws TRPCError
 */
function validateServiceResult<T>(result: T | Error): asserts result is T {
  if (isError(result)) {
    console.error(result);

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: result.message,
      cause: result,
    });
  }
}

function isError(value: unknown): value is Error {
  if (value instanceof Error) {
    return true;
  }

  return (
    value != null &&
    value instanceof Object &&
    'name' in value &&
    'message' in value &&
    typeof value.name === 'string' &&
    typeof value.message === 'string'
  );
}

/**
 * Verifies the session is valid and returns the userId.
 * @param ctx The context of the current request
 * @param errorMessage The desired error message
 * @throws TRPCError
 * @returns userId
 */
function verifySession(ctx: unknown, errorMessage: string) {
  const { session } = ctx as Context;
  const userId = session?.user?.id;

  if (!userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: errorMessage,
    });
  }

  return userId;
}

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});

export async function createContext({ req, res }: trpcNext.CreateNextContextOptions) {
  const session = await getServerSession(req, res, authOptions);
  return { session };
}

type Context = inferAsyncReturnType<typeof createContext>;
