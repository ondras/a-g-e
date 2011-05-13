<?php 
	$name = "sample";
	if (isset($_GET["file"]) && file_exists($_GET["file"].".js")) { $name = $_GET["file"]; }
?>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<script src="http://ondras.zarovi.cz/oz.js/oz.js"></script>
		<script src="age.js"></script>
		<style>
			#footer {
				margin-top: 1em;
				padding-top: 1em;
				border-top: 1px solid gray;
				font-size: x-small;
			}
		</style>
	</head>
	<body onload="new AGE('<?php echo $name; ?>.js', OZ.$('game'))">
		<div id="game"></div>
		<div id="footer">Powered by <a href="http://code.google.com/p/a-g-e/">a-g-e</a>, the Adventure Game Engine. &copy; <a href="http://ondras.zarovi.cz/">Ondřej Žára</a></div>
	</body>
</html>
