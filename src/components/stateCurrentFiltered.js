import React from 'react'
import { Bar } from 'react-chartjs-2';

class StateCurrentFiltered extends React.Component {
  constructor(props) {
    console.log("constructor called,with stateCode= " + props.stateCode);
    super(props);
    this.state = {
      stateCode: props.stateCode,
      state_current: [],
      date_selected: props.dateSelected,
      date_selected_formatted: props.dateSelectedFormatted
    };

  }

  componentDidMount() {
    let url = `https://covidtracking.com/api/states/daily?state=${this.state.stateCode}&date=${this.state.date_selected}`;
    console.log('url:' + url);
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        this.setState({ state_current: data })
      })
      .catch(console.log)
  }

  render() {

    let myData = {
      labels: ['Positive', 'Negative', 'Pending', 'Hospitalized',
        'Death', 'Total'],
      datasets: [
        {
          label: '# of people',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: Object.values(this.state.state_current).splice(2, 6)
        }
      ]
    };
    console.log(this.state.state_current);
    if (!this.state.state_current || this.state.state_current.error === true) {
      return "No data is available. Please change the search criteria and try again";
    }
    return (
      <div>
        <br />
        <center><h1>Current Affected List for {this.state.state_current.state} as of {this.state.date_selected_formatted}</h1></center>
        <div className="card">
          <div className="card-body">
            <h5 className="card-text">Date:  {this.state.date_selected_formatted}</h5>
            <h5 className="card-text">State:  {this.state.state_current.state}</h5>
            <h5 className="card-text">Positive:  {this.state.state_current.positive}</h5>
            <h5 className="card-text">Negative:  {this.state.state_current.negative}</h5>
            {this.state.state_current.pending != null &&
            <h5 className="card-text">Pending:  {this.state.state_current.pending}</h5>}
            <h5 className="card-text">Deaths:  {this.state.state_current.death}</h5>
            <h5 className="card-text">Total:  {this.state.state_current.total}</h5>
          </div>
        </div>
        <Bar
          data={myData}
          options={{
            title: {
              display: true,
              text: 'Covid-19  status for ' + this.state.state_current.state + ' as of  ' + this.state.date_selected_formatted,
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </div>)
  }



}


export default StateCurrentFiltered