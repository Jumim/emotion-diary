import { Button } from '../components/Button';
import { Header } from '../components/Header';

export const Diary = () => {
  return (
    <div>
      <Header
        left={<Button text='뒤로가기' type='default' onClick={() => console.log('뒤로가기')} />}
        right={<Button text='수정하기' type='default' onClick={() => console.log('수정하기')} />}
        text={'날짜'}
      />
    </div>
  );
}
