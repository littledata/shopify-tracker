import { MiddlewareOptions } from '../../../segmentInterface';
import { CustomWindow } from '../../..';
declare let window: CustomWindow;

export const addEmailToTrackEvents = ({ payload, next }: MiddlewareOptions) => {
	if (payload.action() !== 'track') return next(payload);

	payload.obj = {
		...payload.obj,
		properties: addEmailToProperties(payload.obj.properties),
	};
	next(payload);
};

const addEmailToProperties = (properties: LooseObject) => {
	const email = window.analytics.user && window.analytics.user().traits().email;
	if (email) {
		properties.email = email;
	}
	return properties;
};
