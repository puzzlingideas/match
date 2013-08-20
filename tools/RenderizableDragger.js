/**
 * @module Match
 */
(function(M) {

	function dummyFunction() {
	}

	/**
	 * Adds debug capabilities  to Match
	 * @class Debug
	 * @static
	 * @constructor
	 */
	function RenderizableDragger() {
		this._updateGameObjectsBackUp = M.updateGameObjects;
		this._enabled = false;
		this._updateGameObjectsEnabled = false;
	}

	/**
	 * Set Match to allow dragging of objects
	 * @method setEnabled
	 * @param {Boolean} value true to enable false to disable
	 */
	RenderizableDragger.prototype.setEnabled = function(value) {

		if ( value ) {

			if ( !M.onAfterLoop ) M.onAfterLoop = new M.EventListener();

			M.onAfterLoop.addEventListener(this._dragRenderizable);

		} else if ( M.onAfterLoop ) {

			M.onAfterLoop.removeEventListener(this._dragRenderizable);

		}

		this._enabled = value;

	};
	/**
	 * Set Match stop updating objects
	 * @method setUpdateGameObjectsEnabled
	 * @param {Boolean} value true to enable false to disable
	 */
	RenderizableDragger.prototype.setUpdateGameObjectsEnabled = function(value) {

		if ( value ) {

			M.updateGameObjects = this._updateGameObjectsBackUp;

		} else {

			M.updateGameObjects = dummyFunction;

		}

		this._updateGameObjectsEnabled = value;

	};
	/**
	 * Drags renderizable on mouse drag
	 * @method _dragRenderizable
	 * @private
	 */
	RenderizableDragger.prototype._dragRenderizable = function() {

		var mouse = M.mouse;

		if ( !mouse.down() ) {
			this.selected = null;
			return;
		}

		var gameObjects = M._gameObjects,
			i = gameObjects.length,
			renderizable;

		while ( i-- && !this.selected ) {

			renderizable = gameObjects[i];

			try {
				if ( renderizable != this && mouse.isOverPolygon(renderizable) && mouse.isOverPixelPerfect(renderizable) ) {
					this.selected = renderizable;
				}
			} catch (e) {
				//Do nothing
			}

		}

		if ( this.selected ) {
			this.selected.setLocation(mouse.x, mouse.y);
		}

	};
	/**
	 * Enables renderizable dragging
	 * @method enable
	 */
	RenderizableDragger.prototype.enable = function() {
		this.setEnabled(true);
	};
	/**
	 * Returns whether dragging is enabled or not
	 * @method enable
	 */
	RenderizableDragger.prototype.getEnabled = function() {
		return this._enabled;
	};
	/**
	 * Returns whether Match is updating game objects or not
	 * @method enable
	 */
	RenderizableDragger.prototype.getUpdateGameObjectsEnabled = function() {
		return this._updateGameObjectsEnabled;
	};
	/**
	 * Disables renderizable dragging
	 * @method disable
	 */
	RenderizableDragger.prototype.disable = function() {
		this.setEnabled(false);
	};

	M.tools = M.tools || new Object();

	M.tools.renderizableDragger = new RenderizableDragger();

})(Match);