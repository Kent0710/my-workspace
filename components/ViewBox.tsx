import { twMerge } from "tw-merge";

interface ViewBoxProps {
    children : React.ReactNode;
    title : string;
    className? : string;
}
const ViewBox : React.FC<ViewBoxProps> = ({
    children,
    title,
    className
}) => {
    return (
        <div
            className={twMerge(`py-2 px-5 w-full ${className}`)}
        >

            <h1
                className="font-semibold tracking-wide text-lg text-blue-700"
            >
                {title}
            </h1>

            {children}

        </div>
    )
};

export default ViewBox;