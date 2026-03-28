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

export type Price = {
  id: number;
  period: number;
  price: number;
};

export type Course = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  session: number;
  meetings: number;
  course_duration: number;
  prices: Price[];
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

        const sortedCourses = (data.courses || []).sort((a: Course, b: Course) => {
          return a.id - b.id;
        });

        setCourses(sortedCourses);
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
