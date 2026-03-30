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
import { formatPrice } from '@/components/utils';

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
  const [selectedPriceId, setSelectedPriceId] = useState<number>(0);

  const [courses, setCourses] = useState<Course[]>([]);

  const findCourse = (id: number) => {
    return courses.find((course) => course.id === id);
  };

  const getSelectedCourse = () => {
    const course = findCourse(selectedCourseId);
    if (!course) {
      return '';
    }
    return `${course?.title} (${course?.subtitle})`;
  };

  const getSelectedPrice = () => {
    const price = findCourse(selectedCourseId)?.prices.find(
      (price) => price.id === selectedPriceId,
    );
    if (!price) {
      return '';
    }
    return `for ${price?.period === 1 ? ' a month' : price?.period + ' months'} (${formatPrice(price?.price)})`;
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
        selectedPriceId={selectedPriceId}
        setSelectedPriceId={setSelectedPriceId}
        courses={courses}
      />

      <Registration selectedCourse={getSelectedCourse()} selectedPrice={getSelectedPrice()} />

      <Insights />

      <About />

      <Testimonials />
      <Footer />
    </main>
  );
};

export default Page;
