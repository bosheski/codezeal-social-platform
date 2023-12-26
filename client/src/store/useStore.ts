import { create } from 'zustand'
import { avatarTogglerSlice, ToggleButtonState } from './slices/toggleButtonSlice'


export const useStore = create<ToggleButtonState>((...args) => ({
 ...avatarTogglerSlice(...args),
}))