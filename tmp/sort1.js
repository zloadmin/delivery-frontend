const products = [
    {cat_id:4,name:'A'},
    {cat_id:1,name:'B'},
    {cat_id:2,name:'C'},
    {cat_id:1,name:'D'},
    {cat_id:3,name:'E'},
];

const cat = [{id:3},{id:2},{id:4},{id:1}];

const getPosition = id=>{
    for (let i=0;i<cat.length;i++){
        if(cat[i].id===id){
            return i;
        }
    }
    return 0;
}

const sorted_products = products
    .map(m=>({...m,sort_index:getPosition(m.cat_id)}))
    .sort((a,b)=>a.sort_index-b.sort_index);

console.log(sorted_products);
