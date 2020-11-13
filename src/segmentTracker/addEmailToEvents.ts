import { MiddlewareOptions } from '../../segmentInterface';
declare let window: CustomWindow;

export const addEmailToEvents = ({ payload, next }: MiddlewareOptions) => {
	const payloadWithEmail = {
		...payload,
		properties: addEmailToProperties(payload.properties),
	};
	next(payloadWithEmail);
};

const addEmailToProperties = (properties: LooseObject) => {
	const email = window.analytics.user && window.analytics.user().traits().email;
	if (email) {
		properties.email = email;
	}
	return properties;
};
