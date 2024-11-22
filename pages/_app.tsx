// import Layout from '../layout';
// import './global.css';
import { FormDataProvider } from '../context/FormDataContext';

function RootLayout({ Component, pageProps }: any) {
  return (
    <FormDataProvider>
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </FormDataProvider>
  );
}

export default RootLayout;