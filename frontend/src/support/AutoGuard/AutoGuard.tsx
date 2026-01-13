import React, { cloneElement, type ReactElement } from "react"
import { useNavigate } from "react-router-dom";

interface AutoGuardProps {
    children: ReactElement<any>;
    redirectTo?: string;
}

export const AutoGuard = ({ children, redirectTo="/login" }: AutoGuardProps) => {
    const navigate = useNavigate();

    return cloneElement(children, {
        onClick: (e: React.MouseEvent<HTMLElement>) => {
            const token = localStorage.getItem("jwtToken");

            if (!token) {
                e.preventDefault();
                e.stopPropagation();
                navigate(redirectTo);
            } else {
                children.props.onClick && children.props.onClick(e);
            }
        }
    });
}