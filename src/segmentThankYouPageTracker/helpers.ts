export const getProperties = (scriptSrc: string): { webPropertyId: string; segmentProperty: string } => {
	const startIndexGa = scriptSrc.indexOf('webPropertyId=');
	const webPropertyId = startIndexGa && scriptSrc.substring(startIndexGa + 14);
	const startIndexSegment = scriptSrc.indexOf('segmentProperty=');
	const segmentProperty = startIndexSegment && scriptSrc.substring(startIndexSegment + 16);
	return { webPropertyId, segmentProperty };
};
