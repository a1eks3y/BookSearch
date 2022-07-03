export interface IBooksState {
    error: string
    isLoading: boolean
    searchQuery?: string
    numberOfBooks?: number
    books: IBook[]
}

export interface IBook {
    uniqueId: string
    id: string
    title: string
    authors: string[]
    categories?: string[]
    description: string
}

export enum IBooksActionType {
    FETCH = 'FETCH',
    FETCH_MORE = 'FETCH_MORE',
    FETCH_SUCCESS = 'FETCH_SUCCESS',
    FETCH_ERROR = 'FETCH_ERROR'
}

interface fetchBooks {
    type: IBooksActionType.FETCH
    payload: string // searchQuery
}

export interface fetchBooksResponseData {
    totalItems: number
    items?: {
        id: string
        etag: string
        volumeInfo: {
            title: string
            authors: string[]
            description: string
            categories: string[]
        }
    }[]
}

interface fetchBooksSuccess {
    type: IBooksActionType.FETCH_SUCCESS
    payload: {
        books: IBook[]
        numberOfBooks: number
    }
}

interface fetchBooksError {
    type: IBooksActionType.FETCH_ERROR
    payload: string //error
}

interface fetchMoreBooks {
    type: IBooksActionType.FETCH_MORE
}

export type IBooksAction = fetchBooks | fetchBooksSuccess | fetchBooksError | fetchMoreBooks