import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Results from "@/components/Results";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getSiteSettings,
  getServices,
  getPortfolioItems,
  getStats,
  getTestimonials,
  getFaqs,
} from "@/lib/content";

// Always fetch fresh from Supabase — edits made in Table Editor show up
// on the very next page load, no rebuild or redeploy needed.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const [settings, services, portfolio, stats, testimonials, faqs] =
    await Promise.all([
      getSiteSettings(),
      getServices(),
      getPortfolioItems(),
      getStats(),
      getTestimonials(),
      getFaqs(),
    ]);

  return (
    <>
      <Nav brandName={settings.brand_name} phone={settings.phone} />
      <main>
        <Hero settings={settings} />
        <Work
          heading={settings.showcase_heading}
          subheading={settings.showcase_subheading}
          items={portfolio}
        />
        <Process />
        <Services items={services} />
        <Results stats={stats} testimonials={testimonials} />
        <Faq items={faqs} />
        <Contact settings={settings} />
      </main>
      <Footer brandName={settings.brand_name} />
    </>
  );
}
