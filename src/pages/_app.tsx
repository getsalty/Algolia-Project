import type { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { NProgress } from '~/components/App/NProgress';
import { SessionProvider } from 'next-auth/react';
import '../styles.css';
import './App.css';
import '../test.css';
import { App } from '~/components/App';
import Head from 'next/head';
import { trpc } from '~/utils/trpc';
import { Analytics } from '@vercel/analytics/react';

export const ENABLE_ANALYTICS = process.env.ENABLE_ANALYTICS === 'true';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  return (
    <>
      <Head>
        <title>Algolia Project</title>
        <meta name="description" content="Algolia Project" />
        <link rel="icon" href="/image/favicon.ico" />
      </Head>

      <SessionProvider session={session}>
        <App>
          <NProgress />
          <Component {...pageProps} />
        </App>
      </SessionProvider>

      {ENABLE_ANALYTICS && <Analytics />}
    </>
  );
}

export default trpc.withTRPC(MyApp);
