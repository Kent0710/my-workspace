import Header from "@/components/Header";
import Main from "@/components/Main";

const TeamPage = () => {
    return (
        <div
            className="w-full h-full text-neutral-800"
        >

            <Header />
            <Main 
                view="singleTeam"
            />
            
        </div>
    )
};

export default TeamPage;