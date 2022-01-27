import React from 'react';

interface headerType {
  left?: React.ReactChild | React.ReactChild[] | React.ReactChildren | React.ReactChildren[]
  right?: React.ReactChild | React.ReactChild[] | React.ReactChildren | React.ReactChildren[]
  text: string
}

export const Header:React.FC<headerType> = ({ left, right, text }) => {
  return (
    <header>
      <div className={'header_left'}>
        {left}
      </div>
      <div className={'header_text'}>
        {text}
      </div>
      <div className={'header_right'}>
        {right}
      </div>
    </header>
  );
}
