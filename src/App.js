import React, { Component } from 'react';
import UsCurrent from './components/usCurrent';
import StatesCurrent from './components/statesCurrent';
import Select from 'react-select';

const options = [
  { value: 'usCurrentAffected', label: 'US Current Affected List' },
  { value: 'statesDailyAffected', label: 'States Daily Affected List' }

];

class App extends Component {

  state = {
    selectedOption: null
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);

  }

   render() {
    if (this.state.selectedOption === null || !this.state.selectedOption.value ||
      !this.state.selectedOption.value.Length)
      return (
        <div>
          <center><h1>US Covid-19 Status</h1></center>
          <center><h1>Select an option</h1></center>
          <Select className="col-sm-5"
            onChange={this.handleChange}
            options={options} />

          {this.state.selectedOption && this.state.selectedOption.value === 'usCurrentAffected' &&
            <UsCurrent />}
           {this.state.selectedOption && this.state.selectedOption.value === 'statesDailyAffected' &&
            <StatesCurrent />}
      </div>);
    }



}




export default App;
