export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <meta charSet="UTF-8" /> */}
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        {/* <met a name="viewport" content="width=device-width, initial-scale=1.0" /> */}
        <title>Pokemon App</title>
        <meta name="description" content="My App is a..." />
      </head>
      <body>
        <div id="root">{children}</div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
  );
}
