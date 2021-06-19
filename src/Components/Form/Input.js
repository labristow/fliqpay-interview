import React, { useState } from 'react';
import USD from "../../assets/Images/usdflag.svg";
import EUR from "../../assets/Images/euroflag.svg";

function Input(props) {
    const [senderCountry, setSenderCountry] = useState(EUR);
    const [receiverCountry, setReceiverCountry] = useState(USD);
    const showFlags = (e) => {
        document.querySelectorAll(".flags__dropdown").forEach(element => {
            element.classList.remove("show");
        })
        e.target.parentElement.lastChild.classList.toggle("show");
    }
    const setSenderFlag = (country, e, currency) => {
        setSenderCountry(country);
        e.target.parentElement.classList.remove("show");
        // set sender rate
        props.setSendFlag(currency);
    }
    const setReceiverFlag = (country, e, currency) => {
        setReceiverCountry(country);
        e.target.parentElement.classList.remove("show");
        // set receiver symbol
        props.setRecFlag(currency);
    }
    window.onclick = (e) => {
        if (e.target.id === "btn") {
            // 
        } else {
            document.querySelectorAll(".flags__dropdown").forEach(element => {
                element.classList.remove("show");
            })
        }
    }
    const setAmount = (e) => {
        props.setAmount(e.target.value);
    }

    return (
        <div className="w-full h-12 relative border border-gray-200 rounded my-4">
            <label className="absolute top-0 left-3 z-10 text-xs text-gray-400">{props.inputLabel}</label>
            <input id={`${props.able ? "" : "receivedAmount"}`} onChange={(event) => setAmount(event)} disabled={!props.able} type="number" className="inputField primary absolute top-0 left-0 pl-3 pt-3 text-sm border-none w-full h-full rounded" />
            <button id="btn" onClick={showFlags} className="absolute w-24 h-full right-0 top-0 bg-gray-200 flex justify-around items-center">
                {/* Country Flag */}
                <img src={props.able ? senderCountry : receiverCountry} alt="flag" width="48" id="btn" />
                <svg id="btn" width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.0935059 0.543945H9.58883L4.84117 4.36747L0.0935059 0.543945Z" fill="#372271" />
                </svg>
            </button>
            <div className="flags__dropdown w-28 bg-white shadow px-3 py-3 absolute top-10 right-0 z-10">
                <img src={USD} alt="flag" width="54" className="mx-auto cursor-pointer" onClick={(event) => props.able ? setSenderFlag(USD, event, "USD") : setReceiverFlag(USD, event, "USD")} />
                <hr className="my-2" />
                <img src={EUR} alt="flag" width="54" className="mx-auto cursor-pointer" onClick={(event) => props.able ? setSenderFlag(EUR, event, "EUR") : setReceiverFlag(EUR, event, "EUR")} />
            </div>
        </div>
    )
}

export default Input
