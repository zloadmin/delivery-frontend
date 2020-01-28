import C, {getData, Status, url} from "./helper";
export default (state=[], action) => {
    switch (action.type) {
        case C.CATEGORIES_LOAD:
            return [
                ...action.data
            ];
        default :
            return state
    }
}
export const loadCategories = () => getData(global.url+'categories',C.CATEGORIES_LOAD,'CATEGORIES',true);
