import React from 'react'
import { Bar } from 'react-chartjs-2';
import Select from 'react-select';
import * as consts from './constants';
import StateCurrentFiltered from './stateCurrentFiltered';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'date-fns/addDays';
import './App.css';

let states = consts.statesLin.map(e => ({ value: e, label: e }))
let yesterday = addDays(new Date(), -1)


class StatesCurrent extends React.Component {


    constructor(props) {
        console.log("constructor called")
        super(props);
        //let yesterdayFormatted = this.formatDate(this.state.startDate);
        this.state = {
            selectedOption: [],
            startDate: yesterday,
            dateSelectedFormatted: null
        }

        this.handleDateChange = this.handleDateChange.bind(this);
    };



    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    formatDate(date) {
        //let dateSelected = moment(startDate).format('YYYYMMDD');
        let dateSelectedFormatted = moment(date).format('MM/DD/YYYY');
        return dateSelectedFormatted;
    }

    handleDateChange(startDate) {

        //let dateSelected = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(startDate);
        let dateSelected = moment(startDate).format('YYYYMMDD');
        //let dateSelectedFormatted = moment(startDate).format('MM/DD/YYYY');
        let dateSelectedFormatted = this.formatDate(startDate);
        this.setState({ startDate, dateSelected, dateSelectedFormatted });
        console.log(`formatted date selected:`, dateSelected);

        console.log(`formatted  with / date selected:`, dateSelectedFormatted);
    }

    render() {
        console.log('code=' + this.state.selectedOption.value);
        if (!this.state.dateSelected)
            this.state.dateSelected = moment(this.state.startDate).format('YYYYMMDD');
        console.log('date formatted=' + this.state.dateSelected);
        if (!this.state.dateSelectedFormatted)
            this.state.dateSelectedFormatted = this.formatDate(this.state.dateSelected);
        console.log(`render:formatted with / date selected:`, this.state.dateSelectedFormatted);
        // if (this.state.selectedOption === null || !this.state.selectedOption.value ||
        //     !this.state.selectedOption.value.Length)
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <center><h1>Select a state and date</h1></center>
                <div className='row'>
                    <div className="col-sm-3" >
                        <Select
                            autosize={true} onChange={this.handleChange} options={states}
                        />
                    </div>
                    <div className="col-sm-4" >
                        <DatePicker
                            placeholderText="Click to select a date"
                            selected={this.state.startDate}
                            onChange={this.handleDateChange}
                            name="selectedDate"
                            dateFormat="MM/dd/yyyy"
                            maxDate={yesterday}
                        />
                    </div>
                </div>
                {this.state.selectedOption && this.state.selectedOption.value &&
                    //this.state.dateSelectedFormatted &&
                    <StateCurrentFiltered key={this.state.selectedOption.value + "," + this.state.dateSelectedFormatted}
                        stateCode={this.state.selectedOption.value}
                        dateSelected={this.state.dateSelected}
                        dateSelectedFormatted={this.state.dateSelectedFormatted} />}
            </div>
        );
    }
}

export default StatesCurrent