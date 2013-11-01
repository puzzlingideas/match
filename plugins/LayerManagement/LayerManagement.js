/**
 * @module Match
 * @submodule plugins
 */
M.registerPlugin("LayerManagement", M, function(M) {

	/**
	 * Provides a UI that allows for management of Layers
	 * @class LayerManagement
	 * @static
	 * @constructor
	 */
	function LayerManagement() {
		
		this.layerSelect = null;
		this.addLayerButton = null;
		this.removeLayerButton = null;
		this.moveLayerUpButton = null;
		this.moveLayerDownButton = null;
		
		// this.container = document.createElement("div");
		// this.container.setAttribute("id", "layer-management");
		
		// this.layerSelect = document.createElement("select");
		// this.layerSelect.setAttribute("size", 10);
		// this.layerSelect.setAttribute("class", "game-layers");
				
		// this.addLayerButton = M.plugins.ui.ToolsUI.createButton("Add", "add");
		// this.removeLayerButton = M.plugins.ui.ToolsUI.createButton("Remove", "remove");
		// this.moveLayerUpButton = M.plugins.ui.ToolsUI.createButton("Up", "up");
		// this.moveLayerDownButton = M.plugins.ui.ToolsUI.createButton("Down", "down");
		
		// this.container.appendChild(this.layerSelect);
		// this.container.appendChild(this.addLayerButton);
		// this.container.appendChild(this.removeLayerButton);
		// this.container.appendChild(this.moveLayerUpButton);
		// this.container.appendChild(this.moveLayerDownButton);
		
	}
	/**
	 * Binds click to button and allows for adding layers
	 * @method _bindAddLayer
	 * @private
	 */
	LayerManagement.prototype._bindAddLayer = function() {
		var self = this;
		this.addLayerButton.addEventListener("click", function() {
			M.createLayer();
			self.updateLayerSelect();
		});
	};
	/**
	 * Binds click to button and allows for removing layers
	 * @method _bindRemoveLayer
	 * @private
	 */
	LayerManagement.prototype._bindRemoveLayer = function() {
	
		var self = this;
		
		this.removeLayerButton.addEventListener("click", function() {
			
			var selectedIndex = self.getSelectedLayerIndex();
			
			if ( selectedIndex >= 0 ) {
				
				M.removeGameLayer(M._gameLayers[selectedIndex]);
				
				self.updateLayerSelect();
				
			}
			
			
		});
	};
	/**
	 * Binds click to button and allows for moving up a layer
	 * @method _bindMoveLayerDown
	 * @private
	 */
	LayerManagement.prototype._bindMoveLayerDown = function() {
	
		var self = this;
		
		this.moveLayerDownButton.addEventListener("click", function() {
		
			if ( self.getSelectedLayerIndex() < self.getLayerCount() - 1 ) {
			
				var currentIndex = self.getSelectedLayerIndex(),
					layerToMoveDown = self.getSelectedLayer(),
					layerToMoveUp = self.getLayerByIndex(self.getSelectedLayerIndex() + 1);
				
				layerToMoveDown.setZIndex(layerToMoveDown.getZIndex() + 1);
				layerToMoveUp.setZIndex(layerToMoveUp.getZIndex() - 1);
				
				self.updateLayerSelect();
				
				self.layerSelect.selectedIndex = currentIndex + 1;
				
			}
			
		});
		
	};
	/**
	 * Binds click to button and allows for moving down a layer
	 * @method _bindMoveLayerUp
	 * @private
	 */
	LayerManagement.prototype._bindMoveLayerUp = function() {
	
		var self = this;
		
		this.moveLayerUpButton.addEventListener("click", function() {
			
			if ( self.getSelectedLayerIndex() > 0 ) {
			
				var currentIndex = self.getSelectedLayerIndex(),
					layerToMoveDown = self.getSelectedLayer(),
					layerToMoveUp = self.getLayerByIndex(self.getSelectedLayerIndex() - 1);
				
				layerToMoveDown.setZIndex(layerToMoveDown.getZIndex() - 1);
				layerToMoveUp.setZIndex(layerToMoveUp.getZIndex() + 1);
				
				self.updateLayerSelect();
				
				self.layerSelect.selectedIndex = currentIndex - 1;				
				
			}
			
		});
		
	};
	/**
	 * Returns the index of the selected layer from the select box
	 * @method getSelectedLayerIndex
	 */
	LayerManagement.prototype.getSelectedLayerIndex = function() {
		return this.layerSelect.selectedIndex;
	};
	/**
	 * Returns the selected layer
	 * @method getSelectedLayer
	 */
	LayerManagement.prototype.getSelectedLayer = function() {
		return this.getLayerByIndex(this.getSelectedLayerIndex());
	};
	/**
	 * Returns the selected layer
	 * @method getSelectedLayer
	 */
	LayerManagement.prototype.getLayerByIndex = function(index) {
		return Match._gameLayers[index];
	};
	/**
	 * Updates the select to show the layers available in Match
	 * @method updateLayerSelect
	 */
	LayerManagement.prototype.updateLayerSelect = function() {
		this.clearLayerSelect();
		for ( var i = 0; i < M._gameLayers.length; i++ ) {
			this.layerSelect.appendChild(M.plugins.ui.ToolsUI.createOption(i, M._gameLayers[i].name));
		}
	};
	/**
	 * Returns the amount of layers in Match
	 * @method getLayerCount
	 */
	LayerManagement.prototype.getLayerCount = function() {
		return this.layerSelect.length;
	};
	/**
	 * Removes all data from the layer select box
	 * @method clearLayerSelect
	 */
	LayerManagement.prototype.clearLayerSelect = function() {
		this.layerSelect.length = 0;
	};
	/**
	 * Selects the given layer
	 * @method selectLayer
	 */
	LayerManagement.prototype.selectLayer = function(index) {
		if ( index < 0 ) return;
		if ( index > this.layerSelect.length ) return;
		this.layerSelect.selectedIndex = index;
	};
	/**
	 * Binds an onClick method to the document body that will add the selected entity to the
	 * selected layer
	 * @method bind
	 * @private
	 */
	LayerManagement.prototype._initialize = function() {

		var template = M.getPluginTemplate("LayerManagement");
		
		this.layerSelect = template.querySelector("select");
		this.addLayerButton = template.querySelector(".add");
		this.removeLayerButton = template.querySelector(".remove");
		this.moveLayerUpButton = template.querySelector(".move-up");
		this.moveLayerDownButton = template.querySelector(".move-down");
		
		this.updateLayerSelect();
		this.selectLayer(0);		
		
		this._bindAddLayer();
		this._bindRemoveLayer();
		this._bindMoveLayerDown();
		this._bindMoveLayerUp();

		document.body.appendChild(template);
		
	};

	//This is a singleton instance
	var instance = new LayerManagement();
	
	document.addEventListener( "DOMContentLoaded", function() {
		instance._initialize();
	});
	
	return instance;

});