import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type { TCategories, TDrink, TDrinks, TRecipe, TSearchFilter } from "../types"
import { TFavoritesSliceType } from "./favoritesSlice"

export type TRecipesSliceType = {
    categories: TCategories
    drinks: TDrinks
    selectedRecipe: TRecipe
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters: TSearchFilter) => Promise<void>
    selectRecipe: (id: TDrink["idDrink"]) => Promise<void>
    closeModal: () => void
}


export const createRecipesSlice : StateCreator<TRecipesSliceType & TFavoritesSliceType, [], [], TRecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as TRecipe,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (filters) => {
       const drinks = await getRecipes(filters)
       set({
            drinks
       })
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as TRecipe
        })
    }
})