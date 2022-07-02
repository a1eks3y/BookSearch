import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import { booksReducer } from './reducers/booksReducer'

export const store = createStore(
    booksReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch