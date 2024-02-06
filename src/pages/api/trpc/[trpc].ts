import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import { getUserInfo } from '~/services/users';
import { getAllIndices, getAllRules } from '~/services/algolia';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export const t = initTRPC.create();

const { procedure, router } = t;

export const appRouter = router({
  userInfo: procedure.query(async ({ ctx }) => {
    const userId = verifySession(
      ctx,
      'You must be logged in to see user information',
    );

    const user = await getUserInfo(userId);

    if (user instanceof Error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: user.message,
        cause: user,
      });
    }

    return user;
  }),

  allIndices: procedure.query(async ({ ctx }) => {
    verifySession(ctx, 'You must be logged in to see indices');

    const indices = await getAllIndices();

    if (indices instanceof Error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: indices.message,
        cause: indices,
      });
    }

    return indices;
  }),

  allRulesForIndexName: procedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      verifySession(
        ctx,
        `You must be logged in to see the rules for the index ${input}`,
      );

      const indices = await getAllRules(input);

      if (indices instanceof Error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: indices.message,
          cause: indices,
        });
      }

      return indices;
    }),
});

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

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  const session = await getServerSession(req, res, authOptions);
  return { session };
}

type Context = inferAsyncReturnType<typeof createContext>;
