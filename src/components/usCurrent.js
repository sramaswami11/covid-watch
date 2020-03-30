 // src/components/usCurrent.js

 import React from 'react'
 import {Bar} from 'react-chartjs-2';
 
 class UsCurrent extends React.Component {
    constructor(props) {
        console.log("constructor called")
        super(props);
        this.state = {us_current: []
        };
      }

      componentDidMount() {
        fetch('https://covidtracking.com/api/us')
        .then(res => res.json())
        .then((data) => {
          this.setState({ us_current: data })
          console.log(this.state.us_current)
        })
        .catch(console.log)
      }

    render() {
        // console.log( Object.values(this.props.us_current[0]));
        if (!this.state.us_current || !this.state.us_current.length) {
            return "Loading...";
        }
        let myData = {
            labels: ['Positive', 'Negative', 'PosNegative',
            'Pending', 'Death','Total'],
            datasets: [
                {
                  label: '# of people',
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 2,
                  data: Object.values(this.state.us_current[0])
                }
              ]
        };
        return (
            <div>
              <center><h1>US Current Affected List</h1></center>
              {this.state.us_current.map((affected) => (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-text">Positive:  {affected.positive}</h5>
                    <h5 className="card-text">Negative:  {affected.negative}</h5>
                    <h5 className="card-text">Death:  {affected.death}</h5>
                    <h5 className="card-text">Total:  {affected.total}</h5>
                  </div>
                </div>
              ))}
 
             <Bar
               data={myData}
               options={{
                 title:{
                   display:true,
                   text:'Covid-19 current status',
                   fontSize:20
                 },
                 legend:{
                   display:true,
                   position:'right'
                 }
               }}
             />
           </div>
          )
    }
  }

  export default UsCurrent