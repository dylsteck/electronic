import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Script from 'next/script';
import { NeynarAuthProvider } from '../context/neynar-auth-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NeynarAuthProvider>
      <Script src="https://neynarxyz.github.io/siwn/raw/1.2.0/index.js" async />
      <Component {...pageProps} />
    </NeynarAuthProvider>
  );
}

export default MyApp;