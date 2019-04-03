import{ combineReducers } from 'redux'
import saveUser  from './authReducer'

const reducers ={ 
 saveUser,
}

const rootReducer = combineReducers({
    ...reducers
})

export default rootReducer