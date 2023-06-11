import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import 'primeflex/primeflex.css'
import "primereact/resources/primereact.min.css"; 
import "primereact/resources/themes/md-light-indigo/theme.css";
import 'bulma/css/bulma.css'
import 'componentes/common/loader/loader.css'

function MyApp({ Component, pageProps } : AppProps) {
  return <Component {...pageProps} />
}

export default MyApp