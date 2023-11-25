import { create } from "zustand";

type State = {
    teamSidebarView : string;
};

type Action = {
    updateTeamSidebarView : (teamSidebarView : State["teamSidebarView"]) => void
};

export const useTeamSidebarView = create<State & Action>((set) => ({
    teamSidebarView : "announcements",
    updateTeamSidebarView : (newValue : string) => set(() => ({teamSidebarView : newValue}))
}))