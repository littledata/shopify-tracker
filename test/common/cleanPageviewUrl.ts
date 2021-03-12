import { cleanPageviewUrl } from '../../src/common/removePii';

import { should } from 'chai';
should();

describe('cleanPageviewUrl', () => {
	it('passes through URL with no slash', () => {
		const url = 'https://mystore.com?test=true';
		cleanPageviewUrl(url).should.equal(url);
	});
	it('removes slash', () => {
		cleanPageviewUrl('https://mystore.com/').should.equal('https://mystore.com');
	});
	it('removes slash and keeps params', () => {
		cleanPageviewUrl('https://mystore.com/?test=true').should.equal('https://mystore.com?test=true');
	});
	it('removes PII and slash', () => {
		cleanPageviewUrl('https://mystore.com/?email=edward@test.com').should.equal('https://mystore.com?emailREMOVED');
	});
	it('removes postcode', () => {
		cleanPageviewUrl('https://mystore.com/RG25%200JY').should.equal('https://mystore.comREMOVED');
	});
});
