import * as React from 'react'
import s from './Search.module.css'
import spritesSvg from '../../images/sprites.svg'
import { useEffect, useRef, useState } from 'react'
import { useAction } from '../../hooks/useAction'
import { NavLink, useLocation } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const Search: React.FC = () => {
    const location = useLocation()
    const { books, isLoading } = useTypedSelector(state => state)
    const [searchText, setSearchText] = useState<string>('')
    const [searchCategory, setSearchCategory] = useState<string>('all')
    const [searchSortBy, setSearchSortBy] = useState<string>('relevance')
    const { fetchBooks } = useAction()
    const searchBooks = ( searchCategory: string, searchSortBy: string ) => {
        const searchCategoryInUrl = searchCategory !== 'all' ? '+subject:' + searchCategory : ''
        fetchBooks(`q=${ searchText || '""' }${ searchCategoryInUrl }&orderBy=${ searchSortBy }`)
    }
    const booksLength = useRef<number>(books.length)
    booksLength.current = books.length
    useEffect(() => {
        if ( !location.pathname.split('/')[ 2 ] && booksLength.current <= 1 && !isLoading)
            fetchBooks('q=""') //get books on first reload of homepage
    }, [fetchBooks, location, isLoading])
    return (
        <div className={ s.search }>
            <h1 className={ s.search_title }>Search for books</h1>
            <label className={ s.search_input_wrapper }>
                <input
                    type="text"
                    className={ s.search_input }
                    value={ searchText }
                    onChange={ e => setSearchText(e.target.value) }
                    onKeyPress={ e => {
                        if ( e.key === 'Enter' )
                            searchBooks(searchCategory, searchSortBy)
                    } }
                />
                <NavLink
                    to="/"
                    className={ s.search_btn }
                    onClick={ () => searchBooks(searchCategory, searchSortBy) }
                >
                    <svg>
                        <use xlinkHref={ spritesSvg + '#search' }/>
                    </svg>
                </NavLink>
            </label>
            <div className={ s.search_query }>
                <label className={ s.search_query_item }>
                    Categories
                    <select
                        className={ s.search_select }
                        value={ searchCategory }
                        onChange={ e => {
                            setSearchCategory(e.target.value)
                            searchBooks(e.target.value, searchSortBy)
                        } }
                    >
                        <option value={ 'all' }>all</option>
                        <option value={ 'art' }>art</option>
                        <option value={ 'biography' }>biography</option>
                        <option value={ 'computers' }>computers</option>
                        <option value={ 'history' }>history</option>
                        <option value={ 'medical' }>medical</option>
                        <option value={ 'poetry' }>poetry</option>
                    </select>
                </label>
                <label className={ s.search_query_item }>
                    Sorting by
                    <select
                        className={ s.search_select }
                        value={ searchSortBy }
                        onChange={ e => {
                            setSearchSortBy(e.target.value)
                            searchBooks(searchCategory, e.target.value)
                        } }
                    >
                        <option value={ 'relevance' }>relevance</option>
                        <option value={ 'newest' }>newest</option>
                    </select>
                </label>
            </div>
        </div>
    )
}

export default Search