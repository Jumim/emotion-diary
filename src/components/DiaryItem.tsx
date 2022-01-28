import React from 'react';

interface diaryItem {
  id: number
  date: any
  content: string
  emotion: number
}

export const DiaryItem:React.FC<diaryItem> = ({date, content, emotion}) => {
  return (
    <div className='DiaryItem'>
      <div className={`emotion_img_wrapper emotion_img_wrapper_${emotion}`}>
        <img src={process.env.PUBLIC_URL + `/images/emotion${emotion}.png`} />
      </div>
      <div className='info_wrapper'>
        <div className='diary_date'>{date}</div>
        <div className='diary_content_preview'>{content}</div>
      </div>
    </div>
  );
}
