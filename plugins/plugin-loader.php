document.addEventListener("DOMContentLoaded", function() {


	var pluginsContainer = document.querySelector("#match-plugins");

	if ( !pluginsContainer ) {

		pluginsContainer = document.createElement("div");
		pluginsContainer.setAttribute("id", "match-plugins");

		document.body.appendChild(pluginsContainer);

	}

<?php

	function main() {

		if ( array_key_exists("plugins", $_GET) ) {

			$pluginList = explode(",", $_GET["plugins"]);
			$alreadyLoaded = array();

			for ( $i = 0; $i < count($pluginList); $i++ ) {

				loadPlugin($pluginList[$i], $alreadyLoaded);

			}
		
		} else {	
			header("HTTP/1.1 500 You must specify a plugin to load");	
		}

	}

	function loadPlugin($pluginId, &$alreadyLoaded) {
	
		$pluginManifest = $pluginId . ".json";


		if ( !in_array($pluginId, $alreadyLoaded) ) {

			if ( file_exists($pluginManifest) ) {

				$json = json_decode(file_get_contents($pluginManifest), true);

				if ( $json != null ) {

					if ( array_key_exists("requires", $json) ) {
					
						$requires = explode(",", str_replace(' ', '', $json["requires"]));

						for ( $i = 0; $i < count($requires); $i++ ) {

							loadPlugin($requires[$i], $alreadyLoaded);
						
						}
					
					}
					
					if ( array_key_exists("css", $json) ) {
					
						$css = file_get_contents($json["css"]);
						$css = str_replace("'", "\"", $css);
						$css = str_replace("\n", "", $css);
						$css = str_replace("\r", "", $css);

						$css = htmlspecialchars($css);
					
						echo "(function() { var style = document.createElement('style'); style.innerHTML = '${css}'; document.head.appendChild(style); })();";
						
					}
					
					if ( array_key_exists("html", $json) ) {
						
						$html = file_get_contents($json["html"]);
						
						$html = str_replace("\'", "\"", $html);
						$html = str_replace("\n", "", $html);
						$html = str_replace("\r", "", $html);
						/* $html = "<div id=\"${pluginId}\">" . $html . "</div>"; */

						echo "M.registerPluginTemplate('" . $pluginId . "', '" . $html . "');";
						
					}
					
					if ( array_key_exists("script", $json) ) {
						echo file_get_contents($json["script"]);
					}

					array_push($alreadyLoaded, $pluginId); 

				} else {
					header("HTTP/1.1 500 Plugin $pluginId manifest has errors");
				}
				
			} else {
				header("HTTP/1.1 500 Plugin $pluginId not found");
			}

		}
	
	}
	
	main();

	// header("Content-Type: script/text");

	echo "\n\r});";
	
?>