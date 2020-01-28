import React, {useState, useRef} from 'react';
import OrderHeader from "./order-header";
import OrderThanksDelivery from "./order-thanks-delivery";

const OrderOperations = props=>{
    const {goHome, info, orderState, orderThanks } = props;
    return(
        <>
            {orderState<1&&<OrderHeader info={info} goHome={goHome} orderState={orderState}/>}
            {orderState===1&&<OrderThanksDelivery orderThanks={orderThanks}/>}
        </>
    )
}

export default OrderOperations
