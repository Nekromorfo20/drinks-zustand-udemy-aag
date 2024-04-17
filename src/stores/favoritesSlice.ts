import {  StateCreator } from "zustand"
import { TRecipe } from "../types"
import { TRecipesSliceType, createRecipesSlice } from "./recipeSlice"
import { TNotificationSliceType, createNotificationSlice } from "./notificationSlice"

export type TFavoritesSliceType = {
    favorites: TRecipe[]
    handleClickFavorite: (recipe: TRecipe) => void
    favoriteExists: (id: TRecipe["idDrink"]) => boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice : StateCreator<TFavoritesSliceType & TRecipesSliceType & TNotificationSliceType, [], [], TFavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().favoriteExists(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set, get, api).showNotification({ 
                text: "Se eliminó de favoritos", 
                error: false
            })
        } else {
            set((state) => ({
                favorites: [ ...state.favorites, recipe]
            }))
            createNotificationSlice(set, get, api).showNotification({ 
                text: "Se agregó a favoritos", 
                error: false
            })
        }
        createRecipesSlice(set, get, api).closeModal()
        localStorage.setItem("favorites", JSON.stringify(get().favorites))
    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem("favorites")
        if(storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})