export const metadata = {
  title: "HireAide.ai",
  description:
    "With HireAide.ai, your hiring team is empowered to make smarter, faster, and more equitable decisions—transforming your recruitment process and ensuring success at every step.",
};

import Hero from "@/components/hero-home";
import BusinessCategories from "@/components/business-categories";
import FeaturesPlanet from "@/components/features-planet";
import LargeTestimonial from "@/components/large-testimonial";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <BusinessCategories />
      <FeaturesPlanet />
      <LargeTestimonial />
      <Cta />
    </>
  );
}
