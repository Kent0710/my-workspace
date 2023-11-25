import { create } from "zustand";

type State = {
    teamName : string;
};

type Action = {
    updateTeamName : (teamSidebarView : State["teamName"]) => void
};

export const useTeamName = create<State & Action>((set) => ({
    teamName : "",
    updateTeamName : (newValue : string) => set(() => ({teamName : newValue}))
}))