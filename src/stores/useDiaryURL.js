// useDiaryURL.js

import { create } from 'zustand';

const useDiaryURL = create((set) => ({
  shareURL: '',
  setShareURL: (url) => set({ shareURL: url }),
}));

export { useDiaryURL };
