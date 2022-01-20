import "../styles/globals.css";
import 'tailwindcss/tailwind.css'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="dark min-h-screen">
        <div className="dark:bg-black min-h-screen">
            <Component {...pageProps} />;
        </div>
    </div>
  )
}

export default MyApp;
