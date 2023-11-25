import { twMerge } from "tw-merge";

import ViewBox from "./ViewBox";

const Projects = () => {
    return (
        <ViewBox
            title="My Projects"
            className="flex flex-col h-fit"
        >

            <ProjectStatusBox
                statusText="Not started"
            />

            <ProjectStatusBox
                statusText="Planning"
            />

            <ProjectStatusBox
                statusText="In progress"
            />

            <ProjectStatusBox
                statusText="Completed"
            />

            <ProjectStatusBox
                statusText="Cancelled"
            />
            

        </ViewBox>
    )
};

interface ProjectStatusBoxProps {
    statusText : string;

}
const ProjectStatusBox : React.FC<ProjectStatusBoxProps> = ({
    statusText,
}) => {
    return (
        <div
            className="flex flex-col text-neutral-700  w-full h-full text-sm pb-5"
        >
            <h1
                className="font-semibold tracking-wide text-base text-blue-700"
            >
                {statusText}
            </h1>

            <ProjectBox
                projectName="Project name"
                projectTeam="Project team"
                projectOwner="Project owner"
                isHeader={true}
                className="font-semibold"
            />

            <ProjectBox
                projectName="STEM society website"
                projectTeam="NU Lipa Senior High School"
                projectOwner="Ms Nesiel O. Manalo"
            />

        </div>
    )
};

interface ProjectBoxProps {
    projectName : string;
    projectTeam : string;
    projectOwner : string;
    isHeader? : boolean;
    className? : string;
}
const ProjectBox : React.FC<ProjectBoxProps> = ({
    projectName,
    projectTeam,
    projectOwner,
    isHeader,
    className
}) => {
    const projectDetails = [
        projectName,
        projectTeam,
        projectOwner,
    ]

    return (
        <div
            className="flex w-full "
        >
            {projectDetails.map((project) => (
                <h2
                    key={project}
                    className={twMerge(`w-[33%] border-b-2 border-solid border-slate-200 py-1 ${className}`)}
                >
                    {project}
                </h2>
            ))}

            {!isHeader ? (
                <select name="" id="" className="px-2">
                    <option value="Not started">Not started</option>
                    <option value="Planning">Planning</option>
                    <option value="In progress">In progress</option>
                    <option value="Complete">Complete</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            ) : (
                <div className="w-[8rem]">
                </div>
            )}


        </div>
    )
}

export default Projects;