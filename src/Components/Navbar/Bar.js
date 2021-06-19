import React from 'react';
import Brand from './Brand';
// import Brand from './Brand';
import "../../styles/Navbar.css";
import FormPageIndicator from './FormPageIndicator';

function Bar(props) {
    return (
        <div className="w-full h-16 bg-white flex items-center justify-center">
            <Brand />
            <FormPageIndicator step={props.step}/>
            <div className="flex mb-2 mr-4 ml-6 md:ml-16">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{
                    window.location.reload();
                }}>
                    <path d="M0.666718 0.666534L13.3334 13.3332M13.3334 0.666534L0.666718 13.3332" stroke="#918DAB" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    )
}

export default Bar
