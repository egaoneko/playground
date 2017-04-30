import chai from "chai";
import * as base from "../../src/utils/base";

let assert = chai.assert;

describe('Base util test', () => {
	describe('typeCheck Test', () => {
		it('Check String', () => {
			assert.isTrue(base.typeCheck('string', 'Test String'));
			assert.isNotTrue(base.typeCheck('string', 123));
		});

		it('Check Integer', () => {
			assert.isTrue(base.typeCheck('integer', 123));
			assert.isTrue(base.typeCheck('integer', 123.0));
			assert.isNotTrue(base.typeCheck('integer', 1.23));
		});

		it('Check Float', () => {
			assert.isTrue(base.typeCheck('float', 1.23));
			assert.isNotTrue(base.typeCheck('float', 123));
		});

		it('Check Number', () => {
			assert.isTrue(base.typeCheck('number', 123));
			assert.isTrue(base.typeCheck('number', 1.23));
			assert.isNotTrue(base.typeCheck('number', 'This is string'));
		});

		it('Check Boolean', () => {
			assert.isTrue(base.typeCheck('boolean', true));
			assert.isTrue(base.typeCheck('boolean', false));
			assert.isNotTrue(base.typeCheck('boolean', 123));
		});

		it('Check Undefined', () => {
			assert.isTrue(base.typeCheck('undefined', undefined));
			assert.isNotTrue(base.typeCheck('undefined', 123));
		});

		it('Check Null', () => {
			assert.isTrue(base.typeCheck('null', null));
			assert.isNotTrue(base.typeCheck('null', 123));
		});

		it('Check Array', () => {
			assert.isTrue(base.typeCheck('array', []));
			assert.isNotTrue(base.typeCheck('array', 123));
		});

		it('Check Date', () => {
			assert.isTrue(base.typeCheck('date', new Date()));
			assert.isNotTrue(base.typeCheck('date', 123));
		});

		it('Check Runction', ()=> {
			assert.isTrue(base.typeCheck('function', function () {
			}));
			assert.isTrue(base.typeCheck('function', () => {
			}));
			assert.isNotTrue(base.typeCheck('function', 123));
		});

		it('Check Object', ()=> {
			assert.isTrue(base.typeCheck('object', {}));
			assert.isNotTrue(base.typeCheck('object', new Date()));
		});
	});

	describe('defer Test', () => {
		let df = base.defer();

		it('Has promise', () => {
			assert.isTrue(df.promise.constructor === Promise);
		});
	});
});