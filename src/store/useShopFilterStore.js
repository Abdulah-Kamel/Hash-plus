import { create } from "zustand";

export const useShopFilterStore = create((set, get) => ({
  // All content from API (unfiltered)
  allCourses: [],
  // Filtered results
  filteredCourses: [],
  // Loading state
  loading: false,
  // Pagination from API
  pagination: { currentPage: 1, limit: 5, totalPages: 1 },
  totalResults: 0,

  // Filter states
  selectedCategories: [],    // category IDs
  selectedContentTypes: [],  // "course" | "bootcamp"
  selectedLevels: [],        // "beginner" | "intermediate" | "advanced"
  selectedRating: null,      // minimum rating number
  selectedDuration: null,    // { min, max }
  selectedSort: null,        // "newest" | "old" | "priceUp" | "priceDown"

  // Setters
  setAllCourses: (courses, pagination) =>
    set((state) => {
      const totalResults = pagination?.totalPages
        ? pagination.limit * pagination.totalPages
        : courses.length;
      return { allCourses: courses, totalResults, pagination };
    }),

  setLoading: (value) => set({ loading: value }),

  toggleCategory: (categoryId) =>
    set((state) => {
      const selected = state.selectedCategories.includes(categoryId)
        ? state.selectedCategories.filter((id) => id !== categoryId)
        : [...state.selectedCategories, categoryId];
      return { selectedCategories: selected };
    }),

  toggleContentType: (type) =>
    set((state) => {
      const selected = state.selectedContentTypes.includes(type)
        ? state.selectedContentTypes.filter((t) => t !== type)
        : [...state.selectedContentTypes, type];
      return { selectedContentTypes: selected };
    }),

  toggleLevel: (level) =>
    set((state) => {
      const selected = state.selectedLevels.includes(level)
        ? state.selectedLevels.filter((l) => l !== level)
        : [...state.selectedLevels, level];
      return { selectedLevels: selected };
    }),

  setSelectedRating: (rating) =>
    set((state) => ({
      selectedRating: state.selectedRating === rating ? null : rating,
    })),

  setSelectedDuration: (duration) =>
    set((state) => ({
      selectedDuration:
        state.selectedDuration?.min === duration?.min &&
        state.selectedDuration?.max === duration?.max
          ? null
          : duration,
    })),

  setSelectedSort: (sort) => set({ selectedSort: sort }),

  clearFilters: () =>
    set({
      selectedCategories: [],
      selectedContentTypes: [],
      selectedLevels: [],
      selectedRating: null,
      selectedDuration: null,
      selectedSort: null,
    }),

  // Apply all filters and sort on the client-side data
  applyFilters: () =>
    set((state) => {
      let result = [...state.allCourses];

      // Filter by category
      if (state.selectedCategories.length > 0) {
        result = result.filter((c) =>
          state.selectedCategories.includes(c.category)
        );
      }

      // Filter by content type (course / bootcamp)
      if (state.selectedContentTypes.length > 0) {
        result = result.filter((c) =>
          state.selectedContentTypes.includes(c.contentType)
        );
      }

      // Filter by level
      if (state.selectedLevels.length > 0) {
        result = result.filter((c) =>
          state.selectedLevels.includes(c.level)
        );
      }

      // Filter by rating
      if (state.selectedRating !== null) {
        result = result.filter(
          (c) => (c.metadata?.avgRatings ?? 0) >= state.selectedRating
        );
      }

      // Filter by duration
      if (state.selectedDuration !== null) {
        result = result.filter((c) => {
          const dur = c.metadata?.duration ?? 0;
          return (
            dur >= state.selectedDuration.min &&
            dur <= state.selectedDuration.max
          );
        });
      }

      // Sort
      if (state.selectedSort) {
        switch (state.selectedSort) {
          case "newest":
            result.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            break;
          case "old":
            result.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            break;
          case "priceUp":
            result.sort(
              (a, b) => (b.price?.amount ?? 0) - (a.price?.amount ?? 0)
            );
            break;
          case "priceDown":
            result.sort(
              (a, b) => (a.price?.amount ?? 0) - (b.price?.amount ?? 0)
            );
            break;
        }
      }

      return { filteredCourses: result };
    }),
}));
