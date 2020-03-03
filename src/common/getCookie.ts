export const getCookie = (name: string): string => {
	if (document.cookie.length > 0) {
		const cookieStart = document.cookie.indexOf(`${name}=`);
		if (cookieStart !== -1) {
			const valueStart = cookieStart + name.length + 1;
			let cookieEnd = document.cookie.indexOf(';', valueStart);
			if (cookieEnd === -1) {
				cookieEnd = document.cookie.length;
			}
			const cookie = unescape(document.cookie.substring(valueStart, cookieEnd));
			if (name === '_ga') {
				const match = cookie.match(/(\d{2,11})\.(\d{2,11})/g);
				return match ? match[0] : '';
			}
			return cookie;
		}
	}
	return '';
};
