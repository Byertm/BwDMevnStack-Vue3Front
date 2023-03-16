// import emitter from 'tiny-emitter/instance';

// export default {
// 	$on: (...args) => emitter.on(...args),
// 	$once: (...args) => emitter.once(...args),
// 	$off: (...args) => emitter.off(...args),
// 	$emit: (...args) => emitter.emit(...args)
// };

const events = new Map();

export default {
	$on(eventName: string, fn: Function) {
		if (!events.has(eventName)) events.set(eventName, []);
		events.get(eventName).push(fn);
	},

	$off(_eventName: string, _fn: Function) {
		throw { message: 'Not implemented' };
	},

	$emit(eventName: string, data: any) {
		if (events.has(eventName)) {
			events.get(eventName).forEach((fn: Function) => fn(data));
		}
	}
};