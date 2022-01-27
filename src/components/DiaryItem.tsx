import React from 'react';

interface diaryItem {
  id: number
  date: any
  content: string
  emotion: number
}

export const DiaryItem:React.FC<diaryItem> = ({id, date, content, emotion}) => {
  console.log(`id = ${id}`);
  console.log(`date = ${date}`);
  console.log(`content = ${content}`);
  console.log(`emotion = ${emotion}`);

  return (
    <div className='DiaryItem'>
    </div>
  );
}
