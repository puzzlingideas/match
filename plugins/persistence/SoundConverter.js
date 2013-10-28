/**
 * @module Match
 * @submodule plugins
 */
M.registerPlugin("persistence.converters.SoundConverter", function(Persistence) {

	function SoundConverter() {
	}

	SoundConverter.prototype.canConvert = function(object) {
		return object instanceof HTMLAudioElement;
	};
	
	SoundConverter.prototype.convertFromSerializable = function(json) {
		
	};
	
	SoundConverter.prototype.convertToSerializable = function(object) {
	
		return {
			src: object.src
		};
		
	};

	return new SoundConverter();

});