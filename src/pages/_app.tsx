import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";

const gtWalsheim = localFont({
  src: [
    {
      path: "../../public/fonts/GT-Walsheim-Regular-Trial.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/GT-Walsheim-Medium-Trial.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/GT-Walsheim-Bold-Trial.woff2",
      weight: "700",
    },
  ],
  variable: "--font-gt-walsheim",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-gt-walsheim: ${gtWalsheim.variable};
          }
        `}
      </style>

      <main className={`${gtWalsheim.variable} font-sans`}>
        <Analytics />
        <Component {...pageProps} />
        <Toaster position="bottom-center" toastOptions={{}} />
      </main>
    </>
  );
};

export default api.withTRPC(MyApp);
