import { AUTHACTIONS, USERACTIONS } from '../_constants';

const initState = {
    userInfo: {
        phone: '',
    }
}

const { LOGIN,  LOGOUT } = AUTHACTIONS
const {  ASSIGN, PICKUP, DELIVER } = USERACTIONS

const assignObjectInArray=(array, action)=> {
    return array.map((item, index) => {
      if (index !== action.index) {
        return item
      }
  
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

const pickupObjectInArray=(array, action)=> {
    return array.map((item, index) => {
      if (index !== action.index) {
        return item
      }
  
      else {
      return {
        ...item,
        pickupDate: action.date,
        pickupTime: action.time,
        status: action.status

      }
    }
    })
  }

const deliverObjectInArray=(array, action)=> {
    return array.map((item, index) => {
      if (index !== action.index) {
        return item
      }
  
      else {
      return {
        ...item,
        deliverDate: action.date,
        deliverTime: action.time,
        status: action.status

      }
    }
    })
  }

const saveUser = (state = initState, action)=>{
    switch(action.type) {
        case LOGIN: 
        return {
            ...state,
            userInfo: {...state.userInfo, ...action.payload},
            shipments: action.payload.shipments,
            bikers: action.payload.bikers ? action.payload.bikers : [],
            dashStatus: action.payload.dashStatus ? action.payload.dashStatus : {}
        }

        case LOGOUT:
            return {
                ...state,
                userInfo:{}
        }

        case ASSIGN:
        return {
            ...state,
            shipments: assignObjectInArray(state.shipments, action.payload),
            
        }

        case PICKUP:
        return {
            ...state,
            shipments: pickupObjectInArray(state.shipments, action.payload),
            
        }
        case DELIVER:
        return {
            ...state,
            shipments: deliverObjectInArray(state.shipments, action.payload),
            
        }
            

        default: return state
    }
}

export default saveUser
