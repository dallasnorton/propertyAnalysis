export const initialState = {
  activeProperties: {
    property1: {name: 'property1', address: 'agasfda', amount: 0},
    property2: {name: 'property2', address: '2345', amount: 0},
  },
  pastProperties: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'change-address':
      return {
        ...state,
        activeProperties: {
          ...state.activeProperties,
          [action.payload.key]: {
            ...state.activeProperties[action.payload.key],
            address: action.payload.address,
          }
        },
      };
    case 'change-amount':
      return {
        ...state,
        activeProperties: {
          ...state.activeProperties,
          [action.payload.key]: {
            ...state.activeProperties[action.payload.key],
            amount: action.payload.amount,
          }
        },
      };
    default:
      return state;
  }
};
