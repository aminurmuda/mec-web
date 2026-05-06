'use client';

import { createContext, useContext } from 'react';
import { Course, Price } from '@/type/course';

interface CourseSelectionContextType {
  selectedCourseId: number;
  setSelectedCourseId: (id: number) => void;
  selectedPriceId: number;
  setSelectedPriceId: (id: number) => void;
  courses: Course[];
  selectedCourseStr: string;
  selectedPriceStr: string;
  selectedCourse: Course | undefined;
  selectedPrice: Price | undefined;
}

export const CourseSelectionContext = createContext<CourseSelectionContextType | undefined>(
  undefined
);

export const useCourseSelection = () => {
  const context = useContext(CourseSelectionContext);
  if (!context) {
    throw new Error('useCourseSelection must be used within a CourseSelectionProvider');
  }
  return context;
};
