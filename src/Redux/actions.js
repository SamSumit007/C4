// action types

// Action Creators
export const ADD_ORDER = "ADD_ORDER"
 export const addOrder = (data) => {
    return {
        type: ADD_ORDER,
         payload:data
    }
}