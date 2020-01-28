import C, {getData, Status, url} from "./helper";
export default (state={}, action) => {
    switch (action.type) {
        case C.MENU_LANG_LOAD:
            return {
                ...action.data
            };
        default :
            return state
    }
}
export const loadMenuLang = lang => getData(global.url+`lang/dictionary/${lang?lang:'en'}.json`,C.MENU_LANG_LOAD,'MENU_LANG');
