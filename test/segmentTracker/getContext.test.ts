const chai = require('chai');
const sinon = require('sinon');

const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();

import { CustomWindow } from '../../';
import { getContext } from '../../src/segmentTracker/helpers';
declare let window: CustomWindow;
//@ts-ignore
let traits;

describe('getContext function', () => {
	beforeEach(() => {
		traits = sinon.spy();
		global.window = {
			//@ts-ignore
			analytics: {
				//@ts-ignore
				user: () => ({ traits }),
			},
		};
	});
	it('should call traits() functions', () => {
		getContext();
		//@ts-ignore
		traits.should.be.calledOnce;
	});
});
