import React from 'react'

function FormPageIndicator(props) {
    return (
        <div className="relative w-full mt-3 md:w-3/5 lg:w-2/5 ...">
            <div className="indicator__thread w-4/5 h-1 flex items-center ...">
                <div className="flex items-center step">
                    <span className={`block h-1 w-full indicator__inner__thread ${props.step === 1 ? "indicator__step1": props.step === 2 ? "indicator__step2": props.step === 3 ? "indicator__step3": ''}`}></span>
                    <span className="block h-2 w-2 rounded-full indicator__circle"></span>
                </div>
            </div>
            <div className="indicator__text flex justify-between text-sm mt-1">
                <p className="active__indicator">Amount</p>
                <p className="current__indicator">Recipient</p>
                <p className="inactive__indicator">Review</p>
                <p className="inactive__indicator">Pay</p>
            </div>

        </div>
    )
}

export default FormPageIndicator
