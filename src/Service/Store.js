import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducer/Index";

// export default function configureStore {
//     return createStore(
//       rootReducer,
      
//       applyMiddleware(thunk)
//     );
//    }
   const store=createStore(
       rootReducer,
       applyMiddleware(thunk)
   )
   const store1=createStore(rootReducer)
   console.log(store1.getState(),'store1')
   console.log(store.getState(),'store')
   export default store