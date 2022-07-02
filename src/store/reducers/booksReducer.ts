import { IBooksAction, IBooksActionType, IBooksState } from '../../types/Books'

const initialState: IBooksState = {
    error : '',
    isLoading : false,
    books : []
}

export const booksReducer = ( state: IBooksState = initialState, action: IBooksAction ): IBooksState => {
    switch ( action.type ) {
        case IBooksActionType.FETCH: {
            return {
                books : [],
                error : '',
                isLoading : true,
                searchQuery : action.payload
            }
        }
        case IBooksActionType.FETCH_MORE:
            return {
                ...state,
                error : '',
                isLoading : true
            }
        case IBooksActionType.FETCH_ERROR: {
            return {
                ...state,
                error : action.payload,
                isLoading : false
            }
        }
        case IBooksActionType.FETCH_SUCCESS: {
            return {
                ...state,
                isLoading : false,
                books : action.payload.books,
                numberOfBooks : action.payload.numberOfBooks
            }
        }
        default:
            return state
    }
}