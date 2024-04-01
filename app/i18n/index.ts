import { defaultLocale, locales } from "@/config";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";

const initI18next = async (lng = defaultLocale, ns = "basic") => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init({
      supportedLngs: locales,
      fallbackLng: defaultLocale,
      lng,
      fallbackNS: "basic",
      defaultNS: "basic",
      ns,
    });
  return i18nInstance;
};

export async function useTranslation(lng: string, ns = 'basic', options?: any) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, ns, options),
    i18n: i18nextInstance,
  };
}
