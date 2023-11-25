import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";

const App = () => {
    return (
        <div
            className="w-full h-full"
        >

            <Header />
            <Main 
                view="welcome"
            />
            
        </div>
    )
};

export default App;