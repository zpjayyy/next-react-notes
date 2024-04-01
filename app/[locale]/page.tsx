import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("basic");
  return (
    <div className="ml-20 mr-20">
      <span className="text-2xl">{t("initText")}</span>
    </div>
  );
}
