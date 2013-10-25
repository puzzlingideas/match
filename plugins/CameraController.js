/**
 * @module Match
 */
M.registerPlugin("CameraController", M, function(M) {

	function CameraController() {
		this._enabled = false;
	}
	
	/**
	 * Enables renderizable dragging
	 * @method enable
	 */
	CameraController.prototype.enable = function() {
		this.setEnabled(true);
	};
	/**
	 * Returns whether dragging is enabled or not
	 * @method getEnabled
	 */
	CameraController.prototype.getEnabled = function() {
		return this._enabled;
	};
	/**
	 * Set Match to allow dragging of objects
	 * @method setEnabled
	 * @param {Boolean} value true to enable false to disable
	 */
	CameraController.prototype.setEnabled = function(value) {
		
		if ( value ) {

			if ( !M.onBeforeLoop ) M.onBeforeLoop = new M.EventListener();

			M.onBeforeLoop.addEventListener(this._moveCamera);

		} else if ( M.onBeforeLoop ) {

			M.onBeforeLoop.removeEventListener(this._moveCamera);

		}

		this._enabled = value;
		
	};
	/**
	 * Moves the camera depending on how much pixels the mouse moved
	 * @method _moveCamera
	 * @private
	 */
	CameraController.prototype._moveCamera = function() {
		
		if ( M.keyboard.keysDown["ctrl"] && M.mouse.moved() ) {
			// M.camera.centerAt(M.mouse.x, M.mouse.y);
			console.debug("hola");
			M.camera.centerAt(M.camera.x + 1, M.camera.y + 1);
		}
		
	};
	
	return new CameraController;

});