import React, {useEffect} from "react";
import {connect} from "react-redux";
import menu_lang, {loadMenuLang} from "../../reducers/menu-lang";
import { HashLink as Link } from 'react-router-hash-link';
import {loadCategories} from "../../reducers/categories";
import {loadProducts} from "../../reducers/products";

const SelectCategoriesMenu = props=>{
    useEffect(() => {
        const {products,categories,menu_lang} = props;
        props.onCreate({products,categories,menu_lang});
       return () => {

       };
   }, []);

    const menu = props.categories;
    const lang = props.lang||'en';
  //  props.LoadMenuLang(lang);
    return(
        <div className='welcome__inner'>
            <h1>Choose a Category</h1>
            <a key={0} href={`#/${lang}/${0}`}>ALL</a>
            {menu.map(({id,name})=>{
                return(
                    <Link key={id} smooth to={`/${lang}/menu#cat_${id}`}>{name[lang]}</Link>
                    /*<a key={id} href={`#/${lang}/menu#${name[lang]}`}>{name[lang]}</a>*/
                )
            })}
        </div>
    )

}
const mapStateToProps = state => {
    return {
        products:state.products,
        categories:state.categories||[],
        menu_lang:state.menu_lang,
    }
};
const mapDispatchToProps = dispatch =>{
    return{
        onCreate:({products,categories,menu_lang})=>{
            if(categories&&categories.length===0){
                dispatch(loadCategories());
            }
            if(menu_lang&&Object.keys(menu_lang)===0){
                dispatch(loadMenuLang(lang));
            }
            if(products&&products.length===0){
                dispatch(loadProducts());
            }
        },
        LoadMenuLang:(lang)=>{

        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(SelectCategoriesMenu);

