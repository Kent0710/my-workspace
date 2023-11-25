'use client'

import Sidebar from "./Sidebar";
import Welcome from "./Welcome";
import Teams from "./Teams";
import SingleTeam from "./SingleTeam";
import Projects from "./Projects";
import Tasks from "./Tasks";
import Chats from "./Chats";
import Materials from "./Materials";
import DiscoverTeams from "./DiscoverTeams";
import SignIn from "./SignIn";

import Loading from "@/components/Loading";

import { useLoaderFlag } from "@/hooks/useLoaderFlag";

import { useEffect } from "react";

interface MainProps {
    view : string;
}
const Main : React.FC<MainProps> = ({
    view
}) => {
    const { loaderFlag, updateLoaderFlag } = useLoaderFlag();   
    const resetLoader = useEffect(() => {
        updateLoaderFlag(false)
    }, [updateLoaderFlag])

    const boxStyling = "flex w-full h-full"
    
    if (loaderFlag) {
        return (
            <main className={boxStyling}>
                <Sidebar />
                <Loading />
            </main>
        )
    }

    if (view === "welcome") {
        return (
            <main className={boxStyling}>
                <Sidebar />
                <Welcome />
            </main>
        )
    }

    if (view === "teams") {
        return (
            <main className={boxStyling}>
                <Sidebar />
                <Teams />
            </main>
        )
    }

    if (view === "singleTeam") {
        return (
            <main className={boxStyling}>
                <Sidebar />
                <SingleTeam />
            </main>
        )
    }

    if (view === "projects") {
        return (
            <main className={boxStyling}>
                <Sidebar />
                <Projects />
            </main>
        )
    }

    if (view === "tasks") {
        return (
            <main className={boxStyling}>
                <Sidebar />
                <Tasks />
            </main>
        )
    }

    if (view === "chats") {
        return (
            <main className={boxStyling}>
                <Sidebar />
                <Chats />
            </main>
        )
    }

    if (view === "materials") {
        return (
            <main className={boxStyling}>
                <Sidebar />
                <Materials />
            </main>
        )
    }

    if (view === "discoverTeams") {
        return (
            <main className={boxStyling}>
                <Sidebar />
                <DiscoverTeams />
            </main>
        )
    }

    if (view === "signIn") {
        return (
            <main className={boxStyling}>
                <SignIn />
            </main>
        )
    }
};

export default Main