/**
 * @module Match
 */
(function(M) {

	/**
	 * Adds debug capabilities  to Match
	 * @class Debug
	 * @static
	 * @constructor
	 */
	function RenderizableDragger() {
		this._updateGameObjectsBackUp = M.updateGameObjects;
	}

	/**
	 * Set Match to allow dragging of objects
	 * @method setEnabled
	 * @param {Boolean} value true to debug false to not debug
	 */
	RenderizableDragger.prototype.setEnabled = function(value) {

		if ( value ) {

			if ( !M.onAfterLoop ) M.onAfterLoop = new M.EventListener();

			M.onAfterLoop.addEventListener(this._dragRenderizable);

		} else if ( M.onAfterLoop ) {

			M.onAfterLoop.removeEventListener(this._dragRenderizable);

		}

	};
	/**
	 * Set Match to allow dragging of objects
	 * @method setEnabled
	 * @param {Boolean} value true to debug false to not debug
	 */
	RenderizableDragger.prototype.setUpdateGameObjectsEnabled = function(value) {

		if ( value ) {

			M.updateGameObjects = this._updateGameObjectsBackUp;

		} else {

			M.updateGameObjects = dummyFunction;

		}

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

	M.renderizableDragger = new RenderizableDragger();

	function dummyFunction() {
	}

})(Match);