/**
 * @module Match
 * @submodule plugins
 */
M.registerPlugin("persistence.converters.SpriteConverter", function(Persistence) {

	function SpriteConverter() {
	}

	SpriteConverter.prototype.canConvert = function(object) {
		return object instanceof HTMLImageElement;
	};
	
	SpriteConverter.prototype.convertFromSerializable = function(json) {
		
	};
	
	SpriteConverter.prototype.convertToSerializable = function(object) {
	
		return {
			src: object.src,
			frames: object.frames
		};
		
	};

	return new SpriteConverter();

});