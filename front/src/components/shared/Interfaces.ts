import React,  { ReactElement } from "react";

export interface CardProps {
    image: ReactElement<any, any> | string;
    title: string;
    description: string;
    urlStr: string;
}