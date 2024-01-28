import create from 'zustand';

const useStickersLocate = create((set) => ({
  stickersURL: '',
  stickersTop: 100,
  stickersLeft: 100,
  stickersHeight: 100,
  stickersRotate: 0,
  stickersWidth: 100,

  setStickersURL: (url) => set({ stickersURL: url }),
  setStickersTop: (top) => set({ stickersTop: top }),
  setStickersLeft: (left) => set({ stickersLeft: left }),
  setStickersHeight: (height) => set({ stickersHeight: height }),
  setStickersRotate: (rotate) => set({ stickersRotate: rotate }),
  setStickersWidth: (width) => set({ stickersWidth: width }),
}));

export default useStickersLocate;
