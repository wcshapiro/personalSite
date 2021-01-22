import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Screener.css';


export default class Screener extends Component {
    constructor(props) {
        super(props);
        this.baseURL = "https://api.polygon.io/v2/reference/financials/";
        this.apiKey = "?limit=5&apiKey=bUYSdcCHLTpySDiqbvRyHJAAqJ_YMfo55YA5a7";
        this.state = {
            username: '',
            ticker: 'ticker',
            isLoaded: false,
            items: null
        };


    }
    mySubmitHandler = (event) => {

        event.preventDefault();
        fetch(this.baseURL + this.state.ticker + this.apiKey)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {

                    this.setState({
                        isLoaded: true,
                        error
                    });
                }

            )


    }
    myChangeHandler = (event) => {
        this.setState({ ticker: event.target.value });
    }
    render() {
        console.log("checking load " + this.state.isLoaded);
        return (
            <>
                <form className="screener" onSubmit={this.mySubmitHandler}>
                    <h1>Searching for {this.state.ticker}</h1>
                    <p>Enter your ticker, and submit:</p>
                    <input
                        type='text'
                        onChange={this.myChangeHandler}
                    />
                    <input
                        type='submit'
                    />
                </form>
                <p> here is the stock info {this.state.isLoaded ? (
                    <ul>
                        <li>ticker: {this.state.items.results[0].ticker}</li>
                        <li>cashAndEquivalents: {this.state.items.results[0].cashAndEquivalents}</li>
                        <li>tradeAndNonTradeReceivables: {this.state.items.results[0].tradeAndNonTradeReceivables}</li>
                        <li>inventory: {this.state.items.results[0].inventory}</li>
                        <li>totalLiabilities: {this.state.items.results[0].totalLiabilities}</li>
                        <li>marketCapitalization: {this.state.items.results[0].marketCapitalization}</li>
                        <li>is it undervalued? {(
                            parseInt(this.state.items.results[0].cashAndEquivalents) + .75 * parseInt(this.state.items.results[0].tradeAndNonTradeReceivables)
                            + .5 * parseInt(this.state.items.results[0].inventory) - parseInt(this.state.items.results[0].totalLiabilities)
                            > parseInt(this.state.items.results[0].marketCapitalization)

                        ) ? ("true") : ("false")} at price per share {(parseInt(this.state.items.results[0].cashAndEquivalents) + .75 * parseInt(this.state.items.results[0].tradeAndNonTradeReceivables)
                            + .5 * parseInt(this.state.items.results[0].inventory) - parseInt(this.state.items.results[0].totalLiabilities))} vs price{this.state.items.results[0].sharePriceAdjustedClose} </li>

                    </ul>) :
                    <p>Nothing here yet</p>}

                </p>
            </>


        );
    }
}
// (cash & short-term investments + 75% * accounts receivable + 50% * inventory) minus total liabilities.
