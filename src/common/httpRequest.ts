export const getJSON = (url: string) => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', realOrTestUrl(url));
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(JSON.parse(xhr.response));
			} else {
				reject(xhr.statusText);
			}
		};
		xhr.onerror = () => reject(xhr.statusText);
		xhr.send();
	});
};

export const postJSON = (url: string, body: object) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(JSON.parse(xhr.response));
			} else {
				reject(xhr.statusText);
			}
		};
		xhr.onerror = () => reject(xhr.statusText);
		xhr.open('POST', realOrTestUrl(url));
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(body));
	});
};

const realOrTestUrl = (url: string) => {
	if (url[0] !== '/') return url;
	const testing = process.env.NODE_ENV === 'test';
	return `${testing ? 'http://localhost' : ''}url`;
};
