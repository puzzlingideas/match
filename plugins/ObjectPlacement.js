/**
 * @module Match
 * @submodule plugins
 * @requires Match.plugins.LayerManagement
 */
M.registerPlugin("ObjectPlacement", M, function(M) {

	/**
	 * Provides a UI to allow adding game entities to the layers of a game
	 * that were registered using M.registerGameEntity
	 * @class ObjectPlacement
	 * @static
	 * @constructor
	 */
	function ObjectPlacement() {

		this.container = document.createElement("div");
		this.container.setAttribute("id", "object-placement");
		
		this.entitySelect = document.createElement("select");
		this.entitySelect.setAttribute("size", 10);
		
	}
	/**
	 * Updates the select to show all entities registered using M.registerGameEntity
	 * @method updateEntitySelect
	 */
	ObjectPlacement.prototype.updateEntitySelect = function() {
		this.entitySelect.appendChild( M.plugins.ui.ToolsUI.createOption(i, "none"));
		for ( var i in game ) {
			this.entitySelect.appendChild( M.plugins.ui.ToolsUI.createOption(i, i));
		}
		this.entitySelect.selectedIndex = 0;
	};
	/**
	 * Set Match to allow dragging of objects
	 * @method setEnabled
	 * @param {Boolean} value true to enable false to disable
	 */
	ObjectPlacement.prototype.setEnabled = function(value) {

		if ( value ) {

			document.body.addEventListener("click", this._addSelectedGameEntity);

		} else if ( M.onAfterLoop ) {

			document.body.removeEventListener("click", this._addSelectedGameEntity);

		}

		this._enabled = value;

	};
	/**
	 * Adds the selected game entity to the selected game layer
	 * @method _addSelectedGameEntity
	 * @private
	 */
	ObjectPlacement.prototype._addSelectedGameEntity = function() {
		
		var self = M.plugins.ObjectPlacement;
		
		if ( self.entitySelect.selectedIndex == 0 ) return;
		
		var layerIndex = M.plugins.LayerManagement.getSelectedLayerIndex();
		
		if ( layerIndex < 0 ) return;
		
		var constructor = game[self.entitySelect.value];
		
		if ( constructor ) {
			var obj = new constructor({x: M.mouse.x, y: M.mouse.y});
			M._gameLayers[layerIndex].push(obj);
		} else {
			console.log("Could not instantiate game entity");
		}
		
	};
	/**
	 * Binds an onClick method to the document body that will add the selected entity to the
	 * selected layer
	 * @method bind
	 * @private
	 */
	ObjectPlacement.prototype._initialize = function() {

		this.container.appendChild(this.entitySelect);
		
		document.body.appendChild(this.container);
		
		this.updateEntitySelect();
		
	};

	//This is a singleton instance
	var instance = new ObjectPlacement();
	
	document.addEventListener( "DOMContentLoaded", function() {
		instance._initialize();
	});
	
	return instance;

});