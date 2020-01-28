import C from "./helper";

export default (state=[], action) => {
    if(action.type!==C.STATE){
        return state;
    }

    let duplicate = state.some(row=>(row.id===action.id));
    if(!duplicate){
        return [
            ...state,
            {
                ...action,
            }
        ]
    }else {
        return state.map(c => {
                if(c.id===undefined || action.id===undefined || c.id !== action.id){
                    return c;
                }
                return   {
                    ...c,
                    ...action,
                };
            }
        )
    }

}
