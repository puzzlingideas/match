// document.addEventListener( "DOMContentLoaded", function() {

	M.registerPlugin("persistence.Persistence", M.plugins.persistence.converters, function(converters) {

		// var CSS_FILE = "/code/match/trunk/tools/Persistence.css";
		
		/**
		 * Object used to store/retrieve the current content located in the game layers.
		 *
		 * @class Persistence
		 * @constructor
		 */
		function Persistence() {
			
			// M.tools.UI.ToolsUI.loadCss(CSS_FILE);
		
			// this.entitySelect = document.createElement("select");
			// this.entitySelect.setAttribute("size", 10);
			
			// this.layerSelect = document.createElement("select");
			// this.layerSelect.setAttribute("size", 10);
			
			// document.body.appendChild(this.entitySelect);
			// document.body.appendChild(this.layerSelect);
			
			// this.updateEntitySelect();
			// this.updateLayerSelect();
			// this.bind();
			
		}

		/**
		 * Returns a suitable converter 
		 */
		Persistence.prototype.getConverter = function(object) {
			for ( var i in converters ) {
				if ( converters[i].canConvert(object) ) {
					return converters[i];
				}
			}
			return converters.DefaultConverter;
		};
		
		Persistence.prototype.save = function() {
			
			var cLayer,
				cObject,
				json = [],
				jsonLayer,
				jsonObject;
				
			for ( var i = 0; i < M._gameLayers.length; i++ ) {
			
				cLayer = M._gameLayers[i];
				
				jsonLayer = {
					renderizables: []
				};
				
				for ( var j = 0; j < cLayer.onRenderList.length; j++ ) {
					
					cObject = cLayer.onRenderList[j];
					
					jsonLayer.renderizables.push(this.getConverter(cObject).convert(cObject));
				
				}
				
				json.push(jsonLayer);
				
			}
			
			return JSON.stringify(json);
			
		};
		/**
		 *
		 */
		Persistence.prototype.load = function() {
		};
		
		return new Persistence();

	});

// });