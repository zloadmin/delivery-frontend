import React from "react";

const MessageBlock = props =>{
    const {text} = props;
    return(
        <div className={`message-block ${text?'active':''}`}>
            {text}
        </div>
    )
}

export default MessageBlock;
