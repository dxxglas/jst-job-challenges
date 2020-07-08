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
          height: 300,
        },
        colors: ["#755fe2"],
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: "rounded",
            barHeight: "100%",
          },
        },
        dataLabels: {
          enabled: false,
          position: "bottom",
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: this.props.data.map((element) => element.genre),
        },
        fill: {
          colors: ["#755fe2"],
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
            className="graphicBars"
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={300}
          />
        </div>
      </div>
    );
  }
}

export default GraphicBox;
