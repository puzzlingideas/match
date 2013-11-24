<?php

	function main() {

		if ( array_key_exists("plugins", $_GET) ) {

			$pluginList = explode(",", $_GET["plugins"]);

			for ( $i = 0; $i < count($pluginList); $i++ ) {

				loadPlugin($pluginList[$i]);
			
			}
		
		} else {	
			echo "You must specify a plugin to load";	
		}

	}

	function loadPlugin($pluginId) {
	
		$pluginManifest = $pluginId . ".json";

		if ( file_exists($pluginManifest) ) {

			$json = json_decode(file_get_contents($pluginManifest), true);

			if ( $json != null ) {

				if ( array_key_exists("requires", $json) ) {
				
					$requires = explode(",", $json["requires"]);

					for ( $i = 0; $i < count($requires); $i++ ) {

						loadPlugin($requires[$i]);
					
					}
				
				}
				
				if ( array_key_exists("css", $json) ) {
				
					$css = file_get_contents($json["css"]);
					$css = str_replace("\'", "\"", $css);
					$css = str_replace("\n", "", $css);
					$css = str_replace("\r", "", $css);
				
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

			} else {
				header("HTTP/1.1 500 Plugin $pluginId manifest has errors");
			}
			
		} else {
			header("HTTP/1.1 500 Plugin $pluginId not found");
		}	
	
	}
	
	main();
	
?>