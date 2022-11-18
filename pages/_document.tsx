import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class LokaDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html className="dark overflow-x-hidden font-inter">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@600&display=swap" rel="stylesheet" />
                </Head>
                <body className="h-full " style={{ background: "#0A2F0C" }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default LokaDocument;
