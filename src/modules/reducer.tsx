interface actionType {
  type: string
  data: any
}

// state 가장 최근 data값
// 배열 return
export const reducer = (state: any, action: actionType): any => {
  let newState = [];

  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState =  [
        action.data,
        ...state
      ];

      break;
    }
    case 'REMOVE': {
      newState = state.filter((el: any) => parseInt(el.id) !== parseInt(action.data.id));
      break;
    }
    case 'EDIT': {
      newState = state.map(
        (el: any) => el.id === action.data.id ?
          {
            ...action.data
          }
          : el
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
}
