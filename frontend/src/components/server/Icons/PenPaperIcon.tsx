import React from "react";

interface PenPaperIconProps {
    size?: number;
    color?: string;
}

const PenPaperIcon: React.FC<PenPaperIconProps> = ({
    size = 24,
    color = "var(--color-light)",
    ...props
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M20.206 0c.656 0 1.189.538 1.189 1.2V5.71l-10.697 10.8-.007 5.085 5.047.007 5.657-5.71v6.91c0 .662-.533 1.2-1.189 1.2H1.189A1.195 1.195 0 010 22.8V1.2C0 .537.532 0 1.189 0h19.017zm2.113 8.17L24 9.867 14.755 19.2l-1.683-.002.003-1.695 9.244-9.333zM10.697 12H4.754v2.4h5.943V12zm3.566-4.8H4.754v2.4h9.51V7.2z"
                fill={color}
            />
        </svg>
    );
};

export default PenPaperIcon;
