import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { store } from "../redux/store";
import { ReactNode } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return (
    <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
  );
}
