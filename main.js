"use strict";

ascend_intro(0.6511030308479817);

document.getElementById("loadingscreen").style.visibility = "hidden";

frame_counter = FRAMES_PER_HOUR*9;	// start game in the morning

player.position.x = start_chunk_x*(chunkwidth-1) + (chunkwidth*0.5) - 5;
player.position.z = start_chunk_z*(chunkwidth-1) + (chunkwidth*0.5) - 5;
player.rotation.y = 0*Math.PI;

cut = CUT_SPLASHSCREEN;

if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) mobile = false;
else mobile = true;

// main game loop
function main()
{
	let frame_start = performance.now();

	// turning off mouseclick UI here, then turn it on anywhere if you want to
	sprite_ui_mouseclick.position.set(player.position.x, player.position.y+1.3, player.position.z);
	sprite_ui_mouseclick.visible = false;

	layout_set();
	speedchange = 1;	// 1 som standard. sätts till annat i cut_set(). måste sättas innan bilarna kör.
	cut_set();
	chunk_set();
	camera_set();
	ascend_main();
	light_set();
	fog_set();

	if (frame_counter % 30 === 0)
	{
		room.position.set(player.position.x, 100, player.position.z);

		// save progress
		if (cut >= 0 && cut % MODULUS_FREEROAM_ONLY === 0 && cut !== CUT_FREEROAM_1B && cut !== CUT_FREEROAM_1C && cut !== CUT_FREEROAM_1D && cut !== CUT_FREEROAM_1E && cut !== CUT_FREEROAM_1F && cut !== CUT_FREEROAM_LICENSE && cut !== CUT_FREEROAM_LICENSE_2 && cut !== CUT_FREEROAM_LICENSE_3 && cut !== CUT_FREEROAM_LICENSE_4 && cut !== CUT_FREEROAM_LICENSE_5)
		{
			document.cookie = "cut=" + cut + "; expires=Thu, 18 Dec 2099 12:00:00 UTC";
			document.cookie = "x=" + current_chunk_x + "; expires=Thu, 18 Dec 2099 12:00:00 UTC";
			document.cookie = "z=" + current_chunk_z + "; expires=Thu, 18 Dec 2099 12:00:00 UTC";
		}
	}

	if (cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		cars_control();
		cars_physics();
		cars_sound();
	}

	// text/pausmenu - move somewhere else?
//	document.getElementById("text_shelfesteem").innerHTML = "Shelf Esteem: " + shelfesteem;
	document.getElementById("save_text").href = "https://kbrecordzz.com/notacarclub/?x=" + current_chunk_x + "&z=" + current_chunk_z + "&cut=" + last_cut_before_pause;

	if (collision_timer > 0) collision_timer--;

//	last_chunk_x = current_chunk_x;		// in create_terrain_chunks_before_showing_them()
//	last_chunk_z = current_chunk_z;

	lastpos_x = player.position.x;
	lastpos_z = player.position.z;

	if (height_get(player) > sealevel+0.4)
	{
		lastlandpos_x = player.position.x;
		lastlandpos_z = player.position.z;
	}
	for (let t = 0; t < NUMBER_OF_CARS; t++)
	{
		if (character_turned_on[t] === 1)
		{
			if (height_get(character[t]) > sealevel+0.4)
			{
				character_lastlandpos_x[t] = character[t].position.x;
				character_lastlandpos_z[t] = character[t].position.z;
			}
		}
	}

	lastcut = cut;

if (1 == 0) {
	// for map:
	scene.fog.far = 999999;
	camera.rotation.x = Math.PI*1.5;
	camera.position.y = 100;
	scene.remove(mesh_bottombox);
	scene.remove(mesh_seabox);
	scene.remove(mesh_cloudbox);
	scene.remove(mesh_skybox);
	area_water.transparent = false;
//	frame_counter = 12*FRAMES_PER_HOUR;
}

	renderer.render(scene, camera);
	renderer_backspegel.render(scene, camera_backspegel);
//	renderer_daddycamera.render(scene, camera_daddycamera);

	mouseclick = false;

	if (cut >= 0) frame_counter += game_speed;
	if (frame_counter > FRAMES_PER_DAY) frame_counter = 0;

	while (performance.now()-frame_start < 16.67) {}		// limit fps

	requestAnimationFrame(main);

	// mouseclick = false;		// har flyttat upp denna
}
requestAnimationFrame(main);
