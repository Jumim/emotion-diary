import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Header } from '../components';
import { emotionItemList } from '../util';
import { DiaryStateContext } from '../App';

interface diaryItem {
  id: number
  date: any
  content: string
  emotion: number
}

export const Diary = () => {
  const navi = useNavigate();
  const { id }: any = useParams();

  const [ data, setData ] = useState<diaryItem>();
  const list = useContext(DiaryStateContext);

  useEffect(() => {
    if(list.length >= 1) {
      const getData = list.find((el: any) => {
        return parseInt(el.id) === parseInt(id);
      });

      if(getData) {
        setData(getData);
      } else {
        alert('없는 일기입니다.');
        navi('/', { replace: true });
      }
    }
  // eslint-disable-next-line
  }, [id, list]);

  if(!data) {
    return <div className='DiaryPage'>로딩중입니다...</div>
  } else {
    const emotionData: any = emotionItemList.find((el: any) => {
      return el.id === data.emotion;
    });

    return (
      <div className='DiaryPage'>
        <Header
          left={<Button text='뒤로가기' type='default' onClick={() => navi(-1)} />}
          right={<Button text='수정하기' type='default' onClick={() => navi(`/edit/${id}`)} />}
          text={`${data.date} 기록`}
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className={`diary_img_wrapper diary_img_wrapper_${data.emotion}`}>
              <img src={emotionData.image} alt={`emotion_${data.emotion}`}/>
              <div className='emotion_descript'>
                {emotionData.name}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className='diary_content_wrapper'>
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}
