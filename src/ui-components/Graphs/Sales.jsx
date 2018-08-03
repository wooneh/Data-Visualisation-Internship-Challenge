import React, { Component } from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer, Legend} from 'recharts';
import { saveAs } from 'file-saver/FileSaver';

class Sales extends Component {
  constructor(props) {
    super(props)
    this.barChart = React.createRef();
    this.exportChart = this.exportChart.bind(this);
  }

  // Change the date format from dd/MM/yy to MM/dd/yy
  changeDateFormat(date) {
    var dateParts = date.split('/');
    var newDate = new Date(parseInt(dateParts[2], 10),
                            parseInt(dateParts[1], 10) - 1,
                            parseInt(dateParts[0], 10));

    return newDate;
  }

  exportChart() {
    let chartSVG = this.barChart.current.container.children[0];
    let svgURL = new XMLSerializer().serializeToString(chartSVG);
    let svgBlob = new Blob([svgURL], {type: "image/svg+xml;charset=utf-8"});

    saveAs(svgBlob, "chart.svg");
  }

  render() {
    let finalData = [],
        startDate = this.changeDateFormat(this.props.startDate),
        endDate = this.changeDateFormat(this.props.endDate),
        currentDate;

    for (var i in this.props.data) {
      currentDate = this.changeDateFormat(this.props.data[i].date)
      if (currentDate >= startDate && currentDate <= endDate) {
          finalData.push(this.props.data[i])
      }
    }

    return (
      <div className="salesChart">
        <ResponsiveContainer width='100%' height={300}>
          <BarChart ref={this.barChart}
                    cx="50%" cy="50%" outerRadius="80%" data={finalData}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="car" fill="#8884d8" />
            <Bar dataKey="phone" fill="#82ca9d"  />
          </BarChart>
        </ResponsiveContainer>
        <div className="btn btn-primary" id="btn-save" onClick={this.exportChart}>Save chart</div>
      </div>
    );
  }
}

export default Sales
