import ChartDataLabels from "chartjs-plugin-datalabels";

export const chartDefaultConfig = {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13
        },
        color: `#000000`,
        anchor: "end",
        align: "start"
      }
    },
    title: {
      display: true,
      text: `UNTITLED_CHART`,
      fontColor: `#000000`,
      fontSize: 23,
      position: `left`
    },

    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    }
  }
};
