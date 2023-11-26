'use client'

import { FaLayerGroup } from "react-icons/fa";

import { signIn } from "next-auth/react";

import { useState } from "react";

import Loading from "./Loading";

const SignIn = () => {
    const [isLoginClicked, setIsLoginClicked] = useState(false);

    const handleLoginClicked = () => {
        signIn('auth0', {callbackUrl : '/teams'})

        setIsLoginClicked(true);
    }

    return (
        <div
            className="flex flex-col justify-center items-center h-full w-full gap-4 pb-28" 
        >

            <div
                className="flex flex-col justify-center items-center h-[20rem] w-[30rem] gap-4 bg-slate-100 shadow-lg hover:bg-slate-200 rounded-md"
            >
                {!isLoginClicked ? (
                    <>
                        <FaLayerGroup
                            size={60}
                            color="blue"
                        />

                        <h1
                            className="text-blue-700 font-semibold text-2xl"
                        >
                            Manage everything in one place.
                        </h1>

                        <small
                            className="text-center"
                        >
                            The site is still under development, there might be feature that is still not functionable. Stay tuned for updates.
                        </small>

                        <button
                            className=" bg-blue-600 rounded-md px-12 py-2 font-semibold text-white text-sm tracking-wide hover:bg-blue-400"
                            onClick={() => handleLoginClicked()}
                        >
                            Log in
                        </button>


                    </>
                ) : (
                    <Loading 
                        className="pb- pt-20"
                    />
                )}
            </div>
        </div>
    )
};

export default SignIn;