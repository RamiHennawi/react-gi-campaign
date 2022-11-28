import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useState } from "react";

const root = ReactDOM.createRoot(document.getElementById('root'));

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCampaign: {
                value: '',
                campaignName: 'a',
                campaignDescription: 'a',
                campaignBudget: 2,
                campaignStartDate: '',
                campaignEndDate: '',
                campaignCryptoPayment: 'n',
                campaignLanguage: 'English',
                campaignGame: 'League of Legends'
            },
            campaigns: []
        };
        this.messageRef = React.createRef();
        this.newFieldRef = React.createRef();
        this.completedForms = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCampaignName = this.handleCampaignName.bind(this);
        this.handleCampaignDescription = this.handleCampaignDescription.bind(this);
        this.handleCampaignBudget = this.handleCampaignBudget.bind(this);
        this.handleValidStartDate = this.handleValidStartDate.bind(this);
        this.handleValidEndDate = this.handleValidEndDate.bind(this);
        this.handleValidInput = this.handleValidInput.bind(this);
        this.handleCryptoPayment = this.handleCryptoPayment.bind(this);
        this.handleCampaignLanguage = this.handleCampaignLanguage.bind(this);
        this.handleCampaignGame = this.handleCampaignGame.bind(this);
        this.handleOtherGame = this.handleOtherGame.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        if(this.state.currentCampaign.campaignName.length>19) {
            this.messageRef.current.textContent = 'Campaign name must not exceed 20 characters.';
        }
        if(this.state.currentCampaign.campaignDescription.length>199){
            this.messageRef.current.textContent = 'Campaign description must not exceed 200 characters.';
        }
        if(parseInt(this.state.currentCampaign.campaignBudget)>10000){
            this.messageRef.current.textContent = 'Campaign budget must not exceed 10 000 USD.';
        }

        if(this.state.currentCampaign.campaignName.length<=20 && this.state.currentCampaign.campaignDescription.length<=200 && parseInt(this.state.currentCampaign.campaignBudget)<=10000){
            this.messageRef.current.textContent = '';
            this.setState({
                ...this.state,
                campaigns:[...this.state.campaigns, this.state.currentCampaign]
            })
            event.target.reset();
        }
        event.preventDefault();
    }

    handleValidStartDate(event) {

        this.setState({...this.state,
            currentCampaign: {
                ...this.state.currentCampaign,
                campaignStartDate: event.target.value,
            }})
        const currentDate = new Date();
        const startDate = new Date(event.target.value);
        if(currentDate.getTime()> startDate.getTime()){
            alert('Starting date must be at least tomorrow. ');
            event.target.value = '';
        }
    }
    handleValidEndDate(event) {
        this.setState({...this.state,
            currentCampaign: {
                ...this.state.currentCampaign,
                campaignEndDate: event.target.value,
            }})
        const startDate = new Date(this.state.currentCampaign.campaignStartDate);
        const endDate = new Date(event.target.value);
        if(endDate.getTime()<startDate.getTime()){
            alert('Starting date must be before the ending date. ');
            event.target.value = '';
        }
    }

    handleCampaignName(event) {
        this.setState({...this.state,
            currentCampaign: {
                ...this.state.currentCampaign,
                campaignName: event.target.value,
            }})
        if(this.state.currentCampaign.campaignName.length>19){
            this.messageRef.current.textContent = 'Campaign name must not exceed 20 characters.';
        }
    }
    handleCampaignDescription(event) {
        this.setState({...this.state,
            currentCampaign: {
                ...this.state.currentCampaign,
                campaignDescription: event.target.value,
            }})
        if(this.state.currentCampaign.campaignDescription.length>199){
            this.messageRef.current.textContent = 'Campaign description must not exceed 200 characters.';
        }
    }
    handleCampaignBudget(event) {
        this.setState({...this.state,
            currentCampaign: {
            ...this.state.currentCampaign,
            campaignBudget: event.target.value,
        }})
        if(parseInt(this.state.currentCampaign.campaignBudget)>10000){
            this.messageRef.current.textContent = 'Campaign budget must not exceed 10 000 USD.';
        }
    }
    handleValidInput(event) {
        if(this.state.currentCampaign.campaignName.length<=19 && this.state.currentCampaign.campaignDescription.length<=199 && parseInt(this.state.currentCampaign.campaignBudget)<=10000){
            this.messageRef.current.textContent = '';
        }
    }

    handleCryptoPayment(event) {
        this.setState({...this.state,
            currentCampaign: {
                ...this.state.currentCampaign,
                campaignCryptoPayment: event.target.value,
            }})
    }
    handleCampaignLanguage(event) {
        this.setState({...this.state,
            currentCampaign: {
                ...this.state.currentCampaign,
                campaignLanguage: event.target.value,
            }})
    }

    handleCampaignGame(event) {
        this.setState({...this.state,
            currentCampaign: {
                ...this.state.currentCampaign,
                campaignGame: event.target.value,
            }})

        if(event.target.value === "Other"){
            this.newFieldRef.current.style.display = "block";
        }else this.newFieldRef.current.style.display = "none";
    }
    handleOtherGame(event) {
        this.setState({...this.state,
            currentCampaign: {
                ...this.state.currentCampaign,
                campaignGame: event.target.value,
            }})
    }


    render() {
        return (
            <div>
            <form id="form" onSubmit={this.handleSubmit}>
                <p className="title">GAMEINFLUENCER MARKETING CAMPAIGN</p>
                <label>Campaign name</label><br/>
                <input id="campaign-name" type="text" maxLength="20" required onKeyUp={e => {this.handleCampaignName(e); this.handleValidInput(e)}} /><br/>

                <label>Campaign description</label><br/>
                <textarea id="campaign-description" rows="5" maxLength="200" required onKeyUp={e => {this.handleCampaignDescription(e); this.handleValidInput(e)}}></textarea><br/>

                <label>Campaign game</label><br/>
                <select id="select-games" onChange={this.handleCampaignGame} required>
                    <option>League of Legends</option>
                    <option>DOTA 2</option>
                    <option>Minecraft</option>
                    <option>Fortnite</option>
                    <option>Apex Legends</option>
                    <option value="Other">Other</option>
                </select><br/>
                    <div id="other-option" ref={this.newFieldRef} >
                        Other game:
                        <input type="text" id="other-game" maxLength="20" onChange={this.handleOtherGame}/>
                    </div>

                <br/><label>Campaign language</label><br/>
                <select id = "language" onChange={this.handleCampaignLanguage} required>
                    <option>English</option>
                    <option>German</option>
                    <option>Spanish</option>
                    <option>Japanese</option>
                </select><br/>

                <label>Campaign start and end date</label><br/>
                <input id="start-date" className="dates" type="date" onChange={this.handleValidStartDate} required />
                <span className="to">to</span>
                <input id="end-date" className="dates" type="date" onChange={this.handleValidEndDate} required /><br/>

                <label>Campaign budget (USD$)</label><br/>
                <input id="campaign-budget" type="number" max="10005" onKeyUp={e => {this.handleCampaignBudget(e); this.handleValidInput(e)}}/><br/>

                <label>Can the campaign be paid with Crypto currency?</label><br/>
                <div onChange={this.handleCryptoPayment}>
                    <input type="radio" name="crypto" value="yes" required />
                    <label htmlFor="yes">yes</label>
                    <input type="radio" name="crypto" value="no" required />
                    <label htmlFor="no">no</label>
                </div>


                <p id="validation-message" ref={this.messageRef}></p><br/>

                <input id="submit-button" type="submit" />

            </form>
                <div id="completed-forms">
                {this.state.campaigns.map(campaign => {return(
                        <div key={campaign.campaignName} className="one-form">
                            <br/>CAMPAIGN<br/>
                            <>name: {campaign.campaignName}</>
                            <br/>
                            <>description: {campaign.campaignDescription}</>
                            <br/>
                            <>game: {campaign.campaignGame}</>
                            <br/>
                            <>language: {campaign.campaignLanguage}</>
                            <br/>
                            <>start date: {campaign.campaignStartDate}</>
                            <br/>
                            <>end date: {campaign.campaignEndDate}</>
                            <br/>
                            <>budget: {campaign.campaignBudget}</>
                            <br/>
                            <>crypto payment: {campaign.campaignCryptoPayment}</>
                        </div>
                )})
                }
                </div>
        </div>
        );

    }
}



root.render(
    <NameForm />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
