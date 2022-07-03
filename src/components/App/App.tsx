import React from 'react'
import s from './App.module.css'
import Search from '../Search/Search'
import BooksList from '../BooksList/BooksList'

const App: React.FC = () => {
    return (
        <div className={ s.App }>
            <Search/>
            <BooksList/>
        </div>
    )
}

export default App