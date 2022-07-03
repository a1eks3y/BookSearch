import * as React from 'react'
import s from './BooksList.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import BookCard from '../BookCard/BookCard'
import Loader from '../Loader/Loader'
import { useAction } from '../../hooks/useAction'

const BooksList: React.FC = () => {
    const { books, isLoading, error, numberOfBooks } = useTypedSelector(state => state)
    const { fetchMoreBooks } = useAction()
    if ( numberOfBooks === 0 )
        return <div className={ s.list }><span>Nothing found.</span></div>
    return (
        <div className={ s.list }>
            {
                numberOfBooks !== undefined && <span className={ s.number_of_books }>
                    { numberOfBooks === 1 ? `Found ${ numberOfBooks } result` : `Found ${ numberOfBooks } results` }
                </span>
            }
            {
                books.map(el => (
                    <BookCard
                        key={ el.uniqueId }
                        id={ el.id }
                        category={ (el.categories ?? [])[ 0 ] }
                        authors={ el.authors }
                        title={ el.title }
                    />
                ))
            }
            {
                error && <div className={ s.error_wrapper }>
                    <span className={ s.error_text }>
                        { error }
                    </span>
                    <button className={ s.load_more_btn }>Try again</button>
                </div>
            }
            {
                !isLoading && numberOfBooks !== undefined && numberOfBooks > books.length && !error &&
                <div className={ s.btn_wrapper }>
                    <button className={ s.load_more_btn } onClick={ fetchMoreBooks }>
                        Load more
                    </button>
                </div>
            }
            { isLoading && <Loader/> }
        </div>
    )
}

export default BooksList