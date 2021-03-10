export function removePii(str: string): string {
	const piiRegexs = [
		{
			key: 'email',
			regex: /[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/,
		},
		{
			key: 'postcode',
			regex: /[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/,
		},
	];

	return piiRegexs.reduce((memo, curr) => memo.replace(curr.regex, 'REMOVED'), str);
}
