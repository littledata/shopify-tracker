export const getQueryStringParam = (url: string, param: string) => {
	if (!url) return '';
	const matches = url.match(`${param}=([a-z,A-Z,0-9,-]+)`);
	if (!matches || !matches.length || !matches[1]) return '';
	return matches[1];
};
