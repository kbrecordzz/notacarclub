// mostly assets

"use strict";

// DEBUG
var game_speed = 1;

// cut
var cut;
var lastcut;
var bet_started = false;
var start_hour;
var last_cut_before_pause = 0;
var q;

var splashscreen_click_starttime = 0;

// dialog
var dialog = "";
var last_dialog = "";
var now_char = 0;
var head;
var name;				// for cutscene dialog

// game data
var shelfesteem = 0;

// race
var player_lap = 0;
var character_lap = new Array();	// current checkpoint for player and characters
var character_step = new Array();	// current checkstep (steps in between the checkpoints. used for more precise AI driving
var player_race_state = 0;
var character_race_state = new Array();	// race state for each individual character
var race_state = 0;			// race state for all
var race_just = 1;
var countdown_start;
var mesh_checkpoint = new Array();
var mesh_checkpoint_current;
var mesh_checkpoint_finish;
var checkstep_x = new Array();
var checkstep_z = new Array();	// xz for part steps between checkpoints
var race_number = 0;

// physics
var inair;
var air_start;					// for car land sound
var gravityinc = 0
var character_gravityinc = new Array();
var lastheight = 0;
var character_lastheight = new Array();
var lastpos_x = 0;
var lastpos_z = 0;
var lastlandpos_x = -1;
var lastlandpos_z = -1;
var character_lastlandpos_x = new Array();
var character_lastlandpos_z = new Array();
var collision_timer = 0;

// camera
var camera_strive_x = 0;
var camera_strive_z = 0;
var camera_strive_y = 0;

// sound
var sound_car_is_playing = false;
var audiocontext;
var source;

// game functions
var bullet_speed = 0.5;
var shot_timer = 0;
var character_shot_timer = new Array();

// cars
var speed = 0;
var speedchange = 1;
var turbo_timer = 0;

var character_speed = new Array();
var character_turned_on = new Array();

// car ai
var character_goal_x = new Array();
var character_goal_z = new Array();
var character_goal_distx = new Array()
var character_goal_distz = new Array();
var character_goal_temporaryfollow_x = new Array();
var character_goal_temporaryfollow_z = new Array();
var character_goal_temporaryfollow_dist = new Array();
var character_goal_temporaryfollow_distx = new Array();
var character_goal_temporaryfollow_distz = new Array();
var character_goal_array_x = new Array();
var character_goal_array_z = new Array();
var character_goal_lap = new Array();
var character_progress = new Array();

for (let t = 0; t < NUMBER_OF_CARS; t++)
{
	character_lap[t] = 0;
	character_step[t] = 0;

	character_race_state[t] = 0;
	character_shot_timer[t] = 0;
	character_turned_on[t] = 0;

	character_goal_temporaryfollow_x[t] = 0;//check_x;
	character_goal_temporaryfollow_z[t] = 0;//check_z;
	character_goal_temporaryfollow_dist[t] = 0;

	character_speed[t] = 0;
	character_gravityinc[t] = 0;
	character_lastheight[t] = 0;
	character_lastlandpos_x[t] = 0;
	character_lastlandpos_z[t] = 0;

	character_goal_x[t] = 0;
	character_goal_z[t] = 0;

	character_goal_temporaryfollow_distx[t] = 0;
	character_goal_temporaryfollow_distz[t] = 0;
	character_goal_distx[t] = 0;
	character_goal_distz[t] = 0;

	character_goal_lap[t] = 0;

	character_progress[t] = 0;	// race
}

// see characters from far away
var faraway_cylinder = new Array();
for (let t = 0; t < NUMBER_OF_CARS; t++)
{
	let cyl_geom = new THREE.CylinderGeometry( 0.3, 0.3, 100, 6 );
	let cyl_mate = new THREE.MeshBasicMaterial( { color: 0x6DFA0F } );
	faraway_cylinder[t] = new THREE.Mesh( cyl_geom, cyl_mate );
	scene.add(faraway_cylinder[t]);
}

// create sprite material
function mat(file)
{
	let material = new THREE.SpriteMaterial({map: loader.load("files/" + file)});
	material.map.minFilter = THREE.NearestFilter;
	material.map.magFilter = THREE.NearestFilter; // this turns off the blurriness of the pixel art?
	material.alphaTest = 0.5;
	return material;
}

// create texture material
function tex(file, r1 = 1, r2 = 1, pixel, mirrored)
{
	let material = new THREE.MeshLambertMaterial({map: loader.load("files/" + file)});
	if (pixel === true)
	{
		material.map.minFilter = THREE.NearestFilter;
		material.map.magFilter = THREE.NearestFilter; // this turns off the blurriness of the pixel art?
	}
	material.map.repeat.set(r1,r2);
	if (mirrored === true)
	{
		material.map.wrapS = THREE.MirroredRepeatWrapping;
		material.map.wrapT = THREE.MirroredRepeatWrapping;
	}
	else
	{
		material.map.wrapS = THREE.RepeatWrapping;
		material.map.wrapT = THREE.RepeatWrapping;
	}
	material.alphaTest = 0.5;
	return material;
}

// create sound, using javascript's library and not three.js
function snd(file, fvolume = 1, floop = true)
{
	let sound = new Audio("files/" + file);
	sound.loop = floop;
	sound.volume = fvolume;
	return sound;
}

// create sprite
function spr(file, size = 1, height = size)
{
	let material = new THREE.SpriteMaterial({map: loader.load("files/" + file)});
	material.map.minFilter = THREE.NearestFilter;
	material.map.magFilter = THREE.NearestFilter; // this turns off the blurriness of the pixel art?
	material.alphaTest = 0.5;
	let sprite = new THREE.Sprite(material);
	sprite.scale.set(size, height, size);
	scene.add(sprite);
	return sprite;
}

// create pointsprites material
function psp(file, fsize = 2)
{
	let material = new THREE.PointsMaterial({size: fsize, map: loader.load("files/" + file), depthTest: true, transparent: true});
	material.alphaTest = 0.5;	// this removes the imaginary annoying "boxes" around the tree sprites. now they look normal! :D
					// "with that, fragments with alpha below 0.5 won’t get rendered, so the depth-buffer at those positions stays free for sprites behind to render"
					// "alpha blending transparency is very sort-dependent. if you're using particles, sprites, points, instancedmesh, or other things
					// three.js cannot sort for you on every frame, then there are some tricky issues to work around.
					// alphaTest avoids all that because it's just cutouts, no transparency, so no sorting issue."
	psp_material_size = fsize;
	return material;
}


// before the game starts, create the room
let geometry_room_wall = new THREE.BoxGeometry(ROOM_WIDTH, ROOM_HEIGHT+0.3, ROOM_WIDTH);
let geometry_room_floor = new THREE.BoxGeometry(ROOM_WIDTH+0.5, ROOM_HEIGHT, ROOM_WIDTH+0.5);
let material_room_wall = new THREE.MeshLambertMaterial({map: loader.load("files/roomwall gasstation.jpg"), side: THREE.BackSide});	// just placeholder textures
let material_room_floor = new THREE.MeshLambertMaterial({map: loader.load("files/roomfloor gasstation.jpg"), side: THREE.BackSide});
var mesh_room_wall = new THREE.Mesh(geometry_room_wall, material_room_wall);
var mesh_room_floor = new THREE.Mesh(geometry_room_floor, material_room_floor);
var room = new THREE.Object3D();
room.add(mesh_room_wall, mesh_room_floor);
scene.add(room);
room.visible = false;
room.position.set(start_chunk_x*(chunkwidth-1)+(chunkwidth*0.5)-0.5, 100, start_chunk_z*(chunkwidth-1)+(chunkwidth*0.5)-0.5);

// intro logo
var material_logo = new THREE.MeshPhongMaterial({map: loader.load("files/worldmap.jpg")});
material_logo.map.repeat.set(1,1);
material_logo.map.wrapS = THREE.MirroredRepeatWrapping;
material_logo.map.wrapT = THREE.MirroredRepeatWrapping;
material_logo.transparent = true;
material_logo.opacity = 0.6;
//var mesh_logo = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.7, 1.7), material_logo);
var mesh_logo = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 64), material_logo);
scene.add(mesh_logo);
mesh_logo.rotation.y -= 1;
var mesh_logo_text = new THREE.Mesh(new THREE.PlaneGeometry(2, 1), new THREE.MeshBasicMaterial({map: loader.load("files/cropped-test-6.png"), transparent: true, side: THREE.DoubleSide, alphaTest: 0.5}));
var mesh_logo_text2 = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({map: loader.load("files/notacarclub_title.png"), transparent: true, side: THREE.DoubleSide, alphaTest: 0.5}));
mesh_logo.add(mesh_logo_text);
mesh_logo.add(mesh_logo_text2);
mesh_logo_text.position.z += 1.4;
mesh_logo_text2.position.z -= 1.4;
mesh_logo_text2.rotation.y = Math.PI;
var mesh_logo_string = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 3, 4), new THREE.MeshBasicMaterial({map: loader.load("files/pinne.jpg")}))
scene.add(mesh_logo_string);
var cube_black = new THREE.Mesh(new THREE.BoxGeometry(4,12,4), new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide }));
scene.add(cube_black);
cube_black.visible = false;


// TEXTURES (tex())								// repeat // pixel // mirrored
// houses
var material_house_hong1		= tex("hong4.png",			6,18);		// red
var material_house_hong2		= tex("house_china1.png",		3,9);		// temple
var material_house_hong3		= tex("hong2.png",			3,9);		// gul

var material_hong2			= tex("harasscomplex.jpg",		1,1);
var material_hong1			= tex("harasscomplex.jpg",		1,1);
var material_hong3			= tex("harasscomplex.jpg",		1,1);

var material_house_club			= tex("house_club.jpg");
var material_roof_club			= tex("roof_club.jpg");

var material_house_church		= tex("skyscraper1.jpg",		3,9);
var material_roof_church		= tex("church_roof.jpg");

var material_house_polish		= tex("polish_house_2.jpg");
var material_roof_polish		= tex("polish_roof_2.jpg");

// ground textures
var material_asphalt			= tex("asph3.jpg",			0.5,0.5);
var material_fire			= tex("fire_texture.jpg");

var material_terrain_golf		= tex("phaser_blackhole.jpg");

var material_blackhole			=[tex("phaser_blackhole.jpg",		1,-1),
					  tex("phaser_blackhole.jpg",		-1,-1),
					  tex("phaser_blackhole.jpg",		-1,1),
					  tex("phaser_blackhole.jpg",		1,1)];
var material_plake			= tex("phaser_plake.jpg");
var material_pmoss			= tex("phaser_pmoss.jpg");
var material_pred			=[tex("phaser_pred.jpg",		1,-1),
					  tex("phaser_pred.jpg",		-1,-1),
					  tex("phaser_pred.jpg",		-1,1),
					  tex("phaser_pred.jpg",		1,1)];

var material_epper			= tex("phaser_sea2.jpg");
var material_epper2			= tex("phaser_epper2.jpg");
var material_epper3			= tex("phaser_epper3.jpg");
var material_epper4			= tex("phaser_epper4.jpg");
var material_epper5			= tex("phaser_epper5.jpg");
var material_epper_carpet		= tex("phaser_sea_carpet.jpg");
var material_epper_snow			= tex("phaser_sea_snow.jpg");

var material_ice			= tex("phaser_ice.jpg");

var material_tjorn			= tex("phaser_tjorn.jpg");
var material_tjorn_park			= tex("phaser_tjorn_park.jpg");
var material_tjorn_green		= tex("phaser_tjorn_green.jpg");
var material_tjorn_red			= tex("phaser_tjorn_red.jpg");

var material_ice2 			= tex("phaser_ice2.jpg");

var material_desert = material_ice.clone();//			= tex("phaser_ice.jpg");//desert.jpg");
material_desert.color = new THREE.Color(0xFF9933);
var material_desert2 = material_ice2.clone();//			= tex("phaser_ice2.jpg");//phaser_desert2.jpg");
material_desert2.color = new THREE.Color(0xFF9933);

var material_black = material_tjorn.clone();			//= tex("phaser_testo13.jpg");
material_black.color = new THREE.Color(0x333333);

var material_volcano = material_ice2.clone();			//= tex("phaser_volcano.jpg");
material_volcano.color = new THREE.Color(0xDD4400);

var material_terrain			= tex("phaser7.jpg");
var material_terrain_magnet		= tex("phaser7_magnet.jpg");
var material_terrain_snow		= tex("phaser8.jpg");
var material_terrain_beach		= tex("phaser9.jpg");
var material_terrain_farm		= tex("phaser10.jpg");
var material_terrain_city		= tex("phaser11.jpg");

var material_dream			= tex("phaser_magnet.jpg");
var material_dream2			= material_ice2.clone();
material_dream2.color = new THREE.Color(0xFF0000);

var material_leaves 			= tex("phaser_leaves.jpg");
var material_scarymoss			= tex("phaser_scarymoss.jpg");

//var material_moss = material_ice2.clone();
//material_moss.color = new THREE.Color(0x666600);
var material_moss			= tex("phaser_norway.jpg");

var material_scary_1			= tex("phaser_moss.jpg",		1,-1);
var material_scary_2			= tex("phaser_moss.jpg",		-1,-1);
var material_scary_3			= tex("phaser_moss.jpg",		-1,1);
var material_scary_4			= tex("phaser_moss.jpg",		1,1);

var material_bluegreen = material_ice.clone();//			= tex("phaser_ice.jpg",			1.5,1.5,	false,	true);//phaser_sea_green.jpg");
material_bluegreen.color = new THREE.Color(0x66AA00);

// checkpoint materials
var balls_material			= psp("checkpoint.png");


// MATERIALS (mat()) - materials for sprites that can't be created here
// characters
var material_cow1			= mat("cow1.png");
var material_cow2			= mat("cow2.png");
var material_cow3			= mat("cow3.png");
var material_piggsvin			= mat("aversione.png");

// doors
var material_carclub			= mat("sign.png");

// other
var material_haybale			= mat("haybale.png");
var material_spade			= mat("spade.png");
var material_floweryellow		= mat("floweryellow.png");

var material_toolbox			= mat("toolbox.png");
var material_magnet			= mat("magnet.png");
var material_ironnugget			= mat("ironnugget.png");

var material_magicalstone		= mat("magicalstone.png");
var material_flower			= mat("flower.png");
var material_torch			= mat("torch.png");
var material_arctichare			= mat("arctichare.png");
var material_iceblock			= mat("iceblock.png");
var material_stonesnow			= mat("stonesnow.png");
var material_golfball			= mat("golfball.png");
var material_bushsmall			= mat("bushsmall.png");

var material_kotte			= mat("kotte.png");
var material_skalle			= mat("skalle.png");
var material_ben			= mat("ben.png");

var material_svarthal			= mat("svarthal.png");
var material_handskar			= mat("gloves.png");
var material_magic			= mat("magic.png");

var material_fire			= mat("campfire.png");
var material_flagpole			= mat("flagpole.png");

var material_antique1			= mat("antique1.png");


// SPRITES (spr())								//size	//height//transparent
var sprite_intro_a			= spr("C_daddy.png");
var sprite_intro_b			= spr("C_harass.png");
var sprite_intro_c			= spr("C_dg.png");
var sprite_intro_d			= spr("C_disonesty.png");

// player character
var bak_shelf				= spr("C_shelf.png",			0.4);
var shelf				= spr("car_shelf.png",			0.6);

// main characters
var sprite = new Array();
sprite[CAR_ADELE]			= spr("adele_ny3.png",	 		0.67);
sprite[CAR_DARK_GANDALF]		= spr("C_dg.png",			0.7);
sprite[CAR_DADDY]			= spr("C_daddy.png");
sprite[CAR_DOGERT]			= spr("C_dogert.png",			1.2);
sprite[CAR_OMALLEY]			= spr("omalley.png",			0.7);
sprite[CAR_HARASS]			= spr("C_harass.png");
sprite[CAR_DISONESTY]			= spr("C_disonesty.png");
sprite[CAR_MRS_SUPERCONDUCTOR]		= spr("mrs_superconductor2.png",	0.6);
sprite[CAR_POLISH_COW]			= spr("polish_cow2.png");
sprite[CAR_EPPER]			= spr("epper2.png");

sprite[CAR_TURF]			= spr("turf2.png",			0.75);
sprite[CAR_NUBBS]			= spr("turf2.png",			0.75);

var sprite_bak = new Array();
sprite_bak[CAR_ADELE]			= spr("C_adele_bak.png",		0.67);
sprite_bak[CAR_DARK_GANDALF]		= spr("C_dg_bak.png",			0.7);
sprite_bak[CAR_DADDY]			= spr("C_daddy_bak.png");
sprite_bak[CAR_DOGERT]			= spr("C_dogert_bak.png",		1.2);
sprite_bak[CAR_OMALLEY]			= spr("omalley_bak.png",		0.7);
sprite_bak[CAR_HARASS]			= spr("C_harass_bak.png");
sprite_bak[CAR_DISONESTY]		= spr("C_disonesty_bak.png");
sprite_bak[CAR_MRS_SUPERCONDUCTOR]	= spr("C_mrs_superconductor_bak.png",	0.6);
sprite_bak[CAR_HARASS]			= spr("C_harass_bak.png");
sprite_bak[CAR_POLISH_COW]		= spr("polish_cow2.png");	// behöver bak sprite!!
sprite_bak[CAR_EPPER]			= spr("epper2.png");		// behöver bak sprite!!

sprite_bak[CAR_TURF]			= spr("turf2.png",			0.75);
sprite_bak[CAR_NUBBS]			= spr("turf2.png",			0.75);

var sprite_foto				= spr("sprite_foto.png");
var sprite_mclannister			= spr("sprite_tomte.png");
var sprite_krokodil			= spr("sprite_krokodil.png");
var sprite_hare				= spr("arctic_hare.png");
var sprite_hare_normal			= spr("hare_normal.png");
var sprite_rumbleraz			= spr("rumbleraz.png");
var sprite_face				= spr("sprite_face.png");
var sprite_aukt				= spr("sprite_aukt.png");
var sprite_fan				= spr("sprite_fan.png");
var sprite_storeowner			= spr("sprite_storeowner.png");
var sprite_faderlenin			= spr("sprite_faderlenin.png");
var sprite_fack				= spr("sprite_union.png");
var sprite_harassfan			= spr("sprite[CAR_HARASS]fan.png");

var sprite_box_flames			= spr("box_flames.png");

var sprite_shelfstyle_clothes1		= spr("C_shelf_bandana.png",		0.4);
var sprite_shelfstyle_clothes2		= spr("sprite_fan.png",			0.4);

var sprite_shelfstyle_car1		= spr("car_shelf_flames.png",		0.6);
var sprite_shelfstyle_car2		= spr("calendar.png",			0.6);

// ui
var sprite_ui_mouseclick		= spr("ui_mouse_click.png",		0.6);


// "permanent" houses
var sprite_carclub			= spr("sign.png",			0.6);
var sprite_dghouse			= spr("sprite_faderlenin.png");
var sprite_harasshouse			= spr("chairs.png");
var sprite_laundryroom			= spr("ceilinglamp.png");
var sprite_epperhouse			= spr("bench.png");
var sprite_auction			= spr("car_dg.png");


var sprite_wheel			= spr("chairs.png");
var sprite_calendar			= spr("polishc.png");
var sprite_wallclock			= spr("bench.png");
var sprite_ceilinglamp			= spr("muffs.png");
var sprite_petrolcan			= spr("muffins.png");
var sprite_table			= spr("washingmachine2.png");


var sprite_intro_wheel_1		= spr("wheel.png",			0.5);
var sprite_intro_wheel_2		= spr("wheel.png",			0.5);
var sprite_intro_wheel_3		= spr("wheel.png",			0.5);
var sprite_intro_wheel_4		= spr("wheel.png",			0.5);

var sprite_gym_gympod			= spr("gympod.png");
var sprite_gym_thing_1			= spr("gym_thing_1.png");
var sprite_gym_thing_2			= spr("gym_thing_2.png");
var sprite_gym_thing_2B			= spr("gym_thing_2.png");
var sprite_gym_thing_2C			= spr("gym_thing_2.png");
var sprite_gym_thing_2D			= spr("gym_thing_2.png");
var sprite_gym_thing_2E			= spr("gym_thing_2.png");
var sprite_gym_thing_2F			= spr("gym_thing_2.png");
var sprite_gym_thing_2G			= spr("gym_thing_2.png");
var sprite_gym_thing_1_trash		= spr("gym_thing_1_trash.png");
var sprite_gym_thing_2_trash		= spr("gym_thing_2_trash.png");
var sprite_gym_thing_2B_trash		= spr("gym_thing_2_trash.png");
var sprite_gym_thing_2C_trash		= spr("gym_thing_2_trash.png");
var sprite_gym_thing_2D_trash		= spr("gym_thing_2_trash.png");
var sprite_gym_thing_2E_trash		= spr("gym_thing_2_trash.png");
var sprite_gym_thing_2F_trash		= spr("gym_thing_2_trash.png");
var sprite_gym_thing_2G_trash		= spr("gym_thing_2_trash.png");

var sprite_freeroam_1_muffins		= spr("muffins.png");
var sprite_omalley_2_muffins		= spr("muffins.png");

var sprite_energydrink			= spr("energydrink.png");
var sprite_daddycamera			= spr("daddycamera.png");

var sprite_magnet1			= spr("C_oballin.png");
var sprite_magnet2			= spr("aversione.png");
var sprite_magnet3			= spr("octopussy.png");
var sprite_magnet4			= spr("arctichare2.png");
var sprite_magnet5			= spr("polarbear2.png");
var sprite_magnet6			= spr("bird_baby.png");
var sprite_magnet7			= spr("hamster_baby.png");
var sprite_magnet8			= spr("cooldude.png");

var sprite_cappy			= spr("cappy.png");

var sprite_dghotspring			= spr("sink.png");

var sprite_dghotspring_powerplant	= spr("petrolcan.png");
var sprite_dghotspring_ice		= spr("calendar.png");
var sprite_dghotspring_fire		= spr("ceilinglamp.png");

var sprite_freeroam_4_dogertstart	= spr("table.png");

var sprite_license_3_car1		= spr("car_dg.png",			0.75);
var sprite_license_3_car2		= spr("car_dg.png",			0.75);

var sprite_license_4_peeraycast		= spr("sink.png");

var sprite_license_5_kocar1		= spr("car_dg.png",			0.75);
var sprite_license_5_kocar2		= spr("car_dg.png",			0.75);
var sprite_license_5_kocar3		= spr("car_dg.png",			0.75);
var sprite_license_5_kocar4		= spr("car_dg.png",			0.75);
var sprite_license_5_kocar5		= spr("car_dg.png",			0.75);
var sprite_license_5_motcar		= spr("car_dg.png",			0.75);

var sprite_magnetdrown_magnet		= [ spr("magnet.png"), spr("magnet.png"), spr("magnet.png"), spr("magnet.png"), spr("magnet.png"), spr("magnet.png"), spr("magnet.png") ];

var sprite_carclubfire			= spr("campfire.png");

var sprite_killepper_bomb		= spr("bomb.png");
var sprite_killepper_audience		= spr("table.png");
var sprite_killepper_stage		= spr("sink.png");

var sprite_harassfan_start		= spr("car_shelf.png");
var sprite_harassfan_fanbullet		= spr("table.png");
var sprite_harassfan_harassbullet	= spr("washingmachine2.png");

var sprite_fart_cloud			= spr("sink.png");

var sprite_magnetfactory_lift		= spr("sink.png");

// cars must be created after character sprites so they get drawn in the correct order
var player				= spr("bomb.png");
player.visible = false;

var character = new Array();
character[CAR_ADELE]			= spr("car_adele.png",			0.95);
character[CAR_DARK_GANDALF]		= spr("car_dg.png",			0.8);
character[CAR_DADDY]			= spr("daddycar.png",			1.12);
character[CAR_DOGERT]			= spr("car_dogert.png",			1);
character[CAR_OMALLEY]			= spr("car_omalley.png",		0.75);
character[CAR_HARASS]			= spr("car_harass_3.png",		0.75);
character[CAR_DISONESTY]		= spr("none.png",			0.75);
character[CAR_MRS_SUPERCONDUCTOR]	= spr("car_mrs_superconductor.png",	0.75);
character[CAR_POLISH_COW]		= spr("car_polish_cow.png",		0.75);
character[CAR_EPPER]			= spr("car_epper.png",			0.75);

character[CAR_TURF]			= spr("car_turf.png",			0.75);
character[CAR_NUBBS]			= spr("car_turf.png",			0.75);


// SOUNDS (snd())								// vol	// loop
let sound_crash				= snd("sound_carland2.mp3",		0.5,	false);
let sound_car				= snd("car4.mp3",			0.8);
let sound_grass				= snd("grass.mp3",			0.7);
let sound_water				= snd("water.mp3",			0.7);
let sound_land				= snd("sound_carland2.mp3",		1,	false);
let sound_splash			= snd("water_splash.mp3",		0.85,	false);
let sound_break				= snd("icebreaking.mp3",		0.5);
let sound_error				= snd("error.mp3",			1,	false);
let sound_countdown			= snd("sound_countdown.ogg",		0.6,	false);
let sound_checkpoint			= snd("sound_checkpoint.mp3",		1,	false);
let sound_carstart			= snd("sound_carstart.mp3",		0.75,	false);
let sound_shorttone			= snd("plop.mp3",			0.5,	false);
let sound_shot				= snd("laser.ogg",			0.4,	false);
let sound_click				= snd("ui_click.mp3",			1,	false);
let sound_pause				= snd("ui_pause.mp3",			1,	false);
let sound_explosion			= snd("sound_explosion2.mp3",		0.8,	false);
let sound_explosion2			= snd("softer explosion.mp3",		0.4,	false);
let sound_cartoon			= snd("cartoon.mp3",			1,	false);
let sound_laser				= snd("laser.mp3",			0.6,	false);
let sound_ring				= snd("ring.mp3",			1,	false);
let sound_punch				= snd("sound_punch.mp3",		0.7,	false);

let sound_adele				= snd("adele.mp3",			1,	false);
let sound_dark_gandalf			= snd("dark_gandalf.mp3",		0.87,	false);
let sound_daddy				= snd("daddy.mp3",			1,	false);
let sound_dogert			= snd("dogert.mp3",			1,	false);
let sound_omalley			= snd("omalley.mp3",			1,	false);
let sound_epper				= snd("epper.mp3",			1,	false);
let sound_harass			= snd("sound_harass2.mp3",		1,	false);
//let sound_adele			= snd("sound_adele.mp3",		1,	false);
//let sound_adele			= snd("sound_adele.mp3",		1,	false);
//let sound_adele			= snd("sound_adele.mp3",		1,	false);

//let music_dream			= snd("dream.mp3",			0.12);
//let music_overworld			= snd("morning_birds.mp3",		0.17);
//let music_carclub			= snd("music_carclub.mp3",		0.43);
//let music_race			= snd("theme_race.mp3",			0.6);
//let music_race2			= snd("theme_race2.mp3",		0.67);
//let music_cute			= snd("music_cute.mp3",			0.5);
//let music_horror			= snd("music_horror.mp3",		0.5,	false);

let music_fighting_gravity		= snd("fighting_gravity.mp3");


// colors
var col_red				= new THREE.Color(0xFF0000);
var col_blue				= new THREE.Color(0x1107ff);
var col_black				= new THREE.Color(0x130810);
var col_green				= new THREE.Color(0x00FF00);
var col_white				= new THREE.Color(0xFFFFFF);


// race
mesh_checkpoint_current = spr("flag_green.png", 2);
scene.add(mesh_checkpoint_current);
mesh_checkpoint_finish = spr("flag_finish.png", 2);
scene.add(mesh_checkpoint_finish);
