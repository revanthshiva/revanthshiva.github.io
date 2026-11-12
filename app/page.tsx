import Motion from "@/components/Motion";
import Header from "@/components/Header";
import Backdrop from "@/components/Backdrop";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Motion />
      <Header />
      <main id="top" style={{ position: "relative" }}>
        <Backdrop />
        <Hero />
        <Story />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}
