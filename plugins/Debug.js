/**
 * @module Match
 * @submodule plugins
 */
M.registerPlugin("Debug", Match, function(M) {

	/**
	 * Adds debug capabilities  to Match
	 * @class Debug
	 * @static
	 * @constructor
	 */
	function Debug() {
		this._enabled = false;
	}

	/**
	 * Set Match debug mode on or off. If this value is set to true then FPS and layer rendering time will be displayed
	 * in the top-left corner of the canvas
	 * @method setEnabled
	 * @param {Boolean} value true to debug false to not debug
	 */
	Debug.prototype.setEnabled = function(value) {

		if ( value ) {

			M.onAfterLoop.addEventListener(this._debugGameLoop);

		} else if ( M.onAfterLoop ) {

			M.onAfterLoop.removeEventListener(this._debugGameLoop);

		}

		this._enabled = value;

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
	 * Returns whether debugging is enabled or not
	 * @method enable
	 */
	Debug.prototype.getEnabled = function() {
		return this._enabled;
	};
	/**
	 * Match game loop that prints debug info
	 * @method _debugGameLoop
	 * @private
	 */
	Debug.prototype._debugGameLoop = function() {
		
		var m = M,
			mouse = M.mouse,
			line = 20;

		m.frontBuffer.font = "18px sans-serif";
		m.frontBuffer.fillStyle = "yellow";
		m.frontBuffer.fillText( m.getFps() + "fps", 20, line );
		line += 20;		

		if ( mouse ) {
			m.frontBuffer.fillText( "Mouse [" + mouse.x + ", " + mouse.y + "]", 20, line );
			line += 20;
		}

		m.frontBuffer.fillText( "Camera [" + m.camera._x + ", " + m.camera._y + "]", 20, line );
		line += 20;
		
		m.frontBuffer.fillText( m._gameObjects.length + " objects", 20, line );
		line += 20;

	};

	return new Debug();

});