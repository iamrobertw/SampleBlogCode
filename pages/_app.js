import '../styles/globals.css';
import { DisplayedProvider } from '@/context/DisplayedContext';
import Header from '@/components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <DisplayedProvider>
      <Header></Header>
      <Component {...pageProps} />
    </DisplayedProvider>
  );
}

export default MyApp;

