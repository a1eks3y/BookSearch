import * as React from 'react'
import s from './Error.module.css'

interface Props {
    onClickFn: () => void
    error: string,
    btn_text: string
}

const Error: React.FC<Props> = ( { error, onClickFn, btn_text } ) => {
    return (
        <div className={ s.wrapper }>
            <span className={ s.text }>{ error }</span>
            <button onClick={ onClickFn } className={ s.btn }>{ btn_text }</button>
        </div>
    )
}

export default Error