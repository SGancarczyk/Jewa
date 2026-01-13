import React from "react";
import { iconPaths, type IconName } from "./IconsData";

interface Props {
    name: IconName,
    width: number,
    height: number,
    color?: string,
};

export const Icon = ({ name, width, height, color = "#1C1B1F" }: Props) => {
    const iconData = iconPaths[name];
    return <svg
        width={width}
        height={height}
        viewBox={iconData.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: color }}
    >
        <path d={iconData.d} fill="currentColor"/>
    </svg>
}
