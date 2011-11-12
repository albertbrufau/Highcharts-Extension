/*global jQuery: true */
/**
 * @license Copyright (C) 2011 by Albert Brufau (http://github.com/albertbrufau)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var HighchartsExtension = (function () {
	return {
		Preprocess: function(c) {
			if (typeof c.preprocessed === 'undefined') {
				c.chartTotal = 0;
				c.chartMean = 0;

				c.totalPoints = 0;

				c.chartMin = false;
				c.chartMax = false;

				c.metadataPoint = [];

				jQuery.each(c.series, function (i, s) {
					s.serieTotal = 0;
					s.serieMean = 0;

					s.serieMin = false;
					s.serieMax = false;

					s.totalPoints = 0;

					if (s.data.length > 0) {
						s.serieMin = s.data[0].y;
						s.serieMax = s.data[0].y;
					}
					jQuery.each(s.data, function (i, point) {
						if(point.y !== null) {
							if(typeof c.metadataPoint[point.x] === 'undefined'){
								c.metadataPoint[point.x] = [];
								c.metadataPoint[point.x].pointTotal = 0;
								c.metadataPoint[point.x].pointMin = point.y;
								c.metadataPoint[point.x].pointMax = point.y;
								c.metadataPoint[point.x].totalPoints = 0;
							}
							if (s.serieMin > point.y) { s.serieMin = point.y; }
							if (s.serieMax < point.y) { s.serieMax = point.y; }
							s.serieTotal += point.y;
							s.totalPoints++;

							if (c.metadataPoint[point.x].pointMin > point.y) { c.metadataPoint[point.x].pointMin = point.y; }
							if (c.metadataPoint[point.x].pointMax < point.y) { c.metadataPoint[point.x].pointMax = point.y; }
							c.metadataPoint[point.x].pointTotal += point.y;
							c.metadataPoint[point.x].totalPoints++;

							c.totalPoints++;
						}
					});

					c.chartTotal += s.serieTotal;
					s.serieMean = (s.totalPoints ? s.serieTotal / s.totalPoints : 0);

					if (c.chartMin === false) { c.chartMin = s.serieMin; }
					if (c.chartMax === false) { c.chartMin = s.serieMax; }

					if (c.chartMin > s.serieMin) { c.chartMin = s.serieMin; }
					if (c.chartMax < s.serieMax) { c.chartMax = s.serieMax; }

				});
				c.chartMean = (c.totalPoints ? c.chartTotal / c.totalPoints : 0);
				c.preprocessed = true;
				return true;
			} else {
				return false;
			}
		},


		PointFormatter: function (p) {
			if (typeof p.processed === 'undefined') {
				if(p.y !== null) {
					this.Preprocess(p.series.chart);
					var metadata = p.series.chart.metadataPoint[p.point.x];
					
					p.seriePercentage = p.point.seriePercentage = (p.series.serieTotal ? p.y / p.series.serieTotal * 100 : 0);
					p.chartPercentage = p.point.chartPercentage = (p.series.chart.chartTotal ? p.y / p.series.chart.chartTotal * 100 : 0);
					p.pointPercentage = p.point.pointPercentage = (metadata.pointTotal ? p.y / metadata.pointTotal * 100 : 0);
					p.pointMean = p.point.pointMean = (metadata.totalPoints ? metadata.pointTotal / metadata.totalPoints : 0);
					p.pointMin = p.point.pointMin = metadata.pointMin;
					p.pointMax = p.point.pointMax = metadata.pointMax;
					p.pointTotal = p.point.pointTotal = metadata.pointTotal;
					p.totalPoints = p.point.totalPoints = metadata.totalPoints;
					
				}
				p.processed = true;
				return true;
			} else {
				return false;
			}
		},

		TooltipFormatter: function (p) {
			return HighchartsExtension.PointFormatter(p);
		},

		DataLabelFormatter: function (p) {
			return HighchartsExtension.PointFormatter(p);
		},

		LegendLabelFormatter: function (s) {
			if (typeof s.processed === 'undefined') {
				HighchartsExtension.Preprocess(s.chart);
				s.chartPercentage = (s.chart.chartTotal ? s.serieTotal / s.chart.chartTotal * 100 : 0);
				s.processed = true;
				return true;
			} else {
				return false;
			}
		}
	};
}());
