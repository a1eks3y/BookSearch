import * as React from 'react'
import s from './BookCard.module.css'
import { useNavigate } from 'react-router-dom'

interface Props {
    uniqueId: string
    id: string
    category?: string
    authors?: string[]
    title: string
}

const BookCard: React.FC<Props> = (
    { uniqueId, id, category, title, authors }
) => {
    const navigate = useNavigate()
    return (
        <div className={ s.card } onClick={ () => navigate(`/book/${ uniqueId }`) }>
            <img
                className={ s.front_cover }
                src={ `https://books.google.com/books/content?id=${ id }&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api` }
                alt={ 'front cover' }
            />
            <div className={ s.card_info }>
                {
                    category && <span className={ s.category }>
                        { category }
                    </span>
                }
                <span className={ s.title }>
                    <strong>{ title }</strong>
                </span>
                <span className={ s.authors }>
                    { (authors ?? []).join(', ') }
                </span>
            </div>
        </div>
    )
}

export default BookCard