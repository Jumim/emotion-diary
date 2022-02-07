import React from 'react';

interface emotionItemType {
  id: number
  name: string
  image: any
  onClick: any
  isSelected: boolean
}

export const EmotionItem:React.FC<emotionItemType> = React.memo(({id, name, image, onClick, isSelected}) => {
  return (
    <div className={'EmotionItem ' + (isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`)} onClick={onClick}>
      <img src={image} alt={`emotion_${id}`} />
      <span>{name}</span>
    </div>
  );
});
