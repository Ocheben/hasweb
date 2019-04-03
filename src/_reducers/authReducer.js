import { AUTHACTIONS, USERACTIONS } from '../_constants';

const initState = {
    userInfo: {
        phone: '',
    }
}

const { LOGIN,  LOGOUT } = AUTHACTIONS
const {  ASSIGN } = USERACTIONS

const updateObjectInArray=(array, action)=> {
    console.log(action)
    return array.map((item, index) => {
      if (index !== action.index) {
        // This isn't the item we care about - keep it as-is
        return item
      }
  
      // Otherwise, this is the one we want - return an updated value
      else {
      return {
        ...item,
        bikerid:action.bikerid,
        status: action.status,
        assignee: action.assignee

      }
    }
    })
  }

const saveUser = (state = initState, action)=>{
    switch(action.type) {
        case LOGIN: 
        console.log("login")
        return {
            ...state,
            userInfo: {...state.userInfo, ...action.payload},
            shipments: action.payload.shipments,
            bikers: action.payload.bikers 
        }

        case LOGOUT:
            return {
                ...state,
                userInfo:{}
        }

        case ASSIGN:
        console.log("assign") 
        return {
            ...state,
            shipments: updateObjectInArray(state.shipments, action.payload),
            
        }
            

        default: return state
    }
}

export default saveUser
