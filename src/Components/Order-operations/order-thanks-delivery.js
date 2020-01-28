import React from 'react';

const OrderThanksDelivery = props=>{
    const {orderThanks} = props;
    return(
        <main className="thanks-section">
            <div className="container">
                <div className="thanks-box">
                    <div className="img">
                        <img src="./assets/images/ic_check.svg" alt="Check"/>
                    </div>
                    <div className="title">
                        Your order is successfully.
                    </div>
                    <div className="sub-title">
                        Please, wait ours delivery guy
                    </div>
                    <div className="controls">
                        <button onClick={e=>orderThanks()} className=" cl-btn c-orange">Continue Shopping</button>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default OrderThanksDelivery;
