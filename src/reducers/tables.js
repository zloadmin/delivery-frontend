import C, {getData, Status, url} from "./helper";
export default (state=[], action) => {
    switch (action.type) {
        case C.TABLES_LOAD:
            return [
                ...action.data
            ];
        default :
            return state
    }
}
export const loadTables = () => getData(global.url+`order/tables/list`,C.TABLES_LOAD,'TABLES');
