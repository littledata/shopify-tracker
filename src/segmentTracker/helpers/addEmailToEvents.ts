import { MiddlewareOptions } from '../../segmentInterface';
declare let window: CustomWindow;

export const addEmailToEvents = ({ payload, next }: MiddlewareOptions) => {
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
