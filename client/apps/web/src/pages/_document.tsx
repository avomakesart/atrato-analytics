import clsx from 'clsx';
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import React from 'react';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html
        lang="en"
        className="dark [--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem]"
      >
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/color-icon.png"
          />

          <link rel="shortcut icon" href="/color-icon.png" />
          <meta name="apple-mobile-web-app-title" content="Atrato Dashboard" />
          <meta name="application-name" content="Atrato Dashboard" />
          <meta name="msapplication-TileColor" content="#38bdf8" />
          <meta name="theme-color" content="#ffffff" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark')
                  } else {
                    document.documentElement.classList.remove('dark')
                  }
                } catch (_) {}
              `,
            }}
          />
        </Head>
        <body
          className={clsx('antialiased dark:text-slate-400', {
            'bg-white dark:bg-slate-900':
              !this.props.dangerousAsPath.startsWith('/examples/'),
          })}
        >
          <Main />
          <NextScript />
          <script> </script>
        </body>
      </Html>
    );
  }
}
