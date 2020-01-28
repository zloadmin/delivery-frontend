import {submit} from "../submiter";

const C =  {
    PRODUCTS_LOAD: "PRODUCTS_LOAD",
    PRODUCT_UPDATE:"PRODUCT_UPDATE",

    ORDER_CREATE:"ORDER_CREATE",
    ORDER_UPDATE:"ORDER_UPDATE",
    ORDER_CLOSE:"ORDER_CLOSE",

    CATEGORIES_LOAD: "CATEGORIES_LOAD",

    INFO_LOAD: "INFO_LOAD",
    TABLES_LOAD: "TABLES_LOAD",
    LANG_LOAD: "LANG_LOAD",
    MENU_LANG_LOAD: "MENU_LANG_LOAD",

    LANGUAGE_ADD:"LANGUAGE_ADD",

    STATE:"STATE",
};
const subdomen = global.subdomen||'deniz';
export const url = ()=>window.test_data_path?window.test_data_path:`https://${subdomen}.sqrmenu.com/api/shop/v1/`;
export default C;
export const Status = (id,status,error='')=>({type:C.STATE, id, status, error});
const recode = obj =>{
    const isInteger = (str)=>/^(-)?\d+$/.test(str);
    const res = {};
    Object.keys(obj).forEach(el=>{
        res[el] = isInteger(obj[el])?parseInt(obj[el]):obj[el];
    })
    return res;
}

export const modify = (url, data,type,method,ID, toArray=false)=>async (dispatch,state)=>{
    let status = state().states.filter(f=>f.id === ID).reduce((a,c)=>c,{});
    //Busy with prev operation
    if (status.status === 'processing'){
        //return;
    }

    dispatch(Status(ID,'processing'));

    let _form = {...data, _method:method};


    let path = url; //+ ((method!=='POST'&&method!=='GET')?_form.id:'');

    try{
        let d =  await submit(path,_form, method);
        console.log(d);
        if(d.result!=='ok'&&!d.data){
            dispatch(Status(ID,'error',d.error));
            setTimeout(()=>dispatch(Status(ID,undefined)),5000);
            return ;
        }
        let old_data = data?data:{};
        let response = {...old_data};
        if(d.data!==undefined){
            if(Array.isArray(d.data)){
                response = {...response}
            }
        }
        response = (d.data!==undefined)?{...d.data}:{};
        //response = recode(response);
        const types = Array.isArray(type)?type:[type];
        for(let t of types){
            dispatch({
                type: t,
                data: response,
            });
        }


        dispatch(Status(ID,'completed'))

      //  return {response, dispatch};
    }catch (err) {
        console.log(err);
        dispatch(Status(ID,'error',err));
        setTimeout(()=>dispatch(Status(ID,undefined)),5000);
    }
};

export const getData = (url, type, ID, toArray=false)=>async (dispatch,state)=>{
    let status = state().states.filter(f=>f.id === ID).reduce((a,c)=>c,{});
    //Busy with prev operation
    if (status.status === 'processing'){
        //return;
    }

    dispatch(Status(ID,'processing'));

    let path = url;

    try{
        let d =  await submit(path,{}, 'GET');
        let response = [];
        if(d.error){
            dispatch(Status(ID,'error',d.error));
            setTimeout(()=>dispatch(Status(ID,undefined)),5000);
            return ;
        }else{
            if(d.data!==undefined){
                if(!Array.isArray(d.data)&&toArray===true){
                    response = Object.values(d.data);
                }else{
                    response = d.data;
                }
            }else{
                response = d;
            }
        }
        //response = recode(response);
        const types = Array.isArray(type)?type:[type];
        for(let t of types){
            dispatch({
                type: t,
                data: response,
            });
        }


        dispatch(Status(ID,'completed'))

      //  return {response, dispatch};
    }catch (err) {
        console.log(err);
        dispatch(Status(ID,'error',err));
        setTimeout(()=>dispatch(Status(ID,undefined)),5000);
    }
};
