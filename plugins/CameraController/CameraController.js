/**
 * @module Match
 * @submodule plugins
 */
M.registerPlugin("CameraController", M, function(M) {

	function CameraController() {
		this._enabled = false;
		this.speed = 4;
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

			M.onBeforeLoop.addEventListener(this._moveCamera);

		} else if ( M.onBeforeLoop ) {

			M.onBeforeLoop.removeEventListener(this._moveCamera);

		}

		this._enabled = value;
		
	};
	/**
	 * Moves the camera. Press ctrl and any arrow key or ctrl and move the mouse. To center
	 * the camera back at the origin press ctrl + space bar
	 * @method _moveCamera
	 * @private
	 */
	CameraController.prototype._moveCamera = function() {
		
		var speed = M.plugins.CameraController.speed;
		
		if ( M.keyboard.keysDown["ctrl"] ) {
		
			if ( M.keyboard.keysDown["right"] ) {
				M.camera.offsetX(speed);
			}		
			if ( M.keyboard.keysDown["left"] ) {
				M.camera.offsetX(-speed);
			}
			if ( M.keyboard.keysDown["up"] ) {
				M.camera.offsetY(-speed);
			}		
			if ( M.keyboard.keysDown["down"] ) {
				M.camera.offsetY(speed);
			}
			
			if ( M.mouse.moved() && M.mouse.down() ) {

				M.camera.offsetX(M.mouse.x - M.mouse.prevX);
				M.camera.offsetY(M.mouse.y - M.mouse.prevY);

			}
			
			if ( M.keyboard.keysDown["space"] ) {
				M.camera.setX(0);
				M.camera.setY(0);
			}
			
		}
		
		
	};

	/**
	 * Initializes this plugin with the html elements
	 * @method _initialize
	 * @private
	 */
	CameraController.prototype._initialize = function() {
	
		var self = this,
			template = M.getPluginTemplate("CameraController");
		
		this.button = template.querySelector("button");		
		
		this.button.innerHTML = self._enabled ? "enabled" : "disabled";
			
		this.button.addEventListener("click", function() {
			self.setEnabled(!self._enabled);
			this.innerHTML = self._enabled ? "enabled" : "disabled";
		});
		
		document.body.appendChild(template);
		
	};

	//This is a singleton instance
	var instance = new CameraController();
	
	document.addEventListener( "DOMContentLoaded", function() {
		instance._initialize();
	});
	
	return instance;

});