'use client';

import { useRef } from 'react';
import CourseCard from '../CourseCard';
import PriceCard from '../PriceCard';
import { Course } from '@/type/course';
import { useLocale } from '@/context/LocaleContext';
import { useCourseSelection } from '@/context/CourseSelectionContext';

const CoursesSection = () => {
  const { getCopy } = useLocale();
  const { selectedCourseId, courses } = useCourseSelection();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const priceCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectedCourse = courses.find((course) => course.id === selectedCourseId);

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const handleScrollToCourse = (index: number) => {
    // Scroll selected card into view
    const cardEl = cardRefs.current[index];
    if (cardEl && scrollRef.current) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const handleScrollToPrice = (index: number) => {
    // Scroll selected card into view
    const cardEl = priceCardRefs.current[index];
    if (cardEl && scrollRef.current) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const showPriceCards =
    selectedCourseId !== 0 && selectedCourse && selectedCourse?.prices?.length > 0;

  return (
    <section id="courses" className="bg-brand-bg py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold">{getCopy('ourProgram')}</h2>

          <div className="flex gap-2">
            <button
              aria-label="Scroll Left"
              onClick={scrollLeft}
              className="rounded-lg border border-gray-100 bg-white px-4 py-2 text-sm hover:bg-blue-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-5 w-5">
                <path d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z" />
              </svg>
            </button>
            <button
              aria-label="Scroll Right"
              onClick={scrollRight}
              className="rounded-lg border border-gray-100 bg-white px-4 py-2 text-sm hover:bg-blue-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-5 w-5">
                <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="max-w-6xl mx-auto flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4 cursor-grab"
      >
        {courses.length === 0
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`bg-white rounded-lg shadow-md p-6 animate-pulse h-100 flex flex-col justify-between min-w-[75%] md:min-w-[320px] snap-center ${i === 0 ? 'ml-6' : ''} ${i === 3 ? 'mr-6' : ''}`}
                style={{ height: '438px' }}
              >
                <div>
                  <div className="h-6 bg-gray-300 rounded w-5/6 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-10"></div>
                  <div className="h-6 bg-gray-300 rounded w-full mb-10"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
                </div>
                <div className="h-button bg-gray-300 rounded-lg w-full"></div>
              </div>
            ))
          : courses.map((course, index) => (
              <div
                key={course.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`min-w-[75%] md:min-w-[320px] snap-center ${index === 0 ? 'ml-6' : ''} ${index === courses.length - 1 ? 'mr-6' : ''}`}
              >
                <CourseCard
                  course={course}
                  onScrollIntoView={() => handleScrollToCourse(index)}
                />
              </div>
            ))}
      </div>

      {showPriceCards && (
        <div
          id="price-cards"
          className="max-w-6xl mx-auto flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4 cursor-grab"
        >
          {selectedCourse?.prices.map((price, index) => {
            return (
              <div
                key={price.id}
                ref={(el) => {
                  priceCardRefs.current[index] = el;
                }}
                className={`min-w-[60%] md:min-w-[320px] snap-center ${index === 0 ? 'ml-6' : ''} ${index === selectedCourse?.prices.length - 1 ? 'mr-6' : ''}`}
              >
                <PriceCard
                  price={price}
                  index={index}
                  onScrollIntoView={() => handleScrollToPrice(index)}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CoursesSection;
