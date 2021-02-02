import { should } from 'chai';
import { getQueryStringParam } from '../../src/common/getQueryStringParam';
declare let window: CustomWindow;

should();

describe('getQueryStringParam', () => {
	it('should return empty string with invalid URL', () => {
		getQueryStringParam('test', 'param').should.equal('');
		getQueryStringParam('https://test.com?param', 'param').should.equal('');
	});
	it('should find query param', () => {
		getQueryStringParam('https://test.com?test=true', 'test').should.equal('true');
		getQueryStringParam('https://test.com?test=true&ignore=false', 'test').should.equal('true');
		getQueryStringParam('https://test.com?ignore=true&test=abc123', 'test').should.equal('abc123');
		getQueryStringParam('https://test.com?ignore=true&test=ABC123&repeat=ABC123', 'test').should.equal('ABC123');
		getQueryStringParam('https://test.com?ignore=true&test=ABC123&test=ABC123', 'test').should.equal('ABC123');
	});
});
