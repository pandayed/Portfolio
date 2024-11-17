import React from "react";

const TechItem = (props) => {
    return (
        <div className="TechItem">
            {props.technology}
        </div>
    )
}

export const Technologies = (props) => {
    return (
        <div className="Technology">
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
