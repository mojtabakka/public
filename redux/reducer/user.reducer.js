const initialState = {
  permissions: [],
  user: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "hello":
      return { ...state, user: { ...state.user, avatarId: action.data } };
    default:
      return state;
  }
};

export default UserReducer;
