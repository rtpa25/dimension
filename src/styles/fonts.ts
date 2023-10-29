import localFont from "next/font/local";

export const gtWalsheim = localFont({
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
