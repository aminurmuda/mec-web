export type Locale = 'en' | 'id';

export type Price = {
  id: number;
  period: number;
  price: number;
};

export type CardConfig = {
  isClosed?: boolean;
  label?: string;
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
  order: number;
  config?: CardConfig;
};

export type CourseMulti = {
  id: number;
  title_en: string;
  title_id: string;
  subtitle_en: string;
  subtitle_id: string;
  description_en: string;
  description_id: string;
  session: number;
  meetings: number;
  course_duration: number;
  prices: Price[];
  order: number;
  config?: CardConfig;
};
