'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Registration from '@/components/sections/Registration';
import Insights from '@/components/sections/Insights';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Class, { courses } from '@/components/sections/Class';
import { useState } from 'react';
import Footer from '@/components/sections/Footer';

const Page = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<number>(0);

  const getSelectedCourse = () => {
    const course = courses.find((course) => course.id === selectedCourseId);
    if (!course) {
      return '';
    }
    return `${course?.title} (${course?.subtitle}) ${course?.id}`;
  };

  return (
    <main className="flex flex-col">
      <Navbar />

      <Hero />

      <Class selectedCourseId={selectedCourseId} setSelectedCourseId={setSelectedCourseId} />

      <Registration selectedCourse={getSelectedCourse()} />

      <Insights />

      <About />

      <Testimonials />
      <Footer />
    </main>
  );
};

export default Page;
