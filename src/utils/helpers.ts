import { type NextURL } from "next/dist/server/web/next-url";
import { env } from "~/env.mjs";

export const checkCronRouteAuthEdge = (url: NextURL) => {
  let isAuth = true;
  url.searchParams.forEach((value, key) => {
    if (key !== "key" || (key === "key" && value !== env.VERCEL_SECRET_KEY)) {
      isAuth = false;
    }
  });
  return isAuth;
};

export const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
