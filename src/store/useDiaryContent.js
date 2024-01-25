import { create } from 'zustand';

const useDiaryContent = create((set) => ({
  diaryContent: '',
  setDiaryContent: (content) => set({ diaryContent: content }),
}));

export { useDiaryContent };
