import { create } from 'zustand';

const useDiaryIdStore = create((set) => ({
  diaryId: '',
  setDiaryId: (id) => set({ diaryId: id }),
}));

export default useDiaryIdStore;
