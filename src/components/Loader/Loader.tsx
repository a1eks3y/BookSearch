import * as React from 'react'
import s from './Loader.module.css'

const Loader: React.FC = () => {
    return (
        <div className={ s.loader_wrapper }>
            <div className={ s.loader }>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )
}

export default Loader