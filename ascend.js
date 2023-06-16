// ascend.js - creates, and shows and hides terrain chunks and objects (trees, houses, etc)
// kbrecordzz 2022

"use strict";


// ------------------------ //
// ---- CONSTANTS, ETC ---- //
// ------------------------ //
const levelwidth		= 46;//90;
const chunkwidth		= 50;

const ASCEND_FIRSTBLOCK		= 0;
const ASCEND_LASTBLOCK		= chunkwidth-2;

const ASCEND_ROAD		= 1;
const ASCEND_TREE		= 20;
const ASCEND_BUSH		= 30;
const ASCEND_GRASS		= 40;
const ASCEND_HOUSE		= 50;	// can be 50.xx (with decimals containing additional info about house size, etc), use Math.floor() to remove the decimals
const ASCEND_HOUSEPART		= 51;
const ASCEND_ICE		= 60;
const ASCEND_FIRE		= 70;

const CHUNK_DONOTHING		= 0;
const CHUNK_SHOW		= 1;
const CHUNK_HIDE		= 2;

const NPC_VIEWDISTANCE		= 2;


// SCENE, CAMERAS, HTML CANVASES, LIGHTS, FOGS
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x740060);
var camera_main = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
var camera_splashscreen = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
var camera_cutscene = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
var camera = camera_main;
var renderer;

var div_backspegel = document.getElementById("backspegel");
var camera_backspegel = new THREE.PerspectiveCamera(14, div_backspegel.offsetWidth/(div_backspegel.offsetHeight*1.5), 0.1, 1000);
var renderer_backspegel = new THREE.WebGLRenderer();
div_backspegel.appendChild(renderer_backspegel.domElement);

var div_daddycamera = document.getElementById("daddycamera");
var camera_daddycamera = new THREE.PerspectiveCamera(60, div_daddycamera.offsetWidth/(div_daddycamera.offsetHeight*1.5), 0.1, 1000);
var renderer_daddycamera = new THREE.WebGLRenderer();
//div_daddycamera.appendChild(renderer_daddycamera.domElement);

var light = new THREE.AmbientLight(0xFFFFD5, 1.31);
scene.add(light);
var light_intro = new THREE.PointLight(0xFFFFFF, 3, 30);
//scene.add(light_intro);
var fog_all = new THREE.Fog(0x1107ff, 1, 999999);
scene.fog = fog_all;
var fog_intro_timer = 0;

var loader = new THREE.TextureLoader();

// race checkpoint
var roadblock_x;
var roadblock_z;
var checkstep_x = new Array();
var checkstep_z = new Array();	// xz for part steps between checkpoints
var place = [ 99,0,1,2,3 ];			// placement in race. 99 is player, rest is characters
var place_progress = [ 0,0,0,0,0 ];		// progress for the car in each placement in race
var winner = -1;
var character_leader = 99

// creating variables here so that they are global. they are set in ascend_init()
var material_trees;
var psp_material_size;

var material_skybox;
var material_seabox;
var material_bottombox;
var material_cloudbox;
var geometry_skybox;
var geometry_seabox;
var geometry_bottombox;
var geometry_cloudbox;
var mesh_skybox;
var mesh_seabox;
var mesh_bottombox;
var mesh_cloudbox;

var material_water;
var material_bottom;
var water_animate;
var cloudbox_animate;
var leaves_animate;
var leaves_animate2;

var sealevel = -1;
var highness, wideness;				// wideness and highness (decides the shape of terrain)

// island generator variables
var highness_grid = new Array();
var wideness_grid = new Array();
var islend_grid = new Array();
var seed_grid = new Array();	// for set_weights()
const islwidth = 9;
var rnds = 0;

// level start point
// 30,30 (28-33, 26-36) = hongkong/japan

// 38,31 (35-39, 28-32) = testotown. magnetfactory island start
// 36,32		= magnetfactory actual factory

// 36,38 (32-40, 36-41) = haftlan
// 33,36		= haftlan-nefar
// 35,36		= haftlan-nefar, CUT_FREEROAM_DRIVERSLICENSE start
// 34,39		= haftlan-nefar, CUT_FREEROAM_DRIVERSLICENSE_3
// 34,37		= haftlan-nefar, CUT_FREEROAM_DRIVERSLICENSE_5

var start_chunk_x;
var start_chunk_z;

// get start chunk from URL
var cookie_x = parseInt(new URLSearchParams(window.location.search).get('x'));
var cookie_z = parseInt(new URLSearchParams(window.location.search).get('z'));
if (cookie_x >= 0 && cookie_z >= 0)
{
	start_chunk_x = cookie_x;
	start_chunk_z = cookie_z;
}
// get start chunk from cookies
else if (document.cookie.search("x=") !== -1 && document.cookie.search("z=").length !== -1)
{
	let kaka_x1 = document.cookie.split("x=");
	let kaka_x2 = kaka_x1[1].split(";");
	start_chunk_x = parseInt(kaka_x2[0]);

	let kaka_z1 = document.cookie.split("z=");
	let kaka_z2 = kaka_z1[1].split(";");
	start_chunk_z = parseInt(kaka_z2[0]);
}
// start chunk if the first time playing
else
{
	start_chunk_x = 30;
	start_chunk_z = 38;
}

var current_chunk_x;
var current_chunk_z;

var frame_counter = 0;			// frame counter
var main_loop_counter = 0;		// counter for internal loop in one frame

// chunk creation
var last_chunk_x = 0;
var last_chunk_z = 0;
var chunk_process = new Array();
var chunk_process_x, chunk_process_z;
for (chunk_process_x = 0; chunk_process_x < levelwidth; chunk_process_x++)
{
	chunk_process[chunk_process_x] = new Array();
	for (chunk_process_z = 0; chunk_process_z < levelwidth; chunk_process_z++)
	{
		chunk_process[chunk_process_x][chunk_process_z] = 0;
	}
}
// chunks that will be drawn in the beginning of the game
// !! jag skriver +1 för att spelaren börjar på start_chunk_x+1 och inte start_chunk_x. lite inkonsekvent och bör fixas!
for (let t = -1; t <= 1; t++)
{
	for (let u = -1; u <= 1; u++)
	{
	//	chunk_process[start_chunk_x+1+t][start_chunk_z+1+u] = CHUNK_SHOW;
		chunk_process[start_chunk_x+t][start_chunk_z+u] = CHUNK_SHOW;
	}
}

chunk_process_x = 0, chunk_process_z = 0;

var to_load_chunk_x = [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];	// 25 (5x5 chunks)
var to_load_chunk_z = [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];
var dynload_heightmap_to_load_i = 0, dynload_objects_to_load_i = 0;

var continue_create = 0, continue_create2 = 0, continue_create3 = 0;
var continue_createb = 0, continue_create2b = 0, continue_create3b = 0;

var nextpart_start = 0;
var dynload_objects_skipping = 0, dynload_height_skipping = 0;

var i_continue = 0, j_continue = 0, i_continueb = 0, j_continueb = 0;


// ---------------------------- //
// create level variable arrays //
// ---------------------------- //
// Graham Relf, Forest (1983), heightmap generation algorithm
var profile = [
 77, 80, 84, 88, 92, 96,101,104,108,112,115,118,120,123,126,129,131,133,134,134,133,133,131,130,129,126,123,122,122,122,123,125,126,130,134,137,137,138,138,137,
135,133,129,123,118,111,105,101, 97, 93, 90, 86, 82, 78, 74, 71, 69, 67, 67, 67, 66, 67, 69, 71, 73, 74, 73, 73, 71, 69, 66, 62, 58, 54, 52, 52, 54, 55, 58, 59,
 62, 63, 63, 65, 65, 65, 66, 66, 67, 69, 70, 73, 77, 80, 82, 85, 88, 90, 93, 95, 96, 96, 96, 96, 93, 92, 90, 85, 80, 75, 71, 67, 63, 60, 58, 55, 52, 50, 47, 44,
 43, 41, 40, 39, 36, 35, 33, 32, 30, 28, 24, 20, 15, 11,  7,  3,  2,  2,  2,  2,  2,  2,  3,  6,  7, 10, 11, 15, 18, 22, 24, 25, 25, 26, 26, 25, 25, 25, 25, 25,
 26, 28, 29, 30, 33, 36, 37, 39, 39, 40, 40, 40, 39, 39, 39, 37, 37, 37, 36, 36, 36, 35, 35, 33, 33, 32, 30, 28, 25, 20, 15, 11, 10,  9,  9,  9,  9, 11, 14, 15,
 17, 17, 18, 18, 18, 18, 18, 18, 17, 17, 17, 15, 14, 13, 11, 11, 10, 10, 10, 11, 13, 14, 17, 20, 22, 25, 28, 30, 35, 39, 41, 45, 50, 58, 63, 69, 73, 77, 80, 82,
 84, 84, 85, 85, 84, 84, 82, 81, 80, 75, 73, 71, 71, 73, 74, 75];

var profile_star = [14, 18, 42, 47, 47, 51, 55, 8, 63, 14, 15, 2, 21, 23, 29, 3, 34, 36, 38, 40, 42, 5, 6, 9];	// another random profile

// weights for terrain generator
var a,b,c,d,e;			// height
var da,db,dc,dd,de;		// height details
var ta,tb,tc,td,te;		// trees
var dta,dtb,dtc,dtd,dte;	// trees details

var seed;
var master, master2;
var change4, change5;

var i1, j1, i, j;			// current chunk
var height = 0;				// current height (y)
var character_height = [0, 0, 0, 0];
var heightmap = new Array();		// heightmap
var chunkmap = new Array();		// same as heightmap but at a larger scale for chunks, 4 points per chunk (one for each chunk corner)
var objects = new Array();		// objects (trees, houses, etc)
var mesh_terrain = new Array();		// array for ground meshes
var mesh_houses = new Array(), mesh_houses2 = new Array(), mesh_houses3 = new Array();
var mesh_roofs = new Array();
var mesh_roads = new Array();
var vertices_trees = [];
var vertices_bushes = [];
var vertices_grass = [];
var vertices_checkpoints = [];
var pointsprites_trees = new Array();	// array for actual trees (Points sprites)
var pointsprites_bushes = new Array();
var pointsprites_grass = new Array();
var pointsprites_checkpoints = new Array();
var heightmap_is_loaded = new Array();	// array that says which chunks have loaded heightmap etc
var objects_is_loaded = new Array();	// array that says which chunks have loaded objects etc
var large_arrays_is_created = new Array();
var material_grid = new Array();

var uv_terrain = new Float32Array(576240);
var uv_others = new Float32Array(576240);
var uv_houses = new Float32Array(576240);
var uvi = 0;
var current_line = 0;
var normals = new Float32Array(576240);

while (uvi < 49*49*12*20)		// 20 is just a number i use so this array is always big enough. i don't think everything up to 20 is used.
					// it's to create the normal array i think, bc it's used for detailed meshes too. this needs to be structured!
{
	// UV för terrain mesh
	current_line = Math.floor(uvi/(49*12));

				  // x på texturen							  // y på texturen			// hörn på 3d-triangeln
	uv_terrain[uvi]        = (1/49+(1/49)*(uvi/12-current_line*49));	uv_terrain[uvi+1]	= (current_line*(1/49));		// 1
	uv_terrain[uvi+2]      = ((1/49)*(uvi/12-current_line*49));		uv_terrain[uvi+3]	= (1/49+current_line*(1/49));		// 2
	uv_terrain[uvi+4]      = ((1/49)*(uvi/12-current_line*49));		uv_terrain[uvi+5]	= (current_line*(1/49));		// 3
	uv_terrain[uvi+6]      = (1/49+(1/49)*(uvi/12-current_line*49));	uv_terrain[uvi+7]	= (current_line*(1/49));		// 4 (är samma som 1)
	uv_terrain[uvi+8]      = (1/49+(1/49)*(uvi/12-current_line*49));	uv_terrain[uvi+9]	= (1/49+current_line*(1/49));		// 5
	uv_terrain[uvi+10]     = (1/49*(uvi/12-current_line*49));		uv_terrain[uvi+11]	= (1/49+current_line*(1/49));		// 6 (är samma som 2)

	// just setting all these to the same values. it seems to work, don't know why. and it's faster than three.js's computeVertexNormals()
	normals[uvi] = 0.05; normals[uvi+1] = 0.05; normals[uvi+2] = 0.05; normals[uvi+3] = 0.05; normals[uvi+4] = 0.05; normals[uvi+5] = 0.05; normals[uvi+6] = 0.05; normals[uvi+7] = 0.05; normals[uvi+8] = 0.05; normals[uvi+9] = 0.05; normals[uvi+10] = 0.05; normals[uvi+11] = 0.05;

	// UV for trees?
	uv_others[uvi] = 1+uvi; uv_others[uvi+1] = 0+uvi; uv_others[uvi+2] = 0+uvi; uv_others[uvi+3] = 0+uvi; uv_others[uvi+4] = 0+uvi; uv_others[uvi+5] = 1+uvi; uv_others[uvi+6] = 0+uvi; uv_others[uvi+7] = 1+uvi; uv_others[uvi+8] = 1+uvi; uv_others[uvi+9] = 1+uvi; uv_others[uvi+10] = 1+uvi; uv_others[uvi+11] = 0+uvi;

	uv_houses[uvi]		= 0.25*(uvi/12);	uv_houses[uvi+1]	= 0;
	uv_houses[uvi+2]	= 0.25*((uvi/12)+1);	uv_houses[uvi+3]	= 0;
	uv_houses[uvi+4]	= 0.25*((uvi/12)+1);	uv_houses[uvi+5]	= 1;

	uv_houses[uvi+6]	= 0.25*((uvi/12)+1);	uv_houses[uvi+7]	= 1;
	uv_houses[uvi+8]	= 0.25*(uvi/12);	uv_houses[uvi+9]	= 1;
	uv_houses[uvi+10]	= 0.25*(uvi/12);	uv_houses[uvi+11]	= 0;

	uvi += 12;
}

var uv_attribute_terrain = new THREE.BufferAttribute(new Float32Array(uv_terrain), 2);
var uv_attribute_others = new THREE.BufferAttribute(new Float32Array(uv_others), 2);
var uv_attribute_houses = new THREE.BufferAttribute(new Float32Array(uv_houses), 2);
var normals_attribute = new THREE.BufferAttribute(new Float32Array(normals), 2);


var geometry_water = new THREE.BoxGeometry((chunkwidth-1)*7, 1, (chunkwidth-1)*7);
var area_water;
var area_bottom;

var vertices_terrain = new Array();
var vertices_houses = new Array(), vertices_houses2 = new Array(), vertices_houses3 = new Array();
var vertices_roofs = new Array();
var vertices_roads = new Array();
var vertices_terrain_i;
var vertices_houses_i, vertices_houses2_i, vertices_houses3_i;
var vertices_roofs_i;
var vertices_roads_i;


// --------------------------- //
// ---- GENERAL FUNCTIONS ---- //
// --------------------------- //
function x_to_chunk_no(x) { return Math.floor(x/(chunkwidth-1)); }	// convert x or z position to chunk number
function x_to_x_in_chunk(x) {return x-(x_to_chunk_no(x)*(chunkwidth-1)); }	// convert x or z position to x or z position relative to chunk
function x_in_chunk_to_x(fi1, fi) { return (chunkwidth-1)*fi1+fi; }	// convert chunk-relative x or z position to "real" x or z position

function distance_get_xz(fx1, fz1, fx2, fz2) { return Math.sqrt((fx2-fx1)*(fx2-fx1) + (fz2-fz1)*(fz2-fz1)); }	// distance between two points
function distance_get(fobject1, fobject2) { return Math.sqrt((fobject2.position.x-fobject1.position.x)*(fobject2.position.x-fobject1.position.x) + (fobject2.position.z-fobject1.position.z)*(fobject2.position.z-fobject1.position.z)); }	// distance between two objects

function height_get_xz(x, z)
{
	let x_floor = Math.floor(x), z_floor = Math.floor(z);
	return heightmap[x_to_chunk_no(x_floor)][x_to_chunk_no(z_floor)][x_to_x_in_chunk(x_floor)][x_to_x_in_chunk(z_floor)];
}

// interpolate between four points (height values) to find out the current heightvalue
function height_get(fobject)
{
	// interpolation in triangle, read about the calculation here: https://codeplea.com/triangular-interpolation
	// height values for points in triangle

	// check if you're in the first or second triangle, for height value interpolation
	// then create values for height value interpolation
	let p_xf = Math.floor(fobject.position.x), p_zf = Math.floor(fobject.position.z);
	let p_xc = Math.ceil(fobject.position.x), p_zc = Math.ceil(fobject.position.z);
	let p_xd = fobject.position.x-p_xf, p_zd = fobject.position.z-p_zf;
	let p_value;

	let ixf = x_to_chunk_no(p_xf), izf = x_to_chunk_no(p_zf);
	let ixc = x_to_chunk_no(p_xf+1), izc = x_to_chunk_no(p_zf+1);
	let xf = x_to_x_in_chunk(p_xf), zf = x_to_x_in_chunk(p_zf);
	let xc = x_to_x_in_chunk(p_xf+1), zc = x_to_x_in_chunk(p_zf+1);

	// first triangle
	if (p_xd + p_zd < 1)
	{
		if (heightmap_is_loaded[x_to_chunk_no(p_xf)][x_to_chunk_no(p_zf)] === 1)
		{
			p_value = (1-p_xd-p_zd)*heightmap[ixf][izf][xf][zf] + p_zd*heightmap[ixf][izc][xf][zc] + p_xd*heightmap[ixc][izf][xc][zf];		// calculate interpolated value for point p from "weights"
		}
		else return 1;
	}
	// second triangle
	else
	{
		if (heightmap_is_loaded[x_to_chunk_no(p_xc)][x_to_chunk_no(p_zc)] === 1)
		{
			p_value = (p_xd+p_zd-1)*heightmap[ixc][izc][xc][zc] + (1-p_zd)*heightmap[ixc][izf][xc][zf] + (1-p_xd)*heightmap[ixf][izc][xf][zc];		// calculate interpolated value for point p from "weights"
		}
		else return 1;
	}

	if (isNaN(p_value)) p_value = heightmap[ixf][izf][xf][zf];		// i1 kan ge error här?
	return p_value+0.4;							// this is for looks inside the game
}

function ascend_getobject_xz(x, z)
{
	let x_floor = Math.floor(x), z_floor = Math.floor(z);
	let object_code = objects[x_to_chunk_no(x_floor)][x_to_chunk_no(z_floor)][x_to_x_in_chunk(x_floor)][x_to_x_in_chunk(z_floor)];
	if (!(object_code === undefined)) return object_code;
	else return 0;
}

function ascend_getobject(object)
{
	let x_floor = Math.floor(object.position.x), z_floor = Math.floor(object.position.z);
	let object_code = objects[x_to_chunk_no(x_floor)][x_to_chunk_no(z_floor)][x_to_x_in_chunk(x_floor)][x_to_x_in_chunk(z_floor)];
	if (!(object_code === undefined)) return object_code;
	else return 0;
}

// get object values from outside of chunk too (-1 and chunkwidth-1 are allowed values)
function ascend_getobject_outside_of_chunk_xz(x, z)
{
	let x_floor = Math.floor(x), z_floor = Math.floor(z);
	let fi1 = x_to_chunk_no(x_floor);
	let fj1 = x_to_chunk_no(z_floor);
	let fi = x_to_x_in_chunk(x_floor);
	let fj = x_to_x_in_chunk(z_floor);

	if (fi === -1) { fi1 -= 1; fi = chunkwidth-2; }
	if (fj === -1) { fj1 -= 1; fj = chunkwidth-2; }
	if (fi === chunkwidth-1) { fi1 += 1; fi = 0; }
	if (fj === chunkwidth-1) { fj1 += 1; fj = 0; }

	let object_code = objects[fi1][fj1][fi][fj];
	if (!(object_code === undefined)) return object_code;
	else return 0;
}

function pseudorandom(number) { return 29.197483*number-Math.floor(29.197483*number); }

// ------------------------------------- //
// ---- CHOOSE THE TERRAIN SETTINGS ---- //
// ------------------------------------- //
// i've made some random variations of the grelf() function, to let houses, trees, etc get placed in different ways. there's no particular thought behind these
function grelf_master(ga, gb, gc, gd, ge, neg1, neg2, neg3, neg4, neg5, and) { return neg1*profile[ga & and] + neg2*profile[gb & and] + neg3*profile[gc & and] + neg4*profile[gd & and] + neg5*profile[ge & and]; }
function grelf() { return grelf_master(a,b,c,d,e,1,1,1,1,1,0xFF); }
function grelf3() { return grelf_master(c,a,d,e,b,1,1,-1,1,-1,0xFF); }
function grelf_detail() { return grelf_master(da,db,dc,dd,de,1,1,1,1,1,0xFF); }
function grelf_detail2() { return profile[dd & 0x31] + profile[dc & 0x21] + profile[db & 0x11] + profile[de & 0x3] + profile[da & 0x3]; }
function grelf_objects() { return profile[da/2 & 0xF] + profile[db & 0xFF] + profile[dc/2 & 0xF] + profile[dd/2 & 0xF] + profile[de/2 & 0xF]; }
function grelf_objects_detail() { return grelf_master(dta*2,dtb*2,dtc*2,dtd*2,dte*2,1,1,1,1,1,0xF); }
function grelf_houses() { return 2*profile[a & 0xFF] - profile[c & 0xFF] - 3*profile[d & 0xFF]; }
function grelf_houses_detail() { return 4*profile[b & 0xA] - 7*profile[a & 0xB] - 3*profile[e & 0xC]; }

// these values decide how the weights in set_weights() will turn out
function set_wideness_highness(fi1, fj1)
{
	if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 33 && fj1 <= 35)) { 		highness = 95;		wideness = 25; }		// epper land
	else if ((fi1 >= 33 && fi1 <= 35) && (fj1 >= 33 && fj1 <= 35)) {	highness = 110;		wideness = 3; seed = 0.6514484815558458; }//seed = 0.21970444070324635; }			// epper bridge
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 28 && fj1 <= 32)) {	highness = 50;		wideness = 0.15; }		// magnet island
	else if ((fi1 >= 33 && fi1 <= 35) && (fj1 >= 28 && fj1 <= 32)) {	highness = 20;		wideness = 18; seed = 0.12936374; }			// magnet archipelago
	else if ((fi1 >= 32 && fi1 <= 35) && (fj1 >= 36 && fj1 <= 38)) {	highness = 15;		wideness = 4; seed = 0.6602099002976599; }			// tjörn
	else if ((fi1 >= 29 && fi1 <= 30) && (fj1 >= 35 && fj1 <= 40)) {	highness = 25;		wideness = 1.5; }		// norway
	else if (fi1 === 28 && fj1 === 39) {					highness = 11;		wideness = 10; }		// volcano
	else if ((fi1 >= 31 && fi1 <= 35) && (fj1 >= 39 && fj1 <= 41)) {	highness = 20;		wideness = 3; }			// hårass land
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 36 && fj1 <= 41)) {	highness = 38;		wideness = 6; }			// haftlan-drakh
	else if ((fi1 >= 29 && fi1 <= 32) && (fj1 >= 28 && fj1 <= 34)) {	highness = 21;		wideness = 3; }			// hongkong/japan
	else if (fi1 === 32 && fj1 === 35) {					highness = 10;		wideness = 5; }			// pir
//	else if (fi1 === 31 && fj1 === 37) {					highness = 1;		wideness = 1; }			// dream
	else if ((fi1 === 31 && fj1 === 35) || (fi1 === 31 && fj1 === 38)) {	highness = 30;		wideness = 3.8; }		// ice
	else if ((fi1 === 28 && fj1 === 33) || ((fi1 >= 26 && fi1 <= 27) && (fj1 >= 33 && fj1 <= 41)) || (fj1 === 41 && fi1 >= 26 && fi1 <= 30)) { highness = 28;		wideness = 7; seed = 0.8126634736; }	// passage

	else {									highness = 0;		wideness = 0; }			// (others) water

	// dublett!! denna kommer nu sättas varje gång, vilket är onödigt, men det funkar i alla fall... hur skriver jag det bättre?
	//seed = master_seed;
	master = (((seed*10-Math.floor(seed*10))*30)/9+1)/2;
	master2 = (seed*111-Math.floor(seed*111))*20;
	change4 = seed*21-Math.floor(seed*21);
	change5 = seed*17-Math.floor(seed*17);
}

// set weights that decide how the heightmap and object generation will turn out
// everything here should come originally from the seed variable
function set_weights(fi1, fj1, fi, fj, weights_seed)
{
	let fx = fi1*chunkwidth+fi;
	let fz = fj1*chunkwidth+fj;

	// make it right in the end of chunks too
	if (fi === chunkwidth-1) fx++;
	if (fj === chunkwidth-1) fz++;

	// main weights
	a = ((weights_seed&2)*12   *fx*wideness + (weights_seed&6)*4.2 *master2*fz*wideness) * 0.01;
	b = ((weights_seed&7)*12.6 *fx*wideness + (weights_seed&4)*master2*1**fz*wideness*0.6) * 0.01;
	c = ((weights_seed&4)*12   *fx*wideness + (weights_seed&9)*12  *master2*change4*fz*wideness) * 0.01;
	d = ((weights_seed&8)*12.6 *fx*wideness + (weights_seed&1)*12  *master2*change5*fz*wideness) * 0.01;
	e = ((weights_seed&3)*12   *fx*wideness + (weights_seed&5)*6.6 *master2*fz*wideness) * 0.01;

	// detail weights
	da = (weights_seed&4)*(master2+1)*fx*wideness*0.1 + (weights_seed&3)*0.7*fz*wideness;
	db = (weights_seed&1)*(1-master2)*fx*wideness*0.1 + (weights_seed&4)*1.1*fz*wideness;
	dc = (weights_seed&3)*(master2+8)*fx*wideness*0.1 + (weights_seed&2)*1.4*fz*wideness;
	dd = (weights_seed&5)*(master2*1)*fx*wideness*0.1 + (weights_seed&3)*1.3*fz*wideness;
	de = (weights_seed&6)*(5/master2)*fx*wideness*0.1 + (weights_seed&3)*1.1*fz*wideness;

	// tree weights
        ta = 1.8   *fx*wideness + 1.2  *(master+master2)*fz*wideness*0.6;
        tb = 2.4   *fx*wideness + 0.6  *(master-master2)*fz*wideness*0.6;
        tc = 3     *fx*wideness + 14.4 *(master+master2)*fz*wideness*0.6;
        td = 3.6   *fx*wideness + 1.8  *(master-master2)*fz*wideness*0.6;
        te = 4.2   *fx*wideness + 12.6 *(master+master2)*fz*wideness*0.6;

        // tree details weights
        dta = 1.2  *fx*wideness + 1.8 *fz*wideness;
        dtb = 0.6  *fx*wideness + 2.4 *fz*wideness;
        dtc = 14.4 *fx*wideness + 3   *fz*wideness;
        dtd = 1.8  *fx*wideness + 3.6 *fz*wideness;
        dte = 12.6 *fx*wideness + 4.2 *fz*wideness;
}

function calculate_chunklevel(fi1, fj1, fi, fj)
{
	// interpolation in triangle, read about the calculation here: https://codeplea.com/triangular-interpolation
	// height values for points in triangle

	// check if you're in the first or second triangle, for height value interpolation
	// then create values for height value interpolation
	let p_x = fi*0.02, p_z = fj*0.02;
	let p_value;

	// first triangle
	if (p_x + p_z < 1)
	{
		p_value = (1-p_x-p_z)*chunkmap[fi1][fj1] + p_z*chunkmap[fi1][fj1+1] + p_x*chunkmap[fi1+1][fj1];		// calculate interpolated value for point p from "weights"
	}
	// second triangle
	else
	{
		p_value = (p_x+p_z-1)*chunkmap[fi1+1][fj1+1] + (1-p_z)*chunkmap[fi1+1][fj1] + (1-p_x)*chunkmap[fi1][fj1+1];		// calculate interpolated value for point p from "weights"
	}

	if (isNaN(p_value)) p_value = 10;
	return p_value;
}

// --------------------------------------------------------------- //
// ---- CREATE THE TERRAIN HEIGHTMAP AND THE HOUSES/TREES MAP ---- //
// --------------------------------------------------------------- //
// creating a lake/hole in ONE chunk. or mountain
function terrain_amplify(fi1, fj1, fi, fj, depth)
{
	let origo_x = fi1*(chunkwidth-1)+(chunkwidth-1)*0.5;
	let origo_z = fj1*(chunkwidth-1)+(chunkwidth-1)*0.5;
	let power_x, power_z;
	if (x_in_chunk_to_x(fi1, fi) < origo_x) power_x = (chunkwidth-1)*0.5-(origo_x-x_in_chunk_to_x(fi1, fi));		// make the lake deeper closer to an "origo" point in the middle
	else power_x = (chunkwidth-1)*0.5-(x_in_chunk_to_x(fi1, fi)-origo_x);
	if (x_in_chunk_to_x(fj1, fj) < origo_z) power_z = (chunkwidth-1)*0.5-(origo_z-x_in_chunk_to_x(fj1, fj));
	else power_z = (chunkwidth-1)*0.5-(x_in_chunk_to_x(fj1, fj)-origo_z);
	heightmap[fi1][fj1][fi][fj] += 0.0005*power_x*power_z*(depth*100-heightmap[fi1][fj1][fi][fj]);
}

function terrain_amplify_4chunks(fi1_start, fj1_start, fi1, fj1, fi, fj, depth, fpower = 1)
{
	depth *= -1;	// konstig fix...

	let origo_x = (fi1_start+1)*(chunkwidth-1);
	let origo_z = (fj1_start+1)*(chunkwidth-1);
	let power_x, power_z;
	if (x_in_chunk_to_x(fi1, fi) < origo_x) power_x = (chunkwidth-1)-(origo_x-x_in_chunk_to_x(fi1, fi));		// make the lake deeper closer to an "origo" point in the middle
	else power_x = (chunkwidth-1)-(x_in_chunk_to_x(fi1, fi)-origo_x);
	if (x_in_chunk_to_x(fj1, fj) < origo_z) power_z = (chunkwidth-1)-(origo_z-x_in_chunk_to_x(fj1, fj));
	else power_z = (chunkwidth-1)-(x_in_chunk_to_x(fj1, fj)-origo_z);
//	heightmap[fi1][fj1][fi][fj] -= fpower*0.0005*power_x*power_z*(depth*100-heightmap[fi1][fj1][fi][fj]);
	heightmap[fi1][fj1][fi][fj] -= fpower*0.0000005*power_x*power_x*power_z*power_z*(depth*100-heightmap[fi1][fj1][fi][fj]);
}

function terrain_make_even(fi1, fj1, fi, fj, base)
{
	let origo_x = fi1*(chunkwidth-1)+(chunkwidth-1)*0.5;
	let origo_z = fj1*(chunkwidth-1)+(chunkwidth-1)*0.5;
	let power_x, power_z;
	if (x_in_chunk_to_x(fi1, fi) < origo_x) power_x = (chunkwidth-1)*0.5-(origo_x-x_in_chunk_to_x(fi1, fi));		// make the lake deeper closer to an "origo" point in the middle
	else power_x = (chunkwidth-1)*0.5-(x_in_chunk_to_x(fi1, fi)-origo_x);
	if (x_in_chunk_to_x(fj1, fj) < origo_z) power_z = (chunkwidth-1)*0.5-(origo_z-x_in_chunk_to_x(fj1, fj));
	else power_z = (chunkwidth-1)*0.5-(x_in_chunk_to_x(fj1, fj)-origo_z);
	if (heightmap[fi1][fj1][fi][fj] > base)
		heightmap[fi1][fj1][fi][fj] -= 0.002*power_x*power_z*(heightmap[fi1][fj1][fi][fj]-base);
	else if (heightmap[fi1][fj1][fi][fj] < base)
		heightmap[fi1][fj1][fi][fj] += 0.002*power_x*power_z*(base-heightmap[fi1][fj1][fi][fj]);
}

function terrain_make_plains(fi1, fj1, fi, fj, base)
{
	if (heightmap[fi1][fj1][fi][fj] < base)
	{
		heightmap[fi1][fj1][fi][fj] = base+heightmap[fi1][fj1][fi][fj]*0.5;

		// these many lines is for the transition between terrain_make_plains and mountains, and so it all feels natural, i think
                if (heightmap[fi1][fj1][fi][fj]-base > 0.5) heightmap[fi1][fj1][fi][fj] = base+(heightmap[fi1][fj1][fi][fj]-base)*0.05;
                else if (heightmap[fi1][fj1][fi][fj]-base > 1) heightmap[fi1][fj1][fi][fj] = base+(heightmap[fi1][fj1][fi][fj]-base)*0.1;
                else if (heightmap[fi1][fj1][fi][fj]-base > 1.5) heightmap[fi1][fj1][fi][fj] = base+(heightmap[fi1][fj1][fi][fj]-base)*0.15;
                else if (heightmap[fi1][fj1][fi][fj]-base > 2) heightmap[fi1][fj1][fi][fj] = base+(heightmap[fi1][fj1][fi][fj]-base)*0.2;
                else if (heightmap[fi1][fj1][fi][fj]-base > 2.5) heightmap[fi1][fj1][fi][fj] = base+(heightmap[fi1][fj1][fi][fj]-base)*0.25;
                else if (heightmap[fi1][fj1][fi][fj]-base > 3) heightmap[fi1][fj1][fi][fj] = base+(heightmap[fi1][fj1][fi][fj]-base)*0.3;
                else if (heightmap[fi1][fj1][fi][fj]-base > 3.5) heightmap[fi1][fj1][fi][fj] = base+(heightmap[fi1][fj1][fi][fj]-base)*0.35;
                else if (heightmap[fi1][fj1][fi][fj]-base > 4) heightmap[fi1][fj1][fi][fj] = base+(heightmap[fi1][fj1][fi][fj]-base)*0.4;
                else if (heightmap[fi1][fj1][fi][fj]-base > 4.5) heightmap[fi1][fj1][fi][fj] = base+(heightmap[fi1][fj1][fi][fj]-base)*0.45;
                else if (heightmap[fi1][fj1][fi][fj]-base > 5) heightmap[fi1][fj1][fi][fj] = base+(heightmap[fi1][fj1][fi][fj]-base)*0.5;
	}
}

// generate heightvalues to the heightmap[][][][] array
function calculate_height(fi1, fj1, fi, fj)
{
// water
if (wideness === 0 && highness === 0)
{
	heightmap[fi1][fj1][fi][fj] = sealevel-5;
}
// land
else
{
	// calculate height - main
	if (master > 2.5) heightmap[fi1][fj1][fi][fj] = grelf()*highness*0.005;
	else if (master > 0.5) { heightmap[fi1][fj1][fi][fj] = grelf3()*highness*0.005; }
	else heightmap[fi1][fj1][fi][fj] = grelf()*highness*0.005;

	// calculate height - detail
	if (master2 > 8) heightmap[fi1][fj1][fi][fj] += grelf_detail2()*(1/highness)*0.006;
	else if (master2 > 5) heightmap[fi1][fj1][fi][fj] += grelf_detail()*highness*0.004;
	else heightmap[fi1][fj1][fi][fj] += grelf_detail2()*highness*0.001;

	terrain_make_plains(fi1, fj1, fi, fj, master2*3);	// allmän


	// epper land
	if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 33 && fj1 <= 35))
	{
		heightmap[fi1][fj1][fi][fj] -= 100;
		terrain_make_plains(fi1,fj1,fi,fj,80);
		terrain_amplify(fi1,fj1,fi,fj, 1+(3*(pseudorandom(fi1+fj1)-0.5)));

		if (fi1 === 37 && fj1 === 34) terrain_amplify(fi1,fj1,fi,fj, 30);
	}

	// epper bridge
	else if ((fi1 >= 33 && fi1 <= 35) && (fj1 >= 33 && fj1 <= 35))
	{
		heightmap[fi1][fj1][fi][fj] -= 110;
	}

	// magnet island
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 28 && fj1 <= 32))
	{
		if (fi1 === 38 && fj1 === 32) terrain_amplify(fi1,fj1,fi,fj, 1.3);
		if (fi1 === 37 && fj1 === 32) terrain_amplify(fi1,fj1,fi,fj, 0.7);

		terrain_make_plains(fi1,fj1,fi,fj, 75);
	}

	// magnet archipelago
	else if ((fi1 >= 33 && fi1 <= 35) && (fj1 >= 28 && fj1 <= 32))
	{
		heightmap[fi1][fj1][fi][fj] -= 45;
	}

	// tjörn
	else if ((fi1 >= 32 && fi1 <= 35) && (fj1 >= 36 && fj1 <= 38))
	{
		if (fi1 === 33 && fj1 === 38) terrain_amplify(fi1,fj1,fi,fj, 2.3);		// berg
		else if (fi1 === 33 && fj1 === 36) terrain_amplify(fi1,fj1,fi,fj, 1.7);		// berg
		else if (fi1 === 34 && fj1 === 37) terrain_amplify(fi1,fj1,fi,fj, -0.8);	// industri (klubbhus)
		else if (fi1 === 34 && fj1 === 36) terrain_amplify(fi1,fj1,fi,fj, 3);		// runt industri (klubbhus)
		else if (fi1 === 35 && fj1 === 37) terrain_amplify(fi1,fj1,fi,fj, 3);		// runt industri (klubbhus)
		else if (fi1 === 32 && fj1 === 37) terrain_amplify(fi1,fj1,fi,fj, 1.3);		// (race start)
		else if (fi1 === 35 && fj1 === 36) terrain_amplify(fi1,fj1,fi,fj, -1);

		if (fi1 % 2 === 0 && fj1 % 2 === 0)
		{
			let dist = distance_get_xz(fi,fj, 12,24);
			let dist2 = distance_get_xz(fi,fj, 2,24);
			if (dist < 10) heightmap[fi1][fj1][fi][fj] += (10-dist2) + 10*(pseudorandom(fi*fj)-0.4);
		}
	}

	// norway
	else if ((fi1 >= 29 && fi1 <= 30) && (fj1 >= 35 && fj1 <= 40))
	{
		terrain_amplify(fi1,fj1,fi,fj, 1+pseudorandom(fi1+fj1));	// variationer
	}

	// volcano
	else if (fi1 === 28 && fj1 === 39)
	{
		terrain_amplify(fi1,fj1,fi,fj, 5);
	}

	// hårass land
	else if ((fi1 >= 31 && fi1 <= 35) && (fj1 >= 39 && fj1 <= 41))
	{
		if ((fi1 === 34 && fj1 === 39) && (fi >= 10 && fi <= 40) && (fj >= 10 && fj <= 14)) heightmap[fi1][fj1][fi][fj] += 0.01*((fi-10)*(fi-10)*(fi-10));		// backhoppning

		if ((fi1 >= 33 && fi1 <= 34) && (fj1 >= 39 && fj1 <= 40))
		{
			if ((fi+fj) % 4 === 0) heightmap[fi1][fj1][fi][fj] -= grelf_detail()*0.001;	// sjö
			terrain_amplify_4chunks(33,39,fi1,fj1,fi,fj, -0.7, 1.3);			// sjö forts.
		}

		terrain_amplify(fi1,fj1,fi,fj, (pseudorandom(fi1*fj1)*2)-1);		// small random differences
	}

	// haftlan-drakh
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 36 && fj1 <= 41))
	{
		terrain_make_plains(fi1,fj1,fi,fj, 40);

		if (fi1 === 37 && fj1 === 37) terrain_amplify(fi1,fj1,fi,fj, -4);	// haftlan-drakh, deep lake
	}

	// hongkong/japan
	else if ((fi1 >= 29 && fi1 <= 32) && (fj1 >= 28 && fj1 <= 34))
	{
		if (fi1 === 30 && fj1 === 33 && fi > 6 && fj > 6 && fi < 43 && fj < 43 && heightmap[fi1][fj1][fi][fj] < 30) heightmap[fi1][fj1][fi][fj] -= 4*(30-heightmap[fi1][fj1][fi][fj]);	// lakes?
		else if (fi1 >= 31 && fi1 <= 32 && fj1 >= 32 && fj1 <= 33) terrain_amplify_4chunks(31,32,fi1,fj1,fi,fj, -1);		// viken vid golfbanan
	}

	// dream
	else if (fi1 === 31 && fj1 === 37)
	{
		heightmap[fi1][fj1][fi][fj] = sealevel+1;
		if (fi > chunkwidth-13 || fi < 3 || fj > chunkwidth-4 || fj < 3) heightmap[fi1][fj1][fi][fj] = sealevel-1000;
	}

	// ice
	else if ((fi1 === 31 && fj1 === 35) || (fi1 === 31 && fj1 === 38))
	{
		heightmap[fi1][fj1][fi][fj] -= 7;
	}


	// amplify heightvalue according to chunkmap
	// (this creates triangles big as half a chunk, so the chunks themselves are formed to a large-scale terrain
	// in the same way that that the blocks inside the chunk are)
	let factor_chunkmap;
	if (fi === chunkwidth-1 && fj === chunkwidth-1) factor_chunkmap = calculate_chunklevel(fi1+1, fj1+1, 0, 0);	// this makes up for the weird gaps between the chunks (same as "if (fi === chunkwidth-1) fx++;" in set_weights())
	else if (fi === chunkwidth-1) factor_chunkmap = calculate_chunklevel(fi1+1, fj1, 0, fj);				// -||-
	else if (fj === chunkwidth-1) factor_chunkmap = calculate_chunklevel(fi1, fj1+1, fi, 0);				// -||-
	else factor_chunkmap = calculate_chunklevel(fi1, fj1, fi, fj);

	// set chunkmap
	if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 33 && fj1 <= 35))	heightmap[fi1][fj1][fi][fj] *= (0.17*factor_chunkmap);		// epper land
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 28 && fj1 <= 32))	heightmap[fi1][fj1][fi][fj] *= (1.24*factor_chunkmap);		// magnet island
	else if ((fi1 >= 32 && fi1 <= 35) && (fj1 >= 36 && fj1 <= 38))	heightmap[fi1][fj1][fi][fj] *= 0.12;				// tjörn
	else if ((fi1 >= 29 && fi1 <= 30) && (fj1 >= 35 && fj1 <= 40))	heightmap[fi1][fj1][fi][fj] *= 0.2;				// norway
	else if ((fi1 >= 31 && fi1 <= 35) && (fj1 >= 39 && fj1 <= 41))	heightmap[fi1][fj1][fi][fj] *= (0.5*factor_chunkmap);		// hårass land
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 36 && fj1 <= 41))	heightmap[fi1][fj1][fi][fj] *= (1.24*factor_chunkmap);		// haftlan-drakh

	else								heightmap[fi1][fj1][fi][fj] *= (1.24*factor_chunkmap);


	if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 36 && fj1 <= 41))	heightmap[fi1][fj1][fi][fj] += 5-9.248347;	// haftlan-drakh. konstigt tal är för att fixa efter sealevel-fel
	if ((fi1 >= 31 && fi1 <= 35) && (fj1 >= 39 && fj1 <= 41))	heightmap[fi1][fj1][fi][fj] += 10-9.248347;	// hårass land
	if ((fi1 >= 32 && fi1 <= 35) && (fj1 >= 36 && fj1 <= 38))	heightmap[fi1][fj1][fi][fj] += 10-9.248347-1;	// tjörn


	// epper land
	if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 33 && fj1 <= 35))
	{
		if (fi1 === 38 && fj1 === 34)
		{
		//	if (distance_get_xz(fi,fj, 14,14) < 8)		heightmap[fi1][fj1][fi][fj] = 5;		// podium
		}
		if (fi1 === 38 && fj1 === 34)
		{
			if (distance_get_xz(fi,fj, 18,33) < 10)		heightmap[fi1][fj1][fi][fj] = 1;		// fighting-grop
		}
		if ((fi1 === 36 && fj1 === 34) && (fj > 22 && fj < 28))		heightmap[fi1][fj1][fi][fj] -= 2;	// "ingång"
		if ((fi1 === 37 && fj1 === 34) && (fj > 22 && fj < 28))		heightmap[fi1][fj1][fi][fj] -= 2;
		if ((fi1 === 38 && fj1 === 34) && (fj > 22 && fj < 28 && fi < 5))	heightmap[fi1][fj1][fi][fj] -= 2;

		if (fi1 === 38 && fj1 === 33)
		{
			if (distance_get_xz(fi,fj, 21,38) < 9)		heightmap[fi1][fj1][fi][fj] *= 2;
		}
		if (fi1 === 38 && fj1 === 33)
		{
			if (fi > 18 && fi < 22 && fj > 40 && fj < 48)	heightmap[fi1][fj1][fi][fj] -= 0.4*distance_get_xz(fi,fj, 20,40);
		}
		if ((fi1 === 37 && fj1 === 34) && (fi >= 2 && fi <= 11 && fj >= 23 && fj <= 26))	heightmap[fi1][fj1][fi][fj] += 10-fi;	// ski jump

		if ((fi1 === 39 && fj1 === 35) && (fi >= 5 && fi <= 12 && fj >= 5 && fj <= 20))		heightmap[fi1][fj1][fi][fj] += (fj-5)*0.6;	// ski jump 2

		if ((fi1 === 37 && fj1 === 35) && fj >= 27 && (fi % 3 === 1 && fj % 4 === 1))		heightmap[fi1][fj1][fi][fj] += 10;
	}

	// epper bridge
	else if ((fi1 >= 33 && fi1 <= 35) && (fj1 >= 33 && fj1 <= 35))
	{
		// - mitten
		if (fj1 === 34)
		{
			if (heightmap[fi1][fj1][fi][fj] > sealevel+30 || heightmap[fi1][fj1][fi][fj] < sealevel-16)	heightmap[fi1][fj1][fi][fj] = sealevel+0.25;	// isflak
			else												heightmap[fi1][fj1][fi][fj] = sealevel-1;

			if (fj > 35) heightmap[fi1][fj1][fi][fj] += 0.2*(fj-35) + 0.001*grelf();
			if (fj < 15) heightmap[fi1][fj1][fi][fj] += 0.2*(15-fj) + 0.001*grelf3();
		}

		// - sidorna
		else
		{
			heightmap[fi1][fj1][fi][fj] -= 60;
			heightmap[fi1][fj1][fi][fj] *= 0.1;
		}
	}

	// magnet island
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 28 && fj1 <= 32))		heightmap[fi1][fj1][fi][fj] -= 5;

	// tjörn
	else if ((fi1 >= 32 && fi1 <= 35) && (fj1 >= 36 && fj1 <= 38))
	{
		heightmap[fi1][fj1][fi][fj] -= 4;
		if ((fi1 === 34 && fj1 === 37) && (fi > 15 && fi < 35 && fj > 15 && fj < 35)) heightmap[fi1][fj1][fi][fj] = sealevel+0.3;	// industri-platta
		if ((fi1 === 32 && fj1 === 38) && distance_get_xz(fi,fj, 42,31) < 7) heightmap[fi1][fj1][fi][fj] = sealevel+0.3;		// gym
		if (heightmap[fi1][fj1][fi][fj] < sealevel-0.75) heightmap[fi1][fj1][fi][fj] = sealevel-0.75;

		if ((fi1 === 32 && fj1 === 37) && distance_get_xz(fi,fj, 19,9) < 5) heightmap[fi1][fj1][fi][fj] = 0;				// (race start)
	}

	// norway
	// Denna gör att det blir högre berg ju mer åt z-riktninig man åker:	0.003*((fj1*(chunkwidth-1)+fj)-35*(chunkwidth-1))
	// Denna skapar en sinus-kurva likt en Rjukan-dal:			(1+Math.sin(3 * Math.PI * (((fi1*(chunkwidth-1)+fi)-(29*(chunkwidth-1))) / 100)))
	else if ((fi1 >= 29 && fi1 <= 30) && (fj1 >= 35 && fj1 <= 40))
	{
		heightmap[fi1][fj1][fi][fj] *= 0.003*((fj1*(chunkwidth-1)+fj)-35*(chunkwidth-1)) * 1.3*(1+Math.sin(3 * Math.PI * (((fi1*(chunkwidth-1)+fi)-(29*(chunkwidth-1))) / 100)));	// sinus curve creating Rjukan valley
		heightmap[fi1][fj1][fi][fj] += 0.004*grelf_detail();
		heightmap[fi1][fj1][fi][fj] -= 2.5; 		// fjord

		if (fj1 === 40)								terrain_amplify(fi1,fj1,fi,fj, -0.5);		// lite coola berg & sjö, av nån anledning
	}

	// volcano
	else if (fi1 === 28 && fj1 === 39)
	{
		if (distance_get_xz(fi,fj, 25,25) < 5)	heightmap[fi1][fj1][fi][fj] = sealevel-3;	// crater. 25,25 is middle of chunk
		if (fi > 11 && fi < 17 && fj > 23 && fj < 29) heightmap[fi1][fj1][fi][fj] = 7;		// indonesisk trädgård
	}

	// hårass land
	else if ((fi1 >= 31 && fi1 <= 35) && (fj1 >= 39 && fj1 <= 41))
	{
		// flod-delta
		heightmap[fi1][fj1][fi][fj] *= 0.01*((fi1*(chunkwidth-1)+fi)-31*(chunkwidth-1));	// mer land ju mer åt z-hållet
		heightmap[fi1][fj1][fi][fj] -= 2;
		let tmp = heightmap[fi1][fj1][fi][fj] - sealevel;					// utjämna runt sealevel så det blir platt men land/vatten-förhållandet blir samma
		tmp *= 0.03;
		heightmap[fi1][fj1][fi][fj] = sealevel + tmp;

		if (fi1 >= 34)
		{
			heightmap[fi1][fj1][fi][fj] += 0.02*((fi1*(chunkwidth-1)+fi)-34*(chunkwidth-1));	// högre ju mer åt z-hållet

			// kinesiska risfält-"backar"
			if (fj1 === 41)
			{
				heightmap[fi1][fj1][fi][fj] += 5;
				heightmap[fi1][fj1][fi][fj] *= 20;
				heightmap[fi1][fj1][fi][fj] -= 85;

				heightmap[fi1][fj1][fi][fj] = Math.floor(heightmap[fi1][fj1][fi][fj]);
			}

			// små berg
			if (grelf() < 200)
			{
				heightmap[fi1][fj1][fi][fj] += 0.5;
				heightmap[fi1][fj1][fi][fj] *= 4;
			}
		}

		if (fi1 === 34 && fj1 === 40)
		{
			if (distance_get_xz(fi,fj, 42,9) < 6)			heightmap[fi1][fj1][fi][fj] -= 6-0.1*distance_get_xz(fi,fj, 42,9);	// oas
			if (fj > 30 && fj < 40 && fi > 5 && fi < 45)		heightmap[fi1][fj1][fi][fj] *= Math.sin(fi);				// jobbiga gupp

			if (distance_get_xz(fi,fj, 22,9) < 6 && fi < 22)	heightmap[fi1][fj1][fi][fj] += 0.2 * (6-distance_get_xz(fi,fj, 22,9));	// sanddyner
			if (distance_get_xz(fi,fj, 22,41) < 6 && fi < 22)	heightmap[fi1][fj1][fi][fj] += 0.2 * (6-distance_get_xz(fi,fj, 22,41));
			if (distance_get_xz(fi,fj, 41,36) < 6 && fi < 41)	heightmap[fi1][fj1][fi][fj] += 0.2 * (6-distance_get_xz(fi,fj, 41,36));
			if (distance_get_xz(fi,fj, 15,25) < 6 && fi < 15)	heightmap[fi1][fj1][fi][fj] += 0.2 * (6-distance_get_xz(fi,fj, 15,25));
		}
	}

	// haftlan-drakh
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 36 && fj1 <= 41))
	{
		if ((fi1 === 39 && fj1 === 38) && (fi > 1 && fi < 16 && fj > 20 && fj < 36) && (heightmap[fi1][fj1][fi][fj] > 10 && heightmap[fi1][fj1][fi][fj] < 20)) heightmap[fi1][fj1][fi][fj] = 14;	// platå (dark gandalf)
		if ((fi1 === 37 && fj1 === 37) && distance_get_xz(fi,fj, 25,30) < 8) heightmap[fi1][fj1][fi][fj] = sealevel-10+0.03*grelf_detail();	// ö i sjö?
	}

	// hongkong/japan
	if ((fi1 >= 29 && fi1 <= 32) && (fj1 >= 28 && fj1 <= 34))
	{
		if ((fi1 >= 30 && fi1 <= 31) && (fj1 >= 33 && fj1 <= 34))	// golf course
		{
			let dist = distance_get_xz(x_in_chunk_to_x(fi1,fi), x_in_chunk_to_x(fj1,fj), x_in_chunk_to_x(31,0), x_in_chunk_to_x(34,0));
			if (dist < chunkwidth-2 && dist > 3) heightmap[fi1][fj1][fi][fj] = sealevel+3 + heightmap[fi1][fj1][fi][fj] * (7/dist);
		}

		else if ((fi1 === 32 && fj1 === 32) && distance_get_xz(fi,fj, 29,11) < 6)	heightmap[fi1][fj1][fi][fj] = 14.5;					// dogertcliff

		else if ((fi1 === 29 && fj1 === 32) && distance_get_xz(fi,fj, 43,23) < 3)	heightmap[fi1][fj1][fi][fj] += 3-0.5*distance_get_xz(fi,fj, 43,23);	// klubbhus

		else if ((fi1 === 30 && fj1 === 29) && distance_get_xz(fi,fj, 18,13) < 9)	heightmap[fi1][fj1][fi][fj] = 9.3;					// upphöjt/nedsänkt (science festival)
	}

	// pir
	else if (fi1 === 32 && fj1 === 35)
	{
		heightmap[fi1][fj1][fi][fj] += 0.04*grelf3() - 0.5*Math.abs(fi-40) + 2;

		let tmp = heightmap[fi1][fj1][fi][fj] - sealevel;
		tmp *= 0.1;
		heightmap[fi1][fj1][fi][fj] = sealevel + tmp;

		if (distance_get_xz(fi,fj, 24,33) < 6)				heightmap[fi1][fj1][fi][fj] += 0.8;					// garden
		if (fi >= 27 && fi <= 28 && fj >= 34 && fj <= 36)		heightmap[fi1][fj1][fi][fj] = sealevel-0.1;
		if (fi >= 20 && fi <= 22 && fj >= 31 && fj <= 33)		heightmap[fi1][fj1][fi][fj] += 1;
	}


	// push down shores into the sea

	// epper land
	if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 33 && fj1 <= 35))
	{
		if (fi1 === 36)							heightmap[fi1][fj1][fi][fj] -= 0.005 * (chunkwidth-fi)*(chunkwidth-fi);
		if (fi1 === 39)							heightmap[fi1][fj1][fi][fj] -= 0.005 * fi*fi;

		if (fj1 === 33)							heightmap[fi1][fj1][fi][fj] -= 0.007 * (chunkwidth-fj)*(chunkwidth-fj);
		if (fj1 === 35)							heightmap[fi1][fj1][fi][fj] -= 0.007 * fj*fj;

		// lite tillägg
		if ((fi1 === 37 && fj1 === 35) && (fj > 20 && fj <= 35 && fi > 27 && fi < 32))	heightmap[fi1][fj1][fi][fj] = sealevel+0.5;	// flotte/brygga
		if ((fi1 === 37 && fj1 === 35) && (fj > 35 && fj < 49 && fi > 20 && fi < 40))	heightmap[fi1][fj1][fi][fj] = sealevel+1;
	}

	// epper bridge
	else if ((fi1 >= 33 && fi1 <= 35) && (fj1 >= 33 && fj1 <= 35))
	{
		// mitten
		if (fj1 === 34)
		{
			if (fj < 7)						heightmap[fi1][fj1][fi][fj] -= 0.05 * (12-fj)*(12-fj);
			if (fj > 42)						heightmap[fi1][fj1][fi][fj] -= 0.05 * (fj-37)*(fj-37);
		}
		// sidorna
		else
		{
			if (fj1 === 33)
			{
				if (fj > 47)					heightmap[fi1][fj1][fi][fj] -= 0.05 * (fj-40)*(fj-40)*(fj-40);
			}
			if (fj1 === 35)
			{
				if (fj < 3)					heightmap[fi1][fj1][fi][fj] -= 0.05 * (10-fj)*(10-fj)*(10-fj);
			}
		}

		if (fi1 === 33 && fi < 9)					heightmap[fi1][fj1][fi][fj] -= 0.05 * (9-fi)*(9-fi)*(9-fi);
		if (fi1 === 35 && fi > chunkwidth-9)				heightmap[fi1][fj1][fi][fj] -= 0.05 * (fi-41)*(fi-41)*(fi-41);

		if (fj1 === 33 && fj < 9)					heightmap[fi1][fj1][fi][fj] -= 0.05 * (9-fj)*(9-fj)*(9-fj);
		if (fj1 === 35 && fj > chunkwidth-9)				heightmap[fi1][fj1][fi][fj] -= 0.05 * (fj-41)*(fj-41)*(fj-41);

		if (fj1 === 35 && fj > chunkwidth-4)				heightmap[fi1][fj1][fi][fj] = grelf3()*0.01 - 8;
	}

	// magnet island
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 28 && fj1 <= 32))
	{
		if (fi1 === 36)							heightmap[fi1][fj1][fi][fj] -= 1.5 * (chunkwidth-fi);
		if (fi1 === 39)							heightmap[fi1][fj1][fi][fj] -= 1.5 * fi;

		if (fj1 === 28)							heightmap[fi1][fj1][fi][fj] -= 1.5 * (chunkwidth-fj);
		if (fj1 === 32)							heightmap[fi1][fj1][fi][fj] -= 1.5 * fj;

		// "klippdal"s-broar
		if (((fi1 === 37 && fj1 === 30) && heightmap[fi1][fj1][fi][fj] <= 10) || ((fi1 === 37 && fj1 === 29) && heightmap[fi1][fj1][fi][fj] <= 10))
		{
			if (fi % 15 === 0 || fi % 15 === 1 || fi % 15 === 2 || fi % 15 === 3) heightmap[fi1][fj1][fi][fj] = 10;
			else heightmap[fi1][fj1][fi][fj] -= 10-heightmap[fi1][fj1][fi][fj];
		}
	}

	// magnet archipelago
	else if ((fi1 >= 33 && fi1 <= 35) && (fj1 >= 28 && fj1 <= 32))
	{
		if ((fi1 === 35 && fj1 === 30) && fj > 4 && fj < 18)		heightmap[fi1][fj1][fi][fj] = sealevel-1;
		if ((fi1 === 35 && fj1 === 30) && fj >= 9 && fj <= 12)		heightmap[fi1][fj1][fi][fj] = sealevel+((49-fi)*0.05) + (35-fi1)*2.45 + 0.5;

		if ((fi1 === 34 && fj1 === 30) && fj > 4 && fj < 18)		heightmap[fi1][fj1][fi][fj] = sealevel-1;
		if ((fi1 === 34 && fj1 === 30) && fj >= 9 && fj <= 12)		heightmap[fi1][fj1][fi][fj] = sealevel+((49-fi)*0.05) + (35-fi1)*2.45 + 0.5;

		if ((fi1 === 33 && fj1 === 30) && fj > 4 && fj < 18)		heightmap[fi1][fj1][fi][fj] = sealevel-1;
		if ((fi1 === 33 && fj1 === 30) && fj >= 9 && fj <= 12)		heightmap[fi1][fj1][fi][fj] = sealevel+((49-fi)*0.05) + (35-fi1)*2.45 + 0.5;
	}

	// tjörn
	else if ((fi1 >= 32 && fi1 <= 35) && (fj1 >= 36 && fj1 <= 38))
	{
		if (fi1 === 32 && fi < 9)					heightmap[fi1][fj1][fi][fj] -= 0.05 * (9-fi)*(9-fi)*(9-fi);
		if (fi1 === 35 && fi > chunkwidth-9)				heightmap[fi1][fj1][fi][fj] -= 0.05 * (fi-41)*(fi-41)*(fi-41);

		if (fj1 === 36 && fj < 9)					heightmap[fi1][fj1][fi][fj] -= 0.05 * (9-fj)*(9-fj)*(9-fj);
		if (fj1 === 38 && fj > chunkwidth-9)				heightmap[fi1][fj1][fi][fj] -= 0.05 * (fj-41)*(fj-41)*(fj-41);


		if (fi1 === 32 && fi < 4)					heightmap[fi1][fj1][fi][fj] = grelf3()*0.01 - 8;
		if (fi1 === 35 && fi > chunkwidth-4)				heightmap[fi1][fj1][fi][fj] = grelf3()*0.01 - 8;

		if (fj1 === 36 && fj < 4)					heightmap[fi1][fj1][fi][fj] = grelf3()*0.01 - 8;
		if (fj1 === 38 && fj > chunkwidth-4)				heightmap[fi1][fj1][fi][fj] = grelf3()*0.01 - 8;
	}

	// norway
	else if ((fi1 >= 29 && fi1 <= 30) && (fj1 >= 35 && fj1 <= 40))
	{
		if (fi1 === 29)							heightmap[fi1][fj1][fi][fj] -= 0.004 * (chunkwidth-fi)*(chunkwidth-fi);
		if (fi1 === 30)							heightmap[fi1][fj1][fi][fj] -= 0.006 * fi*fi;

		if (fj1 === 35)							heightmap[fi1][fj1][fi][fj] -= 0.001 * (chunkwidth-fj)*(chunkwidth-fj);
		if (fj1 === 40)							heightmap[fi1][fj1][fi][fj] -= 0.008 * fj*fj;
	}

	// volcano
	else if (fi1 === 28 && fj1 === 39)
	{
		if (fi < 10)							heightmap[fi1][fj1][fi][fj] -= 0.015 * (10-fi)*(10-fi);
		if (fi > 10)							heightmap[fi1][fj1][fi][fj] -= 0.003 * fi*fi;

		if (fj < 10)							heightmap[fi1][fj1][fi][fj] -= 0.015 * (10-fj)*(10-fj);
		if (fj > 10)							heightmap[fi1][fj1][fi][fj] -= 0.003 * fj*fj;
	}

	// hårass land
	else if ((fi1 >= 31 & fi1 <= 35) && (fj1 >= 39 && fj1 <= 41))
	{
	//	if (fi1 === 31)							heightmap[fi1][fj1][fi][fj] -= 0.005 * (chunkwidth-fi)*(chunkwidth-fi);
		if (fi1 === 35)							heightmap[fi1][fj1][fi][fj] -= 0.005 * fi*fi;

		if (fj1 === 39)							heightmap[fi1][fj1][fi][fj] -= 0.005 * (chunkwidth-fj)*(chunkwidth-fj);
		if (fj1 === 41)							heightmap[fi1][fj1][fi][fj] -= 0.005 * fj*fj;
	}

	// haftlan-drakh
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 36 && fj1 <= 41))
	{
		if (fi1 === 36)							heightmap[fi1][fj1][fi][fj] -= 0.0003 * (chunkwidth-fi)*(chunkwidth-fi)*(chunkwidth-fi);
		if (fi1 === 39)							heightmap[fi1][fj1][fi][fj] -= 0.0003 * fi*fi*fi;

		if (fj1 === 36)							heightmap[fi1][fj1][fi][fj] -= 0.0003 * (chunkwidth-fj)*(chunkwidth-fj)*(chunkwidth-fj);
		if (fj1 === 41)							heightmap[fi1][fj1][fi][fj] -= 0.0003 * fj*fj*fj;

		if (fi1 === 39 && fj1 === 39)
		{
			let hotspring_dist = distance_get_xz(fi,fj, 21,8)
			if (hotspring_dist < 2.5)				heightmap[fi1][fj1][fi][fj] = sealevel-1;	// hotspring
			if (hotspring_dist >= 3 && hotspring_dist <= 5) 	heightmap[fi1][fj1][fi][fj] = sealevel+0.5;
		}
	}

	// hongkong/japan
	else if ((fi1 >= 29 && fi1 <= 32) && (fj1 >= 28 && fj1 <= 34))
	{
		if (fi1 === 29)							heightmap[fi1][fj1][fi][fj] -= 0.005 * (chunkwidth-fi)*(chunkwidth-fi);
		if (fi1 === 32)							heightmap[fi1][fj1][fi][fj] -= 0.005 * fi*fi;

		if (fj1 === 28)							heightmap[fi1][fj1][fi][fj] -= 0.005 * (chunkwidth-fj)*(chunkwidth-fj);
		if (fj1 === 34)							heightmap[fi1][fj1][fi][fj] -= 0.005 * fj*fj;
	}

	// pir
	else if (fi1 === 32 && fj1 === 35)
	{
		if (fi < 13)							heightmap[fi1][fj1][fi][fj] -= 0.01 * (13-fi)*(13-fi)*(13-fi);
		if (fi > chunkwidth-13)						heightmap[fi1][fj1][fi][fj] -= 0.01 * (fi-37)*(fi-37)*(fi-37);

		if (fj < 13)							heightmap[fi1][fj1][fi][fj] -= 0.01 * (13-fj)*(13-fj)*(13-fj);
		if (fj > chunkwidth-13)						heightmap[fi1][fj1][fi][fj] -= 0.01 * (fj-37)*(fj-37)*(fj-37);
	}

	// ice
	else if ((fi1 === 31 && fj1 === 35) || (fi1 === 31 && fj1 === 38))
	{
		heightmap[fi1][fj1][fi][fj] -= 15;

		if (fi1 === 31 && fj1 === 35)
		{
			if (fi < 5)							heightmap[fi1][fj1][fi][fj] -= 0.01 * (5-fi)*(5-fi)*(5-fi);
			if (fi > chunkwidth-5)						heightmap[fi1][fj1][fi][fj] -= 0.01 * (fi-45)*(fi-45)*(fi-45);

			if (fj < 5)							heightmap[fi1][fj1][fi][fj] -= 0.01 * (5-fj)*(5-fj)*(5-fj);
			if (fj > chunkwidth-5)						heightmap[fi1][fj1][fi][fj] -= 0.01 * (fj-45)*(fj-45)*(fj-45);

			if ((fi > 13 && fi < 27) && (fj > 30 && fj < 40))		heightmap[fi1][fj1][fi][fj] = 3.7;				// gym-platta
		}

		if (fi1 === 31 && fj1 === 38)
		{
			heightmap[fi1][fj1][fi][fj] *= 0.2;

			if (fi < 5)							heightmap[fi1][fj1][fi][fj] -= 0.05 * (5-fi)*(5-fi)*(5-fi);
			if (fi > chunkwidth-5)						heightmap[fi1][fj1][fi][fj] -= 0.05 * (fi-45)*(fi-45)*(fi-45);

			if (fj < 15)							heightmap[fi1][fj1][fi][fj] -= 0.05 * (15-fj)*(15-fj)*(15-fj);
			if (fj > chunkwidth-5)						heightmap[fi1][fj1][fi][fj] -= 0.001 * (fj-45)*(fj-45)*(fj-45);
		}
	}

	// passage
	else if ((fi1 === 28 && fj1 === 33) || ((fi1 >= 26 && fi1 <= 27) && (fj1 >= 33 && fj1 <= 41)) || (fj1 === 41 && fi1 >= 26 && fi1 <= 30))
	{
		heightmap[fi1][fj1][fi][fj] -= 5;
		terrain_make_plains(fi1, fj1, fi, fj, 1.4);
	}

	// sea bottom
	if (heightmap[fi1][fj1][fi][fj] < sealevel-5) heightmap[fi1][fj1][fi][fj] = sealevel-5;
}
}

// generate object values to the objects[][][][] array
function generate_objects_array(fi1, fj1, fi, fj)
{
	let curve_objects = grelf_objects()*highness*0.0001-grelf_objects_detail()*highness*0.0002;		// grelf curve for tree/house placement
	if (curve_objects > -0.2) curve_objects = -100;
	let curve_trees = grelf3()+grelf_detail2();							// grelf curve for tree height

	if ((fi1 >= 34 && fi1 < 41) && (fj1 >= 36 && fj1 < 43))		curve_trees += 50;	// haftlan?
	if ((fi1 >= 29 && fi1 <= 32) && (fj1 >= 28 && fj1 <= 34))	curve_trees += 150;	// hongkong/japan
	if (fi1 === 32 && fj1 === 32)					curve_trees -= 75;	// hongkong/japan - dogert's house
	if (fi1 === 30 && fj1 === 29)					curve_trees -= 200;	// hongkong/japan - science festival
	if (fi1 === 31 && fj1 === 37)					curve_trees += 170;	// dream
	if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 33 && fj1 <= 35))	curve_trees -= 200;	// epper land
	if ((fi1 >= 33 && fi1 <= 35) && (fj1 >= 33 && fj1 <= 35))	curve_trees += 250;	// epper bridge
	if ((fi1 >= 32 && fi1 <= 35) && (fj1 >= 36 && fj1 <= 38))	curve_trees -= 110;	// tjorn

	// ---- trees ---- //
	if (curve_trees < 616 && curve_trees > 524		// godtyckligt
	    && heightmap[fi1][fj1][fi][fj] > sealevel+0.5)
	{
		if (objects[fi1][fj1][fi][fj] !== ASCEND_ROAD) objects[fi1][fj1][fi][fj] = ASCEND_TREE;
		
		// ice
		if (fi1 === 31 && fj1 === 35)
		{
			if (!((fi > 15 && fi < 25) && (fj > 32 && fj < 38)))	objects[fi1][fj1][fi][fj] = ASCEND_TREE;
			else							objects[fi1][fj1][fi][fj] = 0;
		}

		// "seed" system
		if (Math.floor(curve_trees) % 5 === 0)
		{
			let seed_length = Math.floor(pseudorandom(fi*fj)*10);
			if (seed_length > 5) seed_length = 10;
			else seed_length = 1;
			if (fi-seed_length > 0 && fj-seed_length > 0 && objects[fi1][fj1][fi-seed_length][fj-seed_length] !== ASCEND_ROAD)
			{
				// seed for new bush
				if (Math.floor(curve_trees) % 10 === 0)
				{
					// !! no bush in golf course, put this in create_objects instead?
					if (heightmap[fi1][fj1][fi-seed_length][fj-seed_length] > sealevel+0.5) objects[fi1][fj1][fi-seed_length][fj-seed_length] = ASCEND_BUSH;	// throw seed diagonally
				}
				else
				{
					if (heightmap[fi1][fj1][fi-seed_length][fj] > sealevel+0.5) objects[fi1][fj1][fi-seed_length][fj] = ASCEND_GRASS;			// throw seed straight to the i direction
				}
			}
		}
	}

	// manual additions

	if ((fi1 === 32 && fj1 === 32) && distance_get_xz(fi,fj, 29,11) < 5)	objects[fi1][fj1][fi][fj] = 0;			// hongkong/japan - dogert's house

	// pir
	if (fi1 === 32 && fj1 === 35)
	{
		if (distance_get_xz(fi,fj, 24,33) >= 4.5 && distance_get_xz(fi,fj, 24,33) <= 5.5 && (fj <= 33 || fj >= 36))			objects[fi1][fj1][fi][fj] = ASCEND_TREE;	// garden
		if (distance_get_xz(fi,fj, 24,33) === 3)			objects[fi1][fj1][fi][fj] = ASCEND_BUSH;
	}
	// tjörn
	else if ((fi1 >= 32 && fi1 <= 35) && (fj1 >= 36 && fj1 <= 38))
	{
	}
	// haftlan-drakh
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 36 && fj1 <= 41))
	{
		if (fi1 === 39 && fj1 === 39)
		{
			let hotspring_dist = distance_get_xz(fi,fj, 21,8)
			if (hotspring_dist >= 3 && hotspring_dist <= 4)		objects[fi1][fj1][fi][fj] = ASCEND_BUSH;
		}
	}
	// hongkong/japan
	else if ((fi1 >= 29 && fi1 <= 32) && (fj1 >= 28 && fj1 <= 34))
	{
		if ((fi1 === 30 && fj1 === 29) && distance_get_xz(fi,fj, 18,13) < 9)	objects[fi1][fj1][fi][fj] = 0;
	}

	// ---- houses ---- //
	if ((fi1 >= 29 && fi1 <= 32) && (fj1 >= 28 && fj1 <= 34)) {		curve_objects *= 2; curve_objects += 2.5; }	// hongkong/japan
	else if ((fi1 >= 35 && fi1 <= 39) && (fj1 >= 28 && fj1 <= 32))		curve_objects *= 4;				// haftlan?
	else if ((fi1 >= 35 && fi1 <= 39) && (fj1 >= 28 && fj1 <= 32))		curve_objects += 8;				// testotown

	if (curve_objects < (-0.1/master2)+2 && heightmap[fi1][fj1][fi][fj] > sealevel+1)
	{
		let house2 = grelf_houses()*highness*0.007;

		if (!((fi1 >= 32 && fi1 <= 33) && (fj1 >= 26 || fj1 <= 36))			// hongkong/japan, gör halva ön till "vildmark" utan hus
		   && !((fi1 === 30 && fj1 === 33) || (fi1 === 31 && fj1 === 33) || (fi1 === 31 && fj1 === 34) || (fi1 === 30 && fj1 === 34))	// hongkong/japan golf course - no houses
		   && (((fi1*3/fj1/fi*2/fj)*100)-(Math.floor((fi1*3/fj1/fi*2/fj)*100)) <= 0.6)	// något från itch release som tar bort lite hus
		   && (grelf_houses()*highness*0.0005 <= 0.5)					// ta bort vissa hus
		   && !(objects[fi1][fj1][fi][fj] >= 1 && objects[fi1][fj1][fi][fj] <= 9)	// make sure that you don't add a house where there is a road
		   && (fi > 0 && fi < chunkwidth-1 && fj > 0 && fj < chunkwidth)		// ... (I had to add this because the dynamic loading seems to do things in the wrong order sometimes...)
		   && (fi % 3 === 0 && fj % 3 === 0))
		{
			if ((fi1 >= 29 && fi1 <= 30) && (fj1 >= 35 && fj1 <= 40))	// norway
			{
				let house_width = Math.floor(((house2*-0.1)/(house2*-0.1+1))*4);
				if (house_width < 0) house_width *= -1;
				if (house_width >= 100) house_width = 99;
				house_width *= 0.1;
				house_width = Math.floor(house_width);

				let house_height = Math.floor(((house2*-0.1)/(house2*-0.1+1))*4);
				if (house_height < 0) house_height *= -1;
				if (house_height >= 100) house_height = 99;
				house_height *= 0.1;
				house_height = Math.floor(house_height);

				let house_texture = Math.floor(((curve_objects*-0.1)/(curve_objects*-0.1+1))*9*9);	//Math.floor(((curve_objects*-0.1)/(curve_objects*-0.1+1))*9);
				house_texture *= 20;
				if (house_texture < 0) house_texture *= -1;
				if (house_texture >= 100) house_texture = 99;
				house_texture *= 0.1;
				house_texture = Math.floor(house_texture);

				let house_value = ASCEND_HOUSE + 0.1*house_width + 0.01*house_height + 0.001*house_texture;

				objects[fi1][fj1][fi][fj] = house_value;		// house type now comes from decimals and not from whole number
				if (objects[fi1][fj1][fi][fj] >= ASCEND_HOUSE+1) objects[fi1][fj1][fi][fj] = ASCEND_HOUSE;

				// knasa till hustyperna med en annan profil
				if (objects[fi1][fj1][fi][fj] >= ASCEND_HOUSE && (((fi1*7/fj1/fi*11/fj)*100)-(Math.floor((fi1*7/fj1/fi*11/fj)*100))) > 0.6)
				{
					objects[fi1][fj1][fi][fj] += profile_star[(fi1*chunkwidth+fi)*31+(fj1*chunkwidth+fj)*11 & 0xF]*0.01;
				}
			}
		}
	}

	// manual additions
//	if (fi1 === 36 && fj1 === 31)			// magnetfactory actual magnet factory house
//	{
		if (fi > 15 && fj > 15)
		{
		//	if (pseudorandom(1048*fi*fj) > 0.87) objects[fi1][fj1][fi][fj] = ASCEND_HOUSE+0.32;
		}
//	}


	// tjörn
	if ((fi1 === 34 && fj1 === 37) && (fi === 31 && fj === 23))	objects[fi1][fj1][fi][fj] = ASCEND_HOUSE+0.32;			// club house

	// hårass land
	if ((fi1 === 34 && fj1 === 40) && (fi === 43 && fj === 2))	objects[fi1][fj1][fi][fj] = ASCEND_HOUSE+0.32;			// hårass' house

	// haftlan-drakh
	if ((fi1 === 38 && fj1 === 39) && (fi === 36 && fj === 7))	objects[fi1][fj1][fi][fj] = ASCEND_HOUSE+0.32;			// dark gandalf's house

	// hongkong/japan
	if ((fi1 === 32 && fj1 === 32) && (fi === 26 && fj === 10))	objects[fi1][fj1][fi][fj] = ASCEND_HOUSE+0.32;			// dogert's house

	// pir
	if ((fi1 === 32 && fj1 === 35) && (fi === 24 && fj === 33))	objects[fi1][fj1][fi][fj] = ASCEND_HOUSE;			// garden
}

function add_road_block(fx, fz)
{
        let fi1 = x_to_chunk_no(fx);
	let fj1 = x_to_chunk_no(fz);
	let fi = x_to_x_in_chunk(fx);
	let fj = x_to_x_in_chunk(fz);

	// . . .
	// . X .
	// . . .
//        objects[fi1][fj1][fi][fj] = ASCEND_ROAD;

	objects[x_to_chunk_no(fx-1)][x_to_chunk_no(fz-1)][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz-1)] = ASCEND_ROAD;
	objects[x_to_chunk_no(fx-1)][x_to_chunk_no(fz)][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz)] = ASCEND_ROAD;
	objects[x_to_chunk_no(fx-1)][x_to_chunk_no(fz+1)][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz+1)] = ASCEND_ROAD;
	objects[x_to_chunk_no(fx-1)][x_to_chunk_no(fz+2)][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz+2)] = ASCEND_ROAD;

	objects[x_to_chunk_no(fx)][x_to_chunk_no(fz-1)][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz-1)] = ASCEND_ROAD;
	objects[x_to_chunk_no(fx)][x_to_chunk_no(fz)][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz)] = ASCEND_ROAD;
	objects[x_to_chunk_no(fx)][x_to_chunk_no(fz+1)][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz+1)] = ASCEND_ROAD;
	objects[x_to_chunk_no(fx)][x_to_chunk_no(fz+2)][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz+2)] = ASCEND_ROAD;

	objects[x_to_chunk_no(fx+1)][x_to_chunk_no(fz-1)][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz-1)] = ASCEND_ROAD;
	objects[x_to_chunk_no(fx+1)][x_to_chunk_no(fz)][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz)] = ASCEND_ROAD;
	objects[x_to_chunk_no(fx+1)][x_to_chunk_no(fz+1)][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz+1)] = ASCEND_ROAD;
	objects[x_to_chunk_no(fx+1)][x_to_chunk_no(fz+2)][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz+2)] = ASCEND_ROAD;

	objects[x_to_chunk_no(fx+2)][x_to_chunk_no(fz-1)][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz-1)] = ASCEND_ROAD;
	objects[x_to_chunk_no(fx+2)][x_to_chunk_no(fz)][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz)] = ASCEND_ROAD;
	objects[x_to_chunk_no(fx+2)][x_to_chunk_no(fz+1)][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz+1)] = ASCEND_ROAD;
	objects[x_to_chunk_no(fx+2)][x_to_chunk_no(fz+2)][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz+2)] = ASCEND_ROAD;

	roadblock_x = fx;
	roadblock_z = fz;
}

function race_create(fi1, fj1, manual, race, x_array, z_array, number)
{
	mesh_checkpoint[number] = new Array();
	pointsprites_checkpoints[number] = new Array();

	checkstep_x[number] = new Array();
	checkstep_z[number] = new Array();

	let check_x;
	let check_z;

	let array_pos = 0;
	let k = 0;

	while (array_pos < x_array.length-1)
	{
		mesh_checkpoint[number][k] = new THREE.Sprite(balls_material);
		mesh_checkpoint[number][k].position.set(x_array[array_pos], sealevel+5, z_array[array_pos]);
		if (k % 16 === 0) vertices_checkpoints.push(x_array[array_pos], sealevel+5, z_array[array_pos]); //scene.add(mesh_checkpoint[number][k]);

		let step = 0;

		// create new race checkpoint
		let startpos_x = check_x;
		let startpos_z = check_z;

		check_x = x_array[array_pos];
		check_z = z_array[array_pos];

		while (distance_get_xz(check_x,check_z, startpos_x,startpos_z) > 1)
		{
			let delta_x = check_x-startpos_x;
			let delta_z = check_z-startpos_z;

			// DESSA ÄR BRA för kul randomization av banan
			delta_x += (Math.ceil(pseudorandom(delta_z)*12)-3)*(delta_x*0.3);	// lägg till lite slump
			delta_z += (Math.ceil(pseudorandom(delta_x)*12)-3)*(delta_z*0.3);	// --||--

			let delta_x_u;
			let delta_z_u;
			let delta_x_low;
			let delta_z_low;

			if (delta_x < 0) delta_x_u = delta_x*-1; else delta_x_u = delta_x;
			if (delta_z < 0) delta_z_u = delta_z*-1; else delta_z_u = delta_z;

			if (delta_x_u > delta_z_u) {
				if (delta_z_u > 1) {
					delta_x_low = Math.round(delta_x/delta_z_u);
					if (delta_z > 0) delta_z_low = 1; else delta_z_low = -1;
				}
				else {
					if (delta_x > 0) delta_x_low = 2; else delta_x_low = -2;
					delta_z_low = 0;
				}
			}
			else {
				if (delta_x_u > 1) {
					delta_z_low = Math.round(delta_z/delta_x_u);
					if (delta_x > 0) delta_x_low = 1; else delta_x_low = -1;
				}
				else {
					if (delta_z > 0) delta_z_low = 2; else delta_z_low = -2;
					delta_x_low = 0;
				}
			}
			if (delta_x_low > 6) delta_x_low = 6;
			if (delta_x_low < -6) delta_x_low = -6;
			if (delta_z_low > 6) delta_z_low = 6;
			if (delta_z_low < -6) delta_z_low = -6;

			if (delta_x_low >= 0) roadblock_x = startpos_x+delta_x_low;
			else roadblock_x = startpos_x+delta_x_low;
			if (delta_z_low >= 0) roadblock_z = startpos_z+delta_z_low;
			else roadblock_z = startpos_z+delta_z_low;

			checkstep_x[number][step] = roadblock_x;
			checkstep_z[number][step] = roadblock_z;		// part steps between checkpoints
			step++;

			let xxx;
			let zzz;

			if (delta_x_low >= 0) xxx = 1; else xxx = -1;
			if (delta_z_low >= 0) zzz = 1; else zzz = -1;

			// blocks between the "main" road blocks
			if (delta_x_low >= 0)
			{
				while (xxx < delta_x_low)
				{
					add_road_block(startpos_x+xxx, startpos_z+zzz);
					mesh_checkpoint[number][k] = new THREE.Sprite(balls_material);
					mesh_checkpoint[number][k].position.set(startpos_x+xxx, sealevel+5, startpos_z+zzz);
					if (k % 16 === 0) vertices_checkpoints.push(startpos_x+xxx, sealevel+5, startpos_z+zzz); //scene.add(mesh_checkpoint[number][k]);
					k++;
					xxx++;
				}
				xxx--;
			}
			else
			{
				while (xxx > delta_x_low)
				{
					add_road_block(startpos_x+xxx, startpos_z+zzz);
					mesh_checkpoint[number][k] = new THREE.Sprite(balls_material);
					mesh_checkpoint[number][k].position.set(startpos_x+xxx, sealevel+5, startpos_z+zzz);
					if (k % 16 === 0) vertices_checkpoints.push(startpos_x+xxx, sealevel+5, startpos_z+zzz); //scene.add(mesh_checkpoint[number][k]);
					k++;
					xxx--;
				}
				xxx++;
			}
			if (delta_z_low >= 0)
			{
				while (zzz < delta_z_low)
				{
					add_road_block(startpos_x+xxx, startpos_z+zzz);
					mesh_checkpoint[number][k] = new THREE.Sprite(balls_material);
					mesh_checkpoint[number][k].position.set(startpos_x+xxx, sealevel+5, startpos_z+zzz);
					if (k % 16 === 0) vertices_checkpoints.push(startpos_x+xxx, sealevel+5, startpos_z+zzz); //scene.add(mesh_checkpoint[number][k]);
					k++;
					zzz++;
				}
				zzz--;
			}
			else
			{
				while (zzz > delta_z_low)
				{
					add_road_block(startpos_x+xxx, startpos_z+zzz);
					mesh_checkpoint[number][k] = new THREE.Sprite(balls_material);
					mesh_checkpoint[number][k].position.set(startpos_x+xxx, sealevel+5, startpos_z+zzz);
					if (k % 16 === 0) vertices_checkpoints.push(startpos_x+xxx, sealevel+5, startpos_z+zzz); //scene.add(mesh_checkpoint[number][k]);
					k++;
					zzz--;
				}
				zzz++;
			}

			add_road_block(roadblock_x, roadblock_z);		// continue the "main" road block
			mesh_checkpoint[number][k] = new THREE.Sprite(balls_material);
			mesh_checkpoint[number][k].position.set(roadblock_x, sealevel+5, roadblock_z);
			if (k % 16 === 0) vertices_checkpoints.push(roadblock_x, sealevel+5, roadblock_z); //scene.add(mesh_checkpoint[number][k]);
			k++;

			startpos_x = roadblock_x; startpos_z = roadblock_z;	// start next loop...
		}

		array_pos++;
	}

	const geometry_checkpoints = new THREE.BufferGeometry();
	geometry_checkpoints.setAttribute('position', new THREE.Float32BufferAttribute(vertices_checkpoints, 3));

	pointsprites_checkpoints[number] = new THREE.Points(geometry_checkpoints, balls_material);
	scene.add(pointsprites_checkpoints[number]);
//	pointsprites_checkpoints[number].visible = false;
	vertices_checkpoints.length = 0;		// empty array so i can fill it again for the next chunk
}

// ---------------------------------------------------------------------- //
// ---- CREATE THE 3D MESHES FOR THE TERRAIN CHUNKS AND HOUSES/TREES ---- //
// ---------------------------------------------------------------------- //
// create terrain vertices from heightmap
function create_terrain_3d_vertices(fi1, fj1, fi, fj)
{
	// create first triangle
	vertices_terrain.push((chunkwidth-1)*fi1+fi,heightmap[fi1][fj1][fi][fj+1],(chunkwidth-1)*fj1+(fj+1));
	vertices_terrain.push((chunkwidth-1)*fi1+(fi+1),heightmap[fi1][fj1][fi+1][fj],(chunkwidth-1)*fj1+fj);
	vertices_terrain.push((chunkwidth-1)*fi1+fi,heightmap[fi1][fj1][fi][fj],(chunkwidth-1)*fj1+fj);

        // create second triangle
	vertices_terrain.push((chunkwidth-1)*fi1+fi,heightmap[fi1][fj1][fi][fj+1],(chunkwidth-1)*fj1+(fj+1));
	vertices_terrain.push((chunkwidth-1)*fi1+(fi+1),heightmap[fi1][fj1][fi+1][fj+1],(chunkwidth-1)*fj1+(fj+1));
	vertices_terrain.push((chunkwidth-1)*fi1+(fi+1),heightmap[fi1][fj1][fi+1][fj],(chunkwidth-1)*fj1+fj);
}

// create vertices for object mesh/sprites/etc
function create_objects_3d_vertices(fi1, fj1, fi, fj)
{
	if (objects[fi1][fj1][fi][fj] >= ASCEND_ROAD && objects[fi1][fj1][fi][fj] <= 9)
	{
		// maglev tracks go over water
		if (heightmap[fi1][fj1][fi][fj+1] < sealevel) heightmap[fi1][fj1][fi][fj+1] = sealevel+0.3;
		if (heightmap[fi1][fj1][fi+1][fj] < sealevel) heightmap[fi1][fj1][fi+1][fj] = sealevel+0.3;
		if (heightmap[fi1][fj1][fi][fj] < sealevel) heightmap[fi1][fj1][fi][fj] = sealevel+0.3;

		//if (heightmap[fi1][fj1][fi][fj+1] < sealevel) heightmap[fi1][fj1][fi][fj+1] = sealevel+1;
		if (heightmap[fi1][fj1][fi+1][fj+1] < sealevel) heightmap[fi1][fj1][fi+1][fj+1] = sealevel+0.3;
		//if (heightmap[fi1][fj1][fi+1][fj] < sealevel) heightmap[fi1][fj1][fi+1][fj] = sealevel+1;

		// create first triangle
		vertices_roads[vertices_roads_i] = new THREE.Vector3((chunkwidth-1)*fi1+fi,heightmap[fi1][fj1][fi][fj+1],(chunkwidth-1)*fj1+(fj+1));
		vertices_roads[vertices_roads_i+1] = new THREE.Vector3((chunkwidth-1)*fi1+(fi+1),heightmap[fi1][fj1][fi+1][fj],(chunkwidth-1)*fj1+fj);
		vertices_roads[vertices_roads_i+2] = new THREE.Vector3((chunkwidth-1)*fi1+fi,heightmap[fi1][fj1][fi][fj],(chunkwidth-1)*fj1+fj);

		// create second triangle
		vertices_roads[vertices_roads_i+3] = new THREE.Vector3((chunkwidth-1)*fi1+fi,heightmap[fi1][fj1][fi][fj+1],(chunkwidth-1)*fj1+(fj+1));
		vertices_roads[vertices_roads_i+4] = new THREE.Vector3((chunkwidth-1)*fi1+(fi+1),heightmap[fi1][fj1][fi+1][fj+1],(chunkwidth-1)*fj1+(fj+1));
		vertices_roads[vertices_roads_i+5] = new THREE.Vector3((chunkwidth-1)*fi1+(fi+1),heightmap[fi1][fj1][fi+1][fj],(chunkwidth-1)*fj1+fj);

		vertices_roads_i += 6;
	}
	// 20 - trees (second digit is size of tree)
	else if (objects[fi1][fj1][fi][fj] === 20)
	{
		if (fi-1 > 0 && fj-1 > 0)
		{
			vertices_trees.push(fi1*(chunkwidth-1)+fi, heightmap[fi1][fj1][fi][fj], fj1*(chunkwidth-1)+fj);
		}
	}
	// 30 - bushes
	else if (objects[fi1][fj1][fi][fj] === 30)
	{
		if (fi-1 > 0 && fj-1 > 0)
		{
			vertices_bushes.push(fi1*(chunkwidth-1)+fi, heightmap[fi1][fj1][fi][fj], fj1*(chunkwidth-1)+fj);

			// "seed" system
			if (Math.floor(fi+fj) % 3 === 0)
			{
				let seed_length = Math.floor(pseudorandom(fi)*10);
				if (seed_length > 5) seed_length = 10;
				else seed_length = 1;
				if (fi+seed_length < chunkwidth-1 && fj+seed_length < chunkwidth-1)
				{
					// seed for new bush
					if (Math.floor(fi+fj) % 6 === 0)
					{
						if (objects[fi1][fj1][fi+seed_length][fj+seed_length] !== ASCEND_ROAD && heightmap[fi1][fj1][fi+seed_length][fj+seed_length] > sealevel+0.5)
						{
							objects[fi1][fj1][fi+seed_length][fj+seed_length] = ASCEND_GRASS;	// throw seed diagonally
						}
					}
					else
					{
						if (objects[fi1][fj1][fi][fj+seed_length] !== ASCEND_ROAD && heightmap[fi1][fj1][fi][fj+seed_length] > sealevel+0.5)
						{
							objects[fi1][fj1][fi+seed_length][fj] = ASCEND_GRASS;					// throw seed straight to the i direction
						}
					}
				}
			}
		}
	}
	// 40 - grass
	else if (objects[fi1][fj1][fi][fj] === 40)
	{
		if (fi-1 > 0 && fj-1 > 0)
		{
			vertices_grass.push(fi1*(chunkwidth-1)+fi, heightmap[fi1][fj1][fi][fj], fj1*(chunkwidth-1)+fj);
		}
	}
	// 50.xx - houses
	else if (objects[fi1][fj1][fi][fj] >= ASCEND_HOUSE && objects[fi1][fj1][fi][fj] < ASCEND_HOUSE+1)
	{
		let o = objects[fi1][fj1][fi][fj]-ASCEND_HOUSE;
		let house_width = Math.floor(o*10);
		let house_height = Math.floor((o-house_width*0.1)*100);
		let house_texture = Math.floor((o-house_width*0.1-house_height*0.01)*1000);

		let widns, lngns, hght;

		if (house_width === 4) 				{	widns = 1;	lngns = 1;	}
		else if (house_width >= 0 && house_width <= 3)	{	widns = 2;	lngns = 1;	}
		else if (house_width >= 5 && house_width <= 8)	{	widns = 1;	lngns = 2;	}
		else if (house_width === 9)			{	widns = 2;	lngns = 2;	}

		if (house_height >= 0 && house_height <= 2)		hght = 12-Math.floor(6*pseudorandom(fi-fj));
		else if (house_height >= 3 && house_height <= 9)	hght = 2;


		// calculate slope
		let c = 0, l = 0, r = 0, m = 0;
		if (fi+1 < chunkwidth-1) c = heightmap[fi1][fj1][fi+1][fj]-heightmap[fi1][fj1][fi][fj]; if (c < 0) { c *= -1; }
		if (fj+1 < chunkwidth-1) l = heightmap[fi1][fj1][fi][fj+1]-heightmap[fi1][fj1][fi][fj]; if (l < 0) { l *= -1; }
		if (fi-1 > 0) r = heightmap[fi1][fj1][fi-1][fj]-heightmap[fi1][fj1][fi][fj]; if (r < 0) { r *= -1; }
		if (fj-1 > 0) m = heightmap[fi1][fj1][fi][fj-1]-heightmap[fi1][fj1][fi][fj]; if (m < 0) { m *= -1; }

		// if too much slope, cancel house
		if (c+l+r+m <= 1)
		{
			// extend houses' collision boxes
			if (widns === 2) objects[fi1][fj1][fi][fj+1] = ASCEND_HOUSEPART;
			if (lngns === 2) objects[fi1][fj1][fi+1][fj] = ASCEND_HOUSEPART;

			let h = heightmap[fi1][fj1][fi][fj];
			let cx = x_in_chunk_to_x(fi1, fi), cz = x_in_chunk_to_x(fj1, fj);
			let und = 20-hght;

			// create house in different mesh depending on wall texture
			let points_pointer;
			let poi_pointer;
			if (house_texture >= 0 && house_texture <= 3) {		points_pointer = vertices_houses;	poi_pointer = vertices_houses_i; }
			else if (house_texture >= 4 && house_texture <= 6) {	points_pointer = vertices_houses2;	poi_pointer = vertices_houses2_i; }
			else if (house_texture >= 7 && house_texture <= 9) {	points_pointer = vertices_houses3;	poi_pointer = vertices_houses3_i; }

			// first wall
			points_pointer[poi_pointer]	= new THREE.Vector3(cx,h-und,cz);		// first triangle
			points_pointer[poi_pointer+1]	= new THREE.Vector3(cx,h-und,cz+widns);
			points_pointer[poi_pointer+2]	= new THREE.Vector3(cx,h+hght,cz+widns);
			points_pointer[poi_pointer+3]	= new THREE.Vector3(cx,h+hght,cz+widns);	// second triangle
			points_pointer[poi_pointer+4]	= new THREE.Vector3(cx,h+hght,cz);
			points_pointer[poi_pointer+5]	= new THREE.Vector3(cx,h-und,cz);

			// second wall
                        points_pointer[poi_pointer+6]	= new THREE.Vector3(cx+lngns,h-und,cz);    // first triangle
                        points_pointer[poi_pointer+7]	= new THREE.Vector3(cx,h-und,cz);
                        points_pointer[poi_pointer+8]	= new THREE.Vector3(cx,h+hght,cz);
                        points_pointer[poi_pointer+9]	= new THREE.Vector3(cx,h+hght,cz);     // second triangle
                        points_pointer[poi_pointer+10]	= new THREE.Vector3(cx+lngns,h+hght,cz);
                        points_pointer[poi_pointer+11]	= new THREE.Vector3(cx+lngns,h-und,cz);

                        // third wall
                        points_pointer[poi_pointer+12]	= new THREE.Vector3(cx+lngns,h-und,cz+widns);                // first triangle
                        points_pointer[poi_pointer+13]	= new THREE.Vector3(cx+lngns,h-und,cz);
                        points_pointer[poi_pointer+14]	= new THREE.Vector3(cx+lngns,h+hght,cz);
                        points_pointer[poi_pointer+15]	= new THREE.Vector3(cx+lngns,h+hght,cz);      // second triangle
                        points_pointer[poi_pointer+16]	= new THREE.Vector3(cx+lngns,h+hght,cz+widns);
                        points_pointer[poi_pointer+17]	= new THREE.Vector3(cx+lngns,h-und,cz+widns);

                        // fourth wall
                        points_pointer[poi_pointer+18]	= new THREE.Vector3(cx,h-und,cz+widns);              // first triangle
                        points_pointer[poi_pointer+19]	= new THREE.Vector3(cx+lngns,h-und,cz+widns);
                        points_pointer[poi_pointer+20]	= new THREE.Vector3(cx+lngns,h+hght,cz+widns);
                        points_pointer[poi_pointer+21]	= new THREE.Vector3(cx+lngns,h+hght,cz+widns);        // second triangle
                        points_pointer[poi_pointer+22]	= new THREE.Vector3(cx,h+hght,cz+widns);
                        points_pointer[poi_pointer+23]	= new THREE.Vector3(cx,h-und,cz+widns);

			if (house_texture >= 0 && house_texture <= 3) 		vertices_houses_i += 24;
			else if (house_texture >= 4 && house_texture <= 6) 	vertices_houses2_i += 24;
			else if (house_texture >= 7 && house_texture <= 9) 	vertices_houses3_i += 24;

                        // roof
                        vertices_roofs[vertices_roofs_i]	= new THREE.Vector3(cx,h+hght,cz);           // first triangle
                        vertices_roofs[vertices_roofs_i+1]	= new THREE.Vector3(cx,h+hght,cz+widns);
                        vertices_roofs[vertices_roofs_i+2]	= new THREE.Vector3(cx+lngns*0.5,h+hght+0.5,cz+widns);
                        vertices_roofs[vertices_roofs_i+3]	= new THREE.Vector3(cx+lngns*0.5,h+hght+0.5,cz+widns);       // second triangle
                        vertices_roofs[vertices_roofs_i+4]	= new THREE.Vector3(cx+lngns*0.5,h+hght+0.5,cz);
                        vertices_roofs[vertices_roofs_i+5]	= new THREE.Vector3(cx,h+hght,cz);

                        vertices_roofs[vertices_roofs_i+6]	= new THREE.Vector3(cx+lngns*0.5,h+hght+0.5,cz);             // first triangle
                        vertices_roofs[vertices_roofs_i+7]	= new THREE.Vector3(cx+lngns*0.5,h+hght+0.5,cz+widns);
                        vertices_roofs[vertices_roofs_i+8]	= new THREE.Vector3(cx+lngns,h+hght,cz+widns);
                        vertices_roofs[vertices_roofs_i+9]	= new THREE.Vector3(cx+lngns,h+hght,cz+widns);     // second triangle
                        vertices_roofs[vertices_roofs_i+10]	= new THREE.Vector3(cx+lngns,h+hght,cz);
                        vertices_roofs[vertices_roofs_i+11]	= new THREE.Vector3(cx+lngns*0.5,h+hght+0.5,cz);

                        // triangel second
                        vertices_roofs[vertices_roofs_i+12]	= new THREE.Vector3(cx,h+hght,cz);    // second triangle
                        vertices_roofs[vertices_roofs_i+13]	= new THREE.Vector3(cx+lngns*0.5,h+hght+0.5,cz);
                        vertices_roofs[vertices_roofs_i+14]	= new THREE.Vector3(cx+lngns,h+hght,cz);

                        // triangel four
               	        vertices_roofs[vertices_roofs_i+15]	= new THREE.Vector3(cx+lngns,h+hght,cz+widns);        // second triangle
               	        vertices_roofs[vertices_roofs_i+16]	= new THREE.Vector3(cx+lngns*0.5,h+hght+0.5,cz+widns);
               	        vertices_roofs[vertices_roofs_i+17]	= new THREE.Vector3(cx,h+hght,cz+widns);

			vertices_roofs_i += 18;
		}
	}
}

// dynamic function for creating 1x meshes (and sprites, etc) from vertices
function create_3d_meshes(fi1, fj1)
{
	// ground mesh
	// now i work with the array created in create_terrain_3d_vertices() directly, instead of moving it to another array first (so the code above from three.js BufferGeometry.js is now obsolete.
	var geometry_terrain = new THREE.BufferGeometry();
	geometry_terrain.setAttribute('position', new THREE.Float32BufferAttribute(vertices_terrain, 3));
	vertices_terrain.length = 0;	// empty array
	geometry_terrain.setAttribute('normal', normals_attribute);	// apparently, this works as well as computeVertexNormals(). don't know why, because they're all the same values, no computation made at all
	geometry_terrain.setAttribute('uv', uv_attribute_terrain);

	// epper land
	if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 33 && fj1 <= 35))
	{
		if (fi1 === 37 && fj1 === 33)				mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_epper2);
		else if (fi1 === 38 && fj1 === 34)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_epper_carpet);
		else if (fi1 === 37 && fj1 === 34)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_epper4);
		else if (fi1 === 37 && fj1 === 35)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_epper5);
		else if (fi1 === 39 && fj1 === 35)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_epper_snow);

		else							mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_epper);
	}

	// epper bridge
	else if ((fi1 >= 33 && fi1 <= 35) && (fj1 >= 33 && fj1 <= 35))
	{
		// mitten
		if (fj1 === 34)						mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_ice);

		// sidorna
		else							mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_ice2);
	}

	// magnet island
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 28 && fj1 <= 32))	mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_dream);

	// magnet archipelago
	else if ((fi1 >= 33 && fi1 <= 35) && (fj1 >= 28 && fj1 <= 32))	mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_dream2);

	// tjörn
	else if ((fi1 >= 32 && fi1 <= 35) && (fj1 >= 36 && fj1 <= 38))
	{
		if (fi1 === 34 && fj1 === 37)				mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_tjorn_park);
		else if (fi1 % 3 === 0 || fj1 % 4 === 0)		mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_tjorn_green);
		else if (fi1 % 2 === 0 || fj1 % 2 === 0)		mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_tjorn_red);
		else							mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_tjorn);
	}

	// norway
	else if ((fi1 >= 29 && fi1 <= 30) && (fj1 >= 35 && fj1 <= 40))	mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_moss);

	// volcano
	else if (fi1 === 28 && fj1 === 39)				mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_volcano);

	// hårass land
	else if ((fi1 >= 31 && fi1 <= 35) && (fj1 >= 39 && fj1 <= 41))
	{
		if (fi1 === 33 && fj1 === 40)				mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_desert2);
		else if (fi1 === 34 && fj1 === 40)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_desert2);

		else							mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_desert);
	}

	// haftlan-drakh
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 36 && fj1 <= 41))
	{
		if (fi1 === 38 && fj1 === 40)				mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_blackhole[0]);
		else if (fi1 === 39 && fj1 === 40)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_blackhole[3]);
		else if (fi1 === 39 && fj1 === 41)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_blackhole[2]);
		else if (fi1 === 38 && fj1 === 41)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_blackhole[1]);

		else if (fi1 === 37 && fj1 === 37)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_plake);
		else if (fi1 === 39 && fj1 === 37)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_pmoss);

		else if (fi1 === 37 && fj1 === 38)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_pred[0]);
		else if (fi1 === 38 && fj1 === 38)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_pred[3]);
		else if (fi1 === 38 && fj1 === 39)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_pred[2]);
		else if (fi1 === 37 && fj1 === 39)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_pred[1]);

		else							mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_black);
	}

	// hongkong/japan
	else if ((fi1 >= 29 && fi1 <= 32) && (fj1 >= 28 && fj1 <= 34))
	{
		if (fi1 === 31 && fj1 === 31)				mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_terrain_snow);
		if (fi1 === 30 && fj1 === 29)				mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_terrain_magnet);
		else if (fi1 === 31 && fj1 === 28)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_terrain_farm);
		else if (fi1 === 32 && fj1 === 34)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_terrain_beach);
		else if (fi1 === 30 && fj1 === 31)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_terrain_city);
		else if ((fi1 >= 30 && fi1 <= 31) && (fj1 >= 33 && fj1 <= 34))	mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_terrain_golf);

		else							mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_terrain);
	}

	// dream
	else if (fi1 === 31 && fj1 === 37)				mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_dream);

	// ice
	else if ((fi1 === 31 && fj1 === 35) || (fi1 === 31 && fj1 === 38))
	{
		if (fi1 === 31 && fj1 === 35)				mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_leaves);
		if (fi1 === 31 && fj1 === 38)				mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_scarymoss);
	}

	// passage
	else if ((fi1 === 28 && fj1 === 33) || ((fi1 >= 26 && fi1 <= 27) && (fj1 >= 33 && fj1 <= 41)) || (fj1 === 41 && fi1 >= 26 && fi1 <= 30))
	{
		if (fi1 % 2 === 0 && fj1 % 2 === 0)			mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_scary_4);
		else if (fi1 % 2 === 0 && fj1 % 2 !== 0)		mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_scary_3);
		else if (fi1 % 2 !== 0 && fj1 % 2 === 0)		mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_scary_1);
		else							mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_scary_2);
	}

	else 								mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, material_bluegreen);

	scene.add(mesh_terrain[fi1][fj1]);
	mesh_terrain[fi1][fj1].visible = false;				// these are for the cases where the meshes are created, and then immediately are turned off (.visible = false). That little pop-in & pop-out takes unnecessary draw calls


// !! skit i computeVertexNormals här, kör den enkla snabba grejen istället (hämta normals direkt från mina förinställda array:er, de som har exakt samma värde i varje värde)
	// houses mesh
	let geometry_houses = new THREE.BufferGeometry().setFromPoints(vertices_houses);
	geometry_houses.computeVertexNormals(); geometry_houses.setAttribute('uv', uv_attribute_houses);

	if (fi1 === 34 && fj1 === 37)					mesh_houses[fi1][fj1] = new THREE.Mesh(geometry_houses, material_house_club);		// tjörn
	else if (fi1 === 32 && fj1 === 35)				mesh_houses[fi1][fj1] = new THREE.Mesh(geometry_houses, material_house_polish);		// pir
	else if ((fi1 >= 29 && fi1 <= 30) && (fj1 >= 35 && fj1 <= 40))	mesh_houses[fi1][fj1] = new THREE.Mesh(geometry_houses, material_house_hong1);		// norway
	else								mesh_houses[fi1][fj1] = new THREE.Mesh(geometry_houses, material_house_church);

	scene.add(mesh_houses[fi1][fj1]);
	mesh_houses[fi1][fj1].visible = false;


	let geometry_houses2 = new THREE.BufferGeometry().setFromPoints(vertices_houses2);
	geometry_houses2.computeVertexNormals(); geometry_houses2.setAttribute('uv', uv_attribute_houses);

	if (fi1 === 34 && fj1 === 37)					mesh_houses2[fi1][fj1] = new THREE.Mesh(geometry_houses2, material_house_club);		// tjörn
	else if (fi1 === 32 && fj1 === 35)				mesh_houses2[fi1][fj1] = new THREE.Mesh(geometry_houses2, material_house_polish);	// pir
	else if ((fi1 >= 29 && fi1 <= 30) && (fj1 >= 35 && fj1 <= 40))	mesh_houses2[fi1][fj1] = new THREE.Mesh(geometry_houses2, material_house_hong2);	// norway
	else								mesh_houses2[fi1][fj1] = new THREE.Mesh(geometry_houses2, material_house_church);

	scene.add(mesh_houses2[fi1][fj1]);
	mesh_houses2[fi1][fj1].visible = false;


	let geometry_houses3 = new THREE.BufferGeometry().setFromPoints(vertices_houses3);
	geometry_houses3.computeVertexNormals(); geometry_houses3.setAttribute('uv', uv_attribute_houses);

	if (fi1 === 34 && fj1 === 37)					mesh_houses3[fi1][fj1] = new THREE.Mesh(geometry_houses3, material_house_club);		// tjörn
	else if (fi1 === 32 && fj1 === 35)				mesh_houses3[fi1][fj1] = new THREE.Mesh(geometry_houses3, material_house_polish);	// pir
	else if ((fi1 >= 29 && fi1 <= 30) && (fj1 >= 35 && fj1 <= 40))	mesh_houses3[fi1][fj1] = new THREE.Mesh(geometry_houses3, material_house_hong3);	// norway
	else								mesh_houses3[fi1][fj1] = new THREE.Mesh(geometry_houses3, material_house_church);

	scene.add(mesh_houses3[fi1][fj1]);
	mesh_houses3[fi1][fj1].visible = false;


	// roofs
	let geometry_roofs = new THREE.BufferGeometry().setFromPoints(vertices_roofs);
	geometry_roofs.computeVertexNormals(); geometry_roofs.setAttribute('uv', uv_attribute_others);

	if (fi1 === 34 && fj1 === 37)					mesh_roofs[fi1][fj1] = new THREE.Mesh(geometry_roofs, material_roof_club);		// tjörn
	else if (fi1 === 32 && fj1 === 35)				mesh_roofs[fi1][fj1] = new THREE.Mesh(geometry_roofs, material_roof_polish);		// pir
	else								mesh_roofs[fi1][fj1] = new THREE.Mesh(geometry_roofs, material_roof_church);

	scene.add(mesh_roofs[fi1][fj1]);
	mesh_roofs[fi1][fj1].visible = false;


	//roads
	let geometry_roads = new THREE.BufferGeometry().setFromPoints(vertices_roads);
	geometry_roads.computeVertexNormals(); geometry_roads.setAttribute('uv', uv_attribute_others);
	mesh_roads[fi1][fj1] = new THREE.Mesh(geometry_roads, material_asphalt);
	mesh_roads[fi1][fj1].position.y = 0.11;
	scene.add(mesh_roads[fi1][fj1]);
	mesh_roads[fi1][fj1].visible = false;


	// trees (as Points sprites)
	const geometry_trees = new THREE.BufferGeometry();
	geometry_trees.setAttribute('position', new THREE.Float32BufferAttribute(vertices_trees, 3));

	if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 33 && fj1 <= 35))		material_trees = psp("tree_sea.png");		// epper land
	else if ((fi1 >= 33 && fi1 <= 35) && (fj1 >= 33 && fj1 <= 35))		material_trees = psp("tree_ice.png");		// epper bridge
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 28 && fj1 <= 32))		material_trees = psp("newtree.png");		// magnet island
	else if ((fi1 >= 33 && fi1 <= 35) && (fj1 >= 28 && fj1 <= 32))		material_trees = psp("newtree_red.png");	// magnet archipelago
	else if ((fi1 >= 32 && fi1 <= 35) && (fj1 >= 36 && fj1 <= 38))		material_trees = psp("tree_tjorn.png", 4.2);	// tjörn
	else if ((fi1 >= 29 && fi1 <= 30) && (fj1 >= 35 && fj1 <= 40))		material_trees = psp("greenpine.png", 3.3);	// norway
	else if (fi1 === 28 && fj1 === 39)					material_trees = psp("hongtree.png");		// volcano

	// haftlan-drakh
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 36 && fj1 <= 41))
	{
		if (fi1 === 37 && fj1 === 37)					material_trees = psp("purppine.png");
		else if (fi1 === 39 && fj1 === 37)				material_trees = psp("darkpine2.png");
		else if ((fi1 === 37 || fi1 === 38) && (fj1 === 38 || fj1 === 39))	material_trees = psp("purppine.png");
		else								material_trees = psp("darkpine2.png");
	}

	// hongkong/japan
	else if ((fi1 >= 29 && fi1 <= 32) && (fj1 >= 28 && fj1 <= 34))
	{
		if (fi1 === 30 && fj1 === 29)					material_trees = psp("pine_magnet.png", 3);	// science festival
		else if ((fi1 >= 30 && fi1 <= 31) && (fj1 >= 29 && fj1 <= 31))	material_trees = psp("bluepine.png");		// car cemetery
		else if (fi1 === 32 && fj1 === 32)				material_trees = psp("kbrpine.png");		// dogert's house
		else								material_trees = psp("purppine.png");
	}

	// ice
	else if ((fi1 === 31 && fj1 === 35) || (fi1 === 31 && fj1 === 38))
	{
		if (fi1 === 31 && fj1 === 35)					material_trees = psp("leavepile.png", 0.8);
		if (fi1 === 31 && fj1 === 38)					material_trees = psp("leavepile.png", 0.8);
	}

	else									material_trees = psp("newtree.png");

	pointsprites_trees[fi1][fj1] = new THREE.Points(geometry_trees, material_trees);
	scene.add(pointsprites_trees[fi1][fj1]);
	pointsprites_trees[fi1][fj1].visible = false;
	pointsprites_trees[fi1][fj1].position.y = psp_material_size*0.25;
	vertices_trees.length = 0;		// empty array so i can fill it again for the next chunk


	// bushes (as Points sprites)
	var geometry_bushes = new THREE.BufferGeometry();
	geometry_bushes.setAttribute('position', new THREE.Float32BufferAttribute(vertices_bushes, 3));

	var material_bushes;

	if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 33 && fj1 <= 35))		material_bushes = psp("bluepine.png");		// epper land
	else if ((fi1 >= 33 && fi1 <= 35) && (fj1 >= 33 && fj1 <= 35))		material_bushes = psp("bush_ice.png");		// epper bridge
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 28 && fj1 <= 32))		material_bushes = psp("tree_desert.png");	// magnet island
	else if ((fi1 >= 32 && fi1 <= 35) && (fj1 >= 36 && fj1 <= 38))		material_bushes = psp("bush_tjorn.png", 2.2);	// tjörn
	else if ((fi1 >= 29 && fi1 <= 30) && (fj1 >= 35 && fj1 <= 40))		material_bushes = psp("handtree9.png", 2.5);	// norway
	else if (fi1 === 28 && fj1 === 39)					material_bushes = psp("tree_lava.png");		// volcano

	// haftlan-drakh
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 36 && fj1 <= 41))
	{
		if (fi1 === 37 && fj1 === 37)					material_bushes = psp("purphand.png");
		else if (fi1 === 39 && fj1 === 39)				material_bushes = psp("glove_stick.png", 2);	// hotspring
		else if (fi1 === 39 && fj1 === 37)				material_bushes = psp("handtree5.png");
		else if ((fi1 === 37 || fi1 === 38) && (fj1 === 38 || fj1 === 39))	material_bushes = psp("grassfire.png");
		else								material_bushes = psp("handtree5.png");
	}

	// hongkong/japan
	else if ((fi1 >= 29 && fi1 <= 32) && (fj1 >= 28 && fj1 <= 34))
	{
		if (fi1 === 30 && (fj1 >= 29 && fj1 <= 31))			material_bushes = psp("windturbine.png", 6);	// car cemetery
		else if (fi1 === 32 && fj1 === 32)				material_bushes = psp("tree_magnet.png");	// dogert's house
		else								material_bushes = psp("newbush.png");
	}

	else if (fi1 === 31 && fj1 === 37)					material_bushes = psp("tree_desert.png");	// dream

	// ice
	else if ((fi1 === 31 && fj1 === 35) || (fi1 === 31 && fj1 === 38))
	{
		if (fi1 === 31 && fj1 === 35)					material_bushes = psp("autumntree.png", 2.5);
		if (fi1 === 31 && fj1 === 38)					material_bushes = psp("autumntree.png", 2.5);
	}

	else									material_bushes = psp("newbush.png");

	pointsprites_bushes[fi1][fj1] = new THREE.Points(geometry_bushes, material_bushes);
	scene.add(pointsprites_bushes[fi1][fj1]);
	pointsprites_bushes[fi1][fj1].visible = false;
	pointsprites_bushes[fi1][fj1].position.y = psp_material_size*0.25;
	vertices_bushes.length = 0;		// empty array so i can fill it again for the next chunk


	// grass (as Points sprites)
	var geometry_grass = new THREE.BufferGeometry();
	geometry_grass.setAttribute('position', new THREE.Float32BufferAttribute(vertices_grass, 3));

	var material_grass;

	if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 33 && fj1 <= 35))		material_grass = psp("bluetree.png");		// epper land
	else if ((fi1 >= 33 && fi1 <= 35) && (fj1 >= 33 && fj1 <= 35))		material_grass = psp("grass_ice.png");		// epper bridge
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 28 && fj1 <= 32))		material_grass = psp("bush_magnet.png");	// magnet island
	else if ((fi1 >= 32 && fi1 <= 35) && (fj1 >= 36 && fj1 <= 38))		material_grass = psp("grass_green.png", 1.3);	// tjörn
	else if ((fi1 >= 29 && fi1 <= 30) && (fj1 >= 35 && fj1 <= 40))		material_grass = psp("grass_iceland.png");	// norway
	else if (fi1 === 28 && fj1 === 39)					material_grass = psp("grass_desert.png");	// volcano

	// haftlan-drakh
	else if ((fi1 >= 36 && fi1 <= 39) && (fj1 >= 36 && fj1 <= 41))
	{
		if (fi1 === 37 && fj1 === 37)					material_grass = psp("grass_purp.png");
		else if (fi1 === 39 && fj1 === 37)				material_grass = psp("dgbush(1).png");
		else if ((fi1 === 37 || fi1 === 38) && (fj1 === 38 || fj1 === 39))	material_grass = psp("grass_red.png");
		else								material_grass = psp("dgbush(1).png");
	}

	// hongkong/japan
	else if ((fi1 >= 29 && fi1 <= 32) && (fj1 >= 28 && fj1 <= 34))
	{
		if (fi1 === 30 && fj1 === 29)					material_grass = psp("deadcar_1.png");		// car cemetery
		else if (fi1 === 30 && fj1 === 30)				material_grass = psp("deadcar_2.png");		// car cemetery
		else if (fi1 === 30 && fj1 === 31)				material_grass = psp("deadcar_3.png");		// car cemetery
		else if (fi1 === 32 && fj1 === 32)				material_grass = psp("bush_magnet.png");	// dogert's house
	}

	else if (fi1 === 31 && fj1 === 37)					material_grass = psp("bush_magnet.png");	// dream

	// ice
	else if ((fi1 === 31 && fj1 === 35) || (fi1 === 31 && fj1 === 38))
	{
		if (fi1 === 31 && fj1 === 35)					material_grass = psp("tree.png", 3.5);
		if (fi1 === 31 && fj1 === 38)					material_grass = psp("tree.png", 3.5);
	}

	else									material_grass = psp("flowers.png");

	pointsprites_grass[fi1][fj1] = new THREE.Points(geometry_grass, material_grass);
	scene.add(pointsprites_grass[fi1][fj1]);
	pointsprites_grass[fi1][fj1].visible = false;
	pointsprites_grass[fi1][fj1].position.y = psp_material_size*0.25;
	vertices_grass.length = 0;		// empty array so i can fill it again for the next chunk
}


// --------------------------------------------------------------- //
// ---- SHOW AND HIDE THE TERRAIN CHUNKS AND THE HOUSES/TREES ---- //
// --------------------------------------------------------------- //
function show_and_hide_terrain_chunks()
{
	// wrap around arrays
	if (chunk_process_z >= levelwidth) { chunk_process_x++; chunk_process_z = 0; }
	if (chunk_process_x >= levelwidth) { chunk_process_x = 0; chunk_process_z = 0; }

	/* ---- terrain creation ---- */
	if (chunk_process[chunk_process_x][chunk_process_z] === CHUNK_SHOW)
	{
		if (!(mesh_terrain[chunk_process_x][chunk_process_z] === undefined))		mesh_terrain[chunk_process_x][chunk_process_z].visible = true;
		if (!(mesh_houses[chunk_process_x][chunk_process_z] === undefined))		mesh_houses[chunk_process_x][chunk_process_z].visible = true;
		if (!(mesh_houses2[chunk_process_x][chunk_process_z] === undefined))		mesh_houses2[chunk_process_x][chunk_process_z].visible = true;
		if (!(mesh_houses3[chunk_process_x][chunk_process_z] === undefined))		mesh_houses3[chunk_process_x][chunk_process_z].visible = true;
		if (!(mesh_roofs[chunk_process_x][chunk_process_z] === undefined))		mesh_roofs[chunk_process_x][chunk_process_z].visible = true;
		if (!(mesh_roads[chunk_process_x][chunk_process_z] === undefined))		mesh_roads[chunk_process_x][chunk_process_z].visible = true;
		if (!(pointsprites_trees[chunk_process_x][chunk_process_z] === undefined))	pointsprites_trees[chunk_process_x][chunk_process_z].visible = true;
		if (!(pointsprites_bushes[chunk_process_x][chunk_process_z] === undefined))	pointsprites_bushes[chunk_process_x][chunk_process_z].visible = true;
		if (!(pointsprites_grass[chunk_process_x][chunk_process_z] === undefined))	pointsprites_grass[chunk_process_x][chunk_process_z].visible = true;

		chunk_process[chunk_process_x][chunk_process_z] = CHUNK_DONOTHING;
		chunk_process_z++;
	}
	else if (chunk_process[chunk_process_x][chunk_process_z] === CHUNK_HIDE)
	{
		if (!(mesh_terrain[chunk_process_x][chunk_process_z] === undefined))		mesh_terrain[chunk_process_x][chunk_process_z].visible = false;
		if (!(mesh_houses[chunk_process_x][chunk_process_z] === undefined))		mesh_houses[chunk_process_x][chunk_process_z].visible = false;
		if (!(mesh_houses2[chunk_process_x][chunk_process_z] === undefined))		mesh_houses2[chunk_process_x][chunk_process_z].visible = false;
		if (!(mesh_houses3[chunk_process_x][chunk_process_z] === undefined))		mesh_houses3[chunk_process_x][chunk_process_z].visible = false;
		if (!(mesh_roofs[chunk_process_x][chunk_process_z] === undefined))		mesh_roofs[chunk_process_x][chunk_process_z].visible = false;
		if (!(mesh_roads[chunk_process_x][chunk_process_z] === undefined))		mesh_roads[chunk_process_x][chunk_process_z].visible = false;
		if (!(pointsprites_trees[chunk_process_x][chunk_process_z] === undefined))	pointsprites_trees[chunk_process_x][chunk_process_z].visible = false;
		if (!(pointsprites_bushes[chunk_process_x][chunk_process_z] === undefined))	pointsprites_bushes[chunk_process_x][chunk_process_z].visible = false;
		if (!(pointsprites_grass[chunk_process_x][chunk_process_z] === undefined))	pointsprites_grass[chunk_process_x][chunk_process_z].visible = false;

		chunk_process[chunk_process_x][chunk_process_z] = CHUNK_DONOTHING;
		chunk_process_z++;
	}

	// other values, go to next chunk}
	else chunk_process_z++;
}

function hide_bushes_grass_etc_outside_current_chunk()
{
	// first, hide bushes and grass in 3x3 chunks around current chunk
	for (let t = current_chunk_x-1; t <= current_chunk_x+1; t++)
	{
		for (let u = current_chunk_z-1; u <= current_chunk_z+1; u++)
		{
			if (!(pointsprites_bushes[t][u] === undefined)) pointsprites_bushes[t][u].visible = false;
			if (!(pointsprites_grass[t][u] === undefined)) pointsprites_grass[t][u].visible = false;
		}
	}

	// then, show bushes and grass in the current chunk
	if (!(pointsprites_bushes[current_chunk_x][current_chunk_z] === undefined)) pointsprites_bushes[current_chunk_x][current_chunk_z].visible = true;
	if (!(pointsprites_grass[current_chunk_x][current_chunk_z] === undefined)) pointsprites_grass[current_chunk_x][current_chunk_z].visible = true;
}

// --------------------------------------------------------------- //
// ---- FUNCTIONS THAT DO ALL THESE THINGS IN THE RIGHT ORDER ---- //
// --------------------------------------------------------------- //
function ascend_intro(master_seed)
{
	material_water = tex("texture_water_2.jpg", 12,21); 
	material_water.transparent = true;
	material_water.opacity = 0.9;
	material_bottom = tex("seabottom.jpg", 3,3); 
//	material_bottom.transparent = true;
//	material_bottom.opacity = 0.6;
	water_animate = 0;
	cloudbox_animate = 0;
	leaves_animate = 0;
	leaves_animate2 = 0;
	area_water = new THREE.Mesh(geometry_water, material_water);
	scene.add(area_water);
	area_bottom = new THREE.Mesh(geometry_water, material_bottom);
	scene.add(area_bottom);

	//					     radius top		radius bot	height		segments
	geometry_skybox = new THREE.CylinderGeometry(58,		58,		50*4,		32);
	geometry_seabox = new THREE.CylinderGeometry(57.9,		57.9,		100,		32);
	geometry_bottombox = new THREE.CylinderGeometry(57.9,		57.9,		100,		32);
	geometry_cloudbox = new THREE.CylinderGeometry(60,		57.9,		100,		32);

	material_skybox = new THREE.MeshLambertMaterial({map: loader.load("files/hongkong_skybox.jpg"), side: THREE.BackSide});
	material_seabox = new THREE.MeshLambertMaterial({map: loader.load("files/texture_water box.jpg"), side: THREE.BackSide});
	material_bottombox = new THREE.MeshLambertMaterial({map: loader.load("files/texture_water box.jpg")});
	material_cloudbox = new THREE.MeshLambertMaterial({map: loader.load("files/clouds.png"), side: THREE.DoubleSide, transparent: true});
	material_skybox.map.wrapS = THREE.MirroredRepeatWrapping;
	material_skybox.map.wrapT = THREE.MirroredRepeatWrapping;
	material_skybox.map.repeat.set(8,4);

	mesh_skybox = new THREE.Mesh(geometry_skybox, material_skybox);
	mesh_seabox = new THREE.Mesh(geometry_seabox, material_seabox);
	mesh_bottombox = new THREE.Mesh(geometry_bottombox, material_bottombox);
	mesh_cloudbox = new THREE.Mesh(geometry_cloudbox, material_cloudbox);
	scene.add(mesh_skybox);
	scene.add(mesh_seabox);
	scene.add(mesh_bottombox);
	scene.add(mesh_cloudbox);

	seed = master_seed;
	master = (((seed*10-Math.floor(seed*10))*30)/9+1)/2;
	master2 = (seed*111-Math.floor(seed*111))*20;
	change4 = seed*21-Math.floor(seed*21);
	change5 = seed*17-Math.floor(seed*17);

	// loop for creating arrays
	// (has to loop through whole level, that's why this is a separate loop)
	for (i1 = 0; i1 < levelwidth; i1++)
	{
		large_arrays_is_created[i1] = new Array();
		heightmap[i1] = new Array();
		chunkmap[i1] = new Array();
		objects[i1] = new Array();
		heightmap_is_loaded[i1] = new Array();
		objects_is_loaded[i1] = new Array();
		mesh_terrain[i1] = new Array();
		mesh_houses[i1] = new Array(), mesh_houses2[i1] = new Array(), mesh_houses3[i1] = new Array();
		mesh_roofs[i1] = new Array();
		mesh_roads[i1] = new Array();
		pointsprites_trees[i1] = new Array();
		pointsprites_bushes[i1] = new Array();
		pointsprites_grass[i1] = new Array();
		highness_grid[i1] = new Array();
		wideness_grid[i1] = new Array();
		islend_grid[i1] = new Array();
		seed_grid[i1] = new Array();
		material_grid[i1] = new Array();

		for (j1 = 0; j1 < levelwidth; j1++)
		{
			large_arrays_is_created[i1][j1] = 0;
			heightmap_is_loaded[i1][j1] = 0;
			objects_is_loaded[i1][j1] = 0;

			highness_grid[i1][j1] = 0;
			wideness_grid[i1][j1] = 1;

			if (i1 % islwidth === 0 && j1 % islwidth === 0)
				rnds = Math.floor( (master*(i1+j1)-Math.floor(master*(i1+j1))) *7);		// seed for set_weights()
			seed_grid[i1][j1] = rnds;

			// this randomizes the chunkmap a bit. it will more often be less majestic. because more majestic looks very "geometric"
			if (pseudorandom(i1+j1) < 0.7) chunkmap[i1][j1] = pseudorandom(i1*j1)*0.3;
			else chunkmap[i1][j1] = pseudorandom(i1*j1)*0.7;

			if (i1 > start_chunk_x-13 && i1 < start_chunk_x+16 && j1 > start_chunk_z-13 && j1 < start_chunk_z+16) create_too_large_arrays(i1, j1);	// only create arrays for the chunks we start with. takes too long time to create all of them
		}
	}

	// manual addition
	// special case for hongkong/japan, this is a manual version of something that got automatically created. don't really know why it's needed
	chunkmap[30][30] = pseudorandom(30*0)*0.2;
	chunkmap[30][31] = pseudorandom(30*0)*0.2;
	chunkmap[31][30] = pseudorandom(30*0)*0.2;
	chunkmap[31][31] = pseudorandom(30*0)*0.2;

	// create heightmap and objects map for 5x5 chunks around start_chunk
	for (i1 = start_chunk_x-2; i1 <= start_chunk_x+2; i1++)
	{
		for (j1 = start_chunk_z-2; j1 <= start_chunk_z+2; j1++)
		{
			let ta = performance.now();

			create_too_large_arrays(i1, j1);
			set_wideness_highness(i1, j1);

			for (i = 0; i < chunkwidth; i++)
			{
				for (j = 0; j < chunkwidth; j++)
				{
					// Graham Relf, Forest (1983), heightmap generation algorithm
					// with my own modification
					set_weights(i1, j1, i, j, seed_grid[i1][j1]);
					calculate_height(i1, j1, i, j);

					generate_objects_array(i1, j1, i, j);
				}
			}
		//	i = 0;	// viktig?? bör inte vara!! 230604

			heightmap_is_loaded[i1][j1] = 1;
		}
	}


	// ------------------------- //
	// race:s (manual additions) //
	// ------------------------- //
	let x_array = new Array(), z_array = new Array();

		    // chunk_x    chunk_z         manual race  x_array  z_array  #no

	// tjörn race
	x_array = [ 1586, 1594, 1603, 1614, 1612, 1620, 1636, 1653, 1657, 1658, 1656, 1651, 1641, 1641, 1642, 1631, 1621, 1603, 1595, 1598, 1606, 1607, 1594, 1582, 1545, 1534, 1521, 1510, 1498, 1480, 1471, 1460, 1459, 1450, 1440, 1442, 1441, 1441, 1445, 1450, 1459, 1478, 1475, 1481, 1491, 1501, 1506, 1515, 1524, 1535, 1546, 1555, 1565, 1586, 1590 ];
	z_array = [ 1820, 1832, 1842, 1853, 1870, 1878, 1880, 1882, 1873, 1842, 1825, 1816, 1812, 1812, 1810, 1809, 1797, 1783, 1777, 1764, 1749, 1733, 1736, 1737, 1746, 1733, 1727, 1729, 1730, 1747, 1755, 1768, 1781, 1787, 1795, 1810, 1827, 1837, 1842, 1855, 1860, 1867, 1884, 1892, 1889, 1888, 1894, 1892, 1885, 1880, 1880, 1881, 1881, 1886, 1885 ];
	race_create(start_chunk_x, start_chunk_z, true, true, x_array, z_array, 0);

	// tjörn-epper bridge bridge
	x_array = [ 1641, 1636, 1648, 1652, 1660 ];
	z_array = [ 1777, 1747, 1735, 1706, 1660 ];
	race_create(start_chunk_x, start_chunk_z, true, false, x_array, z_array, 1);

	// epper bridge-epper land bridge
	x_array = [ 1754, 1815, 1836, 1852, 1852 ];
	z_array = [ 1675, 1689, 1691, 1691, 1691 ];
	race_create(start_chunk_x, start_chunk_z, true, false, x_array, z_array, 2);

	// epper land race
	x_array = [ 1798, 1802, 1826, 1837, 1857, 1869, 1879, 1885, 1899, 1921, 1933, 1939, 1954, 1946, 1934, 1936, 1928, 1916, 1890, 1881, 1882, 1884, 1886, 1886, 1885, 1885, 1888, 1886, 1894, 1903, 1912, 1914, 1914, 1914, 1914, 1899, 1896, 1898, 1888, 1872, 1857, 1857, 1853, 1846, 1841, 1831, 1821, 1814, 1806 ];
	z_array = [ 1688, 1669, 1664, 1675, 1683, 1687, 1694, 1701, 1703, 1708, 1726, 1721, 1708, 1682, 1675, 1689, 1676, 1661, 1665, 1666, 1658, 1653, 1648, 1647, 1637, 1632, 1625, 1625, 1621, 1620, 1621, 1639, 1639, 1638, 1648, 1661, 1673, 1683, 1696, 1702, 1692, 1692, 1690, 1690, 1691, 1691, 1690, 1690, 1690 ];
	race_create(start_chunk_x, start_chunk_z, true, true, x_array, z_array, 3);

	// epper land road
//	x_array = [ 1798, 1798, 1797, 1797, 1802, 1814, 1821, 1828, 1838, 1841, 1842, 1842 ];
//	z_array = [ 1690, 1696, 1705, 1712, 1721, 1728, 1730, 1730, 1733, 1740, 1752, 1752 ];
//	race_create(start_chunk_x, start_chunk_z, true, false, x_array, z_array, 4);

	// epper land road
//	x_array = [ 1838, 1847, 1859, 1872, 1886, 1900, 1914, 1916 ];
//	z_array = [ 1733, 1730, 1725, 1719, 1720, 1721, 1715, 1709 ];
//	race_create(start_chunk_x, start_chunk_z, true, false, x_array, z_array, 5);

	// epper land ski jump 2
	x_array = [ 1919, 1919, 1919, 1919, 1933, 1935, 1932, 1924, 1920, 1920 ];
	z_array = [ 1710, 1719, 1733, 1738, 1738, 1725, 1716, 1710, 1708, 1708 ];
	race_create(start_chunk_x, start_chunk_z, true, false, x_array, z_array, 4);

	// epper land ski jump 2 - magnet island - hongkong/japan
	x_array = [ 1919, 1926, 1951, 1966, 1963, 1962, 1961, 1940, 1931, 1929, 1923, 1883, 1830, 1799, 1788, 1772, 1768, 1732, 1696, 1659, 1629, 1601, 1601 ];
	z_array = [ 1749, 1753, 1752, 1729, 1703, 1669, 1633, 1598, 1555, 1545, 1535, 1531, 1531, 1531, 1521, 1480, 1480, 1480, 1480, 1480, 1480, 1480, 1480 ];
	race_create(start_chunk_x, start_chunk_z, true, false, x_array, z_array, 5);

	// hongkong/japan - passage
	x_array = [ 1445, 1417, 1417 ];
	z_array = [ 1639, 1638, 1638 ];
	race_create(start_chunk_x, start_chunk_z, true, false, x_array, z_array, 6);

	// passage - harassland
	x_array = [ 1512, 1546, 1587, 1621, 1658, 1681, 1683, 1683 ];
	z_array = [ 2018, 2016, 2013, 2011, 2010, 2000, 1999, 1999 ];
	race_create(start_chunk_x, start_chunk_z, true, false, x_array, z_array, 7);

	// harassland - haftlan-drakh
	x_array = [ 1729, 1790, 1790 ];
	z_array = [ 1973, 1976, 1976 ];
	race_create(start_chunk_x, start_chunk_z, true, false, x_array, z_array, 8);

	// create meshes etc for 5x5 chunks around start_chunk
	for (i1 = start_chunk_x-2; i1 <= start_chunk_x+2; i1++)
	{
		for (j1 = start_chunk_z-2; j1 <= start_chunk_z+2; j1++)
		{
			create_too_large_arrays(i1, j1);

			vertices_terrain_i = 0;
			vertices_houses_i = 0, vertices_houses2_i = 0, vertices_houses3_i = 0;
			vertices_roofs_i = 0;
			vertices_roads_i = 0;

			for (i = 0; i < chunkwidth-1; i++)
			{
				for (j = 0; j < chunkwidth-1; j++)
				{
					create_objects_3d_vertices(i1, j1, i, j);
					create_terrain_3d_vertices(i1, j1, i, j);
				}
			}
			create_3d_meshes(i1, j1);
			objects_is_loaded[i1][j1] = 1;
		}
	}

	// hide 5x5 chunks around start_chunk
	for (i1 = start_chunk_x-2; i1 <= start_chunk_x+2; i1++)
	{
		for (j1 = start_chunk_z-2; j1 <= start_chunk_z+2; j1++)
		{
			chunk_process[i1][j1] = CHUNK_HIDE;
		}
	}

	// show 3x3 chunks around start_chunk
	for (i1 = start_chunk_x-1; i1 <= start_chunk_x+1; i1++)
	{
		for (j1 = start_chunk_z-1; j1 <= start_chunk_z+1; j1++)
		{
			chunk_process[i1][j1] = CHUNK_SHOW;
		}
	}

	i1 = start_chunk_x;
	j1 = start_chunk_z;
	current_chunk_x = start_chunk_x;
	current_chunk_z = start_chunk_z;

	i = 0;	// this probably needs to be set for some loop. not sure which!

	// create actual 3d canvas (after splash screen)
	renderer = new THREE.WebGLRenderer({antialias: true});
	document.body.appendChild(renderer.domElement);		// canvas from webGLrenderer() is added to HTML document
}

function ascend_main()
{
	current_chunk_x = Math.floor((player.position.x)/(chunkwidth-1));
	current_chunk_z = Math.floor((player.position.z)/(chunkwidth-1));

	// this is instead of a while loop, that would make the game stuck until the loop was done.
	main_loop_counter = 0;
	while (main_loop_counter < 3000)	// how many times this loop should run per frame.
						// many loops (~1000) = everything gets done fast but might be laggy on bad computers.
						// few loops (~200) = not laggy on bad computers but everything gets done slow
	{
		show_and_hide_terrain_chunks();
		dynload_heightmap();
		dynload_objects();

		main_loop_counter++;
	}

	area_water.position.set(current_chunk_x*(chunkwidth-1)+(chunkwidth*0.5)-0.5, sealevel-0.4, current_chunk_z*(chunkwidth-1)+(chunkwidth*0.5)-0.5);
	area_bottom.position.set(area_water.position.x, area_water.position.y-4, area_water.position.z);

	mesh_skybox.position.set(camera.position.x, area_water.position.y, camera.position.z);
	mesh_seabox.position.set(camera.position.x, area_water.position.y-49.1, camera.position.z);
	mesh_bottombox.position.set(camera.position.x, area_water.position.y-70, camera.position.z);
	mesh_cloudbox.position.set(camera.position.x, area_water.position.y-25 - (player.position.y*0.5), camera.position.z);

	if (water_animate < 1) water_animate += 0.0008; else water_animate = 0;
	material_water.map.offset.set(water_animate, water_animate);
	if (current_chunk_x === 37 && current_chunk_z === 37) material_water.color = col_green;	// haftlan-drakh
	else material_water.color = col_white;

	if (cloudbox_animate < 1) cloudbox_animate += 0.0001; else cloudbox_animate = 0;
	material_cloudbox.map.offset.set(cloudbox_animate, cloudbox_animate);

	if (leaves_animate < 1) leaves_animate += 0.00028*pseudorandom(frame_counter); else leaves_animate = 0;
	if (leaves_animate2 < 1) leaves_animate2 += 0.00028*pseudorandom(frame_counter); else leaves_animate2 = 0;
	material_leaves.map.offset.set(leaves_animate, leaves_animate2)

	create_terrain_chunks_before_showing_them();
	hide_bushes_grass_etc_outside_current_chunk();

	chunk_process[31][37] = CHUNK_HIDE;	// fixa!!
}

// function for creating a few time-consuming laaarge arrays
// this is made into a function so we can create only the arrays we need, when we need them. creating all of them at the same time will take too long time.
function create_too_large_arrays(fi1, fj1)
{
	if (large_arrays_is_created[fi1][fj1] === 0)
	{
		heightmap[fi1][fj1] = new Array();
		objects[fi1][fj1] = new Array();
		for (let fi = 0; fi < chunkwidth; fi++)
		{
			heightmap[fi1][fj1][fi] = new Float32Array(50);
			objects[fi1][fj1][fi] = new Float32Array(50);
		}
		large_arrays_is_created[fi1][fj1] = 1;
	}
}

function dynload_heightmap()
{
	if (main_loop_counter >= 0 && main_loop_counter < 200 && nextpart_start === 0)
	{
		// If j is at end of chunk, wrap to start of chunk (j = 0) and move i one up (i++). (wrap around array of heightmap positions)
		if (j_continue >= chunkwidth)
		{
			continue_create3 = 0;
			i_continue++;
			j_continue = 0;
		}
		// If i is at end of chunk, move to next chunk (j1++). (i = 0)
		if (i_continue >= chunkwidth)
		{
			continue_create2 = 0;
			if (dynload_height_skipping === 0) heightmap_is_loaded[to_load_chunk_x[dynload_heightmap_to_load_i]][to_load_chunk_z[dynload_heightmap_to_load_i]] = 1;
			nextpart_start = 1;
			dynload_heightmap_to_load_i++;
			i_continue = 0;
		}
		// If j1 is at end of level, wrap to start of level (j1 = 0) and move i1 one up (i1++). (wrap around array of chunks)
		// !! varför just 18??
		if (dynload_heightmap_to_load_i >= 18)
		{
			continue_create = 0;
			dynload_heightmap_to_load_i = 0;
		}
		// As long as j1 hasn't "gone too far" in the level, do the i,j loop.
		if (dynload_heightmap_to_load_i < 18)
		{
			// skip unnecessary chunks
			if (heightmap_is_loaded[to_load_chunk_x[dynload_heightmap_to_load_i]][to_load_chunk_z[dynload_heightmap_to_load_i]] === 1) dynload_height_skipping = 1;
			else dynload_height_skipping = 0;

			// If this is an unnecessary chunk, skip this whole loop.
			if (dynload_height_skipping === 1) { i_continue = chunkwidth; }
			// If not, do the loop.
			else
			{
				// Do this first. Then set continue_create2 to 1 so we can continue.
				if (continue_create2 === 0)
				{
					create_too_large_arrays(to_load_chunk_x[dynload_heightmap_to_load_i], to_load_chunk_z[dynload_heightmap_to_load_i]);//b]);

					i_continue = 0;
					set_wideness_highness(to_load_chunk_x[dynload_heightmap_to_load_i], to_load_chunk_z[dynload_heightmap_to_load_i], i_continue, j_continue);
					continue_create2 = 1;
				}
				// Continue with doing this (only if continue_create2 is 1).
				// As long as i hasn't "gone too far" in the chunk, do the j loop.
				if (i_continue < chunkwidth)
				{
					// Do this first. Then set continue_create3 to 1 so we can continue.
					if (continue_create3 === 0)
					{
						j_continue = 0;
						continue_create3 = 1;
					}
					// Continue with doing this (only if continue_create3 is 1).
					// As long as j hasn't "gone too far" in the chunk, do the main loop.
					// ----
					// jag tror det ibland blir fel (spelet låser sig) när man åkt en bit
					// för att heightmap- och objects-array:erna skapas dynamiskt.
					// om de inte hunnit skapas när man ska hämta data från dem så låses spelet.
					// därför kollar jag om array:en har skapats först här
					if (j_continue < chunkwidth && large_arrays_is_created[to_load_chunk_x[dynload_heightmap_to_load_i]][to_load_chunk_z[dynload_heightmap_to_load_i]] === 1)
					{
						// Graham Relf, Forest (1983), heightmap generation algorithm
						// with my own modification
						set_weights(to_load_chunk_x[dynload_heightmap_to_load_i], to_load_chunk_z[dynload_heightmap_to_load_i], i_continue, j_continue, seed_grid[to_load_chunk_x[dynload_heightmap_to_load_i]][to_load_chunk_z[dynload_heightmap_to_load_i]]);
						calculate_height(to_load_chunk_x[dynload_heightmap_to_load_i], to_load_chunk_z[dynload_heightmap_to_load_i], i_continue, j_continue);

						generate_objects_array(to_load_chunk_x[dynload_heightmap_to_load_i], to_load_chunk_z[dynload_heightmap_to_load_i], i_continue, j_continue);

						j_continue++;
					}
				}
			}
		}
	}
}

function dynload_objects()
{
	if (main_loop_counter >= 0 && main_loop_counter < 200 && nextpart_start === 1)
	{
		// wrap around arrays
		if (j_continueb >= chunkwidth-1)
		{
			continue_create3b = 0;
			i_continueb++;
			j_continueb = 0;
		}
		if (i_continueb >= chunkwidth-1)
		{
			continue_create2b = 0;
			nextpart_start = 0;
			if (dynload_objects_skipping === 0)
			{
				create_3d_meshes(to_load_chunk_x[dynload_objects_to_load_i], to_load_chunk_z[dynload_objects_to_load_i]);
				objects_is_loaded[to_load_chunk_x[dynload_objects_to_load_i]][to_load_chunk_z[dynload_objects_to_load_i]] = 1;
			}
			dynload_objects_to_load_i++;
			i_continueb = 0;
		}
		if (dynload_objects_to_load_i >= 18)
		{
			continue_createb = 0;
			dynload_objects_to_load_i = 0;
		}
		if (dynload_objects_to_load_i < 18)
		{
			// skip unnecessary chunks
			if (objects_is_loaded[to_load_chunk_x[dynload_objects_to_load_i]][to_load_chunk_z[dynload_objects_to_load_i]] === 1) dynload_objects_skipping = 1;
			else if (heightmap_is_loaded[to_load_chunk_x[dynload_objects_to_load_i]][to_load_chunk_z[dynload_objects_to_load_i]] === 0) dynload_objects_skipping = 1;	// skip object creation if heightmap hasn't been created for the chunk
			else dynload_objects_skipping = 0;

			if (dynload_objects_skipping === 1) i_continueb = chunkwidth;
			else
			{
				if (continue_create2b === 0)
				{
					create_too_large_arrays(to_load_chunk_x[dynload_objects_to_load_i], to_load_chunk_z[dynload_objects_to_load_i]);

					i_continueb = 0;

					vertices_terrain_i = 0;
					vertices_houses_i = 0; vertices_houses2_i = 0; vertices_houses3_i = 0;
					vertices_roofs_i = 0;
					vertices_roads_i = 0;

					continue_create2b = 1;
				}
				if (i_continueb < chunkwidth-1)
				{
					if (continue_create3b === 0)
					{
						j_continueb = 0;
						continue_create3b = 1;
					}
					if (j_continueb < chunkwidth-1 && large_arrays_is_created[to_load_chunk_x[dynload_objects_to_load_i]][to_load_chunk_z[dynload_objects_to_load_i]])
					{
						create_objects_3d_vertices(to_load_chunk_x[dynload_objects_to_load_i], to_load_chunk_z[dynload_objects_to_load_i], i_continueb, j_continueb);
						create_terrain_3d_vertices(to_load_chunk_x[dynload_objects_to_load_i], to_load_chunk_z[dynload_objects_to_load_i], i_continueb, j_continueb);
						j_continueb++;
					}
				}
			}
		}
	}
}

// add and remove chunks when moving into a new place
function create_terrain_chunks_before_showing_them()
{
	// tell game to hide 5x5 chunks around current chunk
	if (current_chunk_x !== last_chunk_x || current_chunk_z !== last_chunk_z)
	{
		for (let t = current_chunk_x-2; t <= current_chunk_x+2; t++)
		{
			for (let u = current_chunk_z-2; u <= current_chunk_z+2; u++)
			{
				chunk_process[t][u] = CHUNK_HIDE;
			}
		}
	}

	// then, tell game to show 3x3 chunks around current chunk
	for (let t = current_chunk_x-1; t <= current_chunk_x+1; t++)
	{
		for (let u = current_chunk_z-1; u <= current_chunk_z+1; u++)
		{
			chunk_process[t][u] = CHUNK_SHOW;
		}
	}

	// tell game to create 5x5 chunks around current chunk
	if (current_chunk_x !== last_chunk_x || current_chunk_z !== last_chunk_z)
	{
console.log("creating new chunks!");
		let n = 0;
		for (let t = current_chunk_x-2; t <= current_chunk_x+2; t++)
		{
			for (let u = current_chunk_z-2; u <= current_chunk_z+2; u++)
			{
				to_load_chunk_x[n] = t;
				to_load_chunk_z[n] = u;
				n++;
			}
		}
	}

	last_chunk_x = current_chunk_x;
	last_chunk_z = current_chunk_z;
}
