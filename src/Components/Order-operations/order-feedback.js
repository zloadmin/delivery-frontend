import React,{createRef} from 'react';

const OrderFeedback = props=>{
    const {orderFeedback, total} = props;
    const ref = createRef();
    return(
        <main className="bill-section">
            <div className="container">
                <div className="ticket-box">
                    <div className="ticket-section top-img">
                        <h4>Order summary</h4>
                    </div>
                    <div className="ticket-section total">
                        <div className="row no-gutters align-items-center">
                            <div className="col total-txt">
                                TOTAL
                            </div>
                            <div className="col-auto total-num">
                                <span className="total-price">{total||0}</span> AED
                            </div>
                        </div>
                    </div>
                    <div className="ticket-section separator">
                        <div className="inner"></div>
                    </div>
                    <form method="post" encType="multipart/form-data" action="#" ref={ref}>
                        <div className="ticket-section">
                            <div className="form-block">
                                <div className="inputblock mb-3">
                                    <h4 htmlFor="ct3">Your feedback</h4>
                                    <textarea id="ct3" name="note" placeholder="Enter your note"
                                              className="s-xl"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="ticket-section separator">
                            <div className="inner"></div>
                        </div>

                        <div className="ticket-section controls">
                            <button onClick={e=>orderFeedback(ref.current.note.value)} type="button" className="cl-btn c-orange">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
export default OrderFeedback;
