import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=DM+Sans&family=Source+Sans+Pro&display=swap"
                        rel="stylesheet"
                    />
                    <script
                        noModule
                        defer
                        src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.js"
                        integrity="sha384-4z8mjH4yIpuK9dIQGR1JwbrfYsStrNK6MP+2Enhue4eyo0XlBDXOIPc8b6ZU0ajz"
                        crossOrigin="anonymous"
                    ></script>
                    <script src="/__/firebase/7.14.5/firebase-app.js"></script>
                    <script src="/__/firebase/7.14.5/firebase-analytics.js"></script>
                    <script src="/__/firebase/init.js"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
