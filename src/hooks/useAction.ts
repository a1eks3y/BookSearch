import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchBooks, fetchMoreBooks, fetchOneBook } from '../store/actions/booksActions'
import { useMemo } from 'react'

export const useAction = () => {
    const dispatch = useDispatch()
    return useMemo(() => bindActionCreators({
        fetchOneBook,
        fetchBooks,
        fetchMoreBooks
    }, dispatch), [dispatch])
}