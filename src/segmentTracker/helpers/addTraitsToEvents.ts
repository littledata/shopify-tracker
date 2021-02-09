import { MiddlewareOptions } from '../../../segmentInterface';
import { CustomWindow } from '../../..';
declare let window: CustomWindow;

export const addTraitsToTrackEvents = ({ payload, next }: MiddlewareOptions) => {
	if (payload.action() !== 'track') return next(payload);

	payload.obj = {
		...payload.obj,
		properties: addTraitsToProperties(payload.obj.properties),
	};
	next(payload);
};

const addTraitsToProperties = (properties: LooseObject) => {
	const traits = window.analytics.user && window.analytics.user().traits();
	if (traits) {
		properties.traits = traits;
	}
	return properties;
};
