import { create } from 'zustand';

const useDiaryStore = create((set) => ({
  stickers: [],
  addSticker: (sticker) =>
    set((state) => ({ stickers: [...state.stickers, sticker] })),
  updateSticker: (updatedSticker) =>
    set((state) => ({
      stickers: state.stickers.map((sticker) =>
        sticker.id === updatedSticker.id
          ? { ...sticker, ...updatedSticker }
          : sticker,
      ),
    })),
}));

export default useDiaryStore;
