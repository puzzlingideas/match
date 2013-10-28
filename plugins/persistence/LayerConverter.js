/**
 * @module Match
 * @submodule plugins
 */
M.registerPlugin("persistence.converters.LayerConverter", function(Persistence) {

	function LayerConverter() {
	}

	LayerConverter.prototype.canConvert = function(object) {
		return object.constructor.name == "GameLayer";
	};
	
	LayerConverter.prototype.convertFromSerializable = function(json) {
	};
	
	LayerConverter.prototype.convertToSerializable = function(object) {
	
		var jsonObject = {
			namespace: "M.GameLayer",
			className: "GameLayer",
			renderizables: []
		};
	
		return jsonObject;
		
	};

	return new LayerConverter();

});