import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchBooks, fetchMoreBooks } from '../store/actions/booksActions'

export const useAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators({
        fetchBooks,
        fetchMoreBooks
    }, dispatch)
}