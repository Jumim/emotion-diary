import React from 'react';

interface buttonType {
  text: string
  type: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const Button:React.FC<buttonType> = ({ text, type, onClick }) => {

  const btnType = ['positive', 'negative'].includes(type) ? type : 'default';

  return (
    <button className={['MyButton', `MyButton_${btnType}`].join(' ')} onClick={onClick}>
      { text }
    </button>
  );
}

Button.defaultProps = {
  type: 'default'
};
