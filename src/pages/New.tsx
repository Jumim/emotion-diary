import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { Header, Button } from '../components';
import { DiaryDispatchContext } from '../App';

interface stateType {
  date: any
  content: string
  emotion: number
}

export const New = () => {
  const navi = useNavigate();
  const { onCreate }: any = useContext(DiaryDispatchContext);

  const [state, setState] = useState({
    date: new Date().getTime(),
    content: '',
    emotion: 1
  });

  const handleChangeState = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (state: stateType) => {
    console.log(state);

    //onCreate(state);
  }


  return (
    <div>
      <Header
        left={<Button text={'◀ 뒤로가기'} type='default' onClick={() => navi(-1)} />}
        text={'새 일기 쓰기'}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <DayPickerInput placeholder='' format='yyyy/mm/dd' />
        </section>
        <section>
          <h4>오늘의 감정</h4>
        </section>
        <section>
          <h4>오늘의 일기</h4>
        </section>
        <section>
          <div className='control_box'>
            <Button text='취소하기' type='default' onClick={() => navi(-1)} />
            <Button text='작성완료' type='positive' onClick={() => handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
}
