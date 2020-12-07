import { should } from 'chai';
import { sampleCartHookLineItems } from './sampleCartHookLineItems';
import { convertToGtagProducts, sumProductSubtotal, sumProductTax } from '../../src/carthookTracker/helpers';

should();

describe('convertToGtagProducts', () => {
	it('returns empty array with no products', () => {
		convertToGtagProducts([]).should.deep.equal([]);
	});

	it('parses sample line items', () => {
		convertToGtagProducts(sampleCartHookLineItems)[0].should.deep.equal({
			price: '10.00',
			id: '2035740541017',
			quantity: 1,
			name: 'Inox tap - CH',
			variant: 'Default Title',
			brand: 'rares-ultimate-store',
		});
	});
});

describe('sumProductSubtotal sumProductTax', () => {
	it('returns 0 with no products', () => {
		sumProductSubtotal([]).should.equal(0);
		sumProductTax([]).should.equal(0);
	});

	it('parses sample line items', () => {
		sumProductSubtotal(sampleCartHookLineItems).should.equal(10);
		sumProductTax(sampleCartHookLineItems).should.equal(4);
	});

	it('parses multiple products', () => {
		const sample = [
			{ price: 2, quantity: 5, tax_amount: 2 },
			{ price: 5, quantity: 2, tax_amount: 3 },
		];
		sumProductSubtotal(sample).should.equal(20);
		sumProductTax(sample).should.equal(5);
	});
});
