import React from 'react'
import Select from 'react-select';
import * as consts from './constants';
import StateCurrentFiltered from './stateCurrentFiltered';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

let states = consts.statesLin.map(e => ({ value: e, label: e }))

class StatesCurrent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedOption: [],
            startDate: new Date(),
            dateSelectedFormatted: null
        }

        this.handleDateChange = this.handleDateChange.bind(this);
    };



    handleChange = (selectedOption) => {
        this.setState({ selectedOption });

    }

    formatDate(date) {
        let dateSelectedFormatted = moment(date).format('MM/DD/YYYY');
        return dateSelectedFormatted;
    }

    handleDateChange(startDate) {

        let dateSelected = moment(startDate).format('YYYYMMDD');
        let dateSelectedFormatted = this.formatDate(startDate);
        this.setState({ startDate, dateSelected, dateSelectedFormatted });

    }

    render() {
        if (!this.state.dateSelected)
            this.setState({ dateSelected: moment(this.state.startDate).format('YYYYMMDD') });

        if (!this.state.dateSelectedFormatted)
            this.setState({ dateSelectedFormatted: this.formatDate(this.state.dateSelected) });


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
                            maxDate={new Date()}
                        />
                    </div>
                </div>
                {this.state.selectedOption && this.state.selectedOption.value &&
                    <StateCurrentFiltered key={this.state.selectedOption.value + "," + this.state.dateSelectedFormatted}
                        stateCode={this.state.selectedOption.value}
                        dateSelected={this.state.dateSelected}
                        dateSelectedFormatted={this.state.dateSelectedFormatted} />}
            </div>
        );
    }
}

export default StatesCurrent