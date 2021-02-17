export const requestJSON = (url: string) => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url);
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
