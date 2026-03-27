'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Registration from '@/components/sections/Registration';
import Insights from '@/components/sections/Insights';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Class from '@/components/sections/Class';
import { useEffect, useState } from 'react';
import Footer from '@/components/sections/Footer';

export type Course = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  bundling_price: number;
  duration: number;
  // level?: string;
  pax: number;
  session: number;
  meetings: number;
};

const Page = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<number>(0);

  const [courses, setCourses] = useState<Course[]>([]);

  const getSelectedCourse = () => {
    const course = courses.find((course) => course.id === selectedCourseId);
    if (!course) {
      return '';
    }
    return `${course?.title} (${course?.subtitle}) ${course?.id}`;
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();

        setCourses(data.courses || []);
        console.log('courses', data.courses);
      } catch (error) {
        console.error('Failed to fetch courses');
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="flex flex-col">
      <Navbar />

      <Hero />

      <Class
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
        courses={courses}
      />

      <Registration selectedCourse={getSelectedCourse()} />

      <Insights />

      <About />

      <Testimonials />
      <Footer />
    </main>
  );
};

export default Page;
