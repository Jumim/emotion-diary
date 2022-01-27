import { useNavigate } from 'react-router-dom';
import { Header, Button, DiaryEditor } from '../components';

export const New = () => {
  const navi = useNavigate();

  return (
    <div className='DiaryEditor'>
      <Header
        left={<Button text={'◀ 뒤로가기'} type='default' onClick={() => navi(-1)} />}
        text={'새 일기 쓰기'}
      />
      <DiaryEditor />
    </div>
  );
}
