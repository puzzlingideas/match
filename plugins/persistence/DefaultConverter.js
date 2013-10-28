/**
 * @module Match
 * @submodule plugins
 */
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
		return false;
	};
	
	DefaultConverter.prototype.convertToSerializable = function(object) {
	
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