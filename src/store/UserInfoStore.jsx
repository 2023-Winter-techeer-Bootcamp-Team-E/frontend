import create from 'zustand';

const useUserInfoStore = create((set) => ({
  userInfoList: [],
  addUserInfo: (id, nickname) => {
    set((state) => ({
      userInfoList: [...state.userInfoList, { id, nickname }],
    }));
  },
  getUserInfo: (get) => (id) =>
    get().userInfoList.find((user) => user.id === id),
  removeUserInfo: (id) =>
    set((prev) => ({
      userInfoList: prev.userInfoList.filter((e) => e.id !== id),
    })),
}));

export default useUserInfoStore;
