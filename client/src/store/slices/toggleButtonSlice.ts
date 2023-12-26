import { create, StateCreator } from 'zustand'

export type ToggleButtonState = {
  isPostActive: boolean;
  isArticleActive: boolean;
  setPostActive: () => void;
  setArticleActive: () => void;
}


export const avatarTogglerSlice: StateCreator<ToggleButtonState> = (set) => ({
  isPostActive: true,
  isArticleActive: false,
  setPostActive: () =>
    set(() => ({
      isPostActive: true,
      isArticleActive: false
    })),
  setArticleActive: () =>
    set(() => ({
      isPostActive: false,
      isArticleActive: true
    }))
});