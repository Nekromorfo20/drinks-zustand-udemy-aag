import axios from "axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponseSchema, RecipeAPIResponseSchema } from "../utils/recipes-schema"
import { TDrink, TSearchFilter } from "../types"

export const getCategories = async () => {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    const { data } = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)

    if (result.success) {
        return result.data
    }
}

export const getRecipes = async (filters : TSearchFilter) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const { data } = await axios(url)
    const result = DrinksAPIResponseSchema.safeParse(data)

    if (result.success) {
        return result.data
    }
}

export const getRecipeById = async (id : TDrink["idDrink"]) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const { data } = await axios(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])

    if (result.success) {
        return result.data
    }
}