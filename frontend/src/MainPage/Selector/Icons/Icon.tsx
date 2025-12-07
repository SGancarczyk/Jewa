import React from "react";
import { iconPaths, type IconName } from "./IconsData";

interface Props {
    name: IconName,
    width: number,
    height: number,
    color?: string,
};

export const Icon = ({ name, width, height, color = "#1C1B1F" }: Props) => {
    return <svg
        width={width}
        height={height}
        viewBox="0 0 31 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: color }}
    >
        {iconPaths[name]}
    </svg>
}
