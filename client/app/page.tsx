import { Nav, Hero, Features, HowItWorks, CTA, Footer } from "@/components/landing";

export default function Page() {
  return (
    <>
      <Nav />
      <div className="max-w-5xl mx-auto border-x border-border">
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
