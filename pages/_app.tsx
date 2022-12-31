import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { store } from "../redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
