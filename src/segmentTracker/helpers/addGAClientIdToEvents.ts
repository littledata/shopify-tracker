import { MiddlewareOptions } from '../../../segmentInterface';
import { getCookie, getValidGAClientId } from '../../common/getCookie';

// Segment only adds GA ClientID for the GA destination by default
// Adding it here sends it to Segment's servers, regardless of whether GA desintation is enabled
// Events with client ID can then be relayed to GA server-side
export const addGAClientIdToEvents = ({ payload, next }: MiddlewareOptions) => {
	payload.obj = {
		...payload.obj,
		integrations: addGACientId(payload.obj.integrations),
	};
	next(payload);
};

const addGACientId = (integrations: LooseObject) => {
	const gaCookie = getCookie('_ga');
	const clientId = getValidGAClientId(gaCookie);
	if (clientId) {
		integrations['Google Analytics'] = {};
		integrations['Google Analytics'].clientId = clientId;
	}
	return integrations;
};
