'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Registration from '@/components/sections/Registration';
import Insights from '@/components/sections/Insights';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import { useContext, useEffect, useState } from 'react';
import { formatPrice } from '@/components/utils';
import { Course } from '@/type/course';
import LocaleContext from '@/context/LocaleContext';
import CoursesSection from '@/components/sections/Course';
import { CourseSelectionContext } from '@/context/CourseSelectionContext';

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
    return course
  };

  const getSelectedPrice = () => {
    const price = findCourse(selectedCourseId)?.prices.find(
      (price) => price.id === selectedPriceId,
    );
    return price
  };

  const getCourseStr = () => {
    const course = getSelectedCourse();
    if (!course) {
      return '';
    }
    return `${course?.title} (${course?.subtitle})`;
  }

  const getPriceStr = () => {
    const price = getSelectedPrice();
    if (!price) {
      return '';
    }
    return `${formatPrice(price?.price, locale)} (for ${price?.period === 1 ? ' a month' : price?.period + ' months'})`;
  }
  


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
    <CourseSelectionContext.Provider
      value={{
        selectedCourseId,
        setSelectedCourseId,
        selectedPriceId,
        setSelectedPriceId,
        courses,
        selectedCourseStr: getCourseStr(),
        selectedPriceStr: getPriceStr(),
        selectedCourse: getSelectedCourse(),
        selectedPrice: getSelectedPrice(),
      }}
    >
      <main className="flex flex-col kocak">
        <Hero />

        <CoursesSection />

        <Registration />

        <Insights />

        <About />

        <Testimonials />
      </main>
    </CourseSelectionContext.Provider>
  );
};

export default Page;
