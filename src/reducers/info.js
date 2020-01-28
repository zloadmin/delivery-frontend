import C, {getData, Status} from "./helper";
import Promise from "bluebird";
import {getImage} from "../submiter";
export default (state={}, action) => {
    switch (action.type) {
        case C.INFO_LOAD:
            return {
                ...action.data
            };
        default :
            return state
    }
}

export const updateImage = info=>(dispatch,state)=>{
    if(info&&info.banner&&info.banner.length<1000){
        getImage(info.banner)
            .then(banner=>{
                //console.log(banner);
                dispatch({type:C.INFO_LOAD,data:{...info, banner}})
            }).catch(e=>console.log(e));
    }
}
export const loadInfo = () => getData(global.url+'client/info.json',C.INFO_LOAD,'INFO');
