import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { VercelToolbar } from '@vercel/toolbar/next';

export default function App({ Component, pageProps }: AppProps) {
  const showToolbar =
    process.env.NEXT_PUBLIC_NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_NODE_ENV === 'staging';

  return (
    <>
      <Component {...pageProps} />
      {showToolbar && <VercelToolbar />}
    </>
  );
}
