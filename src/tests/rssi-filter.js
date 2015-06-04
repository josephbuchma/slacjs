import Landmark from '../app/simulation/landmark';
import config from '../app/config';
import KalmanFilter from '../app/util/kalman';

if (window.test === undefined) {
	window.test = {};
}

window.test.rssiFilter = {

	landmark: undefined,
	kalman: undefined,

	userX: 5,
	userY: 0,

	rssiTrue: [],
	rssiRaw: [],
	rssiFiltered: [],
	error: [],
	realError: [],

	iteration: 0,

	initialize: function() {

		this.landmark = new Landmark('uid', {x: 0, y: 0}, config.beacons);
		this.kalman = new KalmanFilter({
			Q: config.beacons.noise,
			R: 1
		});
	},

	iterate: function() {

		const rssi = this.landmark.rssiAt(this.userX, this.userY);
		const rssiTrue = this.landmark.rssiAtRaw(this.userX, this.userY);
		const rssiFiltered = this.kalman.filter(rssi);

		this.rssiTrue.push([this.iteration, rssiTrue]);
		this.rssiRaw.push([this.iteration, rssi]);
		this.rssiFiltered.push([this.iteraton, rssiFiltered]);

		this.error.push(Math.abs(rssiTrue - rssiFiltered));
		this.realError.push(Math.abs(rssiTrue - rssi));

		this.iteration++;


		this.userX += 0.2;

	},

	plot: function() {
		$('#test-content').highcharts({
			chart: {
				type: 'scatter'
			},
			title: {
				text: 'RSSI'
			},
			xAxis: {
				title: {
					text: 'Time'
				}
			},
			yAxis: {
				title: {
					text: 'RSSI'
				}
			},
			series: [
				{
					name: 'True RSSI',
					data: this.rssiTrue
				},
				{
					name: 'Raw RSSI',
					data: this.rssiRaw
				},

				{
					name: 'Filtered RSSI',
					type: 'line',
					data: this.rssiFiltered
				}
			]
		});

		$('#test-error').html(this.error.reduce((p, c, i) => p+(c-p)/(i+1), 0));
		$('#test-error-real').html(this.realError.reduce((p, c, i) => p+(c-p)/(i+1), 0));
	}
};