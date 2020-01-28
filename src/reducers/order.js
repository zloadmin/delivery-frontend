import C, {getData, Status,url, modify} from "./helper";
import {submit} from "../submiter";
export default (state={}, action) => {
    switch (action.type) {
        case C.ORDER_CREATE:
            return {
                ...action.data
            };
        case C.ORDER_UPDATE:
            return {
                ...state,
                ...action.data
            };
        case C.ORDER_CLOSE:
            return {};
        default :
            return state
    }
}
export const createOrder = data => modify(global.url+'order/create', data, C.ORDER_CREATE,'POST','ORDER');
export const updateOrder = (uuid,data) => modify(global.url+'order/update/'+uuid, data, C.ORDER_UPDATE,'PUT','ORDER');

export const callBill= (order_uuid,table_id) =>(dispatch,state)=>{
    const ID='ORDER';
    submit(global.url+'calls/bill',{order_uuid,table_id},'POST').then(d=>{
        //    dispatch({type:C.ORDER_CLOSE});
            dispatch(Status(ID,'closed'));
        }
    ).catch(err=>{
        console.log(err);
        dispatch(Status(ID,'error',err));
        setTimeout(()=>dispatch(Status(ID,undefined)),5000);
    })
}

export const addFeedback= (uuid,review) =>(dispatch,state)=>{
    const ID='FEEDBACK';
    submit(`${global.url}order/review/${uuid}/add`,{review},'POST').then(d=>{
          //  dispatch({type:C.ORDER_CLOSE});
            dispatch(Status(ID,'completed'));
        }
    ).catch(err=>{
        console.log(err);
        dispatch(Status(ID,'error',err));
        setTimeout(()=>dispatch(Status(ID,undefined)),5000);
    })
}
export const callWaiter= (table_id) =>(dispatch,state)=>{
    const ID='WAITER';
    submit(`${global.url}calls/waiter`,{table_id},'POST').then(d=>{
            dispatch(Status(ID,'completed'));
        }
    ).catch(err=>{
        console.log(err);
        dispatch(Status(ID,'error',err));
        setTimeout(()=>dispatch(Status(ID,undefined)),5000);
    })
}
export  const closeOrder = ()=>({type:C.ORDER_CLOSE});
