import _ from "lodash";
import * as base from "./base";

const METHOD_TYPE = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE'
};

const ajax = {
	ajax: _ajax,
	get: _getAjaxByMethod(METHOD_TYPE.GET),
	post: _getAjaxByMethod(METHOD_TYPE.POST),
	put: _getAjaxByMethod(METHOD_TYPE.PUT),
	delete: _getAjaxByMethod(METHOD_TYPE.DELETE)
};

/**
 * @description ajax call
 * @param {Object} inputOpts object
 * @method _ajax
 */
function _ajax (inputOpts) {
	let xhr = null;
	let callback = null;

	let opts = Object.assign({
		url: null,
		type: METHOD_TYPE.GET,
		contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		data: null,
		async: true,
		success: null,
		fail: null
	}, inputOpts);

	// check url
	if (!base.typeCheck('string', opts.url)) {
		return;
	}

	// check success
	if (!base.typeCheck('function', opts.success)) {
		return;
	}

	// check XMLHttpRequest
	xhr = getXMLHttpRequest();
	if (xhr != null) {
		xhr.open(opts.type, opts.url, opts.async);
		xhr.setRequestHeader('Content-Type', opts.contentType);

		if (!base.typeCheck('null', opts.data)) {
			xhr.send(opts.data);
		}

		callback = function () {
			if (xhr.readyState !== 4) {
				return;
			}

			if (xhr.status == 200) {
				opts.success(xhr.responseText, xhr.status, xhr);
			} else {
				if (base.typeCheck('function', opts.fail)) {
					opts.fail(xhr, xhr.status, xhr.statusText);
				}
			}
		};

		if (!opts.async) {
			callback();
		} else {
			xhr.onreadystatechange = callback;
		}
	}
}

/**
 * @description get XMLHttpRequest
 * @returns {*} XMLHttpRequest or null
 * @method getXMLHttpRequest
 */
function getXMLHttpRequest () {
	let xhr = null;

	if (!base.typeCheck('undefined', XMLHttpRequest)) {
		xhr = new XMLHttpRequest();
	} else {
		let versions = [
			'MSXML2.XmlHttp.5.0',
			'MSXML2.XmlHttp.4.0',
			'MSXML2.XmlHttp.3.0',
			'MSXML2.XmlHttp.2.0',
			'Microsoft.XmlHttp'
		];

		for (let i = 0, len = versions.length; i < len; i++) {
			try {
				xhr = new window.ActiveXObject(versions[i]);
				break;
			}
			catch (e) {
				throw 'XMLHttpRequest Error';
			}
		}
	}

	return xhr;
}

/**
 * @description Get ajax by specific method
 * @param {String} method
 * @returns {function(*=, *=, *=, *=)} ajax
 * @method _getAjaxByMethod
 */
function _getAjaxByMethod (method) {
	return (url, parameter, data = null, inputOpts) => {
		let resource = {};
		let df = base.defer();
		let opts = Object.assign({}, inputOpts);
		resource.promise = df.promise;
		resource.xhr = null;
		resource.resolved = false;
		resource.status = undefined;

		// Init opts
		if (!base.typeCheck('string', url)) {
			return;
		} else {
			opts.url = setUrl(url, parameter);
		}

		opts.type = method;

		opts.data = data;
		opts.success = (responseText, status, xhr) => {
			resource.xhr = xhr;
			resource.resolved = true;
			resource.status = status;
			resource.result = responseText;
			df.resolve(resource);
		};

		opts.fail = (xhr, status) => {
			resource.xhr = xhr;
			resource.status = status;
			df.reject(resource);
		};

		_ajax(opts);

		return resource.promise;
	};
}

/**
 * @description Set url
 * @param {string} url
 * @param {string} parameter
 * @returns {string} set url
 * @method setUrl
 */
function setUrl (url, parameter) {
	let query = [];
	if (parameter) {
		_.each(parameter, (value, key)=> {
			let param = ':' + key;
			if (!url.includes(param)) {
				query.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
			} else {
				url = url.replace(new RegExp(':' + key, 'g'), value);
			}
		});
	}

	if (query.length > 0) {
		url += '?' + query.join('&');
	}
	return url;
}

export default ajax;