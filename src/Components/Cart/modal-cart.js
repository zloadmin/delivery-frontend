import React, {Component} from "react";
import Modal from 'react-modal';
import "./modal-cart.scss";

Modal.setAppElement('#root')

export default class ModalCart extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {

        };

    }

    afterOpenModal=()=> {
        this.setState({
            data: this.props.data || {},
            turnValidation:false
        })
    }

    closeModal = () => {
        this.props.closeModal();
    }

    saveAndCloseModal = () => {
            this.props.closeModal(this.state.data);
    }


    onChangeInput = event => {
        const isInteger = (str)=>/^(-)?\d+$/.test(str);

        const {name, value} = event.target;
        const _value = isInteger(value)?parseInt(value):value;
        if (name !== undefined && name.length > 1 && value !== undefined) {
            let data = {
                ...this.state.data,
                [name]: _value,
            };
            this.setState({data});
        }
    }/*
    static getDerivedStateFromProps(props, state) {
        const {data} = props;
        if(state.data===data){
            return null;
        }
        return {data};
    }*/

    render() {
        const {isOpen} = this.props;
        return (
                <Modal
                    isOpen={isOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    shouldCloseOnEsc={true}
                    shouldCloseOnOverlayClick={false}
                    className="Modal"
                    overlayClassName="modal-overlay"
                >
                    <div className="modal fade align-items-center" id="modal-cart">
                        <div className="modal-dialog ticket-box">
                            <a href="#" className="close">
                                <img src="./assets/images/close.svg" alt="Close"/>
                            </a>
                            <div className="ticket-section top-img">
                                <div className="title">
                                    Churrasco
                                </div>
                                <address className="address">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt"
                                         role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                                         className="svg-inline--fa fa-map-marker-alt fa-w-12 fa-2x">
                                        <path fill="currentColor"
                                              d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
                                              className=""></path>
                                    </svg>
                                    856 Esta Underpass
                                </address>
                                <div className="cart-list">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col prod-name">
                                            Sweet rice porridge
                                        </div>
                                        <div className="col-3 prod-price">
                                            <span className="price">47</span> AED
                                        </div>
                                        <div className="col-auto">
                                            <a href="#" className="prod-delete"></a>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col prod-name">
                                            Breakfast for 1 person
                                        </div>
                                        <div className="col-3 prod-price">
                                            <span className="price">40</span> AED
                                        </div>
                                        <div className="col-auto">
                                            <a href="#" className="prod-delete"></a>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col prod-name">
                                            Omelette with vegetable
                                        </div>
                                        <div className="col-3 prod-price">
                                            <span className="price">42</span> AED
                                        </div>
                                        <div className="col-auto">
                                            <a href="#" className="prod-delete"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ticket-section separator">
                                <div className="inner"></div>
                            </div>
                            <form method="post" encType="multipart/form-data" action="#">
                                <div className="ticket-section">
                                    <div className="form-block">
                                        <div className="inputblock mb-3">
                                            <label htmlFor="ct1">Phone number</label>
                                            <input id="ct1" type="tel" name="phone" placeholder="Enter your phone number" required/>
                                        </div>
                                        <div className="inputblock mb-3">
                                            <label htmlFor="ct2">Address</label>
                                            <input id="ct2" type="text" name="text" placeholder="Enter your address" required/>
                                        </div>
                                        <div className="inputblock mb-3">
                                            <label htmlFor="ct33">Add your note</label>
                                            <textarea id="ct33" name="note" placeholder="Enter your note"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="ticket-section separator">
                                    <div className="inner"></div>
                                </div>
                                <div className="ticket-section total">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col total-txt">
                                            TOTAL
                                        </div>
                                        <div className="col-auto total-num">
                                            <span className="total-price">80</span> AED
                                        </div>
                                    </div>
                                </div>
                                <div className="ticket-section controls">
                                    <button type="button" className="cl-btn c-orange">Checkout</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
        );
    }
}
