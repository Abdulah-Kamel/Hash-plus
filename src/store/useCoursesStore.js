import { create } from "zustand";

export const useCoursesStore = create((set) => ({
  courses: [],
  selectedCourse: null,
  loading: false,

  setCourses: (courses) => set({ courses }),
  addCourse: (course) =>
    set((state) => ({ courses: [...state.courses, course] })),
  removeCourse: (id) =>
    set((state) => ({ courses: state.courses.filter((c) => c.id !== id) })),
  selectCourse: (course) => set({ selectedCourse: course }),
  setLoading: (value) => set({ loading: value }),
  clear: () => set({ courses: [], selectedCourse: null }),
}));
