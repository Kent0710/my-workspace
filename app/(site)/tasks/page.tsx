import Header from "@/components/Header";
import Main from "@/components/Main";

const TasksPage = () => {
    return (
        <div
            className="w-full h-full text-neutral-800"
        >

            <Header />
            <Main 
                view="tasks"
            />
            
        </div>
    )
};

export default TasksPage