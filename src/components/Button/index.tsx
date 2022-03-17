import React, { useState } from "react";
import { NavLink } from "react-router-dom";

interface ButtonProps {
    title: string
    className?: string
}

const Button: React.FC<ButtonProps> = ({title, className}) => {
  return (
    <button className={`px-6 py-2 text-xl bg-blue-500 border-2 rounded-lg hover:bg-blue-600 ${className}`}>{title}</button>
  );
}

export default Button;
