(Simple) HighchartsExtension
----------------------------

This is a simple extension for the wonderful library Highcharts (www.highcharts.com). This library provides more information to the chart, series and points objects to be used in the formmating functions (like total, mean, maximum, minimum, etc).

Author
------

Albert Brufau (http://github.com/albertbrufau)


Installation
------------

This script requires Hihghcharts available at www.highcharts.com.

You might use the minified version (build/highcharts-extension.min.js):

		<script src="highcharts-extension.min.js" type="text/javascript"></script>

Usage
-----

When using a formatter function, you can call to its extension wrapper function to add the information.

Example:

		dataLabels: {
			enabled: true,
			formatter: function() {
				HighchartsExtension.DataLabelFormatter( this );
				return Highcharts.numberFormat( this.chartPercentage, 2) + '% ' + '(Total ' + this.series.chart.chartTotal + ')';
			}
		}

The extension wrapper functions are:

* HighchartsExtension.DataLabelFormatter for: "plotOptions: { xxx: { dataLabels: { formatter: function() { ..."
* HighchartsExtension.TooltipFormatter for: "tooltip: { formatter: function() { ..."
* HighchartsExtension.LegendLabelFormatter for: "legend: { labelFormatter: function() { ..."


It adds following information to the objects:


Object Chart:
* chartTotal: Sum of all chart's values
* chartMean: Mean of all chart
* chartPonints: The number of chart's values
* chartMin: The minimum chart's value
* chartMax: The maximum chart's value

Object Serie:
* serieTotal: Sum of all serie's values
* serieMean: Mean of all serie
* seriePonints: The number of serie's values
* serieMin: The minimum serie's value
* serieMax: The maximum serie's value
* chartPercentage: The weight (in %) in the chart

Object Point:
* pointTotal: Sum of all x-axis point's values
* pointMean: Mean of all x-axis point
* totalPoints: The number of x-axis point's values
* pointMin: The minimum x-axis point's value
* pointMax: The minimum x-axis point's value
* pointPercentage: The weight (in %) in the x-axis point
* seriePercentage: The weight (in %) in the serie
* chartPercentage: The weight (in %) in the chart

Examples
--------

You can find some useful examples in the /examples folder.


Changelog
---------

2011-11-12

* Initial release
