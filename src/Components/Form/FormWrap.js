import React, { useState, useEffect } from 'react';
import '../../styles/FormWrap.css';
import Input from './Input';
import Input2 from './Input2';
// import axios from 'axios';

function FormWrap(props) {
    const [isEurope, setIsEurope] = useState(true);
    const [amountToSend, setAmountToSend] = useState(0);
    const [senderCurrency, setSenderCurrency] = useState("EUR");
    const [receiverCurrency, setreceiverCurrency] = useState("USD");
    const [transaction, setTransaction] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    useEffect(() => {
        document.getElementById("continue1") && document.getElementById("continue1").classList.add("inactive");
    }, [])
    const setSendFlag = (sender_currency) => {
        setSenderCurrency(sender_currency);
    }
    const setRecFlag = (receiver_currency) => {
        setreceiverCurrency(receiver_currency);
    }
    const setAmount = (amountToSend) => {
        setAmountToSend(amountToSend);
        // const BASE = senderCurrency;
        // const SYMBOL = receiverCurrency + ", NGN";
        let transaction;
        function fetchAndConvert() {
            if (senderCurrency === "USD") {
                transaction = {
                    "amountToSend": Number(amountToSend).toFixed(2),
                    "currencyToSend": senderCurrency,
                    "amountToReceive": Number(amountToSend - (3.69 * amountToSend)/100).toFixed(2),
                    "currencyToReceive": receiverCurrency,
                    "transfer_fee": Number(3.69 * amountToSend / 100).toFixed(2),
                    "converted_amount": Number(0.72 * (amountToSend - (3.69 * amountToSend)/100)).toFixed(2),
                    "guaranteed_rate": Number(3.69).toFixed(2)
                };
            } else if (senderCurrency === "EUR") {
                transaction = {
                    "amountToSend": Number(amountToSend).toFixed(2),
                    "currencyToSend": senderCurrency,
                    "amountToReceive": Number(amountToSend - (3.69 * amountToSend)/100).toFixed(2),
                    "currencyToReceive": receiverCurrency,
                    "transfer_fee": Number(1.38 * amountToSend / 100).toFixed(2),
                    "converted_amount": Number(0.72 * (amountToSend - (3.69 * amountToSend)/100)).toFixed(2),
                    "guaranteed_rate": Number(3.69).toFixed(2)
                };
            }
        }
        fetchAndConvert();
        setTransaction(transaction);
        document.getElementById("receivedAmount").value = transaction.converted_amount;
        document.getElementById("continue1").classList.remove("inactive")

        // let endpoint = "https://data.fixer.io/api/latest?access_key=" + API_KEY + "&base=" + BASE + "&symbols=" + SYMBOL;
        // axios.get(endpoint).then(res => {
        //     console.log(res.data);
        //     console.log("Base Currency: " + BASE)
        //     if (res.data || res.data.success === true) {
        //         switch (receiverCurrency) {
        //             case "USD":
        //                 transaction = {
        //                     "amountToSend": Number(amountToSend).toFixed(2),
        //                     "currencyToSend": senderCurrency,
        //                     "amountToReceive": Number(amountToSend - (0.369 * amountToSend / 100)).toFixed(2),
        //                     "currencyToReceive": receiverCurrency,
        //                     "transfer_fee": Number(0.369 * amountToSend / 100).toFixed(2),
        //                     "converted_amount": Number(420 * (amountToSend - (0.369 * amountToSend / 100))).toFixed(2),
        //                     "guaranteed_rate": Number(3.69).toFixed(2)
        //                 };
        //                 break;
        //             case "EUR":
        //                 transaction = {
        //                     "amountToSend": amountToSend,
        //                     "currencyToSend": senderCurrency,
        //                     "amountToReceive": amountToSend - (0.369 * amountToSend / 100),
        //                     "currencyToReceive": receiverCurrency,
        //                     "transfer_fee": 0.369 * amountToSend / 100,
        //                     "converted_amount": res.data.rates.EUR * amountToSend - (0.369 * amountToSend / 100),
        //                     "guaranteed_rate": 3.69
        //                 };
        //                 break;
        //             default:
        //                 break;
        //         }
        //         setTransaction(transaction);
        //         document.getElementById("receivedAmount").value = transaction.converted_amount;
        //         document.getElementById("continue1").classList.remove("inactive")
        //     }
        // });
    }
    const continueHandler = (data, index) => {
        if (index === 0) {
            props.onContinue(data);
            let a = [];
            a.push(data);
            setReviewData(a);
        } else if (index === 1) {
            const email = document.getElementById("email").value;
            const fullname = document.getElementById("fullname").value;

            let dt;
            if (isEurope) {
                const iban = document.getElementById("iban").value;
                dt = {
                    email,
                    fullname,
                    iban
                }
            } else {
                const bic = document.getElementById("bic").value;
                const acctno = document.getElementById("acctno").value;
                dt = {
                    email,
                    fullname,
                    bic,
                    acctno
                }
            }
            props.onContinue(dt);
            let a = reviewData;
            a.push(dt);
            setReviewData(a);
        } else if (index === 2) {
            setReviewData(JSON.parse(window.localStorage.getItem("fliqPaymentInfo")));
        }
        console.log(reviewData);
        console.log(index)
    }
    const activateHandler = (e, isEUR) => {
        document.querySelectorAll(".underline").forEach(element => {
            element.classList.remove("visible");
        });
        document.querySelectorAll(".location").forEach(element => {
            element.classList.remove("title2");
        })
        setIsEurope(isEUR);
        // e.target.classList.remove("title3");
        e.target.classList.add("title2");
        e.target.lastChild.classList.add("visible");
    }
    return (
        <div className="w-full flex justify-center px-2 md:pl-10">
            <div className="bg-white my-4 md:mt-12 w-full md:w-3/5 lg:w-2/5 h-auto px-8 py-10 border border-gray-100 shadow rounded ...">
                <div className="border-b border-gray-100 pb-2">
                    <h5 className="font-medium title">{props.formData[props.step - 1].title}</h5>
                    <p className="sub__title text-sm">{props.formData[props.step - 1].sub_title}</p>
                </div>
                {/* Input Field */}
                {
                    props.step === 1
                        ?
                        <>
                            <Input inputLabel={"You send"} able={true} setAmount={setAmount} setSendFlag={setSendFlag} setRecFlag={setRecFlag} />
                            {
                                amountToSend > 0
                                    ?
                                    <>
                                        <div className="summary w-full h-auto pl-4 relative">
                                            <span className="flex items-center justify-center z-10 absolute w-6 h-6 bg-gray-200 text-gray-400 rounded-full left-1 top-2"> - </span>

                                            <span style={{ top: "40px" }} className="flex items-center justify-center z-10 absolute w-6 h-6 bg-gray-200 text-gray-400 rounded-full left-1 top-10"> = </span>

                                            <span style={{ top: "74px" }} className="flex items-center justify-center z-10 absolute w-6 h-6 bg-gray-200 text-gray-400 rounded-full left-1 top-20"> x </span>

                                            <div style={{ height: "107px" }} className="w-full border-l border-gray-200 relative">
                                                <div className="row1 relative flex pt-3 pl-5 text-sm text-gray-300 font-normal">
                                                    {transaction && (transaction.transfer_fee)} <span className="pl-4 text-gray-400">Transfer fee</span>
                                                </div>
                                                <div style={{ marginTop: "0px" }} className="row1 relative flex pt-3 pl-5 text-sm text-gray-300 font-normal">
                                                    {transaction && (transaction.amountToSend - transaction.transfer_fee)} {transaction && (transaction.currencyToSend)} <span className="pl-4 text-gray-400">Amount we'll convert</span>
                                                </div>
                                                <div style={{ marginTop: "0px" }} className="row1 relative flex pt-3 pl-5 text-sm">
                                                    3.69 <span className="pl-4 primary">Guaranteed rate(1hr)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    ""
                            }
                            <Input inputLabel={"Receipient gets"} able={false} setSendFlag={setSendFlag} setRecFlag={setRecFlag} value={transaction && transaction.converted_amount} />
                        </>
                        :
                        props.step === 2
                            ?
                            <>
                                {/* Input Field 2 */}
                                <Input2 id="email" label="Their email(optional)" />
                                <Input2 id="fullname" label="Full name of the account holder" />
                                <h5 className="font-medium title text-sm my-2">Bank details</h5>
                                <hr className="mb-3" />
                                <div className="border-b border-gray-200 flex">
                                    <h5 className="location cursor-pointer font-normal title2 text-sm ml-4 mr-10" onClick={(event) => activateHandler(event, true)}>
                                        Inside Europe
                                        <span className="underline visible"></span>
                                    </h5>
                                    <h5 className="location cursor-pointer font-normal text-sm" onClick={(event) => activateHandler(event, false)}>
                                        Outside Europe
                                        <span className="underline"></span>
                                    </h5>
                                </div>
                                {
                                    isEurope
                                        ?
                                        <Input2 id="iban" label="IBAN" placeholder="DE98370440018929829032" />
                                        :
                                        <>
                                            <Input2 id="bic" label="SWIFT / BIC code" placeholder="BUKBGB22" />
                                            <Input2 id="acctno" label="IBAN / Account Number" placeholder="01234567891" />
                                        </>
                                }
                            </>
                            :
                            <>
                                <div className="flex justify-between my-3">
                                    <h5 className="location cursor-pointer text-gray-400 font-normal text-sm">You send</h5>
                                    <h5 className="location cursor-pointer text-gray-600 font-medium text-md">{reviewData && Number(reviewData[0].amountToSend).toFixed(2)} {reviewData && reviewData[0].currencyToSend}</h5>
                                </div>
                                <div className="flex justify-between my-3">
                                    <h5 className="location cursor-pointer text-gray-400 font-normal text-sm">Total fees (included)</h5>
                                    <h5 className="location cursor-pointer text-gray-600 font-normal text-sm">{reviewData && (Number(reviewData[0].transfer_fee).toFixed(2))} {reviewData && reviewData[0].currencyToSend}</h5>
                                </div>
                                <div className="flex justify-between my-3">
                                    <h5 className="location cursor-pointer text-gray-400 font-normal text-sm">Amount we’ll convert</h5>
                                    <h5 className="location cursor-pointer text-gray-600 font-normal text-sm">{reviewData && Number(reviewData[0].amountToReceive).toFixed(2)} {reviewData && reviewData[0].currencyToSend}</h5>
                                </div>
                                <div className="flex justify-between my-3">
                                    <h5 className="location cursor-pointer text-gray-400 font-normal text-sm">Guaranteed rate</h5>
                                    <h5 className="location cursor-pointer text-gray-600 font-normal text-sm">{Number(1.10289).toFixed(2)}</h5>
                                </div>
                                <div className="flex justify-between my-3">
                                    <h5 className="location cursor-pointer text-gray-400 font-normal text-sm">Johnny gets</h5>
                                    <h5 className="location cursor-pointer text-gray-600 font-medium text-md">{reviewData && reviewData[0].converted_amount} {reviewData && reviewData[0].currencyToReceive}</h5>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between my-3">
                                    <h5 className="location cursor-pointer text-gray-400 font-normal text-sm">Name</h5>
                                    <h5 className="location cursor-pointer text-gray-600 font-normal text-sm">{reviewData && reviewData[1].fullname}</h5>
                                </div>
                                <div className="flex justify-between my-3">
                                    <h5 className="location cursor-pointer text-gray-400 font-normal text-sm">Email address</h5>
                                    <h5 className="location cursor-pointer text-gray-600 font-normal text-sm">{reviewData && reviewData[1].email}</h5>
                                </div>
                                {
                                    reviewData[1].iban
                                        ?
                                        <>
                                            <div className="flex justify-between my-3">
                                                <h5 className="location cursor-pointer text-gray-400 font-normal text-sm">IBAN / Account number</h5>
                                                <h5 className="location cursor-pointer text-gray-600 font-normal text-sm">{reviewData && reviewData[1].iban}</h5>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="flex justify-between my-3">
                                                <h5 className="location cursor-pointer text-gray-400 font-normal text-sm">SWIFT /BIC code</h5>
                                                <h5 className="location cursor-pointer text-gray-600 font-normal text-sm">{reviewData && reviewData[1].bic}</h5>
                                            </div>
                                            <div className="flex justify-between my-3">
                                                <h5 className="location cursor-pointer text-gray-400 font-normal text-sm">IBAN / Account number</h5>
                                                <h5 className="location cursor-pointer text-gray-600 font-normal text-sm">{reviewData && reviewData[1].acctno}</h5>
                                            </div>
                                        </>

                                }

                            </>
                }

                {
                    props.step === 3
                        ?
                        <>
                            <button disabled={false} className="w-full h-10 rounded finish__btn mt-5 ..." onClick={async () => {
                                await window.localStorage.removeItem("fliqPaymentInfo");
                                window.location.reload();
                            }}>Confirm & continue</button>
                        </>
                        :
                        <div className="mt-3 flex justify-between">
                            <button className="w-36 h-10 rounded compare__btn text-sm ...">Compare Rates</button>
                            <button id="continue1" disabled={transaction && transaction.amountToSend && transaction && transaction.converted_amount ? false : true} className="w-32 h-10 rounded continue__btn text-sm ..." onClick={() => continueHandler(transaction, props.step - 1)}>Continue</button>
                        </div>
                }
            </div>
        </div>
    )
}

export default FormWrap
