import * as React from 'react'
import s from './BookDetails.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { IBook } from '../../types/Books'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const BookDetails: React.FC = () => {
    const params = useParams<{id: string}>()
    const navigate = useNavigate()
    const books = useTypedSelector(state => state.books)
    const book:IBook | undefined = books.find(el => el.uniqueId === params.id)
    useEffect(() => {
        if(!params.id || !book)
            navigate('/', {replace: true})
    }, [book, navigate, params.id])
    return (
        <div className={ s.book_details }>
        </div>
    )
}

export default BookDetails