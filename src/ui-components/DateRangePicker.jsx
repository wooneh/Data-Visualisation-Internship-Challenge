import React, { Component } from 'react';
import * as $ from 'jquery';
import 'moment';
import 'daterangepicker';

import '../css/daterangepicker.css';
import '../css/bootstrap.css'

class DateRangePicker extends Component {

  render() {
    let minDate = this.props.data[0].date,
        maxDate = this.props.data[this.props.data.length - 1].date,
        startDate = this.props.startDate,
        endDate = this.props.endDate;

    $(function() {
      $('input[name="daterange"]').daterangepicker({
        opens: 'right',
        minDate: minDate,
        maxDate: maxDate,
        startDate: startDate,
        endDate: endDate,
        locale: {
          format: "DD/MM/YY"
        }
      });

      $('input[name="daterange"]').on('apply.daterangepicker', (ev, picker) => {
        this.props.setDateRange(picker.startDate.format('DD/MM/YY'), picker.endDate.format('DD/MM/YY'))
      });
    }.bind(this));

    return (
      <div className="dateRangePicker">
        <div className="form-group">
          <label>Select a date range</label>
          <input className="form-control" type="text" name="daterange" onChange={this.props.handleChange} />
        </div>
      </div>
    );
  }
}

export default DateRangePicker
