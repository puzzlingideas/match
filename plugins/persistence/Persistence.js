/**
 * @module Match
 * @submodule plugins
 */
M.registerPlugin("persistence.Persistence", M.plugins.persistence.converters, function(converters) {

	/**
	 * Object used to store/retrieve the current content located in the game layers.
	 *
	 * @class Persistence
	 * @constructor
	 */
	function Persistence() {
	
		this.container = document.createElement("div");
		this.container.setAttribute("id", "persistence");

		this.saveButton = M.plugins.ui.ToolsUI.createButton("Save", "save");
		this.loadButton = M.plugins.ui.ToolsUI.createButton("Load", "load");
		
	}

	/**
	 * Returns a suitable converter for the given object
	 * @method getConverter
	 * @param {Object} object the object to get the converter for. If there is no specific converter defined for this
	 * object then a default converter will be used
	 * @return {Object} converter
	 */
	Persistence.prototype.getConverter = function(object) {
		for ( var i in converters ) {
			if ( converters[i].canConvert(object) ) {
				return converters[i];
			}
		}
		return converters.DefaultConverter;
	};
	/**
	 * Returns a json representing the current state of the scene
	 * @method save
	 * @return {String} json
	 */
	Persistence.prototype.save = function() {
		
		var cLayer,
			cObject,
			json = {
				assets: {
					sprites: [],
					sounds: []
				},
				layers: []
			},
			jsonLayer,
			jsonObject,
			spriteConverter = converters.SpriteConverter;
			soundConverter = converters.SoundConverter;
		
		for ( var i in M.sprites ) {
			cObject = M.sprites[i];
			if ( spriteConverter.canConvert(cObject) ) {
				json.assets.sprites.push(spriteConverter.convertToSerializable(cObject));
			}
		}
		
		for ( var i in M.sounds ) {
			cObject = M.sounds[i];
			if ( soundConverter.canConvert(cObject) ) {
				json.assets.sounds.push(soundConverter.convertToSerializable(cObject));
			}
		}
					
		for ( var i = 0; i < M._gameLayers.length; i++ ) {
		
			cLayer = M._gameLayers[i];
			
			jsonLayer = {
				renderizables: []
			};
			
			for ( var j = 0; j < cLayer.onRenderList.length; j++ ) {
				
				cObject = cLayer.onRenderList[j];
				
				jsonLayer.renderizables.push(this.getConverter(cObject).convertToSerializable(cObject));
			
			}
			
			json.layers.push(jsonLayer);
			
		}
		
		return JSON.stringify(json);
		
	};
	/**
	 * Restores the state of the scene to the given json
	 * @method load
	 * @param {String} json
	 */
	Persistence.prototype.load = function(json) {
	};
	/**
	 * Restores the state of the scene to the given json
	 * @method load
	 * @param {String} json
	 */
	Persistence.prototype._initialize = function(json) {
		
		this.container.appendChild(this.saveButton);
		this.container.appendChild(this.loadButton);
		
		document.body.appendChild(this.container);
		
	};

	var instance = new Persistence();
	
	document.addEventListener( "DOMContentLoaded", function() {
		instance._initialize();
	});
	
	return instance;

});