import Header from "@/components/Header";
import Main from "@/components/Main";

const TeamsPage = () => {
    return (
        <div
            className="w-full h-full text-neutral-800"
        >

            <Header />
            <Main 
                view="teams"
            />
            
        </div>
    )
};

export default TeamsPage