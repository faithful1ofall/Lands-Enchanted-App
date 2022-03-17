import React, { useState } from "react";
import Button from '../Button'
import { Link } from 'react-router-dom'

interface DropBoxProps {
    imgUrl: string,
    title: string,
    content: string,
    url: string,
}

const DropBox: React.FC<DropBoxProps> = ({imgUrl, title, content, url}) => {
  const newImg = require(`../../assets/${imgUrl}.png`);

  return (
    <div className="p-4 space-y-2 border-4 border-gray-500 rounded-lg w-80">
        <img src={newImg} />
        <div className="text-2xl">{title}</div>
        <div className="text-base">{content}</div>
        <Link to={`/collectibles/${url}`}>
          <Button title="Mint" className="items-center" />
        </Link>
    </div>
  );
}

export default DropBox;
