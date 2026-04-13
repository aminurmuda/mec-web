'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Registration from '@/components/sections/Registration';
import Insights from '@/components/sections/Insights';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import { useContext, useEffect, useState } from 'react';
import Footer from '@/components/sections/Footer';
import { formatPrice } from '@/components/utils';
import { Course } from '@/type/course';
import LocaleContext from '@/context/LocaleContext';
import CoursesSection from '@/components/sections/Course';

const Page = () => {
  const { locale } = useContext(LocaleContext);

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
    return `for ${price?.period === 1 ? ' a month' : price?.period + ' months'} (${formatPrice(price?.price, locale)})`;
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`/api/courses?lang=${locale}`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
          },
        });

        const data = await res.json();

        const sortedCourses = (data.courses || []).sort((a: Course, b: Course) => {
          return a.order - b.order;
        });

        setCourses(sortedCourses);
      } catch (error) {
        console.error('Failed to fetch courses');
      }
    };

    fetchCourses();
  }, [locale]);

  return (
    <main className="flex flex-col kocak">
      <Hero />

      <CoursesSection
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
        selectedPriceId={selectedPriceId}
        setSelectedPriceId={setSelectedPriceId}
        courses={courses}
      />

      <Registration
        selectedCourse={getSelectedCourse()}
        selectedPrice={getSelectedPrice()}
        selectedCourseId={selectedCourseId}
        selectedPriceId={selectedPriceId}
      />

      <Insights />

      <About />

      <Testimonials />
      <Footer />
    </main>
  );
};

export default Page;
