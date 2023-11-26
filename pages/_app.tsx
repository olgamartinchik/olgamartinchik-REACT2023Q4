import RootLayout from '@/components/layout/layout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
const { wrapper } = require('../store/store');

export function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default wrapper.withRedux(App);
