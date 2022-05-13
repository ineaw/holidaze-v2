import { Html, Head, Main, NextScript } from "next/document";
import { createRoot } from "react-dom/client";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="modal-root"></div>
      </body>
    </Html>
  );
}
