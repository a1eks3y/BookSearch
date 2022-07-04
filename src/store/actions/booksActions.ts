import {
    fetchBookItemResponseData,
    fetchBooksResponseData,
    IBook,
    IBooksAction,
    IBooksActionType,
    IBooksState
} from '../../types/Books'
import axios from 'axios'
import { ThunkAction } from 'redux-thunk'

export const fetchOneBook = ( id: string ): ThunkAction<void, IBooksState, unknown, IBooksAction> => {
    return async ( dispatch ) => {
        try {
            dispatch(fetchOneBookActionCreator())
            const key = 'key=AIzaSyDCPbRq3w9fPf5N1FqDtJB1XiksjhClw6k'
            const url = `https://www.googleapis.com/books/v1/volumes/${ id }?${ key }`
            const res = await axios.get<fetchBookItemResponseData>(url)
            const data = res.data
            const book: IBook = {
                uniqueId : data.etag,
                id : data.id,
                authors : data.volumeInfo.authors,
                title : data.volumeInfo.title,
                description : data.volumeInfo.description,
                categories : data.volumeInfo.categories
            }
            dispatch(fetchSuccessActionCreator([book]))
        } catch (e: any) {
            dispatch(fetchErrorActionCreator(
                e.response?.data?.error?.message || e.response?.message || e.message
            ))
        }
    }
}

export const fetchBooks = ( searchQuery: string ): ThunkAction<void, IBooksState, unknown, IBooksAction> => {
    return async ( dispatch ) => {
        try {
            dispatch(fetchBooksActionCreator(searchQuery))
            const key = 'key=AIzaSyDCPbRq3w9fPf5N1FqDtJB1XiksjhClw6k'
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
            dispatch(fetchErrorActionCreator(
                e.response?.data?.error?.message || e.response?.message || e.message
            ))
        }
    }
}

export const fetchMoreBooks = (): ThunkAction<void, IBooksState, unknown, IBooksAction> => {
    return async ( dispatch, getState ) => {
        try {
            const state = getState()
            const books = state.books
            dispatch(fetchMoreBooksActionCreator())
            const searchQuery = state.searchQuery
            const key = 'key=AIzaSyDCPbRq3w9fPf5N1FqDtJB1XiksjhClw6k'
            const startIndex = 'startIndex=' + books.length
            const maxResult = 'maxResults=' + 40
            const url = `https://www.googleapis.com/books/v1/volumes?` +
                `${ searchQuery }&${ startIndex }&${ maxResult }&${ key }`

            const res = await axios.get<fetchBooksResponseData>(url)
            let newBooks: IBook[] = [
                ...(res.data.items ?? []).slice(0, 30).map(( { id, volumeInfo, etag } ) => ({
                    uniqueId : etag,
                    id,
                    authors : volumeInfo.authors,
                    title : volumeInfo.title,
                    description : volumeInfo.description,
                    categories : volumeInfo.categories
                }))
            ]
            let numberOfBooks = res.data.totalItems
            while ( newBooks.length < 30 ) { //if not enough books are found
                const startIndex = 'startIndex=' + (books.length + newBooks.length)
                const maxResult = 'maxResults=' + (30 - newBooks.length)
                const url = `https://www.googleapis.com/books/v1/volumes?` +
                    `${ searchQuery }&${ startIndex }&${ maxResult }&${ key }`
                const res = await axios.get<fetchBooksResponseData>(url)
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
            dispatch(fetchErrorActionCreator(
                e.response?.data?.error?.message || e.response?.message || e.message))
        }
    }
}

export const fetchMoreBooksActionCreator = (): IBooksAction => ({
    type : IBooksActionType.FETCH_MORE
})

export const fetchOneBookActionCreator = (): IBooksAction => ({
    type : IBooksActionType.FETCH_MORE
})

export const fetchBooksActionCreator = ( searchQuery: string ): IBooksAction => ({
    type : IBooksActionType.FETCH,
    payload : searchQuery
})

export const fetchSuccessActionCreator = ( books: IBook[], numberOfBooks?: number ): IBooksAction => ({
    type : IBooksActionType.FETCH_SUCCESS,
    payload : { books, numberOfBooks }
})

export const fetchErrorActionCreator = ( error: string ): IBooksAction => ({
    type : IBooksActionType.FETCH_ERROR,
    payload : error
})