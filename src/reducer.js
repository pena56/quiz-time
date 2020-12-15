export const initialState = {
  user: null,
  totalScore: 0,
};

const reducer = function (state, action) {
  switch (action.type) {
    case 'ADD_SCORE':
      return {
        ...state,
        totalScore: state.totalScore + action.gameScore,
      };
    case 'SYNC_SCORE':
      return {
        ...state,
        totalScore: action.score,
      };
    case 'SIGNIN_AS_ANON':
      return {
        ...state,
        user: {
          name: 'Anon',
          profile: null,
        },
      };
    case 'SIGNIN_WITH_GOOGLE':
      return {
        ...state,
        user: {
          id: action.user.uid,
          name: action.user.displayName,
          profile: action.user.photoURL,
        },
      };
    case 'PERSISTED_USER':
      return {
        ...state,
        user: {
          id: action.id,
          name: action.name,
          profile: action.profile,
        },
      };
    default:
      return state;
  }
};

export default reducer;
