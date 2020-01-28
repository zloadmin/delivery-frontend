import C, {getData, Status, url} from "./helper";
export default (state={}, action) => {
    switch (action.type) {
        case C.LANG_LOAD:
            return {
                ...action.data
            };
        default :
            return state
    }
}
export const loadLang = () => getData(global.url+'lang/enabled.json',C.LANG_LOAD,'LANG');
