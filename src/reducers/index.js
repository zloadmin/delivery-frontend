import {combineReducers} from "redux";

import states from "./states";
import products from "./products";
import categories from "./categories";
import info from "./info";
import lang from "./lang";
import menu_lang from "./menu-lang";
import order from "./order";
import tables from "./tables";
export default combineReducers({
    states,
    products,
    categories,
    info,
    lang,
    menu_lang,
    order,
    tables
});
