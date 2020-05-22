import Head from 'next/head';
import '../App.css';
import '../katex.min.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>LaTeXtRa</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}
