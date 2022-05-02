import { ADD_ORDER } from "./actions";

const init = {};

export const reducer = (store = init, { type, payload }) => {
  switch (type) {
    case ADD_ORDER: 
    return {...store, order: payload}

    default:
      return store;
  }
};
