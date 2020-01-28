import React, {useEffect} from 'react';
import SelectCategoriesMenu from "../Components/SelectCategoriesMenu";

const CategoriesPage = props =>{
    const {match} = props;
    let lang = match.params.lang||'en';
    /*useEffect(() => {
            store.dispatch(loadProducts());
        return () => {

        };
    }, []);*/
    return(
        <div  className={'page'}>
            <SelectCategoriesMenu lang={lang}/>
        </div>

    )
}
export default CategoriesPage;
