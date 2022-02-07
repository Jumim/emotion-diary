//import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useReducer, useRef, createContext, useMemo, useEffect } from 'react';
import { reducer } from './modules/reducer';
import { Diary, Edit, Home, New } from './pages';
import './App.css';

export const DiaryStateContext = createContext([]);
export const DiaryDispatchContext = createContext(null);

const compare = (a: any, b: any) => {
  const a_date: any = new Date(a.date).getTime();
  const b_date: any = new Date(b.date).getTime();

  return b_date > a_date ? 1 : -1;
}

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);
  const newId = useRef(0);

  useEffect(() => {
    const localData = localStorage.getItem('diary');

    if(localData) {
      const diaryList = JSON.parse(localData).sort(compare);
      newId.current = parseInt(diaryList[0].id) + 1;

      dispatch({
        type: 'INIT',
        data: diaryList
      });
    }
  }, []);

  // 일기 생성
  const onCreate = (date: any, content: string, emotion: string) => {
    console.log('일기 생성');

    dispatch({
      type: 'CREATE',
      data: {
        id: newId.current,
        date,
        content,
        emotion
      }
    });

    newId.current += 1;
  }

  // 일기 삭제
  const onRemove = (id: number) => {
    console.log('일기 삭제');

    dispatch({
      type: 'REMOVE',
      data: {
        id: id
      }
    });
  }

  // 일기 수정
  const onEdit = (id: number, date: any, content: string, emotion: string) => {
    console.log('일기 수정');

    dispatch({
      type: 'EDIT',
      data: {
        id: id,
        date,
        content,
        emotion
      }
    });
  }

  const memoizedDispatch: any = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatch} >
        <div className="App">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/diary/:id' element={<Diary />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/new' element={<New />} />
          </Routes>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
