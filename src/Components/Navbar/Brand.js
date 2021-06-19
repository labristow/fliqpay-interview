import React from 'react';
import Logo from '../../assets/Images/logo.svg';

function Brand() {
    return (
        <div className="ml-4 mr-3 md:mr-16">
            <img src={Logo} className="w-28 md:w-full" alt="fliqpay-logo" />
        </div>
    )
}

export default Brand
