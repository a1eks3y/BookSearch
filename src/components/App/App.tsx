import React from 'react'
import s from './App.module.css'
import Search from '../Search/Search'

const App: React.FC = () => {
    return (
        <div className={ s.App }>
            <Search/>
        </div>
    )
}

export default App