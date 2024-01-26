import { create } from 'zustand';

const useStickerStore = create((set) => ({
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
  deleteSticker: (stickerId) =>
    set((state) => ({
      stickers: state.stickers.filter((sticker) => sticker.id !== stickerId),
    })),
}));

export default useStickerStore;
