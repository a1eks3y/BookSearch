import { fetchBooksResponseData, IBook, IBooksAction, IBooksActionType, IBooksState } from '../../types/Books'
import axios from 'axios'
import { ThunkAction } from 'redux-thunk'

export const fetchBooks = ( searchQuery: string ): ThunkAction<void, IBooksState, unknown, IBooksAction> => {
    return async ( dispatch ) => {
        try {
            dispatch(fetchBooksActionCreator(searchQuery))
            const key = 'key=AIzaSyC1USBJdOR0oJgkkIyWcqQ7dEqYW8DF7Mk'
            const url = `https://www.googleapis.com/books/v1/volumes?${ searchQuery }&maxResults=30&${ key }`
            const res = await axios.get<fetchBooksResponseData>(url)
            const books: IBook[] = (res.data.items ?? []).map(( { id, volumeInfo, etag } ) => ({
                uniqueId : etag,
                id,
                authors : volumeInfo.authors,
                title : volumeInfo.title,
                description : volumeInfo.description,
                categories : volumeInfo.categories
            }))
            dispatch(fetchSuccessActionCreator(books, res.data.totalItems))
        } catch (e: any) {
            dispatch(fetchErrorActionCreator(e.response?.message || e.message))
        }
    }
}

export const fetchMoreBooks = (): ThunkAction<void, IBooksState, unknown, IBooksAction> => {
    return async ( dispatch, getState ) => {
        try {
            const state = getState()
            const books = state.books
            dispatch(fetchMoreActionCreator())
            const searchQuery = state.searchQuery
            const key = 'key=AIzaSyC1USBJdOR0oJgkkIyWcqQ7dEqYW8DF7Mk'
            let newBooks: IBook[] = []
            let numberOfBooks = 0
            while ( newBooks.length < 30 ) {
                const startIndex = 'startIndex=' + (books.length + newBooks.length)
                const maxResult = 'maxResults=' + (30 - newBooks.length)
                const url = `https://www.googleapis.com/books/v1/volumes?` +
                    `${ searchQuery }&${ startIndex }&${maxResult}&${ key }`
                const res = await axios.get<fetchBooksResponseData>(url)
                if ( !numberOfBooks )
                    numberOfBooks = res.data.totalItems
                newBooks = [
                    ...newBooks,
                    ...(res.data.items ?? []).map(( { id, volumeInfo, etag } ) => ({
                        uniqueId : etag,
                        id,
                        authors : volumeInfo.authors,
                        title : volumeInfo.title,
                        description : volumeInfo.description,
                        categories : volumeInfo.categories
                    }))
                ]
            }
            dispatch(fetchSuccessActionCreator([...books, ...newBooks], numberOfBooks))
        } catch (e: any) {
            dispatch(fetchErrorActionCreator(e.response?.message || e.message))
        }
    }
}

export const fetchMoreActionCreator = (): IBooksAction => ({
    type : IBooksActionType.FETCH_MORE
})

export const fetchBooksActionCreator = ( searchQuery: string ): IBooksAction => ({
    type : IBooksActionType.FETCH,
    payload : searchQuery
})

export const fetchSuccessActionCreator = ( books: IBook[], numberOfBooks: number ): IBooksAction => ({
    type : IBooksActionType.FETCH_SUCCESS,
    payload : { books, numberOfBooks }
})

export const fetchErrorActionCreator = ( error: string ): IBooksAction => ({
    type : IBooksActionType.FETCH_ERROR,
    payload : error
})