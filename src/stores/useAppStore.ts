import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { createRecipesSlice, TRecipesSliceType } from "./recipeSlice"
import { createFavoritesSlice, TFavoritesSliceType } from "./favoritesSlice"
import { createNotificationSlice, TNotificationSliceType } from "./notificationSlice"

export const useAppStore = create<TRecipesSliceType & TFavoritesSliceType & TNotificationSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)
})))