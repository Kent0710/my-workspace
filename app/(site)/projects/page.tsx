import Header from "@/components/Header";
import Main from "@/components/Main";

const ProjectsPage = () => {
    return (
        <div
            className="w-full h-full text-neutral-800"
        >

            <Header />
            <Main 
                view="projects"
            />
            
        </div>
    )
};

export default ProjectsPage