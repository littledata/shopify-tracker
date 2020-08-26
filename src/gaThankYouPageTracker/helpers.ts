export const getWebProperty = (scriptSrc: string): string => {
	const startIndex = scriptSrc.indexOf('webPropertIdy=');
	const webPropertId = scriptSrc.substring(startIndex + 14);
	return webPropertId;
};
