import React from 'react'
import s from './App.module.css'
import Search from '../Search/Search'
import BooksList from '../BooksList/BooksList'
import { Routes, Route, Navigate } from 'react-router-dom'
import BookDetails from '../BookDetails/BookDetails'

const App: React.FC = () => {
    return (
        <div className={ s.App }>
            <Search/>
            <Routes>
                <Route path="/" element={ <BooksList/> }/>
                <Route path="/book/:id" element={ <BookDetails/> }/>
                <Route path="*" element={ <Navigate to={ '/' }/> }/>
            </Routes>
        </div>
    )
}

export default App