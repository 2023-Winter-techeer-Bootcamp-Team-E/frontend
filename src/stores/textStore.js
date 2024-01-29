import { create } from 'zustand';

const useTextStore = create((set) => ({
  texts: [],
  addText: (text) => set((state) => ({ texts: [...state.texts, text] })),
  updateText: (updatedText) =>
    set((state) => ({
      texts: state.texts.map((text) =>
        text.id === updatedText.id ? { ...text, ...updatedText } : text,
      ),
    })),
  deleteText: (textId) =>
    set((state) => ({
      texts: state.texts.filter((text) => text.id !== textId),
    })),
}));

export default useTextStore;
