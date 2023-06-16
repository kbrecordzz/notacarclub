<!DOCTYPE html>

<html>
	<head>
		<meta name="viewport" content="user-scalable=no"/>
		<link rel="icon" href="files/logo_kbr.ico">
		<title>This Is (NOT!) A Car Club</title>
	</head>

	<img id="loadingscreen" style="position: fixed; top: 50%; left: 50%; min-height: 20vh; max-width: 80%; transform: translate(-50%, -50%);" src="files/cropped-test-6.gif"></img>

	<!-- body must be used, otherwise nothing will show on screen -->
	<!-- this prevents text highlighting -->
	<body style="-webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-color: #740060; margin: 0;">
		<!-- <img style="position: absolute; top: -15%; left: 17.5%; width: 65%; height: 60%;" src="files/rearview1.png"></img> -->
		<div id="backspegel" style="position: absolute; top: 15%; left: 25%; width: 50%; height: 17%; visibility: hidden;"></div>
		<div id="daddycamera" style="position: absolute; bottom: 15%; left: 10%; width: 25%; height: 25%; visibility: hidden;"></div>

		<img id="ui_mouse_click" style="position: fixed; top: 50%; left: 50%; min-height: 20vh; max-width: 80%; transform: translate(-50%, -50%); image-rendering: pixelated; visibility: hidden;" src="files/ui_mouse_click.png"></img>

		<!-- saker som ska gå att klicka på måste vara längst ner -->
		</div>
		<div id="dialog_background" style="position: fixed; top: 0%; left: 0%; visibility: hidden;">
			<img id="dialog_head" style="position: fixed; top: 0%; left: 0%; visibility: hidden;"></img>
			<p id="dialog_name" style="position: fixed; top: 0%; left: 0%; visibility: hidden;"></p>
			<p id="dialog_text" style="position: fixed; top: 0%; left: 0%; visibility: hidden;"></p>
		</div>

		<div id="dvdmenu" style="position: fixed; top: 0%; left: 0%; visibility: hidden;">
			Start a new game from chapter (your progress will be lost):<br>
			<button id="dvdmenu_1">The beginning</button><br>
			<button id="dvdmenu_2">'Epper</button><br>
			<button id="dvdmenu_3">The magnet festival</button><br>
		</div>

		<button id="button_pause" style="position: fixed; top: 0%; left: 0%; visibility: hidden;">?</button>
		<button id="button_fullscreen" style="position: fixed; top: 0%; left: 0%; visibility: hidden;"></button>

		<!-- These should only appear on mobile screens -->
		<button id="button_up" style="position: fixed; top: 0%; left: 0%; visibility: hidden;">&blacktriangle;</button>
		<button id="button_down" style="position: fixed; top: 0%; left: 0%; visibility: hidden;">&#x25A0;</button>
		<button id="button_left" style="position: fixed; top: 0%; left: 0%; visibility: hidden;">&blacktriangleleft;</button>
		<button id="button_right" style="position: fixed; top: 0%; left: 0%; visibility: hidden;">&blacktriangleright;</button>

		<div id="credits_background" style="position: fixed; top: 0%; left: 0%; visibility: hidden;">
			<img id="credits_image" style="position: fixed; top: 0%; left: 0%; visibility: hidden;" src="files/asdq_credits.png"></img>
			<p id="credits_text" style="position: fixed; top: 0%; left: 0%; visibility: hidden;">A game by: kbrecordzz<br>Story ideas: H. Von Asrik<br>Game ideas: Rumble Raz<br>'Epper: Mr. Jon Athan</p>
			<a id="save_text" style="position: fixed; top: 0%; left: 0%; visibility: hidden;" target=_blank href=""><b>Copy this link to play in another web browser</b></a>
		</div>

		<style>#button_continue:hover, #button_continue:active { filter: invert(100%); }</style>
		<style>#button_play:hover, #button_play:active { filter: invert(100%); }</style>
		<img id="button_continue" style="position: absolute; top: 0%; left: 0%; visibility: hidden;" src="files/CONTINUE.png"></img>
		<img id="button_play" style="position: absolute; top: 0%; left: 0%; visibility: hidden;" src="files/PLAY.png"></img>

		<script src="three.min.js"></script>		<!-- three.js main library for 3D in javascript. three.js.min downloaded 2022-08-15. -->
		<script src="ascend.js"></script>
		<script src="functions.js"></script>
		<script src="basic.js"></script>
		<script src="input.js"></script>
		<script src="main.js"></script>
	</body>
</html>
