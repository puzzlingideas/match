/**
 * @module Match
 * @submodule plugins
 */
M.registerPlugin("GameEntityList", function() {

	/**
	 * Object used to store/retrieve the current content located in the game layers.
	 *
	 * @class GameEntityList
	 * @constructor
	 */
	function GameEntityList() {
		
		this.container = document.createElement("div");
		this.container.setAttribute("id", "game-entity-list");
		
		this.entityList = document.createElement("select");
		this.entityList.setAttribute("game-entities");
		this.entityList.setAttribute("size", "10");
		
		this.removeEntityButton = M.plugins.ui.ToolsUI.createButton("Remove", "remove");

	}
	/**
	 * Updates the select to show all entities registered using M.registerGameEntity
	 * @method updateEntitySelect
	 */
	GameEntityList.prototype.updateEntitySelect = function() {
		this.entityList.length = 0;
		for ( var i = 0; i < M._gameObjects.length; i++ ) {
			this.entityList.appendChild( M.plugins.ui.ToolsUI.createOption(i, M._gameObjects[i].toString()));
		}
	};
	/**
	 * Restores the state of the scene to the given json
	 * @method load
	 * @param {String} json
	 */
	GameEntityList.prototype._initialize = function(json) {
		
		this.updateEntitySelect();
		
		this.container.appendChild(this.entityList);
		this.container.appendChild(this.removeEntityButton);
		
		var self = this;
		
		M.onGameObjectPushed.addEventListener(function() {
			self.updateEntitySelect();
		});		
		M.onGameObjectRemoved.addEventListener(function() {
			self.updateEntitySelect();
		});
		
		document.body.appendChild(this.container);
		
	};

	var instance = new GameEntityList();
	
	document.addEventListener( "DOMContentLoaded", function() {
		instance._initialize();
	});
	
	return instance;

});