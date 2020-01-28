import React, {useEffect} from "react";
import {connect} from "react-redux";
import {updateImage} from "../../reducers/info";
const SelectLanguageMenu = props =>{
    const lang = props.lang||{};
    const menu = Object.entries(lang).map(([code,name])=>({code,name}));
    const {info} = props;
    let banner = info?info.banner:undefined;
    useEffect(() => {
        if(banner){
            props.UpdateImage(info);
          //  console.log('banner updating',banner);
        }


        return () => {

        };
    }, [banner]);

    return(
        <div className='welcome__inner'>
            <h1>CHOOSE LANGUAGE</h1>
            {menu.map(({code,name})=>{
              return(
                  <a key={code} href={`#/${code}`}>{name}</a>
              )
            })}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        lang:state.lang,
        info:state.info,
    }
};
const mapDispatchToProps = dispatch =>{
    return{
        UpdateImage:(info)=>{
            dispatch(updateImage(info));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguageMenu);

