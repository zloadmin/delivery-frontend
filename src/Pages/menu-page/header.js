import React, {useEffect} from "react";

const Header = props=>{
    const {banner, name} = props.info;
    const style=banner?{backgroundImage:`url(${banner})`}:{};
    useEffect(() => {
        window.addEventListener("scroll", checkScroll);
        return () => {
            window.removeEventListener("scroll", checkScroll);
        };
    }, []);
    return(
        <header className="header" style={style}>
            <div className="container">

            </div>
        </header>
    )
}

function checkScroll(){
    let wPos = window.pageYOffset;
    let elPosTop = document.querySelector('.navigation').offsetTop;

    if ( wPos > elPosTop ) {
        document.querySelector('.navigation-fix').classList.add("fixed");
    } else {
        document.querySelector('.navigation-fix').classList.remove("fixed");
    }
}
export default Header;
