import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { store } from "../redux/store";
import { ReactNode } from "react";
import momentJalali from "moment-jalaali";
import fa from "moment/locale/fa";
momentJalali.locale("fa", fa);
momentJalali.loadPersian({ dialect: "persian-modern" });

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return (
    <div className=" text-xs">
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </div>
  );
}
