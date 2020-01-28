import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";



const clientLogger = store => next => action => {
    if(process.env.NODE_ENV !== 'production'&&global.SHOW_STORE_LOG===true){
        console.groupCollapsed("dispatching", action.type)
        console.log('prev state', store.getState())
        console.log('action', action);
        let n = next(action);
        console.log('next state', store.getState())
        console.groupEnd()
        return n;
    }else{
        return next(action);
    }
};

export default applyMiddleware(thunk,clientLogger)(createStore)(reducers,{states:[]});
