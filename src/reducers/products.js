import C, { Status,url} from "./helper";
import {submit,getImage} from "../submiter";
import Promise from "bluebird";

export default (state=[], action) => {
    let {data,type} = action
    switch (type) {
        case C.PRODUCTS_LOAD:
            return [
                ...data
            ];
        case C.PRODUCT_UPDATE:
            return state.map(c => {
                    if(c.id===undefined || data.id===undefined || c.id.toString() !== data.id.toString()){
                        return c;
                    }
                    return   {
                        ...c,
                        ...data,
                    };
                }
            )
        default :
            return state
    }
}

const getData = (url, type, ID, toArray=false)=>async (dispatch,state)=>{
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
        const sort = (a,b)=>{
            if(
                a.categories&&Array.isArray(a.categories)&&a.categories.length>0
                &&b.categories&&Array.isArray(b.categories)&&b.categories.length>0
            ){
                return a.categories[0].id-b.categories[0].id
            }else {
                return 0;
            }
        }
        const products = response;//...sort(sort);
        const types = Array.isArray(type)?type:[type];
        for(let t of types){
            dispatch({
                type: t,
                data: products,
            });
        }
       // console.log(response);
        const all=[];

        for(let product of products){
            let image=product.images&&Array.isArray(product.images)&&product.images.length>0?product.images[0]:undefined;
            if(image){
                all.push(
                    new Promise((ok,rej)=>getImage(image).then(d=>ok({id:product.id,image:d})).catch(e=>ok({image:undefined})))
                );
            }
        }
        const  t = Date.now();
        while (all.length>0){
            let a = all.splice(0,5);
            try{
                let images = await Promise.all(a);
          //      console.log('Got images in: ',Date.now()-t);
           //     console.log('Images count:', images.length);
                for(let {id,image} of images){
                    if(!image){ //Skipping failed images
                        continue;
                    }

                    let data = {id, images:[image]};
                    dispatch({
                        type: C.PRODUCT_UPDATE,
                        data,
                    });
                }
            }catch (e) {
                console.log(e)
            }
        }
        /*Promise.props(all).then(images=>{
            console.log('Got images in: ',Date.now()-t);
            console.log('Images count:', Object.values(images).length);
            for(let [id,image] of Object.entries(images)){
                if(!image){ //Skipping failed images
                    continue;
                }

                let data = {id, images:[image]};
                dispatch({
                    type: C.PRODUCT_UPDATE,
                    data,
                });
            }

        }).catch(e=>console.log(e));*/

       /*let im = await getImage('https://azhouse.sqrmenu.com/storage/product_images/euRv8Gn7asw1bSWBcgDosggFgbKSNL1pZMykQm3G.jpeg');
       console.log(im.length);*/
        //response = recode(response);




        dispatch(Status(ID,'completed'))

        //  return {response, dispatch};
    }catch (err) {
        console.log(err);
        dispatch(Status(ID,'error',err));
        setTimeout(()=>dispatch(Status(ID,undefined)),5000);
    }
};

export const loadProducts = () => getData(global.url+'products',C.PRODUCTS_LOAD,'PRODUCTS',true);
