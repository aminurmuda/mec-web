'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/Toast/ToastContext';
import { CourseMulti, Price } from '@/type/course';

type EditableCourse = CourseMulti & {
  soft_delete?: boolean;
  prices: (Price & { soft_delete?: boolean })[];
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showToast } = useToast();

  const [courses, setCourses] = useState<EditableCourse[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [dirtyCourseIds, setDirtyCourseIds] = useState<Set<number>>(new Set());
  const [loadingCourseId, setLoadingCourseId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const markCourseAsDirty = (courseId: number) => {
    setDirtyCourseIds((prev) => {
      const next = new Set(prev);
      next.add(courseId);
      return next;
    });
  };

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/courses');
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      const data = await res.json();
      if (data.courses) {
        setCourses(data.courses);
        setDirtyCourseIds(new Set());
        // Select first active course by default
        const activeCourses = data.courses.filter((c: EditableCourse) => !c.soft_delete);
        if (activeCourses.length > 0) {
          const firstId = activeCourses[0].id;
          setSelectedCourseId(firstId);
          // Load details for first selected course
          try {
            setLoadingCourseId(firstId);
            const detailRes = await fetch(`/api/admin/courses?id=${firstId}`);
            if (detailRes.ok) {
              const detailData = await detailRes.json();
              if (detailData.course) {
                setCourses((prev) =>
                  prev.map((c) => (c.id === firstId ? { ...c, ...detailData.course } : c))
                );
              }
            }
          } catch (err) {
            console.error(err);
          } finally {
            setLoadingCourseId(null);
          }
        }
      }
    } catch (err) {
      showToast('Failed to load courses', 'error');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCourse = async (courseId: number) => {
    setSelectedCourseId(courseId);

    if (courseId < 0) return; // Draft courses are already fully in-memory

    const course = courses.find((c) => c.id === courseId);
    if (course && !course.prices) {
      try {
        setLoadingCourseId(courseId);
        const res = await fetch(`/api/admin/courses?id=${courseId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.course) {
            setCourses((prev) =>
              prev.map((c) => (c.id === courseId ? { ...c, ...data.course } : c))
            );
          }
        }
      } catch (err) {
        console.error('Failed to fetch course details:', err);
        showToast('Failed to load program details', 'error');
      } finally {
        setLoadingCourseId(null);
      }
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchCourses();
    }
  }, [status]);

  // Find active course to display in details panel
  const activeCourse = courses.find((c) => c.id === selectedCourseId && !c.soft_delete);

  // Helper to format currency dynamically in preview
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Add a new empty course
  const handleAddCourse = () => {
    const tempId = -Math.floor(Math.random() * 1000000) - 1;
    const newCourse: EditableCourse = {
      id: tempId,
      title_en: 'New Program',
      title_id: 'Program Baru',
      subtitle_en: 'Subtitle in English',
      subtitle_id: 'Subjudul dalam Bahasa Indonesia',
      description_en: 'Description in English',
      description_id: 'Deskripsi dalam Bahasa Indonesia',
      session: 12,
      meetings: 3,
      course_duration: 60,
      order: courses.length + 1,
      prices: [],
      config: {
        isClosed: false,
        label: '',
      },
    };

    setCourses((prev) => [...prev, newCourse]);
    setDirtyCourseIds((prev) => {
      const next = new Set(prev);
      next.add(tempId);
      return next;
    });
    setSelectedCourseId(tempId);
    showToast('Draft course created', 'info');
  };

  // Soft-delete selected course
  const handleDeleteCourse = (courseId: number) => {
    if (!confirm('Are you sure you want to delete this program?')) return;

    if (courseId < 0) {
      // Draft course, just remove completely
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
      setDirtyCourseIds((prev) => {
        const next = new Set(prev);
        next.delete(courseId);
        return next;
      });
    } else {
      // Existing course, mark for soft-deletion
      setCourses((prev) =>
        prev.map((c) => (c.id === courseId ? { ...c, soft_delete: true } : c))
      );
      markCourseAsDirty(courseId);
    }

    // Switch selection to another active course
    const remainingActive = courses.filter((c) => c.id !== courseId && !c.soft_delete);
    if (remainingActive.length > 0) {
      setSelectedCourseId(remainingActive[0].id);
    } else {
      setSelectedCourseId(null);
    }
    showToast(
      courseId < 0 ? 'Draft discarded' : 'Program marked for deletion. Save to commit changes.',
      'info'
    );
  };

  // Update a field on the current active course
  const handleUpdateCourseField = (field: keyof EditableCourse, value: any) => {
    if (!selectedCourseId) return;
    setCourses((prev) =>
      prev.map((c) => (c.id === selectedCourseId ? { ...c, [field]: value } : c))
    );
    markCourseAsDirty(selectedCourseId);
  };

  // Update a config field on the current active course
  const handleUpdateCourseConfig = (key: string, value: any) => {
    if (!selectedCourseId || !activeCourse) return;
    const updatedConfig = { ...activeCourse.config, [key]: value };
    handleUpdateCourseField('config', updatedConfig);
  };

  // Prices Management
  const handleAddPrice = () => {
    if (!selectedCourseId || !activeCourse) return;
    const tempPriceId = -Math.floor(Math.random() * 1000000) - 1;
    const newPrice: Price & { soft_delete?: boolean } = {
      id: tempPriceId,
      course_id: selectedCourseId,
      period: 1,
      price: 1000000,
      soft_delete: false,
    };

    const updatedPrices = [...activeCourse.prices, newPrice];
    handleUpdateCourseField('prices', updatedPrices);
  };

  const handleUpdatePriceField = (priceId: number, field: keyof Price, value: number) => {
    if (!selectedCourseId || !activeCourse) return;
    const updatedPrices = activeCourse.prices.map((p) =>
      p.id === priceId ? { ...p, [field]: value } : p
    );
    handleUpdateCourseField('prices', updatedPrices);
  };

  const handleDeletePrice = (priceId: number) => {
    if (!selectedCourseId || !activeCourse) return;
    const updatedPrices = activeCourse.prices.map((p) =>
      p.id === priceId ? { ...p, soft_delete: true } : p
    );
    handleUpdateCourseField('prices', updatedPrices);
  };

  // Batch save to backend
  const handleSaveChanges = async () => {
    const dirtyCourses = courses.filter((c) => dirtyCourseIds.has(c.id));

    if (dirtyCourses.length === 0) {
      showToast('No changes to save', 'info');
      return;
    }

    try {
      setIsSaving(true);
      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courses: dirtyCourses }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save changes');
      }

      showToast('All changes saved successfully', 'success');
      await fetchCourses();
    } catch (err: any) {
      showToast(err.message || 'An error occurred while saving', 'error');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 text-sm font-medium">Loading Dashboard...</p>
      </div>
    );
  }

  const activeCourses = courses.filter((c) => !c.soft_delete);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Banner / Actions Bar */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-30 px-6 py-4 flex flex-wrap justify-between items-center gap-4 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            🛡️ Admin Course Manager
          </h1>
          <p className="text-xs text-gray-500">
            Signed in as {session?.user?.email}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition text-sm font-medium"
          >
            Exit to Site
          </button>
          <button
            onClick={fetchCourses}
            className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition text-sm font-medium"
            disabled={isSaving}
          >
            Discard
          </button>
          <button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 transition text-sm font-medium shadow-sm flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Master List Sidebar */}
        <aside className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-sm font-semibold text-gray-700">Programs List</h2>
            <button
              onClick={handleAddCourse}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              ＋ Add Program
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {activeCourses.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No programs available.</p>
            ) : (
              activeCourses
                .sort((a, b) => a.order - b.order)
                .map((course) => {
                  const isSelected = course.id === selectedCourseId;
                  const activePrices = course.prices ? course.prices.filter((p) => !p.soft_delete) : [];
                  return (
                    <button
                      key={course.id}
                      onClick={() => handleSelectCourse(course.id)}
                      className={`w-full text-left p-3 rounded-xl transition duration-150 flex flex-col gap-1 border ${
                        isSelected
                          ? 'bg-blue-50 border-blue-200 text-blue-900 shadow-sm'
                          : 'border-transparent text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-semibold text-sm truncate pr-2">
                          {course.title_en || '(Untitled)'}
                        </span>
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-mono">
                          Order {course.order}
                        </span>
                      </div>
                      <div className="flex justify-between items-center w-full text-xs text-gray-500">
                        {course.prices && (
                          <span className="text-[9px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.25 rounded uppercase">
                            {`${activePrices.length} Price Tier(s)`}
                          </span>
                        )}
                        {course.config?.isClosed && (
                          <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.25 rounded uppercase">
                            Closed
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
            )}
          </div>
        </aside>

        {/* Right Details / Editor Panel */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50">
          {loadingCourseId === selectedCourseId ? (
            <div className="h-full flex flex-col justify-center items-center text-gray-400">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-sm">Loading details...</p>
            </div>
          ) : !activeCourse ? (
            <div className="h-full flex flex-col justify-center items-center text-gray-400">
              <span className="text-4xl mb-2">📋</span>
              <p className="text-sm">Select a program from the left sidebar to edit details.</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              {/* Course Header & Quick Delete */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                    Editing Program ID: {activeCourse.id < 0 ? 'Draft' : activeCourse.id}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800">
                    {activeCourse.title_en || 'Unnamed Program'}
                  </h3>
                </div>
                <button
                  onClick={() => handleDeleteCourse(activeCourse.id)}
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-xl transition text-xs font-semibold"
                >
                  Delete Program
                </button>
              </div>

              {/* Bilingual Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* English Side */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-500 border-b pb-1">🇺🇸 ENGLISH</h4>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Title (EN)
                    </label>
                    <input
                      type="text"
                      value={activeCourse.title_en}
                      onChange={(e) => handleUpdateCourseField('title_en', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Subtitle (EN)
                    </label>
                    <input
                      type="text"
                      value={activeCourse.subtitle_en}
                      onChange={(e) => handleUpdateCourseField('subtitle_en', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Description (EN)
                    </label>
                    <textarea
                      rows={4}
                      value={activeCourse.description_en}
                      onChange={(e) => handleUpdateCourseField('description_en', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                    />
                  </div>
                </div>

                {/* Indonesian Side */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-500 border-b pb-1">🇮🇩 INDONESIAN</h4>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Title (ID)
                    </label>
                    <input
                      type="text"
                      value={activeCourse.title_id || ''}
                      onChange={(e) => handleUpdateCourseField('title_id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Subtitle (ID)
                    </label>
                    <input
                      type="text"
                      value={activeCourse.subtitle_id}
                      onChange={(e) => handleUpdateCourseField('subtitle_id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Description (ID)
                    </label>
                    <textarea
                      rows={4}
                      value={activeCourse.description_id}
                      onChange={(e) => handleUpdateCourseField('description_id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* Course Metrics */}
              <div className="space-y-4 border-t border-gray-100 pt-6">
                <h4 className="text-xs font-bold text-gray-500">📊 COURSE METRICS</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Sessions (Minutes)
                    </label>
                    <input
                      type="number"
                      value={activeCourse.session}
                      onChange={(e) => handleUpdateCourseField('session', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Meetings/Week
                    </label>
                    <input
                      type="number"
                      value={activeCourse.meetings}
                      onChange={(e) => handleUpdateCourseField('meetings', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Duration (Months)
                    </label>
                    <input
                      type="number"
                      value={activeCourse.course_duration}
                      onChange={(e) => handleUpdateCourseField('course_duration', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={activeCourse.order}
                      onChange={(e) => handleUpdateCourseField('order', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* Status and Custom Flags Configuration */}
              <div className="space-y-4 border-t border-gray-100 pt-6">
                <h4 className="text-xs font-bold text-gray-500">⚙️ CONFIGURATION</h4>
                <div className="flex flex-wrap items-center gap-6">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeCourse.config?.isClosed || false}
                      onChange={(e) => handleUpdateCourseConfig('isClosed', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    Temporarily Closed
                  </label>

                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Custom Card Label (e.g. "Popular")
                    </label>
                    <input
                      type="text"
                      value={activeCourse.config?.label || ''}
                      onChange={(e) => handleUpdateCourseConfig('label', e.target.value)}
                      placeholder="e.g. Best Seller"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* Nested Price Manager */}
              <div className="space-y-4 border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-gray-500">🏷️ PRICING TIERS</h4>
                  <button
                    onClick={handleAddPrice}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    ＋ Add Price Tier
                  </button>
                </div>

                <div className="space-y-3">
                  {activeCourse.prices.filter((p) => !p.soft_delete).length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4 border border-dashed border-gray-200 rounded-xl">
                      No pricing tiers configured. Add one above.
                    </p>
                  ) : (
                    activeCourse.prices
                      .filter((p) => !p.soft_delete)
                      .map((price) => (
                        <div
                          key={price.id}
                          className="flex items-center gap-4 bg-gray-50 p-4 border border-gray-100 rounded-xl"
                        >
                          <div className="w-32">
                            <label className="block text-[10px] font-bold text-gray-500 mb-1">
                              Period (Months)
                            </label>
                            <input
                              type="number"
                              min={1}
                              value={price.period}
                              onChange={(e) =>
                                handleUpdatePriceField(
                                  price.id,
                                  'period',
                                  parseInt(e.target.value) || 1
                                )
                              }
                              className="w-full px-3 py-1.5 border border-gray-200 bg-white rounded-xl text-sm text-gray-800"
                            />
                          </div>

                          <div className="flex-1">
                            <label className="block text-[10px] font-bold text-gray-500 mb-1">
                              Price (IDR)
                            </label>
                            <input
                              type="number"
                              min={0}
                              value={price.price}
                              onChange={(e) =>
                                handleUpdatePriceField(
                                  price.id,
                                  'price',
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 py-1.5 border border-gray-200 bg-white rounded-xl text-sm text-gray-800"
                            />
                          </div>

                          <div className="w-44 pt-4">
                            <span className="text-xs font-semibold text-gray-500 block text-right">
                              Preview: {formatIDR(price.price)}
                            </span>
                          </div>

                          <button
                            onClick={() => handleDeletePrice(price.id)}
                            className="text-red-500 hover:text-red-700 pt-4 font-semibold text-sm transition"
                          >
                            Remove
                          </button>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
