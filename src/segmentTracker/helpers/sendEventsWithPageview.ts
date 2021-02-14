import { trackEvent } from '../helpers';

export const sendEventsWithPageview = (pathname: string) => {
	if (pathname === '/cart') {
		trackEvent('Cart Viewed', {});
	}
	if (pathname === '/account/register') {
		trackEvent('Registration Viewed', {});
	}
	if (pathname === '/search') {
		trackEvent('Products Searched', {
			query: document.location.search.replace('?q=', '').replace('+', ' '),
		});
	}
};
