import ParticleSet from './models/particle-set';
import Visualizer from './view/visualizer';
import SimulatedUser from './simulation/user';
import { SimulatedLandmarkSet } from './simulation/landmark';
import Sensor from './models/sensor';
import config from './config';

window.SlacENV = config.environment;

window.SlacApp = {

	particleSet: undefined,
	visualizer: undefined,
	user: undefined,
	landmarks: undefined,
	sensor: undefined,

	initialize: function() {
		'use strict';

		this.particleSet = new ParticleSet(config.particles.N, config.particles.defaultPose);
		this.visualizer = new Visualizer('slac-map', 100, 100);
		this.user = new SimulatedUser({x: 0, y: 0, theta: 0.0}, 2, {xRange: 50, yRange: 50, padding: 5});

		//Add simulated data to the user object
		//this._addSimulatedData();

		this.landmarks = new SimulatedLandmarkSet(40, {xRange: 50, yRange: 50}, 50, config.beacons);
		this.sensor = new Sensor(config.beacons);

		//Start broadcasting of the simulated landmarks
		//Broadcasts are sent to the sensor, the user object is used to find nearby landmarks
		this.landmarks.startBroadcast(this.sensor, this.user);
	},

	step: function() {
		this.user.randomWalk();

		//Get accelerometer data
		// ...

		//Transform to angle and distance
		//Simulate this by getting the control from the simulated user
		const {r, theta} = this.user.getLastControl();

		//Sample a new pose for each particle in the set
		this.particleSet.samplePose({r, theta});

		//Get the latest observation
		const observations = this.sensor.getObservations();

		observations.forEach((obs) => this.particleSet.processObservation(obs));

		this.particleSet.resample();

		//Update the canvas
		this.visualizer.clearCanvas()
						.plotUserTrace(this.user, 'blue', config.beacons.range)
						.plotObjects(this.landmarks.landmarks)
						.plotParticleSet(this.particleSet);

		if (window.SlacENV == 'debug') {
			this.visualizer.plotLandmarkPredictions(this.particleSet.particles(), this.landmarks);
			this.visualizer.plotLandmarkInitParticles(this.particleSet.landmarkInitSet);
		}
		else {
			this.visualizer.plotLandmarkEstimate(this.particleSet.landmarkEstimate(), this.landmarks);
		}
	},

	_addSimulatedData: function() {
		const thetas =
			[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.08099418560036185, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.002454369260617026, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.000818123086872342, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.000545415391248228, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.001636246173744684, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.000272707695624114, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.000272707695624114, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.004363323129985824, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.006544984694978736, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.0029997846518652537, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.0029997846518652537, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.001908953869368798, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.000818123086872342, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.006272276999354622, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.001090830782496456, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.08290313946973066, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.00545415391248228, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.11344640137963143, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.09272061651219876, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.007363107781851078, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.20453077171808548, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.1598067096357308, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.1990766178056032, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.241619018322965, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.1562615095926173, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.22552926428114228, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.23425591054111392, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.31334114227210697, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.22362031041177347, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.0681769239060285, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.12871803233458182, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.08426667794785123, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0995383089028016, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.006544984694978736, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.00272707695624114, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.000818123086872342, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0029997846518652537, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.003272492347489368, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.06899504699290084, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.06599526234103559, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0719948316447661, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.007090400086226964, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.0029997846518652537, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.13199052468207118, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.12408200150897186, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.1892591407631351, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.13335406316019174, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.13717197089892932, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.13799009398580167, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.10471975511965978, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.10608329359778035, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.0703585854710214, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.004363323129985824, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.001090830782496456, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.004636030825609938, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.08699375490409236, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.00545415391248228, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.004908738521234052, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.002181661564992912, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.000818123086872342, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.001908953869368798, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.002181661564992912, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.0029997846518652537, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.005726861608106394, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.06463172386291502, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.08835729338221293, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.06844963160165261, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.007090400086226964, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.004908738521234052, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.00136353847812057, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.08235772407848242, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.09844747812030515, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.17862354063379465, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.275162064884731, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2519819107566813, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.41369757426178094, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.37879098922189436, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5162356678164478, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.4955098829490151, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.32288591161895097, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.25443628001729834, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.14862569411514212, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.11017390903214205, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0859029241215959, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.007090400086226964, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.007635815477475192, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.007635815477475192, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.007363107781851078, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0029997846518652537, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.000272707695624114, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.0719948316447661, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.07308566242726255, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.1366265555076811, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.11671889372712078, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.07526732399225546, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.001636246173744684, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.003817907738737596, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.24461880297483024, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3239767424014474, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.26207209549477356, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.28197975727533386, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.19144080232812802, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.13880821707267402, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.07063129316664553, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0040906154343617095, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0040906154343617095, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.00272707695624114, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.001636246173744684, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.001908953869368798, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.001636246173744684, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.003272492347489368, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.06299547768917033, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.00545415391248228, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.003545200043113482, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.007090400086226964, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.07635815477475191, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.09272061651219876, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.20398535632683726, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.18953184845875923, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.20153098706622025, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1502619402888868, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.15162547876700738, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -6.149013120932523, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.09626581655531224, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.09326603190344698, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.007635815477475192, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.007363107781851078, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.003817907738737596, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.00272707695624114, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.00272707695624114, 0.0];
		const distances = thetas.map(() => 0.16);

		this.user.setPath(distances, thetas);
	}
};