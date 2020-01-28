import React, {useState, useRef, useEffect} from 'react';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import {connect} from "react-redux";
import CartForTable from "../../Components/cart-for-table";
import MenuNavigator from "../../Components/Menu-navigator";
import OrderOperations from "../../Components/Order-operations";
import {addFeedback, callBill, callWaiter, closeOrder, createOrder, updateOrder} from "../../reducers/order";
import Header from "./header";
import Products from "../../Components/Products";
import MessageBlock from "./MessageBox";
import CartForDelivery from "../../Components/cart-for-delivery";

/*const scrollTo = el=>{
    scroller.scrollTo(el, {
        duration: 1500,
        delay: 100,
        //smooth: true,
        smooth: "easeInOutQuint",
        spy:true,
        hashSpy:true,
        offset: -10, // Scrolls to element + 50 pixels down the page
    })
}*/

const CartBlock = props =>{
    const {total} = props.cart;
    return(
        <div className={`cart-block ${total>0?'active':''}`}>
            <div className="row w-100 no-gutters align-items">
                <div className="col-auto txt">
                    Total: AED <span className="total">{total}</span>
                </div>
                <div className="col-auto ml-auto">
                    <button onClick={e=>props.openModalCart()} className="cl-btn s-x c-orange">View Cart</button>
                </div>
            </div>
        </div>
    )
}


class MenuPage extends React.Component{
    constructor() {
        super();
        this.state={
            tile:true,
            tiles:{},
            cart:{products:{},total:0},
            modalCartForTableIsOpen: false,
            orderMenu:false,
            orderState:0,
            orderClosed:true,
            messageText:undefined,
            table_id:global.table||14,

        }
        this.sectionsWrapperRef = React.createRef();
        //const sectionsWrapperRef = useRef();
    }
    resetState = ()=>{
        let data =  {
            cart:{products:{},total:0},
            orderMenu:false,
            orderState:0,
            orderClosed:true,
        }
        this.setState(data);
    }
    tileSwitcher = (tile,id=undefined)=>{
        if(id){

            let tiles = {...this.state.tiles};
            let old_state=tiles[id]||tile;
            tiles[id]=!old_state;
            this.setState({tiles});
        }else{
            this.setState({tile});
        }

    }
    plusMinus = (id,a,price,name) =>{
        const {products, total} = this.state.cart;
        if(!products[id]){
            products[id]={
                id,
                count:0,
                price,
                currency:'AED',
                name,

            }
        }
        const cart = {products,total}
        let quantity = products[id].count + a;
        cart.total +=quantity>-1?a*price:0;
        cart.products[id].count = quantity>-1?quantity:0;
        //delete position
        if(a===0){
            cart.total-=cart.products[id].count*cart.products[id].price;
            cart.products[id].count=0;
        }
        this.setState({cart});
    }

    openModalCart = ()=>{
        if(this.state.orderClosed===true){
            this.props.CloseOrder();
        }
        this.setState({modalCartForTableIsOpen:true,orderClosed:false});
    }

    closeModalCart = (save=false, data={})=>{
        const {address, phone, note} = data;
        if(!phone){
            this.showMessage('Please provide correct phone',1500);
            return
        }
        if(!address){
            this.showMessage('Please provide correct address',1500);
            return
        }

        this.setState({modalCartForTableIsOpen:false});
        if(save===true){
            this.setState({orderMenu:true,orderState:1});
            const {cart} = this.state;
            let products = Object.values(cart.products).map(({id,count:quantity})=>({product_id:parseInt(id),quantity})).filter(f=>f.quantity>0);
            this.props.CreateOrder(products,address,phone,note)
        }
    }

    callWaitress = () =>{
        this.showMessage('Call has been sent');
        if(this.state.table_id){
            this.props.CallWaiter(this.state.table_id);
        }
    }

    goHome = ()=>{
        let res =  {orderMenu:false};
        if(this.state.orderState>1){
            res.orderState=0;
            res.cart = {products:{},total:0};
        }
        this.setState(res);
    }
    billRequest = () =>{
        this.setState({orderState:2,orderClosed:true});
        this.showMessage('Request has been sent');
        if(this.props.order.uuid){
            this.props.CallBill(this.props.order.uuid,this.props.order.table_id)
        }
    }

    orderFeedback = (feedback=undefined) =>{
        if(feedback&&this.props.order.uuid){
            console.log(feedback);
            this.props.AddFeedback(this.props.order.uuid,feedback)
        }
        this.setState({orderState:3});
    }
    orderThanks = () =>{
        this.setState({orderState:0,cart:{products:{},total:0},orderMenu:false,});
    }
    showMessage = (messageText,timeout=3000) => {
        this.setState({messageText});
        setTimeout(()=>this.setState({messageText:undefined}),timeout);
    }
    componentDidMount(){
        Events.scrollEvent.register('begin', function(to, element) {
            console.log("begin", to);
        });

        Events.scrollEvent.register('end', function(to, element) {
            console.log("end", to);
        });
        scrollSpy.update();
        scrollSpy.addStateHandler(activeItem=>{
            console.log(activeItem);
        })
        const {match} = this.props;
        let category = match.params.category||0;
        setTimeout(()=>{
            scroller.scrollTo(`#${category}`, {
                duration: 1500,
                delay: 100,
                //smooth: true,
                smooth: "easeInOutQuint",
                offset: -10, // Scrolls to element + 50 pixels down the page
            })
        },300)
        // window.addEventListener("scroll", checkScroll);
    }

    render(){
        const {match, products, categories, info, tables} = this.props;
        let lang = match.params.lang||'en';
        let category = match.params.category||0;

        const {
            tile,
            cart,
            tiles,
            modalCartForTableIsOpen,
            orderMenu,
            orderState,
            messageText,
        } = this.state;


        return(
            <>
                <div className={`wrapper ${modalCartForTableIsOpen===true?'modal-open':''}`}>

                    {orderMenu===false
                        ?<>
                            <Header info={info}/>
                            <MenuNavigator
                                callWaitress={this.callWaitress}
                                sectionsWrapperRef={this.sectionsWrapperRef}
                                tileSwitcher={this.tileSwitcher}
                                tile={tile} categories={categories} lang={lang} info={info}/>

                            <Products
                                sectionsWrapperRef={this.sectionsWrapperRef}
                                tile={tile}
                                tiles={tiles}
                                cart={cart}
                                info={info}
                                products={products}
                                categories={categories}
                                tables={tables}
                                tileSwitcher={this.tileSwitcher}
                                plusMinus={this.plusMinus}
                                lang={lang}/>
                            <CartBlock cart={cart} openModalCart={this.openModalCart}/>
                        </>
                        :<>
                            <OrderOperations
                                info={info}
                                orderState={orderState}
                                billRequest={this.billRequest}
                                orderThanks={this.orderThanks}
                                orderFeedback={this.orderFeedback}
                                cart={cart}
                                goHome={this.goHome}/>
                        </>
                    }

                </div>

                <MessageBlock text={messageText}/>



                <CartForDelivery
                    isOpen={modalCartForTableIsOpen}
                    closeModalCart={this.closeModalCart}
                    plusMinus={this.plusMinus}
                    orderState={orderState}
                    cart={cart}/>

            </>

        )
    }

}
const mapStateToProps = state => {
    return {
        info:state.info||{},
        products:state.products||[],
        categories:state.categories||[],
        order:state.order.order||{},
        tables:state.tables||[],
    }
};
const mapDispatchToProps = dispatch=>{
    return {
        CreateOrder:(products, address, phone, note=undefined)=>{
            let order = {products, address,phone};
            if(note){
                order.note=note;
            }
            dispatch(createOrder(order))
        },
        UpdateOrder:(uuid, products, table_id, note=undefined)=>{
            let order = {products, table_id};
            if(note){
                order.note=note;
            }
            dispatch(updateOrder(uuid,order))
        },
        CallBill:(uuid,table_id)=>dispatch(callBill(uuid,table_id)),
        AddFeedback:(uuid,feedback)=>dispatch(addFeedback(uuid,feedback)),
        CloseOrder:()=>dispatch(closeOrder()),
        CallWaiter:table_id=>dispatch(callWaiter(table_id)),
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(MenuPage);
