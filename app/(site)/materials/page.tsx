import Header from "@/components/Header";
import Main from "@/components/Main";

const MaterialsPage = () => {
    return (
        <div
            className="w-full h-full text-neutral-800"
        >

            <Header />
            <Main 
                view="materials"
            />
            
        </div>
    )
};

export default MaterialsPage