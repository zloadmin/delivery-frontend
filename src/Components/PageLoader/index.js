import React from 'react';
import { css } from '@emotion/core';
import { PulseLoader } from 'react-spinners';
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
const PageLoader = props=>{
    return(
        <div className='flex-fill d-flex flex-column align-content-center justify-content-center'>
            <PulseLoader
                css={override}
                sizeUnit={"px"}
                size={15}
                color={'#18ba62'}
                loading={true}
            />

        </div>
    )
}
export default PageLoader;
