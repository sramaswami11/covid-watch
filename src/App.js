import React, { Component } from 'react';
import UsCurrent from './components/usCurrent';
import StatesCurrent from './components/statesCurrent';
import Select from 'react-select';

const options = [
  { value: 'usCurrentAffected', label: 'US Current Affected List' },
  { value: 'statesDailyAffected', label: 'States Daily Affected List' }

];

const disclaimer = 'The information presented on this website is for general informational purposes only. \
The data is being pulled using third party Application Programming Interfaces (APIs) and hence all the \
information on this site is provided in good faith, so we make no representation on warranty, adequecy, \
validity, reliability or completeness of any information on this site.';

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
        <div className="container"
        style={{
          backgroundColor: 'lightblue'
          
        }}
        >
          <center><h1>US Covid-19 Status</h1></center>
          <center><h1>Select an option</h1></center>
          <Select className="col-sm-5"
            onChange={this.handleChange}
            options={options} />

          {this.state.selectedOption && this.state.selectedOption.value === 'usCurrentAffected' &&
            <UsCurrent />}
           {this.state.selectedOption && this.state.selectedOption.value === 'statesDailyAffected' &&
            <StatesCurrent />}
            <br/>
            <h7>{disclaimer} </h7>
            
      </div>);
    }



}




export default App;
