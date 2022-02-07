import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

interface diaryItem {
  id: number
  date: any
  content: string
  emotion: number
}

export const DiaryItem:React.FC<diaryItem> = ({id, date, content, emotion}) => {
  const navi = useNavigate();

  return (
    <div className='DiaryItem'>
      <div className={`emotion_img_wrapper emotion_img_wrapper_${emotion}`}>
        <img src={process.env.PUBLIC_URL + `/images/emotion${emotion}.png`} />
      </div>
      <div className='info_wrapper'>
        <div className='diary_date'>{date}</div>
        <div className='diary_content_preview'>{content}</div>
      </div>
      <div className='dtn_wrapper'>
        <Button
          text='수정하기'
          type='default'
          onClick={() => navi(`/edit/${id}`)}
        />
      </div>
    </div>
  );
}
