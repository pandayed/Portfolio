import React from "react";

const TechItem = (props) => {
    return (
        <div className="text-xs inline-flex items-center justify-center px-2.5 py-1 bg-white/10 rounded-md">
            {props.technology}
        </div>
    )
}

export const Technologies = (props) => {
    return (
        <div className="flex flex-wrap gap-2 font-['Source_Code_Pro'] mt-2">
            {
                props.technologies.map(
                    (technology, index) => (
                    <TechItem technology={technology} />
                )
            )
            }
        </div>
    );
};
