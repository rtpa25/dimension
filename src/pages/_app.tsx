import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { gtWalsheim } from "~/styles/fonts";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>
        {`
          html {
            --font-gt-walsheim: ${gtWalsheim.variable};
          }
        `}
      </style>

      <main style={gtWalsheim.style}>
        <Analytics />
        <Component {...pageProps} />
        <Toaster position="bottom-center" toastOptions={{}} />
      </main>
    </>
  );
};

export default api.withTRPC(MyApp);
