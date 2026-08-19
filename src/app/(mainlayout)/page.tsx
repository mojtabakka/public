import { fetchInstance } from "@/utils/fetch";
import { endpoints } from "@/utils/end-points";
import HeroWidget from "@/components/widgets/hero.wedget";
import FeaturesWidget from "@/components/widgets/features.widget";
import CategoriesWidget from "@/components/widgets/categories.widget";
import FooterWidget from "@/components/widgets/footer.widget";
import ContactWidget from "@/components/widgets/Contact.widget";


export const dynamic = "force-dynamic";

export default async function Home() {
  let cats = [];

  try {
    const result = await fetchInstance(endpoints.category.getCatergoris, {
      cache: "no-cache",
    });

    cats = result.data.data;
  } catch (error) { console.error(error); }

  return (
    <div className="space-y-8 md:space-y-12 mx-auto max-w-7xl">
      <HeroWidget />
      <FeaturesWidget />
      <CategoriesWidget cats={cats} />
      <ContactWidget />
      <FooterWidget />
    </div>
  );
}