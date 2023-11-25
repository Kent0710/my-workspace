import { create } from "zustand";

type State = {
    loaderFlag : boolean;
};

type Action = {
    updateLoaderFlag : (loaderFlag : State["loaderFlag"]) => void
};

export const useLoaderFlag = create<State & Action>((set) => ({
    loaderFlag :false,
    updateLoaderFlag : (newValue : boolean) => set(() => ({loaderFlag : newValue}))
}))