export const getProperties = (scriptSrc: string): { webPropertyId: string; segmentProperty: string } => {
	const startIndexGa = scriptSrc.indexOf('webPropertyId=');
	const endIndexGa = scriptSrc.indexOf('&', startIndexGa);
	const webPropertyId = startIndexGa && scriptSrc.substring(startIndexGa + 14, endIndexGa);
	const startIndexSegment = scriptSrc.indexOf('segmentProperty=', endIndexGa);
	const segmentProperty = startIndexSegment && scriptSrc.substring(startIndexSegment);
	return { webPropertyId, segmentProperty };
};
