import React from 'react';

function Input2(props) {
    return (
        <div className="mt-2">
            <label className="text-sm text-gray-400 font-normal">{props.label}</label>
            <input id={props.id} type="" placeholder={props.placeholder} className="w-full h-10 pl-2 text-sm mt-1 rounded border border-gray-300"/>
        </div>
    )
}

export default Input2
