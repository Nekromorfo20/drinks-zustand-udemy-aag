import {  StateCreator } from "zustand"
import { TFavoritesSliceType } from "./favoritesSlice"

type TNotification = {
    text: string
    error: boolean
    show: boolean
}

export type TNotificationSliceType = {
    notification: TNotification
    showNotification: (payload: Pick<TNotification, "text" | "error">) => void
    hideNotification: () => void
}

export const createNotificationSlice : StateCreator<TNotificationSliceType & TFavoritesSliceType, [], [], TNotificationSliceType> = (set, get) => ({
    notification: {
        text: "",
        error: false,
        show: false
    },
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        setTimeout(() => {
            get().hideNotification()
        }, 5000)
    },
    hideNotification: () => {
        set({
            notification: {
                text: "",
                error: false,
                show: false
            },
        })
    }
})