import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, Button, DiaryEditor } from '../components';
import { DiaryStateContext, DiaryDispatchContext } from '../App';

export const Edit = () => {
  const navi = useNavigate();
  const { id }: any = useParams();

  const [ data, setData ] = useState();
  const list = useContext(DiaryStateContext);

  const { onRemove }: any = useContext(DiaryDispatchContext);

  useEffect(() => {
    if(list.length >= 1) {
      const getData = list.find((el: any) => {
        return parseInt(el.id) === parseInt(id);
      });

      if(getData) {
        setData(getData);
      } else {
        navi('/', { replace: true });
      }
    }
  }, [id, list]);

  const onDelete = () => {
    onRemove(id);
    navi('/', {replace: true});
  }

  return (
    <div className='DiaryEditor'>
      <Header
        left={<Button text={'◀ 뒤로가기'} type='default' onClick={() => navi(-1)} />}
        right={<Button text={'삭제하기'} type='negative' onClick={onDelete} />}
        text={'일기 수정하기'}
      />
      { data && <DiaryEditor originalData={data} isEdit={true} /> }
    </div>
  );
}
