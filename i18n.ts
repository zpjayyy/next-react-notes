import { getRequestConfig } from "next-intl/server";
import { locales } from "@/config";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) {
    notFound();
  }
  return {
    messages: (await import(`./message/${locale}.json`)).default,
  };
});
