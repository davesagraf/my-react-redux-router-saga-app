import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '../sagas'
import { rootReducer } from '../reducers/rootReducer'

const sagaMiddleware = createSagaMiddleware()


const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)

export default store;