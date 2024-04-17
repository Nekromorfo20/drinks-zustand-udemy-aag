import { z } from "zod"
import { CategoriesAPIResponseSchema, SearchFilterSchema, DrinkAPIResponseSchema, DrinksAPIResponseSchema, RecipeAPIResponseSchema } from "../utils/recipes-schema"

export type TCategories = z.infer<typeof CategoriesAPIResponseSchema>
export type TSearchFilter = z.infer<typeof SearchFilterSchema>
export type TDrink = z.infer<typeof DrinkAPIResponseSchema>
export type TDrinks = z.infer<typeof DrinksAPIResponseSchema>
export type TRecipe = z.infer<typeof RecipeAPIResponseSchema>