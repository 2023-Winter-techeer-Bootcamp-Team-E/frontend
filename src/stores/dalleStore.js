import { create } from 'zustand';

const useDalleStore = create((set) => ({
  dalles: [],
  addDalle: (dalle) => set((state) => ({ dalles: [...state.dalles, dalle] })),
  updateDalle: (updatedDalle) =>
    set((state) => ({
      dalles: state.dalles.map((dalle) =>
        dalle.id === updatedDalle.id ? { ...dalle, ...updatedDalle } : dalle,
      ),
    })),
  deleteDalle: (dalleId) =>
    set((state) => ({
      dalles: state.dalles.filter((dalle) => dalle.id !== dalleId),
    })),
}));

export default useDalleStore;
