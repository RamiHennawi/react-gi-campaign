import './App.css';
import * as React from "react"
import {useState} from 'react';

const campaignNameLength: number = 19;
const campaignDescriptionLength: number = 199;
const campaignBudgetMax: number =  10000;

interface ICampaign {
    campaignName: string,
    campaignDescription: string,
    campaignBudget: string,
    campaignStartDate: string,
    campaignEndDate: string,
    campaignCryptoPayment: string,
    campaignLanguage: string,
    campaignGame: string,
}

const defaultCampaign: ICampaign = {
    campaignName: '',
    campaignDescription: '',
    campaignBudget: '',
    campaignStartDate: '',
    campaignEndDate: '',
    campaignCryptoPayment: '',
    campaignLanguage: 'English',
    campaignGame: 'League of Legends',
}

function App() {
    const [currentCampaign, setCurrentCampaign] = useState(defaultCampaign);
    const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
    const [validationMessage, setValidationMessage] = useState('');
    const [otherGame, setOtherGame] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(currentCampaign.campaignName.length>campaignNameLength) {
            setValidationMessage('Campaign name must not exceed 20 characters.');
        }
        if(currentCampaign.campaignDescription.length>campaignDescriptionLength){
            setValidationMessage('Campaign description must not exceed 200 characters.');
        }
        if(parseInt(currentCampaign.campaignBudget)>campaignBudgetMax){
            setValidationMessage('Campaign budget must not exceed 10 000 USD.');
        }
        if(currentCampaign.campaignName.length<=campaignNameLength && currentCampaign.campaignDescription.length<=campaignDescriptionLength && parseInt(currentCampaign.campaignBudget)<=campaignBudgetMax){
            setValidationMessage('');
            setCampaigns([...campaigns, currentCampaign]);
            e.target.reset();
        }

    }

    const handleValidStartDate = (event: any) => {
        setCurrentCampaign(prevState => {
            return {...prevState,
                campaignStartDate: event.target.value}
        })
        const currentDate = new Date();
        const startDate = new Date(event.target.value);
        if(currentDate.getTime()> startDate.getTime()){
            alert('Starting date must be at least tomorrow. ');
            event.target.value = '';
        }
    }

    const handleValidEndDate = (event: any) => {
        setCurrentCampaign(prevState => {
            return {...prevState,
                campaignEndDate: event.target.value}
        })
        const startDate = new Date(currentCampaign.campaignStartDate);
        const endDate = new Date(event.target.value);
        if(endDate.getTime()<startDate.getTime()){
            alert('Starting date must be before the ending date. ');
            event.target.value = '';
        }
    }

    const handleCampaignName = (event: any) => {
        setCurrentCampaign(prevState => {
            return {...prevState,
                campaignName: event.target.value}
        })
        if(currentCampaign.campaignName.length>campaignNameLength){
            setValidationMessage('Campaign name must not exceed 20 characters.');
        }
    }

    const handleCampaignDescription = (event: any) => {
        setCurrentCampaign(prevState => {
            return {...prevState,
                campaignDescription: event.target.value}
        })
        if(currentCampaign.campaignDescription.length>campaignDescriptionLength){
            setValidationMessage('Campaign description must not exceed 200 characters.');
        }
    }

    const handleCampaignBudget = (event: any) => {
        setCurrentCampaign(prevState => {
            return {...prevState,
                campaignBudget: event.target.value}
        })
        if(parseInt(currentCampaign.campaignBudget)>campaignBudgetMax){
            setValidationMessage('Campaign budget must not exceed 10 000 USD.');
        }
    }

    function handleValidInput() {
        if(currentCampaign.campaignName.length<=campaignNameLength && currentCampaign.campaignDescription.length<=campaignDescriptionLength && parseInt(currentCampaign.campaignBudget)<=campaignBudgetMax){
            setValidationMessage('');
        }
    }

    const handleCryptoPayment = (event: any) => {
        setCurrentCampaign(prevState => {
            return {...prevState,
                campaignCryptoPayment: event.target.value}
        })
    }

    const handleCampaignLanguage = (event: any) => {
        setCurrentCampaign(prevState => {
            return {...prevState,
                campaignLanguage: event.target.value}
        })
    }

    const handleCampaignGame = (event: any) => {
        setCurrentCampaign(prevState => {
            return {...prevState,
                campaignGame: event.target.value}
        })

        if(event.target.value === "Other") {
            setOtherGame(true)
        }else setOtherGame(false);
    }

    const handleOtherGame= (event: any) => {
        setCurrentCampaign(prevState => {
            return {...prevState,
                campaignGame: event.target.value}
        })
    }

    return (
        <>
            <form id="form" onSubmit={handleSubmit}>
                <p className="title">GAMEINFLUENCER MARKETING CAMPAIGN</p>
                <label>Campaign name</label>
                <br/>
                <input id="campaign-name" type="text" maxLength={25} required onChange={handleCampaignName} onBlur={handleValidInput} />
                <br/>

                <label>Campaign description</label>
                <br/>
                <textarea id="campaign-description" rows={5} maxLength={205} required onChange={handleCampaignDescription} onBlur={handleValidInput}></textarea>
                <br/>

                <label>Campaign game</label>
                <br/>
                <select id="select-games" required onChange={handleCampaignGame}>
                    <option>League of Legends</option>
                    <option>DOTA 2</option>
                    <option>Minecraft</option>
                    <option>Fortnite</option>
                    <option>Apex Legends</option>
                    <option value="Other">Other</option>
                </select>
                <br/>

                {otherGame && (
                    <div onChange={handleOtherGame}>
                    Other game:
                    <input type="text" id="other-game" maxLength={20}/>
                </div>)
                }

                <br/>
                <label>Campaign language</label>
                <br/>
                <select id = "language" required onChange={handleCampaignLanguage}>
                    <option>English</option>
                    <option>German</option>
                    <option>Spanish</option>
                    <option>Japanese</option>
                </select>
                <br/>

                <label>Campaign start and end date</label>
                <br/>
                <input id="start-date" className="dates" type="date" required onChange={handleValidStartDate}/>
                <span className="to">to</span>
                <input id="end-date" className="dates" type="date" required onChange={handleValidEndDate}/>
                <br/>

                <label>Campaign budget (USD$)</label>
                <br/>
                <input id="campaign-budget" type="number" max="10005" onChange={handleCampaignBudget}/>
                <br/>

                <label>Can the campaign be paid with Crypto currency?</label>
                <br/>
                <div onChange={handleCryptoPayment}>
                    <input type="radio" name="crypto" value="yes" required />
                    <label htmlFor="yes">yes</label>
                    <input type="radio" name="crypto" value="no" required />
                    <label htmlFor="no">no</label>
                </div>

                <p id="validation-message"> {validationMessage} </p>
                <br/>

                <input id="submit-button" type="submit" />

            </form>
            <div id="completed-forms">
                {campaigns.map(campaign => {return(
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
        </>
    )

}

export default App;
