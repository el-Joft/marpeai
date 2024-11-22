// import Layout from '../layout';
import { AppProps } from 'next/app';
// import './global.css';
import { FormDataProvider } from '../context/FormDataContext';

function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <FormDataProvider>
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </FormDataProvider>
  );
}

export default RootLayout;