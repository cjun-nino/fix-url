var FixUrl = function() {
	
	// 将url字符串转化为对象
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
	
	// 合并两个对象（覆盖），并去除值为空的属性
	this._filterParams = function(paramsOld, paramsNew) {
		let _self = this;
		let obj = Object.assign(paramsOld, paramsNew);
		let newPar = {};
		for (var key in obj) {
			if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
				newPar[key] = obj[key];
			}
		}
		return newPar;
	};
	
	// 将对象转换为字符串
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
	
	// 更新新的链接（全部）字符串
	this._setNewParams = function(newParams) {
		return this._ParamsToString(this._filterParams(this._getUrlParams(window.location.search), this._getUrlParams(newParams)));
	}
	
	//  更新新的链接（全部）对象
	this._setNewParamsObject = function(newParams) {
		let newParamsTemp = this._ParamsToString(newParams);
		return this._ParamsToString(this._filterParams(this._getUrlParams(window.location.search), newParams));
	}
	this._version = "0.02";
	this._urlParams = this._ParamsToString(this._filterParams(this._getUrlParams(window.location.search), this._getUrlParams(window.location.search)));
}