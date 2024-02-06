import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { ssrPrepass } from '@trpc/next/ssrPrepass';
import type { AppRouter } from '../pages/api/trpc/[trpc]';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    const url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/trpc'
        : `https://${process.env.NEXT_PUBLIC_URL_BASE}/api/trpc`;

    return {
      links: [httpBatchLink({ url })],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      },
    };
  },
  ssr: true,
  ssrPrepass,
});
