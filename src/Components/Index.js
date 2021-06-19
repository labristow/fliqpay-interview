import React, { Component } from 'react'
import Navbar from "./Navbar/Bar";
import FormWrap from './Form/FormWrap';
import '../styles/index.css';

export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            formData: [
                { "title": "One-time Payout", "sub_title": "Send Money Internationally" },
                { "title": "Your Recipient", "sub_title": "Who are you sending money to?" },
                { "title": "Review details of your transfer", "sub_title": "" }
            ],
            reviewData: []
        }
    }
    continueHandler = (data, index) => {
        this.setState({ step: this.state.step + 1 });

        if (JSON.parse(window.localStorage.getItem("fliqPaymentInfo")) && this.state.step > 1) {
            let dt = JSON.parse(window.localStorage.getItem("fliqPaymentInfo"));
            dt.push(data);
            this.setState({ reviewData: dt })
            console.log(dt, data);
            window.localStorage.setItem("fliqPaymentInfo", JSON.stringify(dt))
        } else {
            let dt = this.state.reviewData;
            dt[0] = data;
            this.setState({ reviewData: dt })
            console.log(this.state.reviewData);
            window.localStorage.setItem("fliqPaymentInfo", JSON.stringify(this.state.reviewData))
        }
    }
    render() {
        return (
            <div className="main__background w-full min-h-screen">
                <Navbar step={this.state.step} />
                <FormWrap step={this.state.step} formData={this.state.formData} onContinue={this.continueHandler} />
            </div>
        )
    }
}

