import type { AppProps } from 'next/app'
import 'primeflex/primeflex.css'
import "primereact/resources/primereact.min.css"; 
import "primereact/resources/themes/md-light-indigo/theme.css";
import 'bulma/css/bulma.css'
import 'componentes/common/loader/loader.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
