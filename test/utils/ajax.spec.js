import chai from "chai";
import sinon from "sinon";
import ajax from "../../src/utils/ajax";

let assert = chai.assert;
let xhr = null;
let requests = null;

describe('Ajax util test', () => {
	beforeEach(() => {
		window.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
		xhr = window.XMLHttpRequest;
		requests = [];

		xhr.onCreate = function (xhr) {
			requests.push(xhr);
		}.bind(this);
	});

	afterEach(() => {
		xhr.restore();
	});

	describe('ajax Test', () => {
		it('GET Method Test', (done) => {
			let data = {foo: 'bar'};
			let dataJson = JSON.stringify(data);

			let opts = {
				url: 'test.com',
				type: 'GET',
				success: (result, status) => {
					assert.equal(status, 200);
					assert.equal(result, dataJson);
					done();
				},
				fail: () => {
					assert.fail();
					done();
				}
			};
			ajax.ajax(opts);
			requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);

			assert.isNumber(requests.length);
			assert.equal(requests.length, 1);
			assert.equal(requests[0].method, 'GET');
		});

		it('Post Method Test', (done) => {
			let data = {foo: 'bar'};
			let dataJson = JSON.stringify(data);

			let opts = {
				url: 'test.com',
				contentType: 'text/json',
				type: 'POST',
				data: dataJson,
				success: (result, status) => {
					assert.equal(status, 200);
					assert.equal(result, dataJson);
					done();
				},
				fail: () => {
					assert.fail();
					done();
				}
			};
			ajax.ajax(opts);
			requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);

			assert.isNumber(requests.length);
			assert.equal(requests.length, 1);
			assert.equal(requests[0].method, 'POST');
			assert.equal(requests[0].requestBody, dataJson);
		});

		it('Fail Test', (done) => {
			let opts = {
				url: 'test.com',
				type: 'GET',
				success: () => {
					assert.fail();
					done();
				},
				fail: (xhr, status) => {
					assert.equal(status, 500);
					done();
				}
			};
			ajax.ajax(opts);
			requests[0].respond(500);

			assert.isNumber(requests.length);
			assert.equal(requests.length, 1);
			assert.equal(requests[0].method, 'GET');
		});
	});

	describe('specific ajax Test', () => {
		it('GET ajax Test', (done) => {
			let data = {foo: 'bar'};
			let dataJson = JSON.stringify(data);
			let promise = ajax.get('test.com/:param', {
				param: 123,
				query1: 456,
				query2: 789
			});

			promise.then((resource)=> {
				assert.isTrue(resource.resolved);
				assert.equal(resource.status, 200);
				assert.equal(resource.result, dataJson);
				done();
			}, (resource)=> {
				assert.isNotTrue(resource.resolved);
				assert.fail();
				done();
			});
			requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);

			assert.isNumber(requests.length);
			assert.equal(requests.length, 1);
			assert.equal(requests[0].method, 'GET');
			assert.equal(requests[0].url, 'test.com/123?query1=456&query2=789');
		});

		it('POST ajax Test', (done) => {
			let data = {foo: 'bar'};
			let dataJson = JSON.stringify(data);
			let promise = ajax.post('test.com/:param', {
				param: 123,
				query1: 456,
				query2: 789
			}, dataJson);

			promise.then((resource)=> {
				assert.isTrue(resource.resolved);
				assert.equal(resource.status, 200);
				assert.equal(resource.result, dataJson);
				done();
			}, (resource)=> {
				assert.isNotTrue(resource.resolved);
				assert.fail();
				done();
			});
			requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);

			assert.isNumber(requests.length);
			assert.equal(requests.length, 1);
			assert.equal(requests[0].method, 'POST');
			assert.equal(requests[0].url, 'test.com/123?query1=456&query2=789');
			assert.equal(requests[0].requestBody, dataJson);
		});

		it('PUT ajax Test', (done) => {
			let data = {foo: 'bar'};
			let dataJson = JSON.stringify(data);
			let promise = ajax.put('test.com/:param', {
				param: 123,
				query1: 456,
				query2: 789
			}, dataJson);

			promise.then((resource)=> {
				assert.isTrue(resource.resolved);
				assert.equal(resource.status, 200);
				assert.equal(resource.result, dataJson);
				done();
			}, (resource)=> {
				assert.isNotTrue(resource.resolved);
				assert.fail();
				done();
			});
			requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);

			assert.isNumber(requests.length);
			assert.equal(requests.length, 1);
			assert.equal(requests[0].method, 'PUT');
			assert.equal(requests[0].url, 'test.com/123?query1=456&query2=789');
			assert.equal(requests[0].requestBody, dataJson);
		});

		it('DELETE ajax Test', (done) => {
			let data = {foo: 'bar'};
			let dataJson = JSON.stringify(data);
			let promise = ajax.delete('test.com/:param', {
				param: 123,
				query1: 456,
				query2: 789
			}, dataJson);

			promise.then((resource)=> {
				assert.isTrue(resource.resolved);
				assert.equal(resource.status, 200);
				assert.equal(resource.result, dataJson);
				done();
			}, (resource)=> {
				assert.isNotTrue(resource.resolved);
				assert.fail();
				done();
			});
			requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);

			assert.isNumber(requests.length);
			assert.equal(requests.length, 1);
			assert.equal(requests[0].method, 'DELETE');
			assert.equal(requests[0].url, 'test.com/123?query1=456&query2=789');
			assert.equal(requests[0].requestBody, dataJson);
		});
	});
});