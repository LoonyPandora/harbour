$(document).ready(function () {

    var grid = new hashgrid();


    // Example Chart
    $(".canvas-pie-chart").easyPieChart({
      animate: 500,
      scaleColor: false,
      lineWidth: 5,
      // rotate: -90,
      lineCap: "round",
      size: 100,
      trackColor: "#bdc3c7",
      barColor: "#2980b9"
    });

});