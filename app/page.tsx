import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Registration from '@/components/sections/Registration';
import Insights from '@/components/sections/Insights';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Class from '@/components/sections/Class';

const Page = () => {
  return (
    <main className="flex flex-col">
      <Navbar />

      <Hero />

      <Class />

      <Registration />

      <Insights />

      <About />

      <Testimonials />
    </main>
  );
};

export default Page;
