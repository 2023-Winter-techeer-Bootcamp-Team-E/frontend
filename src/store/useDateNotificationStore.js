// useDateNotificationStore.js

import create from 'zustand';

const useDateNotificationStore = create((set) => ({
  page: 1,
  setPage: (num) => set({ page: num }),
  resetPage: () => set({ page: 1 }), // pageNum을 초기화하는 함수 추가
}));

export { useDateNotificationStore };
