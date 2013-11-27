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

		this.entityList = null;		
		this.removeEntityButton = null;
		this.selection = null;

		this._initialize();

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
	GameEntityList.prototype.updateSelectionBox = function() {
		
		var obj = this.getSelectedObject();
		
		if ( obj ) {
		
			var style = [];
			
			style.push("width:" + (obj.getWidth() + 4) + "px");
			style.push("height:" + (obj.getHeight() + 4) + "px");
			style.push("left:" + (obj.getLeft() - 2 + M.frontBuffer.canvas.offsetLeft) + "px");
			style.push("top:" + (obj.getTop() - 2 + M.frontBuffer.canvas.offsetTop) + "px");
		
			this.selection.setAttribute("style", style.join(";"));

			this.selection.setAttribute("class", "selection");
			
		} else {
			this.selection.setAttribute("class", "selection hidden");
		}
		
	};
	GameEntityList.prototype.getSelectedObject = function() {
		return M._gameObjects[this.entityList.selectedIndex];
	};
	/**
	 * Updates the select to show all entities registered using M.registerGameEntity
	 * @method updateEntitySelect
	 */
	GameEntityList.prototype.removeSelectedObject = function() {
	
		if ( this.entityList.selectedIndex > -1 ) {
	
			var obj = this.getSelectedObject();
		
			if ( obj.ownerLayer ) {
				obj.remove();
			} else {
				M.removeGameObject(obj);
			}
		
		}
		
	};
	/**
	 * Restores the state of the scene to the given json
	 * @method load
	 * @param {String} json
	 */
	GameEntityList.prototype._initialize = function(json) {
		
		var self = this,
			template = M.getPluginTemplate("GameEntityList");
		
		this.entityList = template.querySelector("select");
		this.removeEntityButton = template.querySelector("button");
		this.selection = template.querySelector(".selection");
		
		this.updateEntitySelect();

		this.removeEntityButton.addEventListener("click", function() {
			self.removeSelectedObject();
		});
				
		M.onGameObjectPushed.addEventListener(function() {
			self.updateEntitySelect();
		});		
		M.onGameObjectRemoved.addEventListener(function() {
			self.updateEntitySelect();
		});
		
		this.entityList.addEventListener("click", function() {
			self.updateSelectionBox();
		});
		
		document.querySelector("#match-plugins").appendChild(template);
		
	};

	return new GameEntityList();
	
});