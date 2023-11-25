import Header from "@/components/Header";
import Main from "@/components/Main";

const SignInPage = () => {
    return (
        <div
            className="w-full h-full text-neutral-800"
        >

            <Header />
            <Main 
                view="signIn"
            />
            
        </div>
    )
};

export default SignInPage;