import React, { Component } from 'react';
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {withRouter} from "react-router";

import Sales from '../ui-components/Graphs/Sales';
import DateRangePicker from '../ui-components/DateRangePicker';

const data = require('../data.js');

class EducationPageRouter extends Component {
  constructor() {
    super()
    this.state = {
        data: data.formattedSales,
        startDate: data.formattedSales[0].date,
        endDate: data.formattedSales[data.formattedSales.length-1].date
    }
    this.handleChange = this.handleChange.bind(this)
    this.setDateRange = this.setDateRange.bind(this)
  }

  handleChange(event) {
    var dateRange = event.target.value.split(' - ')
    this.setDateRange(dateRange[0], dateRange[1])
  }

  setDateRange(startDate, endDate) {
    this.setState({startDate: startDate})
    this.setState({endDate: endDate})
  }

  render() {
    return (
      <div className="App">
        <CardContent>
          <h1 className="App-title"><span className="car">Car</span> and <span className="phone">Phone</span> Sales Report</h1>
        </CardContent>
        <p className="App-intro">
          Choose a date range to display. Save the chart as an SVG.
        </p>
        <DateRangePicker
          data={this.state.data}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          handleChange={this.handleChange}
          setDateRange={this.setDateRange}/>
        <Sales
          data={this.state.data}
          startDate={this.state.startDate}
          endDate={this.state.endDate} />
      </div>
    );
  }
}

const EducationPage = withRouter(EducationPageRouter);


export default (EducationPage);
