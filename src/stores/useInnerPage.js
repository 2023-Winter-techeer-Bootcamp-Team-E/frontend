import { create } from 'zustand';

const useInnerPage = create((set) => ({
  innerPage: 1,
  setInnerPage: (num) => set({ innerPage: num }),
}));

export { useInnerPage };
