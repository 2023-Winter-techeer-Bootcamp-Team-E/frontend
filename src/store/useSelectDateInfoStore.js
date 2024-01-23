// useSelectDateInfoStore.js

import create from 'zustand';

export const useSelectDateInfoStore = create((set) => ({
  selectedMonth: '',
  selectedDay: '',
  setSelectDateInfo: (month, day) =>
    set({ selectedMonth: month, selectedDay: day }),
}));
