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
	function PositionEditor() {
	}

	/**
	 * Set Match to allow dragging of objects
	 * @method setEnabled
	 * @param {Boolean} value true to debug false to not debug
	 */
	PositionEditor.prototype.setEnabled = function(value) {

		if ( value ) {

			if ( !M.onAfterLoop ) M.onAfterLoop = new M.EventListener();

			M.onAfterLoop.addEventListener(this._dragRenderizable);

		} else if ( M.onAfterLoop ) {

			M.onAfterLoop.removeEventListener(this._dragRenderizable);

		}

	};
	/**
	 * Drags renderizable on mouse drag
	 * @method _dragRenderizable
	 * @private
	 */
	PositionEditor.prototype._dragRenderizable = function() {

		var mouse = M.mouse;

		if ( !mouse.down() ) {
			return;
		}

		var gameObjects = M._gameObjects,
			i = gameObjects.length,
			selected = null,
			renderizable;

		while ( i-- && !selected ) {

			renderizable = gameObjects[i];

			try {
				if ( renderizable != this && mouse.isOverPolygon(renderizable) && mouse.isOverPixelPerfect(renderizable) ) {
					selected = renderizable;
				}
			} catch (e) {
				//Do nothing
			}

		}

		if ( selected ) {
			selected.setLocation(mouse.x, mouse.y);
		}

	};

	M.dragRenderizables = new PositionEditor();

})(Match);