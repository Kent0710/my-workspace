import Header from "@/components/Header";
import Main from "@/components/Main";

const ChatsPage = () => {
    return (
        <div
            className="w-full h-full text-neutral-800"
        >

            <Header />
            <Main 
                view="chats"
            />
            
        </div>
    )
};

export default ChatsPage