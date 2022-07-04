import * as React from 'react'
import s from './BookDetails.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useLayoutEffect } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useAction } from '../../hooks/useAction'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'
import spritesSvg from '../../images/sprites.svg'

const BookDetails: React.FC = () => {
    const { fetchOneBook } = useAction()
    const params = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { isLoading, error } = useTypedSelector(state => state)
    const book = useTypedSelector(state => state.books)
        .find(el => el.id === params.id)

    useLayoutEffect(() => {
        if ( params.id && !book )
            fetchOneBook(params.id) //if the book is not found in the state, search the Google Books API
    }, [fetchOneBook, params.id, book])

    useEffect(() => {
        if ( !params.id )
            navigate('/')
    }, [navigate, params.id])

    if ( error )
        return <Error
            onClickFn={ () => navigate('/') }
            error={ error }
            btn_text={ 'Return to home page' }
        />

    if ( isLoading || !book )
        return <div className={ s.loader_wrapper }><Loader/></div>

    const imgLink = `https://books.google.com/books/content?id=${ book?.id }` +
        `&printsec=frontcover&img=1&zoom=3&edge=curl&source=gbs_api`
    return (
        <div className={ s.book_details }>
            <div className={ s.img_wrapper }>
                <img
                    className={ s.img }
                    src={ imgLink }
                    alt={ 'front cover' }
                />
            </div>
            <div className={ s.details }>
                <span className={ s.categories }>{ book.categories?.join(', ') }</span>
                <h2>{ book.title }</h2>
                <span className={ s.authors }>{ book.authors?.join(', ') }</span>
                {
                    book.description && <div className={ s.description }>
                        { book.description }
                    </div>
                }
            </div>
            <button
                className={ s.go_back_btn }
                onClick={ () => navigate('/') }
            >
                <svg className={ s.go_back_svg }>
                    <use xlinkHref={ spritesSvg + '#arrowGoBack' }/>
                </svg>
            </button>
        </div>
    )
}

export default BookDetails