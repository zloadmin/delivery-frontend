import React, {useState, useRef, useMemo} from 'react';
import {Element} from "react-scroll";

const Products = props => {
    const {
        products,
        categories,
        lang,
        tile,
        tiles,
        sectionsWrapperRef,
        cart,
        plusMinus,
        tables,
        info} = props;

    const getSortIndex = id=>{
        for (let i=0;i<categories.length;i++){
            if(categories[i].id===id){
                return i;
            }
        }
        return 0;
    }

    let items = products.reduce((a,c)=>{
        const {categories} = c;
        if(!categories||Array.isArray(categories)===false||categories.length===0){
            return a;
        }
        const {id, name} = categories[0];
        if(!a[id]){
            a[id]={id,name:name[lang],pr:[]}
        }
        a[id].pr.push(c);
        return a;
    },{});
    items = Object.values(items);
    items = items
        .map(m=>({...m,sort_index:getSortIndex(m.id)}))
        .sort((a,b)=>a.sort_index-b.sort_index);

    const showButtons = '';//(info&&info.online_order===true&&isTable===true)?``:'d-none';

    return(
        <main className="menu-section tile-view-main">
            <div className="container" ref={sectionsWrapperRef}>
                {
                    items.map(({id:catid,name,pr})=>{
                        return(
                            <Element key={catid} className="menu-category" id={`cat_${catid}`} name={`cat_${catid}`}>
                                <div className="category-title">{name}</div>
                                <div className="category-list row">
                                    {
                                        pr.map(({id,price,name,description,count_in_cart,images})=>{
                                            let t = tiles[id]||tile;
                                            let img = Array.isArray(images)&&images.length>0?images[0]:'./assets/images/breakfast1.jpg';
                                            return(
                                                <div key={id} className="col-md-6 col-lg-4">
                                                    <div className={`menu-item ${t===false?'tile-view-list':''}`}>
                                                        <div className="img">
                                                            <img
                                                                onClick={()=>props.tileSwitcher(tile,id)}
                                                                src={img}
                                                                alt={name[lang]}/>
                                                            <div className="code">
                                                                AED {price}
                                                            </div>
                                                        </div>
                                                        <div className="row align-items-center no-gutters">
                                                            <div className="col info">
                                                                <div className="name">
                                                                    {name[lang]}
                                                                </div>
                                                                <div className="desc">
                                                                    {description[lang]}
                                                                </div>
                                                            </div>
                                                            <div className="col-auto cc-col ml-auto">
                                                                <div className={`cart-controls ${showButtons}`}>
                                                                    <button
                                                                        onDoubleClick={e=>{e.stopPropagation(); e.preventDefault()}}
                                                                        className="cl-btn c-orange ct-plus s-x" onClick={e=>plusMinus(id,1,price,name[lang])}>+</button>
                                                                    <div
                                                                        className= {`item-count ${cart.products[id]&&cart.products[id].count>0?'':'hidden'}`}>
                                                                        {cart.products[id]?cart.products[id].count:0}
                                                                    </div>
                                                                    <button
                                                                        onDoubleClick={e=>{e.stopPropagation(); e.preventDefault()}}
                                                                        onClick={e=>plusMinus(id,-1,price,name[lang])}
                                                                        className={`cl-btn c-orange ct-minus s-x ${cart.products[id]&&cart.products[id].count>0?'':'hidden'}`}>-</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </Element>
                        )
                    })
                }



            </div>
        </main>
    )
}
export default Products;
