M.registerPlugin("ui.ToolsUI", function() {

	var CSS_FILE = "/code/match/trunk/tools/ToolsUI.css";

	function ToolsUI() {
		this.panel = document.createElement("ul");
		this.panel.id = "toolsUI";
		this.loadCss();
		this.createUI();
	}

	ToolsUI.prototype.loadCss = function() {

		var fileref = document.createElement("link");

		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", CSS_FILE);

		if (typeof fileref!="undefined") {
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}

	};

	ToolsUI.prototype.createUIElement = function(text, callback, enabled) {

		var uiElement;

		uiElement = document.createElement("li");

		uiElement.innerText = text;
		uiElement.addEventListener("click", callback);
		if ( enabled ) {
			uiElement.setAttribute("class", "enabled");
		}
		this.panel.appendChild(uiElement);

	};

	ToolsUI.prototype.createUI = function() {

		this.createUIElement("Pause", function() {
			M.pause();
			if ( M.isPaused() ) {
				this.setAttribute("class", "enabled");
			} else {
				this.setAttribute("class", "");
			}
		}, M.isPaused());

		this.createUIElement("Debug", function() {
			M.tools.debug.setEnabled(!M.tools.debug.getEnabled());
			if ( M.tools.debug.getEnabled() ) {
				this.setAttribute("class", "enabled");
			} else {
				this.setAttribute("class", "");
			}
		}, M.tools.debug.getEnabled());

		this.createUIElement("Drag", function() {
			M.tools.renderizableDragger.setEnabled(!M.tools.renderizableDragger.getEnabled());
			if ( M.tools.renderizableDragger.getEnabled() ) {
				this.setAttribute("class", "enabled");
			} else {
				this.setAttribute("class", "");
			}
		}, M.tools.renderizableDragger.getEnabled());

		this.createUIElement("Update", function() {
			M.tools.renderizableDragger.setUpdateGameObjectsEnabled(!M.tools.renderizableDragger.getUpdateGameObjectsEnabled());
			if ( M.tools.renderizableDragger.getUpdateGameObjectsEnabled() ) {
				this.setAttribute("class", "enabled");
			} else {
				this.setAttribute("class", "");
			}
		}, M.tools.renderizableDragger.getUpdateGameObjectsEnabled());

	};

	ToolsUI.prototype.hide = function() {
		document.body.removeChild(this.panel);
	};

	ToolsUI.prototype.show = function() {
		document.body.appendChild(this.panel);
	};

	return new ToolsUI();

});