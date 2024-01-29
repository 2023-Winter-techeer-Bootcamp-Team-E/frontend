// useIconUpdate.js
import { create } from 'zustand';

const useIconUpdate = create((set) => ({
  iconUpdate: 0,
  setIconUpdate: (value) => set({ iconUpdate: value }),
}));

export default useIconUpdate;
