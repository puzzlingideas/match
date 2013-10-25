/**
 * @module Match
 */
M.registerPlugin("ObjectPlacement", M, function(M) {

	// var CSS_FILE = "/code/match/trunk/tools/ObjectPlacement.css";
	
	/**
	 * Provides a UI to allow adding game entities to the layers of a game
	 * that were registered using M.registerGameEntity
	 * @class ObjectPlacement
	 * @static
	 * @constructor
	 */
	function ObjectPlacement() {

		// M.tools.UI.ToolsUI.loadCss(CSS_FILE);
	
		this.entitySelect = document.createElement("select");
		this.entitySelect.setAttribute("size", 10);
		
		this.layerSelect = document.createElement("select");
		this.layerSelect.setAttribute("size", 10);
		
	}
	/**
	 * Creates an option element
	 * @method _createOption
	 * @param {String} value value of the option
	 * @param {String} text text of the option
	 * @private
	 */
	ObjectPlacement.prototype._createOption = function(value, text) {
		var option = document.createElement("option");
			option.setAttribute("value", value);
			option.innerHTML = text;
		return option;
	};
	/**
	 * Updates the select to show all entities registered using M.registerGameEntity
	 * @method updateEntitySelect
	 */
	ObjectPlacement.prototype.updateEntitySelect = function() {
		this.entitySelect.appendChild(this._createOption(i, "none"));
		for ( var i in game ) {
			this.entitySelect.appendChild(this._createOption(i, i));
		}
		this.entitySelect.selectedIndex = 0;
	};
	/**
	 * Updates the select to show all of the game layers in Match
	 * @method updateLayerSelect
	 */
	ObjectPlacement.prototype.updateLayerSelect = function() {
		for ( var i in M._gameLayers ) {
			this.layerSelect.appendChild(this._createOption(i, M._gameLayers[i].name || i));
		}
		this.layerSelect.selectedIndex = 0;
	};
	/**
	 * Binds an onClick method to the document body that will add the selected entity to the
	 * selected layer
	 * @method bind
	 * @private
	 */
	ObjectPlacement.prototype._initialize = function() {
	
		var self = this;
		
		document.body.appendChild(this.entitySelect);
		document.body.appendChild(this.layerSelect);
		
		this.updateEntitySelect();
		this.updateLayerSelect();
		
		document.body.addEventListener("click", function() {
			
			if ( self.entitySelect.selectedIndex == 0 ) return;
			
			var constructor = game[self.entitySelect.value];
			
			if ( constructor ) {
				var obj = new constructor({x: M.mouse.x, y: M.mouse.y});
				M._gameLayers[0].push(obj);
			} else {
				console.log("Could not instantiate game entity");
			}
			
		});
		
	};

	//This is a singleton instance
	var instance = new ObjectPlacement();
	
	document.addEventListener( "DOMContentLoaded", function() {
		instance._initialize();
	});
	
	return instance;

});