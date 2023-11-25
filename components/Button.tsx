import { twMerge } from "tw-merge";

interface ButtonProps {
    className? : string;
    buttonText : string;
    onClick? : any;
}

const Button : React.FC<ButtonProps> = ({
    className,
    buttonText,
    onClick
}) => {
    return (
        <button
            onClick={onClick}
            className={twMerge(`flex items-center gap-2 bg-blue-600 rounded-md px-10 py-2 font-semibold text-white text-xs tracking-wide
                hover:bg-blue-400
                ${className}`)}
        >
            {buttonText}
        </button>
    )
};

export default Button;