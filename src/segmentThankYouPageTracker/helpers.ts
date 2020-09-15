export const getProperties = (scriptSrc: string): { webPropertyId: string; segmentProperty: string } => {
	const startIndexGa = scriptSrc.indexOf('webPropertyId=');
	const endIndexGa = scriptSrc.indexOf('&', startIndexGa);
	const webPropertyId =
		startIndexGa && scriptSrc.substring(startIndexGa + 14, endIndexGa > -1 ? endIndexGa : scriptSrc.length);
	const startIndexSegment = scriptSrc.indexOf('segmentProperty=');
	const endIndexSegment = scriptSrc.indexOf('&', startIndexSegment);
	const segmentProperty =
		startIndexSegment &&
		scriptSrc.substring(startIndexSegment + 16, endIndexSegment ? endIndexSegment : scriptSrc.length);
	return { webPropertyId, segmentProperty };
};
