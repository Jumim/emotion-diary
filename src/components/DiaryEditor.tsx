import { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { Button, EmotionItem } from '../components';
import { emotionItemList } from '../util';
import { DiaryDispatchContext } from '../App';

export const DiaryEditor = ({originalData, isEdit}: any) => {
  const navi = useNavigate();

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState('');
  const contentRef: any = useRef();

  const { onCreate, onEdit }: any = useContext(DiaryDispatchContext);

  useEffect(() => {
    if(isEdit) {
      setDate(originalData.date);
      setEmotion(originalData.emotion);
      setContent(originalData.content);
    }
  // eslint-disable-next-line
  }, [originalData]);

  const handleEmotionChange = useCallback((id: number) => {
    setEmotion(id);
  }, []);

  const handleSubmit = () => {
    if(content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if(!isEdit) {
      onCreate(date, content, emotion);
    } else {
      onEdit(originalData.id, date, content, emotion);
    }

    navi('/', {replace: true});
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
            ref={contentRef}
            placeholder='오늘은 어땠나요'
            onChange={(e: any) => setContent(e.target.value)}
            defaultValue={content}
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
