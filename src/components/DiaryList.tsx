import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { DiaryItem } from './DiaryItem';

interface optionType {
  value: string
  name: string
}

const sortList: optionType[] = [
  { value: 'lastest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' }
]

const filterList: optionType[] = [
  { value: 'all', name: '전부' },
  { value: 'good', name: '좋은 감정만' },
  { value: 'bad', name: '안좋은 감정만' }
]

const Menu = ({ value, onChange, optionList }: any) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className='ControlMenu'>
      {optionList.map((data: optionType, index: number) =>
        <option key={`value_${index}`} value={data.value}>{data.name}</option>
      )}
    </select>
  );
}

export const DiaryList = ({ list }: any) => {
  const navi = useNavigate();

  const [sortType, setSortType] = useState('lastest');
  const [filterType, setFilterType] = useState('all');

  const getDiaryList = () => {
    const filterCallBack = (item: any) => {
      if (filterType === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    }

    const compare = (a: any, b: any) => {
      const a_date: any = new Date(a);
      const b_date: any = new Date(b);

      if (sortType === 'lastest') {
        return (b_date) - parseInt(a_date);
      } else {
        return parseInt(a_date) - parseInt(b_date);
      }
    }

    const diaryList = JSON.parse(JSON.stringify(list));
    const fillteredList = (filterType === 'all') ? diaryList : diaryList.filter((el: any) => filterCallBack(el));
    const sortedList = fillteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className='DiaryList'>
      <div className='menu_wrapper'>
        <div className='left_col'>
          <Menu
            value={sortType}
            onChange={setSortType}
            optionList={sortList}
          />
          <Menu
            value={filterType}
            onChange={setFilterType}
            optionList={filterList}
          />
        </div>
        <div className='right_col'>
          <Button
            text='새 일기 쓰기'
            type='positive'
            onClick={() => navi('/new')}
          />
        </div>
      </div>
      {
        getDiaryList().map((data: any) => (
          <DiaryItem key={`diaryItem_${data.id}`} {...data} />
        ))
      }
    </div>
  );
}

DiaryList.defaultProps = {
  list: []
};
