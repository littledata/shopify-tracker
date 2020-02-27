export const getCookie = (name: string): string => {
	if (document.cookie.length > 0) {
		let cookieStart = document.cookie.indexOf(`${name}=`);
		if (cookieStart !== -1) {
			cookieStart = cookieStart + name.length + 1;
			let cookieEnd = document.cookie.indexOf(';', cookieStart);
			if (cookieEnd === -1) {
				cookieEnd = document.cookie.length;
			}
			const cookie = unescape(document.cookie.substring(cookieStart, cookieEnd));
			if ((name = '_ga')) {
				const match = cookie.match(/(\d{2,11})\.(\d{2,11})/g);
				return match ? match[0] : '';
			}
			return cookie;
		}
	}
	return '';
};
