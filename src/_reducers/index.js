import{ combineReducers } from 'redux'
import saveUser  from './authReducer'
import assign from './usersReducer'

const reducers ={ 
 saveUser,
}

const rootReducer = combineReducers({
    ...reducers
})

export default rootReducer