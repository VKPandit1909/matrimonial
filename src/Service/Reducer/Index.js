import { combineReducers } from "redux";
import  Userreducer  from "./Reducer";
const rootReducer=combineReducers({
    user: Userreducer
})
export default rootReducer