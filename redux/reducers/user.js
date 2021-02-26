const initialState = {
    currentuser: null
}

export const user = (state = initialState, action) => {
    return {
        ...state,
        currentuser: action.currenrUser
    }
}