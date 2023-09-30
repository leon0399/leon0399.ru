import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta property="og:type" content="website" />

          <meta name="twitter:dnt" content="on" />
          <meta name="twitter:url" content="https://leon0399.ru/" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@leon0399" />
          <meta name="twitter:creator" content="@leon0399" />

          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "0d9f2493fa83432ea75505851fb28a83"}'
          ></script>
        </Head>
        <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
