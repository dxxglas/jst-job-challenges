import React, { Component } from "react";
import Chart from "react-apexcharts";

import "./GraphicBox.scss";

class GraphicBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          type: "bar",
          height: 240,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: this.props.data.map((element) => element.genre),
        },
      },
      series: [
        {
          name: "Quantidade",
          data: this.props.data.map((element) => element.count),
        },
      ],
    };
  }

  render() {
    return (
      <div className="GraphicBox">
        <div className="gStructure">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={240}
          />
        </div>
      </div>
    );
  }
}

export default GraphicBox;
