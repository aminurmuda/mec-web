'use client';

import { useRef, useState } from 'react';
import Card from '@/components/Card';

export type Course = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
  level: string;
  pax: number;
  session: number;
  meetings: number;
};

const courses: Course[] = [
  {
    id: 1,
    title: 'Baby Steps Class',
    subtitle: 'General English Class',
    description: 'Perfect for beginners who want to start learning English from zero.',
    price: 'Rp 120.000',
    duration: '6 Months',
    level: 'Level A1-B2',
    pax: 1,
    session: 30,
    meetings: 4,
  },
  {
    id: 2,
    title: 'Focus Class',
    subtitle: 'Speaking Class',
    description: 'Improve your speaking confidence in daily conversations.',
    price: 'Rp 320.000',
    duration: '6 Months',
    level: 'Level A1-B2',
    pax: 1,
    session: 50,
    meetings: 4,
  },
  {
    id: 3,
    title: 'Focus Class',
    subtitle: 'Reading Class',
    description: 'Improve your reading skills and comprehension.',
    price: 'Rp 320.000',
    duration: '6 Months',
    level: 'Level A1-B2',
    pax: 1,
    session: 50,
    meetings: 4,
  },
  {
    id: 4,
    title: 'Focus Class',
    subtitle: 'Grammar Class',
    description: 'Improve your grammar skills and understanding.',
    price: 'Rp 320.000',
    duration: '6 Months',
    level: 'Level A1-B2',
    pax: 1,
    session: 50,
    meetings: 4,
  },
  {
    id: 5,
    title: 'Focus Class',
    subtitle: 'Writing Class',
    description: 'Improve your writing skills and composition.',
    price: 'Rp 320.000',
    duration: '6 Months',
    level: 'Level A1-B2',
    pax: 1,
    session: 50,
    meetings: 4,
  },
  {
    id: 6,
    title: 'Baby Steps Class',
    subtitle: 'General English Class',
    description: 'Perfect for beginners who want to start learning English from zero.',
    price: 'Rp 300.000',
    duration: '6 Months',
    level: 'Level A1-B2',
    pax: 3,
    session: 30,
    meetings: 4,
  },
  {
    id: 7,
    title: 'Focus Class',
    subtitle: 'Speaking Class',
    description: 'Improve your speaking confidence in daily conversations.',
    price: 'Rp 900.000',
    duration: '6 Months',
    level: 'Level A1-B2',
    pax: 3,
    session: 50,
    meetings: 4,
  },
  {
    id: 8,
    title: 'Focus Class',
    subtitle: 'Reading Class',
    description: 'Improve your reading skills and comprehension.',
    price: 'Rp 900.000',
    duration: '6 Months',
    level: 'Level A1-B2',
    pax: 3,
    session: 50,
    meetings: 4,
  },
  {
    id: 9,
    title: 'Focus Class',
    subtitle: 'Grammar Class',
    description: 'Improve your grammar skills and understanding.',
    price: 'Rp 900.000',
    duration: '6 Months',
    level: 'Level A1-B2',
    pax: 3,
    session: 50,
    meetings: 4,
  },
  {
    id: 10,
    title: 'Focus Class',
    subtitle: 'Writing Class',
    description: 'Improve your writing skills and composition.',
    price: 'Rp 900.000',
    duration: '6 Months',
    level: 'Level A1-B2',
    pax: 3,
    session: 50,
    meetings: 4,
  },
];

const ClassesSection = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <section id="courses" className="bg-brand-bg py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Our English Programs</h2>

          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="rounded-lg border border-gray-100 bg-blue-200 px-4 py-2 text-sm hover:bg-blue-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-5 w-5">
                <path d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="rounded-lg border border-gray-100 bg-blue-200 px-4 py-2 text-sm hover:bg-blue-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-5 w-5">
                <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" />
              </svg>
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-4">
          {courses.map((course) => (
            <div key={course.id} className="min-w-75">
              <Card
                course={course}
                isSelected={selectedCourseId === course.id}
                onSelect={setSelectedCourseId}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;
