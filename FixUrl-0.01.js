var FixUrl = function(_paramsOld, _paramsNew) {
	this._getUrlParams = function(params) {
		let searchStr = params;
		let qs = searchStr ? searchStr.substring(1) : '';
		let temp = qs.length ? qs.split('&') : [];
		let len = temp.length;
		let paraObj = {};
		let item;
		for (let i = 0; i < len; i++) {
			item = temp[i].split('=');
			paraObj[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
		}
		return paraObj;
	};
	this._filterParams = function(_paramsOld, _paramsNew) {
		let _self = this;
		let obj = Object.assign(_paramsOld, _paramsNew);
		let newPar = {};
		for (var key in obj) {
			if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
				newPar[key] = obj[key];
			}
		}
		return newPar;
	};
	this._ParamsToString = function(newParams) {
		var _result = [];
		for (var key in newParams) {
			var value = newParams[key];
			if (value.constructor == Array) {
				value.forEach(function(_value) {
					_result.push(key + "=" + _value);
				});
			} else {
				_result.push(key + '=' + value);
			}
		}
		return "?" + _result.join('&');
	};
	this._setNewParams = function(newParams) {
		return this._ParamsToString(this._filterParams(this._getUrlParams(_paramsOld), this._getUrlParams(newParams)));
	}
	this._version = "0.01";
	this._urlParams = this._ParamsToString(this._filterParams(this._getUrlParams(_paramsOld), this._getUrlParams(_paramsNew)));
}