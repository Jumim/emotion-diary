//import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useReducer, useRef, createContext, useMemo } from 'react';
import { reducer } from './modules/reducer';
import { Diary, Edit, Home, New } from './pages';
import './App.css';

export const DiaryStateContext = createContext(null);
export const DiaryDispatchContext = createContext(null);

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);
  const newId = useRef(0);

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
        id
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

  const store = {
    data
  };

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
            <Route path='/edit' element={<Edit />} />
            <Route path='/new' element={<New />} />
          </Routes>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
