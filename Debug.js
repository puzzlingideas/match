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
	function Debug() {
	}

	/**
	 * Set Match debug mode on or off. If this value is set to true then FPS and layer rendering time will be displayed
	 * in the top-left corner of the canvas
	 * @method setEnabled
	 * @param {Boolean} value true to debug false to not debug
	 */
	Debug.prototype.setEnabled = function(value) {

		if ( value ) {

			if ( !M.onAfterLoop ) M.onAfterLoop = new M.EventListener();

			M.onAfterLoop.addEventListener(this._debugGameLoop);

		} else if ( M.onAfterLoop ) {

			M.onAfterLoop.removeEventListener(this._debugGameLoop);

		}

	};
	/**
	 * Enables debugging
	 * @method enable
	 */
	Debug.prototype.enable = function() {
		this.setEnabled(true);
	};
	/**
	 * Disables debugging
	 * @method disable
	 */
	Debug.prototype.disable = function() {
		this.setEnabled(false);
	};
	/**
	 * Match game loop that prints debug info
	 * @method _debugGameLoop
	 * @private
	 */
	Debug.prototype._debugGameLoop = function() {
		
		var m = M,
			mouse = M.mouse;

		m.frontBuffer.font = "18px sans-serif";
		m.frontBuffer.fillStyle = "yellow";
		m.frontBuffer.fillText( m.getFps() + "fps", 20, 20 );

		if ( mouse ) {
			m.frontBuffer.fillText( "[" + mouse.x + ", " + mouse.y + "]", 20, 40 );
		}

	};

	M.debug = new Debug();

})(Match);