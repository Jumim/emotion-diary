import { useState, useContext, useEffect } from 'react';
import { DiaryStateContext } from '../App';
import { Header, Button, DiaryList } from '../components';

export const Home = () => {
  const list = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [day, setDay] = useState(new Date());
  const header_text = `${day.getFullYear()}년 ${day.getMonth()+1}월`;

  useEffect(() => {
    if (list.length >= 1) {
      const firstDay = new Date(day.getFullYear(), day.getMonth(), 1).getTime();
      const lastDay = new Date(day.getFullYear(), day.getMonth()+1, 0, 23, 59, 59).getTime();

      setData(
        list.filter((el: any) => Date.parse(el.date) >= firstDay && Date.parse(el.date) <= lastDay)
      );
    }
  }, [list, day]);

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
      { data && <DiaryList list={data} /> }
    </div>
  );
}
