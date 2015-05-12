import LandmarkParticleSet from './landmark-particle-set';

class LandmarkInitializationSet {
	constructor(nParticles = 50, stdRange = 2, randomParticles = 10, effectiveParticleThreshold = 20) {
		this.nParticles = nParticles;
		this.stdRange = stdRange;
		this.randomParticles = randomParticles;
		this.effectiveParticleThreshold = effectiveParticleThreshold;
		this.particles = new Map();
	}

	addMeasurement(uid, x, y, r) {
		if (!this.has(uid)) {
			this.particles.set(uid, new LandmarkParticleSet(
				this.nParticles, this.stdRange, this.randomParticles, this.effectiveParticleThreshold
			));
		}

		this.particles.get(uid).addMeasurement(x, y, r);

		return this;
	}

	has(uid) {
		return this.particles.has(uid);
	}

	estimate(uid) {
		return this.particles.get(uid).positionEstimate();
	}

	remove(uid) {
		console.debug('Not implemented yet');
	}
}

export default LandmarkInitializationSet;