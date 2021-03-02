import { CustomWindow } from '../..';
declare let window: CustomWindow;

export const customTask = (endpoint: string) => {
	return function(customTaskModel: LooseObject) {
		window._ga_originalSendHitTask = window._ga_originalSendHitTask || customTaskModel.get('sendHitTask');

		customTaskModel.set('sendHitTask', function(sendHitTaskModel: LooseObject) {
			const originalSendHitTask = window._ga_originalSendHitTask;

			try {
				originalSendHitTask(sendHitTaskModel);
				const hitPayload = sendHitTaskModel.get('hitPayload');
				const request = new XMLHttpRequest();
				request.open('POST', endpoint, true);
				request.withCredentials = false;
				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				request.send(hitPayload);
			} catch (err) {
				originalSendHitTask(sendHitTaskModel);
			}
		});
	};
};
