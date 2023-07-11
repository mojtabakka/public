import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Fragment } from "react";
import "../styles/globals.css";
import { store } from "../redux/store";
import { ReactNode } from "react";
import momentJalali from "moment-jalaali";
import type { Page } from "./page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import fa from "moment/locale/fa";
momentJalali.locale("fa");
momentJalali.loadPersian({ dialect: "persian-modern" });

type Props = AppProps & {
  Component: Page;
};

const App = ({ Component, pageProps }: Props) => {
  // adjust accordingly if you disabled a layout rendering option
  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;

  return (
    <Layout>
      <div className=" text-xs">
        <Provider store={store}>
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer />
          
        </Provider>
      </div>
    </Layout>
  );

  // or swap the layout rendering priority
  // return getLayout(<Layout><Component {...pageProps} /></Layout>)
};

export default App;

// export default function App({ Component, pageProps }: AppProps) {
//   const getLayout = Component?.getLayout || ((page: ReactNode) => page);
//   return (
//     <div className=" text-xs">
//       <Provider store={store}>
//         {getLayout(<Component {...pageProps} />)}
//       </Provider>
//     </div>
//   );
// }
