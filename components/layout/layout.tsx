import Head from 'next/head';
import Header from '../header/Header';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pokemon</title>
      </Head>
      <ErrorBoundary>
        <Header />
        {children}
      </ErrorBoundary>
    </>
  );
}
