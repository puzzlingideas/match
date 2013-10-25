M.registerPlugin("persistence.converters.DefaultConverter", function(Persistence) {

	function DefaultConverter() {
		this.defaultGetters = [
			"x",
			"y",
			"fillStyle",
			"width",
			"height",
			"radius",
			"zIndex"
		];
	}

	DefaultConverter.prototype.canConvert = function(object) {
		// return false;
		return object.constructor.name == "Rectangle";
	};
	
	DefaultConverter.prototype.convert = function(object) {
	
		var jsonObject = {
				namespace: object.constructor.namespace,
				className: object.constructor.name
			},
			cammelCaseProperty,
			getterName,
			i;
	
		for ( i = 0; i < this.defaultGetters.length; i++ ) {
			cammelCaseProperty = this.defaultGetters[i];
			getterName = "get" + cammelCaseProperty[0].toUpperCase() + cammelCaseProperty.substring(1);
			if ( object[getterName] ) {
				jsonObject[this.defaultGetters[i]] = object[getterName]();
			}
		}
	
		return jsonObject;
		
	};

	return new DefaultConverter();

});