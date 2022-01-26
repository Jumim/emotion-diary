import { useState } from 'react';
import { Header, Button, DiaryList } from '../components';

export const Home = () => {
  const [day, setDay] = useState(new Date());
  const header_text = `${day.getFullYear()}년 ${day.getMonth()+1}월`;

  // 저번달
  const prevMonth = () => {
    setDay(
      new Date(day.getFullYear(), day.getMonth()-1, day.getDay())
    );
  }

  // 다음달
  const nextMonth = () => {
    setDay(
      new Date(day.getFullYear(), day.getMonth()+1, day.getDay())
    );
  }

  return (
    <div>
      <Header
        left={<Button text={'◀'} type='default' onClick={() => prevMonth()} />}
        right={<Button text={'▶'} type='default' onClick={() => nextMonth()} />}
        text={header_text}
      />
      <DiaryList list={[]} />
    </div>
  );
}
