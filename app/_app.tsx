import { useEffect } from "react";
import registerServiceWorker from "./registerServiceWorker";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    registerServiceWorker();
  }, []);
  return <Component {...pageProps} />;
}
