import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { Button, EmotionItem } from '../components';
import { DiaryDispatchContext } from '../App';

interface stateType {
  date: any
  content: string
  emotion: number
}

interface emotionItemListType {
  id: number
  name: string
  image: any
}

const emotionItemList: emotionItemListType[] = [
  { id: 1, name: '완전 좋음', image: process.env.PUBLIC_URL + '/images/emotion1.png' },
  { id: 2, name: '좋음', image: process.env.PUBLIC_URL + '/images/emotion2.png' },
  { id: 3, name: '그럭저럭', image: process.env.PUBLIC_URL + '/images/emotion3.png' },
  { id: 4, name: '나쁨', image: process.env.PUBLIC_URL + '/images/emotion4.png' },
  { id: 5, name: '끔찍함', image: process.env.PUBLIC_URL + '/images/emotion5.png' }
];

export const DiaryEditor = () => {
  const navi = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState('');
  const { onCreate }: any = useContext(DiaryDispatchContext);

  const handleEmotionChange = (id: number) => {
    setEmotion(id);
  }

  const handleSubmit = () => {
    console.log(date);
    console.log(content);
    console.log(emotion);

    onCreate(date, content, emotion);
    navi('/');
  }


  return (
    <div>
      <section>
        <h4>오늘은 언제인가요?</h4>
        <DayPickerInput
          value={date}
          format='yyyy/m/dd'
          onDayChange={(day) => setDate(day.toISOString().slice(0, 10))}
        />
      </section>
      <section>
        <h4>오늘의 감정</h4>
        <div className='input_box emotion_list_wrapper'>
          {
            emotionItemList.map((data) => {
              return (
                <EmotionItem
                  key={`emotion_${data.id}`}
                  {...data}
                  onClick={() => handleEmotionChange(data.id)}
                  isSelected={data.id === emotion}
                />
              )
            })
          }
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className="input_box text_wrapper">
          <textarea
            placeholder='오늘은 어땠나요'
            onChange={(e: any) => setContent(e.target.value)}
          />
        </div>
      </section>
      <section>
        <div className='control_box'>
          <Button text='취소하기' type='default' onClick={() => navi(-1)} />
          <Button text='작성완료' type='positive' onClick={handleSubmit} />
        </div>
      </section>
    </div>
  );
}
