import * as React from 'react'
import s from './BookCard.module.css'

interface Props {
    id: string
    category?: string
    authors?: string[]
    title: string
}

const BookCard: React.FC<Props> = (
    { id, category, title, authors }
) => {
    return (
        <div className={ s.card }>
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