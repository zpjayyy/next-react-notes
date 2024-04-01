import { useTranslation } from "@/app/i18n";

export default async function Home({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng);
  return (
    <div className="ml-20 mr-20">
      <span className="text-2xl">{t("initText")}</span>
    </div>
  );
}
