import create from 'zustand';

export const useUserInfoStore = create((set) => ({
  userInfoList: [],
  addUserInfo: (userId, nickname, password) => {
    set((state) => ({
      userInfoList: [...state.userInfoList, { userId, nickname, password }],
    }));
  },
  removeUserInfo: (userId) =>
    set((prev) => ({
      userInfoList: prev.userInfoList.filter((e) => e.userId !== userId),
    })),
}));

export default useUserInfoStore;
