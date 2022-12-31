const initialState = {
  permissions: [],
  user: {},
  fastAuthentication: {
    isRequired: null,
    pendingTime: 0,
    rejectedTime: 0,
    status: null,
  },
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
