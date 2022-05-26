import React, { useState } from "react";
import { NavLink } from "react-router-dom";

interface ButtonProps {
    title: string
    className?: string
}

const Button: React.FC<ButtonProps> = ({title, className}) => {
  return (
    <button className={`px-6 py-2 text-xl text-white bg-red-600 border-2 rounded-full hover:bg-black ${className}`}>{title}</button>
  );
}

export default Button;
