import '../styles/globals.css';
import { VeltProvider } from '@veltdev/react';
import VeltAuth from '../components/VeltAuth';
import VeltDocument from '../components/VeltDocument';

export default function App({ Component, pageProps }) {
  const apiKey = process.env.NEXT_PUBLIC_VELT_API_KEY || "";

  return (
    <VeltProvider apiKey={apiKey}>
      <VeltAuth />
      <VeltDocument />
      <Component {...pageProps} />
    </VeltProvider>
  );
}