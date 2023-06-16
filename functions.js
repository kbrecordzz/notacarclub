// game functions

"use strict";

const ROOM_WIDTH			= 3.1;
const ROOM_HEIGHT			= 1.2;

const NUMBER_OF_CARS			= 12;

const CAR_ADELE				= 0;
const CAR_DARK_GANDALF			= 1;
const CAR_DADDY				= 2;
const CAR_DOGERT			= 3;
const CAR_OMALLEY			= 4;
const CAR_HARASS			= 5;
const CAR_DISONESTY			= 6;
const CAR_MRS_SUPERCONDUCTOR		= 7;
const CAR_POLISH_COW			= 8;
const CAR_EPPER				= 9;

const CAR_TURF				= 10;
const CAR_NUBBS				= 11;

const MODULUS_FREEROAM_OR_RACE		= 50;
const MODULUS_FREEROAM_ONLY		= 100;

const RACE_BEFORE			= 0;
const RACE_COUNTDOWN			= 1;
const RACE_DURING			= 2;
const RACE_AFTER			= 3;

const SOMEONE_HAS_WON			= 666;
const PLAYER				= 99;

const FRAMES_PER_HOUR			= 834;
const FRAMES_PER_DAY			= 20000;

const MAX_SPEED_ROAD			= 0.20;
const MAX_SPEED_REVERSE_ROAD		= -0.11;
const MAX_SPEED_OFFROAD			= 0.14;
const MAX_SPEED_REVERSE_OFFROAD		= -0.08;
const ACCELERATION_ROAD			= 0.010;
const ACCELERATION_OFFROAD		= 0.006;
const TURN_SPEED			= 0.024;
const CHARACTERS_SLOWER			= 0.9;

const TURBO_TIMER			= 100;

const COLLISION_DISTANCE		= 1;
const INTERACT_DISTANCE			= 3;
const HOUSE_DISTANCE			= 5;

const FRICTION_FORWARD_ROAD		= 0.00015;
const FRICTION_BACKWARD_ROAD		= 0.0015;
const FRICTION_FORWARD_OFFROAD		= 0.00111;
const FRICTION_BACKWARD_OFFROAD		= 0.0011;
const FRICTION_FORWARD_ICE		= 0.00002;
const FRICTION_BACKWARD_ICE		= 0.00002;

const GRAVITY				= 0.004;


// "permanent" houses
var carclub_position_x			= x_in_chunk_to_x(34, 31);
var carclub_position_z			= x_in_chunk_to_x(37, 23);

var dghouse_position_x			= x_in_chunk_to_x(38, 36);
var dghouse_position_z			= x_in_chunk_to_x(39, 7);

var harasshouse_position_x		= x_in_chunk_to_x(34, 43);
var harasshouse_position_z		= x_in_chunk_to_x(40, 2);
var laundryroom_position_x		= 1810;	// placeholders!!
var laundryroom_position_z		= 1855;

var epperhouse_position_x		= 1835; // placeholders!!
var epperhouse_position_z		= 1880;

var auction_position_x			= 1840;	// placeholders!!
var auction_position_z			= 1880;


const CUT_SPLASHSCREEN			= -2;
var splashscreen_started		= false;

const CUT_SPLASHSCREEN_WAIT		= -1;

const CUT_PAUSEMENU			= -3;

const CUT_FREEROAM_INTRO		= 9990000;
var timescene_intro_started		= false;
var timescene_intro_position_x		= 1471;
var timescene_intro_position_z		= 1882;

const CUT_CUTSCENE_WAKEUP		= 9990001;
var cutscene_wakeup_started		= false;

const CUT_RACE_1			= 9990050
var race_1_started			= false;
var race_1_started_during		= false;
var race_1_started_after		= false;
var cut_race_1_position_x		= 1579;
var cut_race_1_position_z		= 1820;

const CUT_RACE_1_AFTER			= 9990100;
var race_1_after_started		= false;

const CUT_CUTSCENE_MEETING_1		= 1000001;
var cutscene_meeting_1_started		= false;

const CUT_FREEROAM_0			= 1000100;
var freeroam_0_started			= false;

const CUT_FREEROAM_GYM			= 1002000;
var gameplay_gym_started		= false;
var gameplay_gym_position_x		= 1607;
var gameplay_gym_position_z		= 1893;

const CUT_FREEROAM_1			= 1002500;
var freeroam_1_started			= false;

const CUT_FREEROAM_1B			= 1002600;
var freeroam_1b_started			= false;

const CUT_FREEROAM_1C			= 1002700;
var freeroam_1c_started			= false;

const CUT_FREEROAM_1D			= 1002800;
var freeroam_1c_started			= false;
 
const CUT_FREEROAM_1E			= 1002900;
var freeroam_1c_started			= false;

const CUT_FREEROAM_1F			= 10029000;
var freeroam_1c_started			= false;

const CUT_FREEROAM_EPPER		= 1003000;
var freeroam_epper_started		= false;

const CUT_CUTSCENE_EPPER		= 1007401;
var cutscene_epper_started		= false;

const CUT_RACE_EPPER			= 1007450;
var race_epper_started			= false;
var race_epper_started_during		= false;
var race_epper_started_after		= false;
var cut_race_epper_position_x		= 1798;
var cut_race_epper_position_z		= 1688;

const CUT_RACE_EPPER_AFTER		= 10074500;
var race_epper_after_started		= false;

const CUT_FREEROAM_CARCHASE		= 1007500;
var gameplay_carchase_started		= false;

const CUT_FREEROAM_OMALLEY		= 1008000;
var timescene_omalley_started		= false;

const CUT_FREEROAM_MAGNETDAY		= 1009000;
var freeroam_magnetday_started		= false;
var freeroam_magnetday_position_x	= 1488;
var freeroam_magnetday_position_z	= 1432;

const CUT_CUTSCENE_MAGNETDAY_1		= 1009001;
var cutscene_magnetday_1_started	= false;

const CUT_CUTSCENE_MAGNETDAY_2		= 1009051;
var cutscene_magnetday_2_started	= false;

const CUT_CUTSCENE_MAGNETDAY_3		= 1009101;
var cutscene_magnetday_3_started	= false;

const CUT_CUTSCENE_MAGNETDAY_4		= 1009151;
var cutscene_magnetday_4_started	= false;

const CUT_CUTSCENE_MAGNETDAY_5		= 1009201;
var cutscene_magnetday_5_started	= false;

const CUT_CUTSCENE_MAGNETDAY_6		= 1009251;
var cutscene_magnetday_6_started	= false;

const CUT_CUTSCENE_MAGNETDAY_MRS	= 1009501;
var cutscene_magnetday_mrs_started	= false;

const CUT_CUTSCENE_MEETING_2		= 1010001;
var cutscene_meeting_2_started		= false;

const CUT_FREEROAM_DGTRAVEL		= 1011000;
var timescene_dgtravel_started		= false;

const CUT_FREEROAM_DGCHILL		= 1011400;
var timescene_dgchill_started		= false;

const CUT_CUTSCENE_DGCHILL_OPEN		= 1011501;
var cutscene_dgchill_open_started	= false;

const CUT_FREEROAM_DGHOTSPRING		= 1011600;
var freeroam_dghotspring_started	= false;
var freeroam_dghotspring_position_x	= x_in_chunk_to_x(39, 21);
var freeroam_dghotspring_position_z	= x_in_chunk_to_x(39, 8);

const CUT_CUTSCENE_DGHOTSPRING		= 1011601;
var cutscene_dghotspring_started	= false;
var cutscene_dghotspring_position_x	= x_in_chunk_to_x(39, 21);
var cutscene_dghotspring_position_z	= x_in_chunk_to_x(39, 8);

const CUT_FREEROAM_DGHOTSPRING_2	= 1011800;
var timescene_dghotspring_started	= false;

const CUT_CUTSCENE_DGSLEEP		= 1012251;
var cutscene_dgsleep_started		= false;

const CUT_FREEROAM_WASHING		= 10012200;
var freeroam_washing_started		= false;

const CUT_CUTSCENE_WASHING		= 10012201;
var cutscene_washing_started		= false;

const CUT_FREEROAM_WASHING_2		= 1012300;
var timescene_washing_started		= false;

const CUT_CUTSCENE_MEETING_3		= 1012401;
var cutscene_meeting_3_started		= false;

const CUT_FREEROAM_4			= 1012500;
var freeroam_4_started			= false;

const CUT_FREEROAM_4B			= 10012500;
var freeroam_4b_started			= false;

const CUT_CUTSCENE_LICENSE		= 1012501;
var cutscene_license_started		= false;

const CUT_FREEROAM_LICENSE		= 1012600;
var freeroam_license_started		= false;

const CUT_CUTSCENE_LICENSE_2		= 1012601;
var cutscene_license_2_started		= false;

const CUT_FREEROAM_LICENSE_2		= 1012700;
var freeroam_license_2_started		= false;
var freeroam_license_2_position_x	= 1478;
var freeroam_license_2_position_z	= 1872;

const CUT_CUTSCENE_LICENSE_3		= 1012701;
var cutscene_license_3_started		= false;

const CUT_FREEROAM_LICENSE_3		= 1012800;
var gameplay_license_3_started		= false;

const CUT_CUTSCENE_LICENSE_4		= 1012801;
var cutscene_license_4_started		= false;

const CUT_FREEROAM_LICENSE_4		= 1012900;
var gameplay_license_4_started		= false;
var gameplay_license_3_position_x	= 1480;
var gameplay_license_3_position_z	= 1936;

const CUT_CUTSCENE_LICENSE_5		= 1012901;
var cutscene_license_5_started		= false;

const CUT_FREEROAM_LICENSE_5		= 1013000;
var gameplay_license_5_started		= false;

const CUT_FREEROAM_MAGNETDROWN		= 1014000;
var freeroam_magnetdrown_started	= false;
var freeroam_magnetdrown_position_x	= 1708;
var freeroam_magnetdrown_position_z	= 1947;
var freeroam_magnetdrown_magnet_x	= [ 1697, 1709, 1727, 1751, 1748, 1729, 1717 ];		// dessa är baklänges från mål till start
var freeroam_magnetdrown_magnet_z	= [ 1955, 1954, 1968, 1981, 1951, 1939, 1911 ];
var freeroam_magnetdrown_attractor_x	= 1666;
var freeroam_magnetdrown_attractor_z	= 1963;
var freeroam_magnetdrown_attractor_y	= -15;

const CUT_CUTSCENE_MAGNETDROWN		= 1014101;
var cutscene_magnetdrown_started	= false;

const CUT_FREEROAM_GOINGHOME		= 1014500;
var freeroam_goinghome_started		= false;

const CUT_FREEROAM_CARCLUBFIRE		= 1014600;
var freeroam_carclubfire_started	= false;

const CUT_CUTSCENE_CARCLUBFIRE		= 10014701;
var cutscene_carclubfire_started	= false;

const CUT_CUTSCENE_MEETING_4		= 1014701;
var cutscene_meeting_4_started		= false;

const CUT_FREEROAM_KILLEPPER		= 1016000;
var gameplay_killepper_started		= false;
var gameplay_killepper_position_x	= 1676;
var gameplay_killepper_position_z	= 1816;
var gameplay_killepper_bomb_timer	= 0;

const CUT_FREEROAM_DISONESTY		= 1016500;
var timescene_disonesty_started		= false;

const CUT_CUTSCENE_DATE			= 1019001;
var cutscene_date_started		= false;

const CUT_FREEROAM_5			= 1019200;
var freeroam_5_started			= false;

const CUT_CUTSCENE_MEETING_5		= 1019201;
var cutscene_meeting_5_started		= false;

const CUT_FREEROAM_SVINERI_1		= 1019300;
var timescene_svineri_1_started		= false;

const CUT_FREEROAM_AUCTION		= 1019500;
var gameplay_auction_started		= false;
var gameplay_auction_angry		= 0;
var gameplay_auction_destroyed		= 0;

const CUT_FREEROAM_SVINERI_2		= 1019700;
var timescene_svineri_2_started		= false;

const CUT_CUTSCENE_HARASSFAN		= 1019701;
var cutscene_harassfan_started		= false;

const CUT_FREEROAM_HARASSFAN		= 1019900;
var gameplay_harassfan_started		= false;
var gameplay_harassfan_fan_health	= 100;
var gameplay_harassfan_harass_health	= 100;
var gameplay_harassfan_harass_shottimer	= 0;
var gameplay_harassfan_fan_shottimer	= 0;

const CUT_CUTSCENE_GASSTATION		= 10019901;
var cutscene_gasstation_started		= false;

const CUT_CUTSCENE_MEETING_6		= 1029201;
var cutscene_meeting_6_started		= false;

const CUT_FREEROAM_DARK			= 1029700;
var gameplay_dark_started		= false;

const CUT_FREEROAM_MAGNETFACTORY	= 1029900;
var freeroam_magnetfactory_started	= false;
var freeroam_magnetfactory_position_x	= 1795;
var freeroam_magnetfactory_position_z	= 1574;
var freeroam_magnetfactory_attractor_x	= 1809;
var freeroam_magnetfactory_attractor_z	= 1541;

const CUT_FREEROAM_PISSANDSHIT		= 9000000;
var freeroam_pissandshit_started	= false;


function get_time_by_minutes_resolution(minutes_resolution) { return Math.floor(frame_counter/(FRAMES_PER_HOUR*(minutes_resolution/60))) * (minutes_resolution/60); }

function lookat_datass(fobject1, fobject2) { return Math.atan2((fobject2.position.z-fobject1.position.z), -(fobject2.position.x-fobject1.position.x)) - 0.5*Math.PI; }	// varför 0.5?!!
function lookat_datass_xz(fx1, fz1, fx2, fz2) { return Math.atan2((fz2-fz1), -(fx2-fx1)) - 0.5*Math.PI; }

function rotation_real_get(angle)
{
	while (angle < 0) angle += 2*Math.PI;
	while (angle >= 2*Math.PI) angle -= 2*Math.PI;

	return angle;
}

function cars_control()
{
	// player (is controlled by keyboard input)
	if (Math.floor(ascend_getobject(player)) === ASCEND_ROAD)
	{
		if (key_w) if (speed < MAX_SPEED_ROAD) speed += game_speed * ACCELERATION_ROAD;
		if (key_s && speed > MAX_SPEED_REVERSE_ROAD && cut !== CUT_FREEROAM_KILLEPPER) speed -= ACCELERATION_ROAD;
	}
	else
	{
		if (key_w) if (speed < MAX_SPEED_OFFROAD) speed += game_speed * ACCELERATION_OFFROAD;
		if (key_s && speed > MAX_SPEED_REVERSE_OFFROAD && cut !== CUT_FREEROAM_KILLEPPER) speed -= ACCELERATION_OFFROAD;
	}

	if (key_a) player.rotation.y += TURN_SPEED;
	if (key_d) player.rotation.y -= TURN_SPEED;

	if ((speed > 0 && speed < 0.005 && !key_w && !key_s) || (speed < 0 && speed > -0.003 && !key_w && !key_s)) speed = 0;	// make the car stand fully still

	if (player_race_state === RACE_COUNTDOWN || player_race_state === RACE_AFTER) speed = 0;
	if (cut % MODULUS_FREEROAM_OR_RACE !== 0) speed = 0;

	if (cut == CUT_FREEROAM_KILLEPPER && mouseclick) player.position.y++;

	if (speed > MAX_SPEED_ROAD) speed = MAX_SPEED_ROAD;
	if (speed < MAX_SPEED_REVERSE_ROAD) speed = MAX_SPEED_REVERSE_ROAD;
	if (turbo_timer <= 0) player.translateZ(game_speed * speed);		// lägg till detta på andra karaktärer!
	else player.translateZ(game_speed * speed * ((turbo_timer/TURBO_TIMER)*2+1));
	turbo_timer--;

	// other characters (are controlled by AI code)
	// emulate other car pressing "W" to drive.
	for (let t = 0; t < NUMBER_OF_CARS; t++)
	{
		if (character_turned_on[t] === 1)
		{
			// normal code - only runs when character is in the 3x3 closest chunks
			// (everything with heightmap[][][][] and objects[][][][] etc must be here
			if ((current_chunk_x-x_to_chunk_no(character[t].position.x)) <= 1 && (current_chunk_z-x_to_chunk_no(character[t].position.z)) <= 1)
			{
				let accchange = 1;
				if (t === CAR_ADELE) accchange = 1.2;
				else if (t === CAR_DARK_GANDALF) accchange = 0.9;
				else if (t === CAR_DADDY) accchange = 1.1;
				else if (t === CAR_HARASS) accchange = 1.2;
				else if (t === CAR_DISONESTY) accchange = 1.1;
				else if (t === CAR_MRS_SUPERCONDUCTOR) accchange = 1.2;
				else if (t === CAR_EPPER) accchange = 1.1;
				if (ascend_getobject(character[t]) === ASCEND_ROAD)
				{
					if (character_speed[t] < MAX_SPEED_ROAD*CHARACTERS_SLOWER*speedchange) character_speed[t] += ACCELERATION_ROAD*CHARACTERS_SLOWER * accchange;
				}
				else
				{
					if (character_speed[t] < MAX_SPEED_OFFROAD*CHARACTERS_SLOWER*speedchange) character_speed[t] += ACCELERATION_OFFROAD*CHARACTERS_SLOWER * accchange;
				}

				// när bilen hamnar utanför vägen så styr den sig direkt mot checkpoint istället för att irra runt på gräset.
				// see which part step of the checkpoints that you're closest too
		//	if (1 == 0) {
		//		}
			}
		}

		// follow goal
		character_goal_temporaryfollow_distx[t] = Math.abs(character_goal_x[t]-character_goal_temporaryfollow_x[t]);
		character_goal_temporaryfollow_distz[t] = Math.abs(character_goal_z[t]-character_goal_temporaryfollow_z[t]);

		character_goal_distx[t] = Math.abs(character[t].position.x-character_goal_x[t]);
		character_goal_distz[t] = Math.abs(character[t].position.z-character_goal_z[t]);

		// steer back towards goal if the randomization has gotten to big (so the car don't go to another city). or if car is close to goal
		// steer back if pretty close to water. character gets on their toes near water so they don't fall down into it
		if (character_goal_distx[t]+character_goal_distz[t] < 10 || character_goal_temporaryfollow_distx[t]+character_goal_temporaryfollow_distz[t] > character_goal_distx[t]+character_goal_distz[t] || character[t].position.y < sealevel-1)
		{
			character_goal_temporaryfollow_x[t] = character_goal_x[t];
			character_goal_temporaryfollow_z[t] = character_goal_z[t];
		}
		// otherwise, randomize
		else
		{
			let randomizechange = 1;
			if (t === CAR_DARK_GANDALF) randomizechange = 0.8;
			else if (t === CAR_OMALLEY) randomizechange = 0.9;
			else if (t === CAR_HARASS) randomizechange = 2;
			else if (t === CAR_MRS_SUPERCONDUCTOR) randomizechange = 0.7;
			else if (t === CAR_POLISH_COW) randomizechange = 0.85;
			character_goal_temporaryfollow_x[t] += 0.5*(Math.random()-0.5)*(character_goal_distx[t]+character_goal_distz[t])*0.1 * randomizechange;
			character_goal_temporaryfollow_z[t] += 0.5*(Math.random()-0.5)*(character_goal_distx[t]+character_goal_distz[t])*0.1 * randomizechange;
		}

		if (character_race_state[t] == RACE_COUNTDOWN || character_race_state[t] == RACE_AFTER) character_speed[t] = 0;
		else if (cut % MODULUS_FREEROAM_OR_RACE !== 0) character_speed[t] = 0;
		else if (character_goal_distx[t] < 1 && character_goal_distz[t] < 1) character_speed[t] = 0;
		else
		{
			character[t].rotation.y = lookat_datass_xz(character[t].position.x,character[t].position.z, character_goal_temporaryfollow_x[t],character_goal_temporaryfollow_z[t]);
			if (character_goal_x[t] !== -1) character[t].translateZ(game_speed * character_speed[t]);
		}
	}
}

function cars_physics()
{
	// player
	// friction
	if (Math.floor(ascend_getobject(player)) == ASCEND_ROAD)
	{
		if (speed > 0) speed -= game_speed * FRICTION_FORWARD_ROAD;
		else if (speed < 0) speed += game_speed * FRICTION_BACKWARD_ROAD;
	}
	else if (Math.floor(ascend_getobject(player)) == ASCEND_ICE)
	{
		if (speed > 0) speed -= FRICTION_FORWARD_ICE;
		else if (speed < 0) speed += FRICTION_BACKWARD_ICE;
	}
	else
	{
		if (speed > 0) speed -= game_speed * FRICTION_FORWARD_OFFROAD; 
		else if (speed < 0) speed += game_speed * FRICTION_BACKWARD_OFFROAD;
	}

	// gravity
	height = height_get(player)

	// helicopter
	if (cut == CUT_FREEROAM_KILLEPPER)
	{
		if (player.position.y <= height) player.position.y = height;
		player.position.y -= 0.01;
	}
	// car
	else
	{
		if ((player.position.y-height) < (1/speed+1)*0.005)
		{
			gravityinc = 0;
			player.position.y = height;
		}
		else if (player.position.y > height)
		{
			gravityinc += GRAVITY;
			player.position.y -= gravityinc;
		}
	}

	// go slower uphill
	if ((lastheight > height && player.position.y === height) || (lastheight < height && player.position.y === height))
	{
		if (speed > 0) speed += (lastheight-height)*0.1;		// when driving forward
		else if (speed < 0) speed -= (lastheight-height)*0.1;		// when driving backward
	}

	// don't drown in water
if (1 === 0) {
	if (lastlandpos_x !== -1 && lastlandpos_z !== -1)
	{
		if (cut !== CUT_FREEROAM_MAGNETDROWN)
		{
			if (player.position.y < sealevel-1)
			{
				sound_splash.play();
				speed = 0;
				player.position.x = lastlandpos_x;
				player.position.y = sealevel+4;
				player.position.z = lastlandpos_z;
			}
		}
	}
}

	lastheight = height;

	// collision
	let ob = Math.floor(ascend_getobject(player));
//	if (ob == ASCEND_HOUSE || ob == ASCEND_HOUSEPART)
//	{
//		let sfac = speed;
//		if (speed < 0) sfac = -speed;
//		if (sfac < 0.3) sound_crash.volume = sfac*2;
//		else sound_crash.volume = 0.6;
//		sound_crash.play();

//		speed *= -0.25;			// skjut tillbaka bilen
//		player.position.x = lastpos_x;	// flytta tillbaka bilen till positionen den var på innan den körde in i huset's "block"
//		player.position.z = lastpos_z;
//	}

	if (cut % MODULUS_FREEROAM_OR_RACE === 0 && cut % MODULUS_FREEROAM_ONLY !== 0)
	{
		for (let t = 0; t < NUMBER_OF_CARS; t++)
		{
			if (character_turned_on[t] === 1)
			{
				if (distance_get(player, character[t]) < COLLISION_DISTANCE && collision_timer <= 0)
				{
					sound_punch.play();
					if (speed > 0.01 && speed >= character_speed[t])
					{
						character[t].position.y += 0.5;
						character_speed[t] = 0;
					}
					else
					{
						player.position.y += 0.5;
						speed = 0;
					}
					collision_timer = 60;
				}
			}
		}
	}

	// other characters
	for (let t = 0; t < NUMBER_OF_CARS; t++)
	{
		if (character_turned_on[t] === 1)
		{
			// normal code - only runs when character is in the 3x3 closest chunks
			// (everything with heightmap[][][][] and objects[][][][] etc must be here
			if ((current_chunk_x-x_to_chunk_no(character[t].position.x)) <= 1 && (current_chunk_z-x_to_chunk_no(character[t].position.z)) <= 1)
			{
				// friction
				let frictionchange = 1;
				if (t === CAR_DADDY) frictionchange = 1.3;
				else if (t === CAR_DOGERT) frictionchange = 1.3;
				else if (t === CAR_MRS_SUPERCONDUCTOR) frictionchange = 0.8;
				else if (t === CAR_POLISH_COW) frictionchange = 1.3;
				else if (t === CAR_EPPER) frictionchange = 1.3;
				if (Math.floor(ascend_getobject(character[t])) == ASCEND_ROAD)
				{
					if (character_speed[t] > 0) character_speed[t] -= FRICTION_FORWARD_ROAD * frictionchange;
					else if (character_speed[t] < 0) character_speed[t] += FRICTION_BACKWARD_ROAD * frictionchange;
				}
				else
				{
					if (character_speed[t] > 0) character_speed[t] -= FRICTION_FORWARD_OFFROAD * frictionchange;
					else if (character_speed[t] < 0) character_speed[t] += FRICTION_BACKWARD_OFFROAD * frictionchange;
				}

				// gravity
				let gravitychange = 1;
				if (t === CAR_DOGERT) gravitychange = 1.3;
				else if (t === CAR_HARASS) gravitychange = 0.6;
				else if (t === CAR_MRS_SUPERCONDUCTOR) gravitychange = 0.8;
				else if (t === CAR_POLISH_COW) gravitychange = 1.2;
				character_height[t] = height_get(character[t]);
				if (character[t].position.y > character_height[t]+0.1)
				{
					character_gravityinc[t] += GRAVITY * gravitychange;
					character[t].position.y -= character_gravityinc[t];
				}
				else
				{
					character_gravityinc[t] = 0;
					character[t].position.y = character_height[t]+0.1;
				}
				character_lastheight[t] = character_height[t];

				// go slower uphill
				if (character_lastheight[t] > character_height[t] && character[t].position.y == character_height[t]+0.3 || character_lastheight[t] < character_height[t] && character[t].position.y == character_height[t]+0.3)
				{
					if (character_speed[t] > 0) character_speed[t] += (character_lastheight[t]-character_height[t])*0.05;		// when driving forward
					else if (character_speed[t] < 0) character_speed[t] -= (character_lastheight[t]-character_height[t])*0.05;		// when driving backward
				}

				// don't drown in water
			//	if (character[t].position.y < sealevel-1)
			//	{
			//		character_speed[t] = 0;
			//		character[t].position.x = character_lastlandpos_x[t];
			//		character[t].position.y = sealevel+4;
			//		character[t].position.z = character_lastlandpos_z[t];
			//	}

				// collision
				// (...haven't added yet)
			//	let ob = Math.floor(ascend_getobject(character[t]));
			//	if (ob == ASCEND_HOUSE || ob == ASCEND_HOUSEPART)
			//	{
			//		let sfac = character_speed[t];
			//		if (character_speed[t] < 0) sfac = -character_speed[t];
			//		if (sfac < 0.3) sound_crash.volume = sfac*2;
			//		else sound_crash.volume = 0.6;
			//		sound_crash.play();

			//		character_speed *= -0.25;				// skjut tillbaka bilen
			//		character[t].position.x = character_lastpos_x[t];	// flytta tillbaka bilen till positionen den var på innan den körde in i huset's "block"
			//		character[t].position.z = character_lastpos_z[t];
			//	}
			}
		}
	}
}

function cars_sound()
{
	// player
	let volume = 7*speed;
	if (volume >= 0.99) volume = 0.99;
	volume *= 0.6;
	if (volume <= 0.2) volume = 0.2;

	let playbackrate = 20*speed;
	if (playbackrate >= 3.9) playbackrate = 3.9;
	if (playbackrate <= 0.5) playbackrate = 0.5;

	sound_car.playbackRate = playbackrate;
	sound_car.volume = volume;

	let volume_grass = 7*speed;
	if (volume_grass >= 0.7) volume_grass = 0.7;
	if (volume_grass <= 0.2) volume_grass = 0;
	if (player.position.y !== height) volume_grass = 0;

	if (height_get(player) <= sealevel+0.5)
	{
		sound_water.volume = volume_grass;
		sound_grass.volume = 0;
	}
	else
	{
		sound_grass.volume = volume_grass;
		sound_water.volume = 0;
	}

	// start car sound in freeroam and race
	if (cut % MODULUS_FREEROAM_OR_RACE === 0 && sound_car_is_playing === false)
	{
		sound_car.play();
		sound_grass.play();
		sound_water.play();
		sound_car_is_playing = true;
	}

	// stop car sound in cutscenes
	if (cut % MODULUS_FREEROAM_OR_RACE !== 0)
	{
		sound_car.pause();
		sound_car_is_playing = false;
	}

	// car landing sound
	if (player.position.y === height && inair)
	{
		let temp = (frame_counter-air_start)*0.008;
		if (temp > 0.4) temp = 0.4;
		if (temp < 0) temp = 0;
		sound_land.volume = temp;
		sound_land.play();
		inair = false;
	}
	if (player.position.y !== height && !inair)	// when in the air
	{
		air_start = frame_counter;
		inair = true;
	}

	// other characters
	// not added yet...
}

function dialog_set_metadata(at_object)
{
	// pause all sounds
	sound_adele.pause();
	sound_dark_gandalf.pause();
	sound_daddy.pause();
	sound_dogert.pause();
	sound_omalley.pause();
	//sound_harass.pause();
	//sound_disonesty.pause();
	//sound_mrs_superconductor.pause();
	//sound_polish_cow.pause();
	sound_epper.pause();

	//sound_turf.pause();
	//sound_nubbs.pause();

	if (at_object === shelf)				{ 									head = "C_shelf.png";				name = "Shelf"; }

	else if (at_object === sprite[CAR_ADELE])		{ if (sound_adele.paused === true)	{ sound_adele.play(); }		head = "C_adele_head.png";		name = "Adele"; }
	else if (at_object === sprite[CAR_DARK_GANDALF])	{ if (sound_dark_gandalf.paused === true){ sound_dark_gandalf.play(); }	head = "C_dg_head.png";			name = "Dark Gandalf"; }
	else if (at_object === sprite[CAR_DADDY])		{ if (sound_daddy.paused === true)	{ sound_daddy.play(); }		head = "C_daddy_head.png";		name = "Daddy"; }
	else if (at_object === sprite[CAR_DOGERT])		{ if (sound_dogert.paused === true)	{ sound_dogert.play(); }	head = "C_dogert_head.png";		name = "Dogert"; }
	else if (at_object === sprite[CAR_OMALLEY])		{ if (sound_omalley.paused === true)	{ sound_omalley.play(); }	head = "C_omalley_head.png";		name = "O'Malley"; }
	else if (at_object === sprite[CAR_HARASS])		{ if (sound_harass.paused === true)	{ sound_harass.play(); }	head = "C_harass_head.png";		name = "Hårass"; }
	else if (at_object === sprite[CAR_OMALLEY])		{ 									head = "C_disonesty_head.png";		name = "Disonesty"; }
	else if (at_object === sprite[CAR_MRS_SUPERCONDUCTOR])	{ 									head = "C_mrs_superconductor_head.png";	name = "Mrs Superconductor"; }
	else if (at_object === sprite[CAR_POLISH_COW])		{ 									head = "C_polish_cow_head.png";		name = "Polish Cow"; }
	else if (at_object === sprite[CAR_EPPER])		{ if (sound_epper.paused === true)	{ sound_epper.play(); }		head = "C_epper_head.png";		name = "'Epper"; }

	else if (at_object === sprite[CAR_TURF])		{ 									head = "sprite[CAR_TURF].png";		name = "Turf"; }
	else if (at_object === sprite[CAR_NUBBS])		{ 									head = "sprite[CAR_TURF].png";		name = "Nubbs"; }

	else							{									head = "head_standard.png";		name = ""; }
}

// cutscene dialog
function cut_pers(at_object, fdialog)
{
	// only do this once at the start of the dialog
	if (last_dialog !== fdialog)
	{
		if (cut >= 0)
		{
			dialog_set_metadata(at_object);								// play sound, set head image variable and name variable
			if (at_object !== shelf) camera.lookAt(at_object.position.x, at_object.position.y-0.15, at_object.position.z);	// look at character
			document.getElementById("dialog_head").src = "files/" + head;				// set head image in HTML document
			document.getElementById("dialog_name").innerHTML = name;				// set name in HTML document
			dialog = fdialog;									// set dialog text variable
		}
	}

	rolling_dialog();											// set dialog text in HTML document
}

// show dialog BETween cutscenes. dialog changes by timer
function bet_pers(at_object, fdialog)
{
	// only do this once at the start of the dialog
	if (last_dialog !== fdialog)
	{
	//	if (bet_started === true)
	//	{
			dialog_set_metadata(at_object);								// play sound, set head image variable and name variable
			document.getElementById("dialog_head").src = "files/" + head;				// set head image in HTML document
			document.getElementById("dialog_name").innerHTML = name;				// set name in HTML document
			dialog = fdialog;									// set dialog text variable
	//	}
	}

	rolling_dialog();											// set dialog text in HTML document
}

// rolling text in dialog
function rolling_dialog()
{
	if (dialog !== last_dialog) now_char = 0;

	if (now_char < dialog.length)
	{
		now_char += 2;
		document.getElementById("dialog_text").innerHTML = dialog.substring(0, now_char);
	}

	last_dialog = dialog;
}

// timescene functions
function ts_start()
{
	if (bet_started === false)
	{
		start_hour = get_time_by_minutes_resolution(15);
		bet_started = true;
	}
}

function ts_end(fcut)
{
	bet_started = false;
	cut = fcut;
}

function ts_during()
{
	q = (get_time_by_minutes_resolution(15)-start_hour);
	if (q < 0) q += 24;
}

function room_set(wall_texture, floor_texture)
{
	mesh_room_wall.material.map = loader.load("files/" + wall_texture)
	mesh_room_wall.material.needsUpdate = true;
	mesh_room_floor.material.map = loader.load("files/" + floor_texture)
	mesh_room_floor.material.needsUpdate = true;
}

function place_character_in_room(fobject, direction = 'n', height = 0, distance = 1.2)
{
	if (direction === 'n')		fobject.position.set(player.position.x + 0.2*distance, player.position.y+height+0.25, player.position.z + distance);
	else if (direction === 'ne')	fobject.position.set(player.position.x + 0.9*distance, player.position.y+height+0.25, player.position.z + 0.6*distance);
	else if (direction === 'e')	fobject.position.set(player.position.x + distance, player.position.y+height+0.25, player.position.z + 0.1*distance);
	else if (direction === 'se')	fobject.position.set(player.position.x + 0.9*distance, player.position.y+height+0.25, player.position.z - 0.5*distance);
	else if (direction === 's')	fobject.position.set(player.position.x + 0.2*distance, player.position.y+height+0.25, player.position.z - distance);
	else if (direction === 'sw')	fobject.position.set(player.position.x - 0.9*distance, player.position.y+height+0.25, player.position.z - 0.7*distance);
	else if (direction === 'w')	fobject.position.set(player.position.x - distance, player.position.y+height+0.25, player.position.z - 0.3*distance);
	else if (direction === 'nw')	fobject.position.set(player.position.x - 0.9*distance, player.position.y+height+0.25, player.position.z + 0.6*distance);
}

function layout_set()
{
	if (cut < 0 || frame_counter % 10 === 0)
	{
	if (mobile)
	{
		// portrait
		if (window.innerHeight > window.innerWidth)
		{
			document.getElementById("dialog_head").style = 
				"position: fixed; bottom: 38vh; left: 5vw; width: 36vw;\
				image-rendering: pixelated";

			document.getElementById("dialog_background").style = 
				"position: fixed; bottom: 26vh; left: 5vw; width: 87vw; height: 24vw;\
				display: block;\
				border: 1vw solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";

			document.getElementById("dialog_name").style = 
				"position: relative; left: 3%; width: 94%; line-height: 25%;\
				display: block;\
				font-size: 4.2vw; color: white; font-family: Lucida, monospace; text-align: left;";

			document.getElementById("dialog_text").style = 
				"position: relative; left: 3%; width: 94%;\
				display: block;\
				font-size: 3.6vw; color: #6DFA0F; font-family: Lucida, monospace; text-align: left; word-break: break-word;";

			document.getElementById("dvdmenu").style =
				"position: fixed; left: 5%; top: 25%; width: 25%;\
				display: block;";

			document.getElementById("button_pause").style =
				"position: fixed; top: 3vw; left: 3vw; width: 10vw; height: 10vw;\
				display: block; cursor: pointer;\
				border: 1vw solid; border-color: #2d41ff;\
				background: none;\
				font-size: 7vw; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";//#2d41ff;";

			document.getElementById("button_fullscreen").style = 
				"position: fixed; top: 3vw; right: 3vw; width: 6vw; height: 6vw;\
				display: block; cursor: pointer;\
				border: 1vw dashed; border-color: rgb(115, 32, 93);\
				background: none;";

			document.getElementById("button_left").style = 
				"visibility: visible;\
				position: fixed; bottom: 13vh; left: 5vw; width: 14vw; height: 7vh;\
				display: block;\
				border: 1vw solid; border-color: #2d41ff;\
				background: none;\
				font-size: 14vw; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_right").style = 
				"visibility: visible;\
				position: fixed; bottom: 10vh; left: 20vw; width: 14vw; height: 7vh;\
				display: block;\
				border: 1vw solid; border-color: #2d41ff;\
				background: none;\
				font-size: 14vw; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_down").style = 
				"visibility: visible;\
				position: fixed; bottom: 6vh; right: 17vw; width: 12vw; height: 6vh;\
				display: block;\
				border: 1vw solid; border-color: red;\
				background: none;\
				font-size: 6vw; color: red; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_up").style = 
				"visibility: visible;\
				position: fixed; bottom: 14vh; right: 6vw; width: 16vw; height: 8vh;\
				display: block;\
				border: 1vw solid; border-color: #6DFA0F;\
				background: none;\
				font-size: 19vw; color: #6DFA0F; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("credits_background").style = 
				"position: fixed; top: 10vh; left: 14vw; width: 72vw; height: 48vw;\
				display: block;\
				border: 1vw solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";

			document.getElementById("credits_text").style = 
				"position: relative; top: 2vw; left: 50%; transform: translate(-50%, 0%); width: 68vw;\
				display: block;\
				font-size: 3.6vw; color: white; font-family: Lucida, monospace; text-align: center;";

			document.getElementById("save_text").style = 
				"position: relative; top: 3.2vw; left: 50%; transform: translate(-50%, 0%); width: 68vw;\
				display: block;\
				font-size: 3.6vw; color: #6DFA0F; font-family: Lucida, monospace; text-align: center;";

			document.getElementById("button_continue").style = 
				"position: fixed; top: 35vh; left: 9vw; width: 82vw;\
				display: block; cursor: pointer;";

			document.getElementById("button_play").style = 
				"position: fixed; top: 35vh; left: 20vw; width: 60vw;\
				display: block; cursor: pointer;";
		}
		// landscape
		else
		{
			document.getElementById("dialog_head").style = 
				"position: fixed; bottom: 0%; left: 7vw;";

			document.getElementById("dialog_background").style = 
				"position: fixed; top: 5vh; left: 30vw; width: 40vw; height: 12vw;\
				display: block;\
				border: 0.5vw solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";

			document.getElementById("dialog_name").style = 
				"position: relative; left: 3%; width: 94%; line-height: 25%;\
				display: block;\
				font-size: 2.1vw; color: white; font-family: Lucida, monospace; text-align: left;";

			document.getElementById("dialog_text").style = 
				"position: relative; left: 3%; width: 94%;\
				display: block;\
				font-size: 1.8vw; color: #6DFA0F; font-family: Lucida, monospace; text-align: left; word-break: break-word;";

			document.getElementById("dvdmenu").style =
				"position: fixed; left: 5%; top: 25%; width: 25%;\
				display: block;";

			document.getElementById("button_pause").style =
				"position: fixed; top: 2vw; left: 2vw; width: 5vw; height: 5vw;\
				display: block; cursor: pointer;\
				border: 0.5vw solid; border-color: #2d41ff;\
				background: none;\
				font-size: 3.5vw; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";//#2d41ff;";

			document.getElementById("button_fullscreen").style = 
				"position: fixed; top: 2vw; right: 2vw; width: 3vw; height: 3vw;\
				display: block; cursor: pointer;\
				border: 0.5vw dashed; border-color: rgb(115, 32, 93);\
				background: none;";

			document.getElementById("button_left").style = 
				"visibility: visible;\
				position: fixed; bottom: 16%; left: 7%; width: 9vw; height: 9vw;\
				display: block;\
				border: 0.5vw solid; border-color: #2d41ff;\
				background: none;\
				font-size: 12vw; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_right").style = 
				"visibility: visible;\
				position: fixed; bottom: 8%; left: 17%; width: 9vw; height: 9vw;\
				display: block;\
				border: 0.5vw solid; border-color: #2d41ff;\
				background: none;\
				font-size: 12vw; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_down").style = 
				"visibility: visible;\
				position: fixed; bottom: 7%; right: 20%; width: 8vw; height: 8vw;\
				display: block;\
				border: 0.5vw solid; border-color: red;\
				background: none;\
				font-size: 5vw; color: red; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_up").style = 
				"visibility: visible;\
				position: fixed; bottom: 17%; right: 7%; width: 10vw; height: 10vw;\
				display: block;\
				border: 0.5vw solid; border-color: #6DFA0F;\
				background: none;\
				font-size: 16vw; color: #6DFA0F; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("credits_background").style = 
				"position: fixed; top: 14vh; left: 34vw; width: 32vw; height: 23vw;\
				display: block;\
				border: 0.5vw solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.9);";

			document.getElementById("credits_text").style = 
				"position: relative; top: 1vw; left: 50%; transform: translate(-50%, 0%); width: 30vw;\
				display: block;\
				font-size: 1.8vw; color: white; font-family: Lucida, monospace; text-align: center;";

			document.getElementById("save_text").style = 
				"position: relative; top: 2.2vw; left: 50%; transform: translate(-50%, 0%); width: 30vw;\
				display: block;\
				font-size: 1.8vw; color: #6DFA0F; font-family: Lucida, monospace; text-align: center;";

			document.getElementById("button_continue").style = 
				"position: fixed; bottom: 0vh; left: 29.5vw; width: 41vw;\
				display: block; cursor: pointer;";

			document.getElementById("button_play").style = 
				"position: fixed; bottom: 0vh; left: 35vw; width: 30vw;\
				display: block; cursor: pointer;";
		}
	}
	// desktop
	else
	{
		// portrait
		if (window.innerHeight > window.innerWidth)
		{
			document.getElementById("dialog_head").style = 
				"position: fixed; bottom: 25vh; left: 7vw; width: 30vw;\
				image-rendering: pixelated";

			document.getElementById("button_pause").style =
				"position: fixed; top: 2vw; left: 2vw; width: 5vw; height: 5vw;\
				display: block; cursor: pointer;\
				border: 0.5vw solid; border-color: #2d41ff;\
				background: none;\
				font-size: 3.5vw; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";//#2d41ff;";

			document.getElementById("button_fullscreen").style = 
				"position: fixed; top: 2vw; right: 2vw; width: 3vw; height: 3vw;\
				display: block; cursor: pointer;\
				border: 0.5vw dashed; border-color: rgb(115, 32, 93);\
				background: none;";

			document.getElementById("button_left").style.visibility = "hidden";
			document.getElementById("button_right").style.visibility = "hidden";
			document.getElementById("button_down").style.visibility = "hidden";
			document.getElementById("button_up").style.visibility = "hidden";
		}
		// landscape
		else
		{
			document.getElementById("dialog_head").style = 
				"position: fixed; bottom: 12vw; left: 12vw; width: 18vw;\
				image-rendering: pixelated;";

			document.getElementById("dialog_background").style = 
				"position: fixed; bottom: 2vh; left: 12vw; width: 74vw; height: 10vw;\
				display: block;\
				border: 0.5vw solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";

			document.getElementById("dialog_name").style = 
				"position: relative; left: 3%; width: 94%; line-height: 25%;\
				display: block;\
				font-size: 1.9vw; color: white; font-family: Lucida, monospace; text-align: left;";

			document.getElementById("dialog_text").style = 
				"position: relative; left: 3%; width: 94%;\
				display: block;\
				font-size: 1.5vw; color: #6DFA0F; font-family: Lucida, monospace; text-align: left; word-break: break-word;";

			document.getElementById("dvdmenu").style =
				"position: fixed; left: 5%; top: 25%; width: 25%;\
				display: block;";
 
			document.getElementById("button_pause").style =
				"position: fixed; top: 1.5vw; left: 1.5vw; width: 3.33vw; height: 3.33vw;\
				display: block; cursor: pointer;\
				border: 0.375vw solid; border-color: #2d41ff;\
				background: none;\
				font-size: 2.33vw; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";//#2d41ff;";

			document.getElementById("button_fullscreen").style = 
				"position: fixed; top: 1.5vw; right: 1.5vw; width: 2vw; height: 2vw;\
				display: block; cursor: pointer;\
				border: 0.375vw dashed; border-color: rgb(115, 32, 93);\
				background: none;";

			document.getElementById("button_left").style.visibility = "hidden";
			document.getElementById("button_right").style.visibility = "hidden";
			document.getElementById("button_down").style.visibility = "hidden";
			document.getElementById("button_up").style.visibility = "hidden";

			document.getElementById("credits_background").style = 
				"position: fixed; top: 11vh; left: 36vw; width: 28vw; height: 24vw;\
				display: block;\
				border: 0.5vw solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.9);";

			document.getElementById("credits_image").style = 
				"position: relative; top: 1vw; left: 50% transform: translate(-50%, 0%); width: 24vw;\
				display: block;";

			document.getElementById("credits_text").style = 
				"position: relative; top: 1.4vw; left: 50%; transform: translate(-50%, 0%); width: 24vw;\
				display: block;\
				font-size: 1.5vw; color: white; font-family: Lucida, monospace; text-align: center;";

			document.getElementById("save_text").style = 
				"position: relative; top: 2.2vw; left: 50%; transform: translate(-50%, 0%); width: 24vw;\
				display: block;\
				font-size: 1.5vw; color: #6DFA0F; font-family: Lucida, monospace; text-align: center;";

			document.getElementById("button_continue").style = 
				"position: fixed; bottom: 0vh; left: 29.5vw; width: 41vw;\
				display: block; cursor: pointer;";

			document.getElementById("button_play").style = 
				"position: fixed; bottom: 0vh; left: 35vw; width: 30vw;\
				display: block; cursor: pointer;";
		}
	}
	}

	// hide things because of pause, splash, etc
	if (cut >= 0)
	{
		document.getElementById("dvdmenu").style.visibility = "hidden";
		document.getElementById("button_pause").style.visibility = "visible";
		document.getElementById("credits_background").style.visibility = "hidden";
		document.getElementById("button_continue").style.visibility = "hidden";
		document.getElementById("button_play").style.visibility = "hidden";
	}
	else if (cut === CUT_PAUSEMENU)
	{
		document.getElementById("dvdmenu").style.visibility = "visible";
		document.getElementById("button_pause").style.visibility = "visible";
		document.getElementById("credits_background").style.visibility = "visible";
		document.getElementById("button_continue").style.visibility = "visible";
		document.getElementById("button_play").style.visibility = "hidden";
	}
	else if (cut === CUT_SPLASHSCREEN_WAIT)
	{
		document.getElementById("dvdmenu").style.visibility = "hidden";
		document.getElementById("button_pause").style.visibility = "hidden";
		document.getElementById("credits_background").style.visibility = "hidden";
		document.getElementById("button_continue").style.visibility = "hidden";
		document.getElementById("button_play").style.visibility = "hidden";
	}
	else
	{
		document.getElementById("dvdmenu").style.visibility = "hidden";
		document.getElementById("button_pause").style.visibility = "visible";
		document.getElementById("credits_background").style.visibility = "hidden";

		// if cookies (progress saved) exist
		if (document.cookie.search("cut=") !== -1)
		{
			document.getElementById("button_continue").style.visibility = "visible";
			document.getElementById("button_play").style.visibility = "hidden";
		}
		// if not
		else
		{
			document.getElementById("button_continue").style.visibility = "hidden";
			document.getElementById("button_play").style.visibility = "visible";
		}
	}

	// hide things because of dialog (and pause menu...))
	if (dialog === "" || cut < 0) document.getElementById("dialog_background").style.visibility = "hidden";
	else document.getElementById("dialog_background").style.visibility = "visible";

	// hide things because of cuts
	if (cut === CUT_FREEROAM_CARCHASE) document.getElementById("backspegel").style.visibility = "visible";
	else document.getElementById("backspegel").style.visibility = "hidden";
}

function camera_set()
{
	if (cut < 0 || frame_counter % 10 === 0)
	{
	if (mobile)
	{
		renderer.setPixelRatio(window.devicePixelRatio*0.3);
		renderer_backspegel.setPixelRatio(window.devicePixelRatio*0.1);
		renderer_daddycamera.setPixelRatio(window.devicePixelRatio*0.1);
	}
	else
	{
		renderer.setPixelRatio(window.devicePixelRatio*0.5);
		renderer_backspegel.setPixelRatio(window.devicePixelRatio*0.5);
		renderer_daddycamera.setPixelRatio(window.devicePixelRatio*0.5);
	}
	if (window.innerHeight > window.innerWidth)
	{
		camera.aspect = window.innerWidth/(window.innerHeight*0.55);
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight*0.55);
	}
	else
	{
		camera.aspect = window.innerWidth/window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	renderer_backspegel.setSize(div_backspegel.offsetWidth, div_backspegel.offsetHeight);
	renderer_daddycamera.setSize(div_daddycamera.offsetWidth, div_daddycamera.offsetHeight);
	}

	// SPLASH SCREEN
	if (cut < 0)
	{
		camera = camera_splashscreen;

		if (splashscreen_started === false)
		{
			camera.rotation.y = Math.PI*0.7;
			splashscreen_started = true;
		}

		if (cut === CUT_SPLASHSCREEN_WAIT)
		{
			camera.translateZ(-0.2);
			camera.rotation.x -= 0.005;
			camera.rotation.y -= 0.01;
			camera.rotation.z += 0.01;
		}
		else
		{
			camera.position.set(player.position.x, height_get(camera)+5, player.position.z);
			camera.rotation.set(0, camera.rotation.y, 0);
		}

		if (cut < CUT_SPLASHSCREEN_WAIT)
		{
			camera.rotation.y += 0.001;
		}
	}

	// FREEROAM OR RACE
	else if (cut >= 0 && cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		camera = camera_main;

		let camera_distance_from_player = 2.5;

		camera.rotation.x = 0;					// comment for map
		camera.rotation.z = 0;					// comment for map
		camera.rotation.y = player.rotation.y + Math.PI;	// comment for map

		let realrot = player.rotation.y - (2*Math.PI)*Math.floor(player.rotation.y/(2*Math.PI));

		camera_strive_x = player.position.x - camera_distance_from_player*(Math.cos(Math.PI*0.5-realrot));
		camera_strive_z = player.position.z - camera_distance_from_player*(Math.sin(Math.PI*0.5-realrot));

		let strive_dist_x = camera.position.x-camera_strive_x;
		let strive_dist_z = camera.position.z-camera_strive_z;
		if (camera.position.x-camera_strive_x < -0.01) camera.position.x -= 0.2*strive_dist_x;
		if (camera.position.x-camera_strive_x > 0.01) camera.position.x -= 0.2*strive_dist_x;
		if (camera.position.z-camera_strive_z < -0.01) camera.position.z -= 0.2*strive_dist_z;
		if (camera.position.z-camera_strive_z > 0.01) camera.position.z -= 0.2*strive_dist_z;

		camera_strive_y = player.position.y+1;
		let strive_dist_y = camera.position.y-camera_strive_y;
		if (camera.position.y-camera_strive_y < -0.01) camera.position.y -= 0.34*strive_dist_y;		// comment for map
		if (camera.position.y-camera_strive_y > 0.01) camera.position.y -= 0.34*strive_dist_y;		// comment for map

		if (distance_get(camera, player) > 5) camera.position.set(camera_strive_x, camera_strive_y, camera_strive_z);

		camera_backspegel.position.set(player.position.x, player.position.y+0.5, player.position.z);
	//	camera_backspegel.position.set(character[CAR_TURF].position.x, character[CAR_TURF].position.y, character[CAR_TURF].position.z);
		camera_backspegel.rotation.set(player.rotation.x, player.rotation.y, player.rotation.z);

		camera_daddycamera.position.set(sprite[CAR_DADDY].position.x, sprite[CAR_DADDY].position.y, sprite[CAR_DADDY].position.z);
		camera_daddycamera.rotation.set(character[1].rotation.x, character[1].rotation.y+Math.PI, character[1].rotation.z);	// daddy är kanske inte alltid character[1]!!
	}

	// CUTSCENES
	else
	{
		camera = camera_cutscene;
		camera.position.set(player.position.x, player.position.y+0.5, player.position.z);
	}
}

function light_set()
{
	if (cut === CUT_FREEROAM_INTRO)
	{
		light.intensity = Math.sin(24*Math.PI*frame_counter/FRAMES_PER_DAY)+0.33;

		let light_red = 10*Math.sin(24*Math.PI*frame_counter/FRAMES_PER_DAY)+0.33
		let light_green = 10*Math.sin(17*Math.PI*frame_counter/FRAMES_PER_DAY)+0.33
		let light_blue = 10*Math.sin(31*Math.PI*frame_counter/FRAMES_PER_DAY)+0.33
		let light_color = new THREE.Color(light_red, light_green, light_blue);
		light.color.set(light_color);
	}
	// all other cut's
	else
	{
		// day/night
		if (cut !== CUT_FREEROAM_DARK) light.intensity = 0.5*(Math.sin(Math.PI*frame_counter/FRAMES_PER_DAY)) + 0.5 + 0.33;

		// sunset
		let light_red = 0xFF;
		let light_green = 0x7F + 0xFF * 0.5 * Math.sin(Math.PI*frame_counter/FRAMES_PER_DAY+0.2);
		let light_blue = 0x7F + 0xFF * 0.5 * Math.sin(Math.PI*frame_counter/FRAMES_PER_DAY+0.2);
		let light_color = new THREE.Color(light_red/255, light_green/255, light_blue/255);
		light.color.set(light_color);
	}
}

function fog_set()
{
	if (cut === CUT_FREEROAM_INTRO)
	{
		scene.fog.color = col_red;
		scene.fog.far = 50;
	}
	// all other cut's
	else
	{
		// epper bridge and epper land
		if ((current_chunk_x >= 33-1 && current_chunk_x <= 39+1) && (current_chunk_z >= 33-1 && current_chunk_z <= 35+1))
		{
			scene.fog.color = col_blue;

			if (current_chunk_x === 33-1 || current_chunk_x === 39+1 || current_chunk_z === 33-1 || current_chunk_z === 35+1)
			{
				// 49 is chunkwidth-1. fade in fog
				scene.fog.far = 50;
				if (current_chunk_x === 33-1) scene.fog.far += (9*(49-x_to_x_in_chunk(player.position.x)));
				if (current_chunk_x === 39+1) scene.fog.far += (9*x_to_x_in_chunk(player.position.x));
				if (current_chunk_z === 33-1) scene.fog.far += (9*(49-x_to_x_in_chunk(player.position.z)));
				if (current_chunk_z === 35+1) scene.fog.far += (9*x_to_x_in_chunk(player.position.z));
			}
			else scene.fog.far = 50;
		}
		// haftlan-drakh
		else if ((current_chunk_x >= 36-1 && current_chunk_x <= 39+1) && (current_chunk_z >= 36+1 && current_chunk_z <= 41+1))
		{
			scene.fog.color = col_black;

			if (current_chunk_x === 36-1 || current_chunk_x === 39+1 || current_chunk_z === 36+1 || current_chunk_z === 41+1)
			{
				// 49 is chunkwidth-1. fade in fog
				scene.fog.far = 50;
				if (current_chunk_x === 36-1) scene.fog.far += (9*(49-x_to_x_in_chunk(player.position.x)));
				if (current_chunk_x === 39+1) scene.fog.far += (9*x_to_x_in_chunk(player.position.x));
				if (current_chunk_z === 36+1) scene.fog.far += (9*(49-x_to_x_in_chunk(player.position.z)));
				if (current_chunk_z === 41+1) scene.fog.far += (9*x_to_x_in_chunk(player.position.z));
			}
			else scene.fog.far = 50;
		}
		// all other places
		else
		{
			scene.fog.color = col_white;
			scene.fog.far = 800;
		}
	}
}

function music_play(file, fvolume = 1, floop = true)
{
//	if (source !== undefined) source.stop();
	if (audiocontext !== undefined) audiocontext.suspend();

	if (file !== "")
	{
		audiocontext = new AudioContext();

		let gainnode = audiocontext.createGain();

		const url = "files/" + file;
		const request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';

		request.onload = function()
		{
			audiocontext.decodeAudioData(request.response, function(buffer)
			{
				source = audiocontext.createBufferSource();
				source.buffer = buffer;
				source.loop = floop;
				source.connect(audiocontext.destination);
				source.connect(gainnode);
				gainnode.connect(audiocontext.destination);
				gainnode.gain.value = fvolume;
				source.start(0);
			});
		};

		request.send();
	}
}

function chunk_set()
{
	// tänd dessa enbart i vissa chunks!!
	sprite_laundryroom.visible = true;
	sprite_laundryroom.position.set(laundryroom_position_x, height_get(sprite_laundryroom), laundryroom_position_z);

	sprite_epperhouse.visible = true;
	sprite_epperhouse.position.set(epperhouse_position_x, height_get(sprite_epperhouse), epperhouse_position_z);

	sprite_auction.visible = true;
	sprite_auction.position.set(auction_position_x, height_get(sprite_auction), auction_position_z);

	if (current_chunk_x === 32 && current_chunk_z === 38)
	{
		// dessa kommer ta en massa drawcalls!!?
		sprite_gym_thing_1.visible = true;
		sprite_gym_thing_2.visible = true;
		sprite_gym_thing_2B.visible = true;
		sprite_gym_thing_2C.visible = true;
		sprite_gym_thing_2D.visible = true;
		sprite_gym_thing_2E.visible = true;
		sprite_gym_thing_2F.visible = true;
		sprite_gym_thing_2G.visible = true;
		sprite_gym_thing_1_trash.visible = true;
		sprite_gym_thing_2_trash.visible = true;
		sprite_gym_thing_2B_trash.visible = true;
		sprite_gym_thing_2C_trash.visible = true;
		sprite_gym_thing_2D_trash.visible = true;
		sprite_gym_thing_2E_trash.visible = true;
		sprite_gym_thing_2F_trash.visible = true;
		sprite_gym_thing_2G_trash.visible = true;

		sprite_gym_thing_1.position.set(gameplay_gym_position_x, height_get(sprite_gym_thing_1), gameplay_gym_position_z+1);
		sprite_gym_thing_2.position.set(gameplay_gym_position_x, height_get(sprite_gym_thing_2), gameplay_gym_position_z+2);
		sprite_gym_thing_2B.position.set(gameplay_gym_position_x+3, height_get(sprite_gym_thing_2), gameplay_gym_position_z-3);
		sprite_gym_thing_2C.position.set(gameplay_gym_position_x+3, height_get(sprite_gym_thing_2), gameplay_gym_position_z-1);
		sprite_gym_thing_2D.position.set(gameplay_gym_position_x+3, height_get(sprite_gym_thing_2), gameplay_gym_position_z+1);
		sprite_gym_thing_2E.position.set(gameplay_gym_position_x+6, height_get(sprite_gym_thing_2), gameplay_gym_position_z-3);
		sprite_gym_thing_2F.position.set(gameplay_gym_position_x+6, height_get(sprite_gym_thing_2), gameplay_gym_position_z-1);
		sprite_gym_thing_2G.position.set(gameplay_gym_position_x+6, height_get(sprite_gym_thing_2), gameplay_gym_position_z+1);

		// boende
		character_turned_on[CAR_DISONESTY] = 1;		// den här stängs av när cut byts va? lite ologiskt men bör funka, då återställs alla character's !!

		if (cut !== lastcut)
		{
			character[CAR_DISONESTY].position.x = 1486;
			character[CAR_DISONESTY].position.x = 1434;

			character_goal_x[CAR_DISONESTY] = 1486+40*Math.random()-0.5;
			character_goal_z[CAR_DISONESTY] = 1434+40*Math.random()-0.5;
		}

		if (distance_get_xz(character[CAR_DISONESTY].position.x,character[CAR_DISONESTY].position.z, character_goal_x[CAR_DISONESTY],character_goal_z[CAR_DISONESTY]) < 2)
		{
			character_goal_x[CAR_DISONESTY] = 1486+40*Math.random()-0.5;
			character_goal_z[CAR_DISONESTY] = 1434+40*Math.random()-0.5;
		}
	}
}

function cut_set()
{
	if (cut == CUT_SPLASHSCREEN)
	{
		light_intro.position.set(camera.position.x, camera.position.y, camera.position.z);
		light_intro.intensity = 3;

		sprite_intro_a.visible = true;
		sprite_intro_b.visible = true;
		sprite_intro_c.visible = true;
		sprite_intro_d.visible = true;
		mesh_logo.visible = true;
		mesh_logo_text.visible = true;
		mesh_logo_text2.visible = true;
		mesh_logo_string.visible = true;

		sprite_intro_a.position.set(camera.position.x-1, camera.position.y+0.5, camera.position.z+5);
		sprite_intro_b.position.set(camera.position.x-1, camera.position.y+0.5, camera.position.z+5);
		sprite_intro_c.position.set(camera.position.x-1, camera.position.y+0.5, camera.position.z+5);
		sprite_intro_d.position.set(camera.position.x-1, camera.position.y+0.5, camera.position.z+5);

		sprite_intro_a.rotation.x += 0.01;
		sprite_intro_a.rotation.y += 0.01;
		sprite_intro_a.rotation.z += 0.01;
		sprite_intro_a.translateX(1);
		sprite_intro_a.translateY(1);
		sprite_intro_a.translateZ(1);

		sprite_intro_b.rotation.x += 0.01;
		sprite_intro_b.rotation.y -= 0.01;
		sprite_intro_b.rotation.z += 0.01;
		sprite_intro_b.translateX(0.8);
		sprite_intro_b.translateY(0.8);
		sprite_intro_b.translateZ(0.8);

		sprite_intro_c.rotation.x += 0.01;
		sprite_intro_c.rotation.y -= 0.01;
		sprite_intro_c.rotation.z -= 0.01;
		sprite_intro_c.translateX(1.2);
		sprite_intro_c.translateY(1.2);
		sprite_intro_c.translateZ(1.2);

		sprite_intro_d.rotation.x -= 0.01;
		sprite_intro_d.rotation.y += 0.01;
		sprite_intro_d.rotation.z += 0.01;
		sprite_intro_d.translateX(1.1);
		sprite_intro_d.translateY(1.1);
		sprite_intro_d.translateZ(1.1);

		mesh_logo.position.set(camera.position.x-1, camera.position.y+0.5, camera.position.z+5);
		mesh_logo.rotation.y += 0.007;
		material_logo.opacity = 0.5*(Math.sin(Math.PI*frame_counter/FRAMES_PER_DAY)) + 0.5
		mesh_logo_string.position.set(camera.position.x-1, camera.position.y+3, camera.position.z+5);
	}
	else
	{
		light_intro.intensity = 0;

		sprite_intro_a.visible = false;
		sprite_intro_b.visible = false;
		sprite_intro_c.visible = false;
		sprite_intro_d.visible = false;
		mesh_logo.visible = false;
		mesh_logo_text.visible = false;
		mesh_logo_text2.visible = false;
		mesh_logo_string.visible = false;
	}

	if (cut === CUT_SPLASHSCREEN_WAIT)
	{
		if (performance.now()-splashscreen_click_starttime > 1700)
		{
			// get cut from URL
			var cookie_cut = parseInt(new URLSearchParams(window.location.search).get('cut'));
			if (cookie_cut >= 0)
			{
				ts_end(cookie_cut);

				music_play("morning_birds.mp3", 0.17);	// ska denna verkligen ALLTID spelas?!!
			}
			// get cut from cookies
			else if (document.cookie.search("cut=") !== -1)
			{
				let kaka_cut1 = document.cookie.split("cut=");
				let kaka_cut2 = kaka_cut1[1].split(";");
				ts_end(parseInt(kaka_cut2[0]));

				music_play("morning_birds.mp3", 0.17);
			}

			// cut if the first time playing
			else
			{
				ts_end(CUT_FREEROAM_INTRO);

				player.position.x = 1474;
				player.position.z = 1883;
				player.rotation.y = 1*Math.PI;
			}
		}
		else if (performance.now()-splashscreen_click_starttime > 1400)
		{
			scene.fog.color = new THREE.Color(0x000000);
		//	scene.fog.near = 0;
		//	scene.fog.far = 0;
		//	cube_black.visible = true;
		}
		else
		{
			sound_carstart.play();
		}
	}

	// RACE ONLY
	if (cut % MODULUS_FREEROAM_OR_RACE === 0 && cut % MODULUS_FREEROAM_ONLY !== 0)
	{
		// cut-lista?
		if (cut === CUT_RACE_1)
		{
			race_number = 0;

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;
			character_turned_on[CAR_ADELE] = 1;
			character_turned_on[CAR_DARK_GANDALF] = 1;
			character_turned_on[CAR_DOGERT] = 1;

			if (distance_get(player, sprite_energydrink) < COLLISION_DISTANCE) { turbo_timer = TURBO_TIMER; sound_laser.play(); }	// kommer den här spelas många gånger nu? låt bli!!

			if (current_chunk_x === 33 && current_chunk_z === 38) sprite_energydrink.position.set(1657, height_get(sprite_energydrink), 1863);
			else if (current_chunk_x === 32 && current_chunk_z === 35) sprite_energydrink.position.set(1587, height_get(sprite_energydrink), 1738);
		}
		else if (cut === CUT_RACE_EPPER)
		{
			race_number = 3;

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;
			character_turned_on[CAR_DADDY] = 1;
			character_turned_on[CAR_EPPER] = 1;
			character_turned_on[CAR_OMALLEY] = 1;
		}
		else
		{
			race_number = 0;
		}

		// from position_set():
		// PLAYER: see which part step of the checkpoints that you're closest too
		let player_progress = 0;
		if (player_lap >= 1)
		{
			let closest_step = 0, closest_step_dist = 99999;
			for (let t = 0; t < checkstep_x[race_number].length; t++)
			{
				let step_dist = distance_get_xz(checkstep_x[race_number][t], checkstep_z[race_number][t], player.position.x, player.position.z);
				if (step_dist < closest_step_dist) { closest_step_dist = step_dist; closest_step = t; }
			}
			player_progress = (player_lap-1)*100+closest_step;

			// sort placements in race
			if (player_progress > place_progress[0])
			{
				place_progress[0] = player_progress;
				place[0] = PLAYER;
			}
		}

		// CAR CHARACTERS: !! this is also in move_car()!?
		for (let t = 0; t < NUMBER_OF_CARS; t++)
		{
			if (character_turned_on[t] === 1)
			{
				if (character_lap[t] >= 1)
				{
					let closest_step = 0; let closest_step_dist = 99999;
					for (let t2 = 0; t2 < checkstep_x[race_number].length; t2++)
					{
						let step_dist = distance_get_xz(checkstep_x[race_number][t2], checkstep_z[race_number][t2], player.position.x, player.position.z);
						if (step_dist < closest_step_dist) { closest_step_dist = step_dist; closest_step = t2; }
					}
					character_progress[t] = (character_lap[t])*100+closest_step;

					// sort placements in race
					if (character_progress[t] > place_progress[0])
					{
						place_progress[0] = character_progress[t];
						place[0] = t;
					}
				}
			}
		}

		// finish checkpoint
		mesh_checkpoint_finish.position.set(mesh_checkpoint[race_number][mesh_checkpoint[race_number].length-1].position.x, mesh_checkpoint[race_number][mesh_checkpoint[race_number].length-1].position.y, mesh_checkpoint[race_number][mesh_checkpoint[race_number].length-1].position.z);

	if (race_state === RACE_DURING)	// flytta ihop med resten?!!
	{
		// PLAYER: if close to checkpoint, go to next checkpoint (do this for each character
		if (distance_get(player, mesh_checkpoint[race_number][player_lap]) < 8)
		{
			if (player_lap > mesh_checkpoint[race_number].length) player_lap = 0;	// VINST!
			player_lap++;
			if (player_lap < mesh_checkpoint[race_number].length-16 && player_lap % 16 === 0)
			{
				mesh_checkpoint_current.position.x = mesh_checkpoint[race_number][player_lap+16].position.x;
				mesh_checkpoint_current.position.z = mesh_checkpoint[race_number][player_lap+16].position.z;
 				mesh_checkpoint_current.position.y = height_get(mesh_checkpoint_current)+3;//2*Math.ceil(0.5*(player.position.y+4));
				sound_checkpoint.play();
			}
		}

		// CAR CHARACTER:
		for (let t = 0; t < NUMBER_OF_CARS; t++)
		{
			if (character_turned_on[t] === 1)
			{
				if (character_race_state[t] !== RACE_AFTER)
				{
					if (distance_get(character[t], mesh_checkpoint[race_number][character_lap[t]]) < 8)
					{
						if (character_lap[t] > mesh_checkpoint[race_number].length) character_lap[t] = 0;	// VINST!
						character_lap[t]++;
					}

					if (character_lap[t] < mesh_checkpoint[race_number].length)
					{
						character_goal_x[t] = mesh_checkpoint[race_number][character_lap[t]].position.x;
						character_goal_z[t] = mesh_checkpoint[race_number][character_lap[t]].position.z;
					}
				}
			}
		}
	}

	if (race_state === RACE_BEFORE || race_state === RACE_AFTER)
	{
		mesh_checkpoint_current.position.set(mesh_checkpoint[race_number][0].position.x, mesh_checkpoint[race_number][0].position.y, mesh_checkpoint[race_number][0].position.z);
	}

		// before race
		if (race_state === RACE_BEFORE)
		{
			if (distance_get(player, mesh_checkpoint[race_number][0]) < 3)
			{
				player_race_state = RACE_COUNTDOWN;
				player.position.x = mesh_checkpoint[race_number][0].position.x - (-3)*2;
				player.position.z = mesh_checkpoint[race_number][0].position.z;
			}
			for (let t = 0; t < NUMBER_OF_CARS; t++)
			{
				if (character_turned_on[t] === 1)
				{
					character_race_state[t] = RACE_COUNTDOWN;
					character[t].position.x = mesh_checkpoint[race_number][0].position.x - (t-2)*2;
					character[t].position.z = mesh_checkpoint[race_number][0].position.z;// - (t-2)*2;
				}
			}
			if (player_race_state === RACE_COUNTDOWN)
			{
				race_state = RACE_COUNTDOWN;
				sound_checkpoint.play();
				player.rotation.y = lookat_datass(player, mesh_checkpoint[race_number][16]);
				race_just = 1;		// do next thing only once
			}
		}
		// countdown
		else if (race_state === RACE_COUNTDOWN)
		{
			music_play("");

			// do only in start of countdown!!
			// this is ts_end
			bet_started = false;

			player.position.x = mesh_checkpoint[race_number][0].position.x - (-3)*2;
			player.position.z = mesh_checkpoint[race_number][0].position.z;

			for (let t = 0; t < NUMBER_OF_CARS; t++)
			{
				if (character_turned_on[t] === 1)
				{
					character[t].position.x = mesh_checkpoint[race_number][0].position.x - (t-2)*2;
					character[t].position.z = mesh_checkpoint[race_number][0].position.z;// - (t-2)*2;
				}
			}

			if (race_just === 1)
			{
			//	player.lookAt(mesh_checkpoint[race_number][8].position.x, player.position.y, mesh_checkpoint[race_number][8].position.z);
				countdown_start = frame_counter;
				race_just = 0;
			}
			if (frame_counter-countdown_start === 60) {	cut_pers(sprite[CAR_DOGERT],		"3."); sound_countdown.play(); }
			else if (frame_counter-countdown_start === 120)	cut_pers(sprite[CAR_DOGERT],		"2.");
			else if (frame_counter-countdown_start === 180)	cut_pers(sprite[CAR_DOGERT],		"1.");
			else if (frame_counter-countdown_start === 240)
			{
				cut_pers(sprite[CAR_DOGERT],		"");
				race_state = RACE_DURING;

				player_race_state = RACE_DURING;
				for (let t = 0; t < NUMBER_OF_CARS; t++) character_race_state[t] = RACE_DURING;
			}
		}
		// during race
		else if (race_state === RACE_DURING)
		{
			// cut-lista
			if (cut === CUT_RACE_1)
			{
				if (race_1_started_during === false)
				{
					sound_explosion2.play();
					music_play("theme_race.mp3", 0.6);

					race_1_started_during = true;
				}
			}
			else if (cut === CUT_RACE_EPPER)
			{
				if (race_epper_started_during === false)
				{
					sound_explosion2.play();
					music_play("theme_race2.mp3", 0.67);

					race_epper_started_during = true;
				}
			}

			// ta bort character_lap = 0?
			if (player_lap >= mesh_checkpoint[race_number].length || distance_get(player, mesh_checkpoint[race_number][mesh_checkpoint[race_number].length-1]) < 5)
			{
				player_race_state = RACE_AFTER;
				player_lap = 0;
				winner = SOMEONE_HAS_WON;	// this only means that someone has won. actual winner is in character_leader
				for (let t = 0; t < NUMBER_OF_CARS; t++)
				{
					if (character_turned_on[t] === 1) character_lap[t] = mesh_checkpoint[race_number].length;		// make all characters arrive directly at goal if player is first
				}
			}
			for (let t = 0; t < NUMBER_OF_CARS; t++)
			{
				if (character_turned_on[t] === 1)
				{
					if (character_lap[t] >= mesh_checkpoint[race_number].length)
					{
						character_race_state[t] = 3;
						character_lap[t] = 0;
						character[t].position.x = mesh_checkpoint[race_number][mesh_checkpoint[race_number].length-1].position.x;
						character[t].position.z = mesh_checkpoint[race_number][mesh_checkpoint[race_number].length-1].position.z - (t+1)*2;
						character[t].position.y = height_get(character[t]);
						winner = SOMEONE_HAS_WON;
					}
				}
			}

			if (player_race_state === RACE_AFTER) race_state = RACE_AFTER;
		}
		// after race (winning ceremonery)
		else if (race_state === RACE_AFTER)
		{
			if (race_1_started_after === false)
			{
				music_play("music_cute.mp3", 0.5);

				race_1_started_after = true;
			}

			if (cut === CUT_RACE_1)
			{
				if (character_leader === PLAYER) shelfesteem += 10;
				ts_end(CUT_RACE_1_AFTER);
			}
			else if (cut === CUT_RACE_EPPER)
			{
				if (character_leader === PLAYER) shelfesteem += 20;
				else if (character_leader === CAR_DADDY) shelfesteem += 10;
 				ts_end(CUT_RACE_EPPER_AFTER);
			}
			else
			{
				throw new Error();
			}

			race_state = RACE_BEFORE;

			player.position.x = mesh_checkpoint[race_number][mesh_checkpoint[race_number].length-1].position.x+1;
			player.position.z = mesh_checkpoint[race_number][mesh_checkpoint[race_number].length-1].position.z+1;
			for (let t = 0; t < 4; t++)
			{
				character[t].position.x = mesh_checkpoint[race_number][mesh_checkpoint[race_number].length-1].position.x - (t+1)*2;
				character[t].position.z = mesh_checkpoint[race_number][mesh_checkpoint[race_number].length-1].position.z - (t+1)*2;

				character_goal_x[t] = mesh_checkpoint[race_number][mesh_checkpoint[race_number].length-1].position.x - (t+1)*2;
				character_goal_z[t] = mesh_checkpoint[race_number][mesh_checkpoint[race_number].length-1].position.z - (t+1)*2;
			}

			player_race_state = RACE_BEFORE;
			for (let t = 0; t < NUMBER_OF_CARS; t++) character_race_state[t] = RACE_BEFORE;
		}
	}

	// make only current race checkpoints visible
	for (let k = 0; k < pointsprites_checkpoints.length; k++)
	{
		pointsprites_checkpoints[k].visible = false;
		if ((cut % MODULUS_FREEROAM_OR_RACE === 0 && cut % MODULUS_FREEROAM_ONLY !== 0) && k === race_number)
		{
			pointsprites_checkpoints[k].visible = true;
		}
	}


	// CUTSCENES
	// positions
	if (cut === CUT_FREEROAM_INTRO)
	{
		// at the start of the cut
		if (timescene_intro_started === false)
		{
			// play music
			music_play("dream.mp3", 0.12);

			// turn off cars
			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			// start positions
			character[CAR_DOGERT].position.x = timescene_intro_position_x+2;
			character[CAR_DOGERT].position.z = timescene_intro_position_z+2;
			character[CAR_DADDY].position.x = timescene_intro_position_x;
			character[CAR_DADDY].position.z = timescene_intro_position_z+1;

			character_goal_array_x = [ 1470, 1470, 1469, 1459, 1457, 1448, 1441, 1440, 1474, 1471, 1470, 1478, 1472, 1478, 1496, 1528 ];
			character_goal_array_z = [ 1877, 1812, 1792, 1773, 1750, 1747, 1761, 1768, 1781, 1794, 1812, 1846, 1874, 1890, 1889, 1887 ];

			character_goal_lap[CAR_DOGERT] = 0;
			character_goal_lap[CAR_DADDY] = 0;

			timescene_intro_started = true;
		}

		// during the whole cut
		// turn on cars
		character_turned_on[CAR_DOGERT] = 1;
		character_turned_on[CAR_DADDY] = 1;

		speedchange = 0.3;

		// goal positions
		character_goal_x[CAR_DOGERT] = character_goal_array_x[character_goal_lap[CAR_DOGERT]];
		character_goal_z[CAR_DOGERT] = character_goal_array_z[character_goal_lap[CAR_DOGERT]];
		character_goal_x[CAR_DADDY] = character_goal_array_x[character_goal_lap[CAR_DADDY]];
		character_goal_z[CAR_DADDY] = character_goal_array_z[character_goal_lap[CAR_DADDY]];

		if (character_goal_lap[CAR_DOGERT] >= character_goal_array_x.length) { character_goal_x[CAR_DOGERT] = character[CAR_DOGERT].position.x; character_goal_z[CAR_DOGERT] = character[CAR_DOGERT].position.z; }
		else if (distance_get_xz(character[CAR_DOGERT].position.x,character[CAR_DOGERT].position.z, character_goal_array_x[character_goal_lap[CAR_DOGERT]],character_goal_array_z[character_goal_lap[CAR_DOGERT]]) < 3) character_goal_lap[CAR_DOGERT]++;
		if (character_goal_lap[CAR_DADDY] >= character_goal_array_x.length) { character_goal_x[CAR_DADDY] = character[CAR_DADDY].position.x; character_goal_z[CAR_DADDY] = character[CAR_DADDY].position.z; }
		else if (distance_get_xz(character[CAR_DADDY].position.x,character[CAR_DADDY].position.z, character_goal_array_x[character_goal_lap[CAR_DADDY]],character_goal_array_z[character_goal_lap[CAR_DADDY]]) < 3) character_goal_lap[CAR_DADDY]++;
	}

	else if (cut >= CUT_CUTSCENE_WAKEUP && cut <= CUT_CUTSCENE_WAKEUP+1)
	{
		// at the start of the cut
		if (cutscene_wakeup_started === false)
		{
			music_play("");

			// set room style
			room_set("black.png", "black.png");

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			cutscene_wakeup_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DOGERT] = 1;

		// turn on room
		room.visible = true;
		player.position.y = room.position.y-0.5;
	}

	else if (cut === CUT_RACE_1)
	{
		// at the start of the cut
		if (race_1_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			race_1_started = true;
		}
	}

	else if (cut === CUT_RACE_1_AFTER)
	{
		// at the start of the cut
		if (race_1_after_started === false)
		{
			music_play("morning_birds.np3", 0.17);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_DARK_GANDALF].position.x = 1590;
			character[CAR_DARK_GANDALF].position.z = 1885;
			character[CAR_ADELE].position.x = 1590;
			character[CAR_ADELE].position.z = 1885+1;
			character[CAR_DOGERT].position.x = 1590;
			character[CAR_DOGERT].position.z = 1885+2;

			race_1_after_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DARK_GANDALF] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_DOGERT] = 1;

		if (q < 1.5)
		{
			character_goal_x[CAR_DARK_GANDALF] = 1590;
			character_goal_z[CAR_DARK_GANDALF] = 1885;
			character_goal_x[CAR_ADELE] = 1590;
			character_goal_z[CAR_ADELE] = 1885+1;
			character_goal_x[CAR_DOGERT] = 1590;
			character_goal_z[CAR_DOGERT] = 1885+2;
		}
		else
		{
			character_goal_x[CAR_DARK_GANDALF] = carclub_position_x-1;
			character_goal_z[CAR_DARK_GANDALF] = carclub_position_z-1;
			character_goal_x[CAR_ADELE] = carclub_position_x-1;
			character_goal_z[CAR_ADELE] = carclub_position_z+1;
			character_goal_x[CAR_DOGERT] = carclub_position_x-1;
			character_goal_z[CAR_DOGERT] = carclub_position_z;
		}

		// collisions
		if (distance_get_xz(player.position.x,player.position.z, carclub_position_x,carclub_position_z) < HOUSE_DISTANCE)
		{
			sprite_ui_mouseclick.visible = true;
			if (mouseclick) ts_end(CUT_CUTSCENE_MEETING_1);
		}
	}

	else if (cut >= CUT_CUTSCENE_MEETING_1 && cut <= CUT_CUTSCENE_MEETING_1+48)
	{
		// at the start of the cut, set textures of room and show it. then hide all characters
		if (cutscene_meeting_1_started === false)
		{
			music_play("music_carclub.mp3", 0.43);

			room_set("roomwall t.jpg", "woodenfloor.jpg");

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			cutscene_meeting_1_started = true;
		}

		// during the whole cut, show all relevant characters, and place player and relevant characters in room
		character_turned_on[CAR_DARK_GANDALF] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_DOGERT] = 1;

		room.visible = true;
		player.position.set(room.position.x, room.position.y-0.5, room.position.z);

		// place characters in room
		place_character_in_room(character[CAR_DARK_GANDALF], 'n');
		place_character_in_room(character[CAR_ADELE], 's');
		place_character_in_room(character[CAR_DOGERT], 'e');
	}

	else if (cut === CUT_FREEROAM_0)
	{
		// at the start of the cut
		if (freeroam_0_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_ADELE].position.x = carclub_position_x-1;
			character[CAR_ADELE].position.z = carclub_position_z+1;
			character[CAR_ADELE].position.y = height_get(character[CAR_ADELE]);

			freeroam_0_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_ADELE] = 1;

		character_goal_x[CAR_ADELE] = gameplay_gym_position_x;
		character_goal_z[CAR_ADELE] = gameplay_gym_position_z;

		if (distance_get_xz(player.position.x,player.position.z, gameplay_gym_position_x,gameplay_gym_position_z) < COLLISION_DISTANCE*4) ts_end(CUT_FREEROAM_GYM);
	}

	else if (cut === CUT_FREEROAM_GYM)
	{
		// at the start of the cut
		if (gameplay_gym_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_ADELE].position.x = gameplay_gym_position_x;
			character[CAR_ADELE].position.z = gameplay_gym_position_z;
			character[CAR_DADDY].position.x = gameplay_gym_position_x-30;
			character[CAR_DADDY].position.z = gameplay_gym_position_z;

			gameplay_gym_started = true;
		}

		// during whole cut
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_DADDY] = 1;

		character_goal_x[CAR_ADELE] = sprite_gym_thing_1.position.x;
		character_goal_z[CAR_ADELE] = sprite_gym_thing_1.position.z;
		character_goal_x[CAR_DADDY] = sprite_gym_thing_2.position.x;
		character_goal_z[CAR_DADDY] = sprite_gym_thing_2.position.z;
	}

	// muffins
	else if (cut === CUT_FREEROAM_1)
	{
		// at the start of the cut
		if (freeroam_1_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_DADDY].position.x = sprite_gym_thing_2.position.x;
			character[CAR_DADDY].position.z = sprite_gym_thing_2.position.z;

			freeroam_1_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DADDY] = 1;

		if (q < 1.75) { character_goal_x[CAR_DADDY] = character[CAR_DADDY].position.x; character_goal_z[CAR_DADDY] = character[CAR_DADDY].position.z; }
		else { character_goal_x[CAR_DADDY] = sprite_freeroam_1_muffins.position.x; character_goal_z[CAR_DADDY] = sprite_freeroam_1_muffins.position.z; }

		if (distance_get(player, sprite_freeroam_1_muffins) < COLLISION_DISTANCE) { sound_cartoon.play(); ts_end(CUT_FREEROAM_1B); }

		sprite_freeroam_1_muffins.visible = true;
		sprite_freeroam_1_muffins.position.set(1600, height_get(sprite_freeroam_1_muffins), 1850);
	}

	else if (cut === CUT_FREEROAM_1B)
	{
		character_turned_on[CAR_DADDY] = 1;

		if (q < 0.75) { character_goal_x[CAR_DADDY] = character[CAR_DADDY].position.x; character_goal_z[CAR_DADDY] = character[CAR_DADDY].position.z; }
		else { character_goal_x[CAR_DADDY] = sprite_freeroam_1_muffins.position.x; character_goal_z[CAR_DADDY] = sprite_freeroam_1_muffins.position.z; }

		if (distance_get(character[CAR_DADDY], sprite_freeroam_1_muffins) < COLLISION_DISTANCE*3) { sound_cartoon.play(); ts_end(CUT_FREEROAM_1C); }

		sprite_freeroam_1_muffins.visible = true;
		sprite_freeroam_1_muffins.position.set(1641, height_get(sprite_freeroam_1_muffins), 1779);
	}
	else if (cut === CUT_FREEROAM_1C)
	{
		character_turned_on[CAR_DADDY] = 1;

		if (q < 0.5) { character_goal_x[CAR_DADDY] = character[CAR_DADDY].position.x; character_goal_z[CAR_DADDY] = character[CAR_DADDY].position.z; }
		else { character_goal_x[CAR_DADDY] = sprite_freeroam_1_muffins.position.x; character_goal_z[CAR_DADDY] = sprite_freeroam_1_muffins.position.z; }

		if (distance_get(character[CAR_DADDY], sprite_freeroam_1_muffins) < COLLISION_DISTANCE*3) { sound_cartoon.play(); ts_end(CUT_FREEROAM_1D); }

		sprite_freeroam_1_muffins.visible = true;
		sprite_freeroam_1_muffins.position.set(1649, height_get(sprite_freeroam_1_muffins), 1727);
	}
	else if (cut === CUT_FREEROAM_1D)
	{
		character_turned_on[CAR_DADDY] = 1;

		if (q < 0.75) { character_goal_x[CAR_DADDY] = character[CAR_DADDY].position.x; character_goal_z[CAR_DADDY] = character[CAR_DADDY].position.z; }
		else { character_goal_x[CAR_DADDY] = sprite_freeroam_1_muffins.position.x; character_goal_z[CAR_DADDY] = sprite_freeroam_1_muffins.position.z; }

		if (distance_get(character[CAR_DADDY], sprite_freeroam_1_muffins) < COLLISION_DISTANCE*3) { sound_cartoon.play(); ts_end(CUT_FREEROAM_1E); }

		sprite_freeroam_1_muffins.visible = true;
		sprite_freeroam_1_muffins.position.set(1699, height_get(sprite_freeroam_1_muffins), 1693);
	}
	else if (cut === CUT_FREEROAM_1E)
	{
		character_turned_on[CAR_DADDY] = 1;

		if (q < 0.75) { character_goal_x[CAR_DADDY] = character[CAR_DADDY].position.x; character_goal_z[CAR_DADDY] = character[CAR_DADDY].position.z; }
		else { character_goal_x[CAR_DADDY] = sprite_freeroam_1_muffins.position.x; character_goal_z[CAR_DADDY] = sprite_freeroam_1_muffins.position.z; }

		if (distance_get(character[CAR_DADDY], sprite_freeroam_1_muffins) < COLLISION_DISTANCE*3) { sound_cartoon.play(); ts_end(CUT_FREEROAM_1F); }

		sprite_freeroam_1_muffins.visible = true;
		sprite_freeroam_1_muffins.position.set(1752, height_get(sprite_freeroam_1_muffins), 1675);
	}
	else if (cut === CUT_FREEROAM_1F)
	{
		character_turned_on[CAR_DADDY] = 1;

		if (q < 0.75) { character_goal_x[CAR_DADDY] = character[CAR_DADDY].position.x; character_goal_z[CAR_DADDY] = character[CAR_DADDY].position.z; }
		else { character_goal_x[CAR_DADDY] = sprite_freeroam_1_muffins.position.x; character_goal_z[CAR_DADDY] = sprite_freeroam_1_muffins.position.z; }

		if (distance_get(character[CAR_DADDY], sprite_freeroam_1_muffins) < COLLISION_DISTANCE*3) { sound_cartoon.play(); ts_end(CUT_FREEROAM_EPPER); }

		sprite_freeroam_1_muffins.visible = true;
		sprite_freeroam_1_muffins.position.set(1802, height_get(sprite_freeroam_1_muffins), 1690);
	}

	else if (cut === CUT_FREEROAM_EPPER)
	{
		// at the start of the cut
		if (freeroam_epper_started === false)
		{
			music_play("music_epperland.mp3", 0.2);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_DADDY].position.x = sprite_freeroam_1_muffins.position.x;
			character[CAR_DADDY].position.z = sprite_freeroam_1_muffins.position.z;
			character[CAR_EPPER].position.x = 1880;
			character[CAR_EPPER].position.z = 1698;
			character[CAR_OMALLEY].position.x = 1880+1;
			character[CAR_OMALLEY].position.z = 1698;

			freeroam_epper_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_EPPER] = 1;
		character_turned_on[CAR_OMALLEY] = 1;

		character_goal_x[CAR_DADDY] = player.position.x-2;
		character_goal_z[CAR_DADDY] = player.position.z-2;
		character_goal_x[CAR_EPPER] = 1880;
		character_goal_z[CAR_EPPER] = 1698;
		character_goal_x[CAR_OMALLEY] = 1880+1;
		character_goal_z[CAR_OMALLEY] = 1698;

		if (distance_get(player, character[CAR_EPPER]) < INTERACT_DISTANCE)
		{
			sprite_ui_mouseclick.visible = true;
			if (mouseclick) ts_end(CUT_CUTSCENE_EPPER);
		}
	}

	else if (cut >= CUT_CUTSCENE_EPPER && cut <= CUT_CUTSCENE_EPPER+48)
	{
		// at the start of the cut
		if (cutscene_epper_started === false)
		{
			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			cutscene_epper_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DADDY] = 1
		character_turned_on[CAR_EPPER] = 1;
		character_turned_on[CAR_OMALLEY] = 1;

		player.position.set(1880, player.position.y, 1698-2);
		place_character_in_room(character[CAR_DADDY], "s");
		character[CAR_EPPER].position.x = 1880;
		character[CAR_EPPER].position.z = 1698;
		character[CAR_OMALLEY].position.x = 1880+1;
		character[CAR_OMALLEY].position.z = 1698;
	}

	else if (cut === CUT_FREEROAM_OMALLEY)
	{
		// at the start of the cut
		if (timescene_omalley_started === false)
		{
			music_play("music_epperland.mp3", 0.2);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_DADDY].position.x = 1880-1;	// kanske inte perfekt position!!
			character[CAR_DADDY].position.z = 1698;		// -||-
			character[CAR_OMALLEY].position.x = 1880+1;
			character[CAR_OMALLEY].position.z = 1698;

			timescene_omalley_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_OMALLEY] = 1;

		speedchange = 0.4;

		if (q < 2.75)
		{
			character_goal_x[CAR_DADDY] = 1917;
			character_goal_z[CAR_DADDY] = 1640;
		}
		else if (q < 8.75)
		{
			character_goal_x[CAR_DADDY] = 1940;
			character_goal_z[CAR_DADDY] = 1717;
		}
		else if (q < 12)
		{
			character_goal_x[CAR_DADDY] = 1799;
			character_goal_z[CAR_DADDY] = 1730;
		}
		else if (q < 16)
		{
			character_goal_x[CAR_DADDY] = 1837;
			character_goal_z[CAR_DADDY] = 1695;
		}
		else
		{
			character_goal_x[CAR_DADDY] = 1797;
			character_goal_z[CAR_DADDY] = 1643;
		}

		if (q >= 1)
		{
			character_goal_x[CAR_OMALLEY] = character[CAR_DADDY].position.x+3;
			character_goal_z[CAR_OMALLEY] = character[CAR_DADDY].position.z+3;
		}
	}

	// behöver jag ha denna här?!! man kan ändå inte spara från race
	else if (cut === CUT_RACE_EPPER)
	{
		// at the start of the cut
		if (race_epper_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			race_epper_started = true;
		}
	}

	else if (cut === CUT_RACE_EPPER_AFTER)
	{
		// at the start of the cut
		if (race_epper_after_started === false)
		{
			music_play("music_cute.mp3", 0.5);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_DADDY].position.x = 1811;
			character[CAR_DADDY].position.z = 1690;
			character[CAR_EPPER].position.x = 1808;
			character[CAR_EPPER].position.z = 1690;
			character[CAR_OMALLEY].position.x = 1805;
			character[CAR_OMALLEY].position.z = 1690;

			race_epper_after_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_EPPER] = 1;
		character_turned_on[CAR_OMALLEY] = 1;
	}

	else if (cut === CUT_FREEROAM_CARCHASE)
	{
		// at the start of the cut
		if (gameplay_carchase_started === false)
		{
			music_play("leejung_chase.mp3", 0.4);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_TURF].position.x = 1801;
			character[CAR_TURF].position.z = 1661;
			character[CAR_NUBBS].position.x = 1801+2;
			character[CAR_NUBBS].position.z = 1661+2;

			gameplay_carchase_started = true;
		}

		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_EPPER] = 1;
		character_turned_on[CAR_OMALLEY] = 1;
		character_turned_on[CAR_TURF] = 1;
		character_turned_on[CAR_NUBBS] = 1;

		character_goal_x[CAR_TURF] = player.position.x;
		character_goal_z[CAR_TURF] = player.position.z;
		character_goal_x[CAR_NUBBS] = character[CAR_DADDY].position.x;
		character_goal_z[CAR_NUBBS] = character[CAR_DADDY].position.z;
		character_goal_x[CAR_DADDY] = 1937;
		character_goal_z[CAR_DADDY] = 1713;

		if (distance_get(player, sprite_energydrink) < COLLISION_DISTANCE) { turbo_timer = TURBO_TIMER; sound_laser.play(); }	// kommer den här spelas många gånger nu? låt bli!!

		sprite_energydrink.position.set(current_chunk_x*(chunkwidth-1)+current_chunk_x, height_get(sprite_energydrink), current_chunk_z*(chunkwidth-1)+current_chunk_z);

		if (frame_counter < 1000) ts_end(CUT_FREEROAM_MAGNETDAY);
	}

	else if (cut >= CUT_FREEROAM_MAGNETDAY && cut <= 1010000)	// knepigt!!
	{
		sprite_magnet1.visible = true;
		sprite_magnet2.visible = true;
		sprite_magnet3.visible = true;
		sprite_magnet4.visible = true;
		sprite_magnet5.visible = true;
		sprite_magnet6.visible = true;

		sprite_magnet1.position.set(		freeroam_magnetday_position_x-2, height_get(sprite_magnet1), freeroam_magnetday_position_z-4);
		sprite_magnet2.position.set(		freeroam_magnetday_position_x+2, height_get(sprite_magnet2), freeroam_magnetday_position_z-4);
		sprite_magnet3.position.set(		freeroam_magnetday_position_x-6, height_get(sprite_magnet3), freeroam_magnetday_position_z+5);
		sprite_magnet4.position.set(		freeroam_magnetday_position_x+6, height_get(sprite_magnet4), freeroam_magnetday_position_z+5);
		sprite_magnet5.position.set(		freeroam_magnetday_position_x-7, height_get(sprite_magnet5), freeroam_magnetday_position_z-2);
		sprite_magnet6.position.set(		freeroam_magnetday_position_x+7, height_get(sprite_magnet6), freeroam_magnetday_position_z-2);

		if (cut === CUT_FREEROAM_MAGNETDAY)
		{
			// at the start of the cut
			if (freeroam_magnetday_started === false)
			{
				music_play("hongkong_music.mp3", 0.14);

				for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

				character[CAR_MRS_SUPERCONDUCTOR].position.x = freeroam_magnetday_position_x;
				character[CAR_MRS_SUPERCONDUCTOR].position.z = freeroam_magnetday_position_z;
				character[CAR_DADDY].position.x = 1469;
				character[CAR_DADDY].position.z = 1441;
				character[CAR_ADELE].position.x = 1469-1;
				character[CAR_ADELE].position.z = 1441;
				character[CAR_OMALLEY].position.x = 1469+1;
				character[CAR_OMALLEY].position.z = 1441;

				character_goal_x[CAR_MRS_SUPERCONDUCTOR] = 1486+14*(Math.random()-0.5);
				character_goal_z[CAR_MRS_SUPERCONDUCTOR] = 1434+14*(Math.random()-0.5);

				freeroam_magnetday_started = true;
			}

			// during the whole cut
			character_turned_on[CAR_MRS_SUPERCONDUCTOR] = 1;
			character_turned_on[CAR_DADDY] = 1;
			character_turned_on[CAR_ADELE] = 1;
			character_turned_on[CAR_OMALLEY] = 1;

			character_goal_x[CAR_DADDY] = 1469;
			character_goal_z[CAR_DADDY] = 1441;
			character_goal_x[CAR_ADELE] = 1469-1;
			character_goal_z[CAR_ADELE] = 1441;
			character_goal_x[CAR_OMALLEY] = 1469+1;
			character_goal_z[CAR_OMALLEY] = 1441;

			if (distance_get_xz(character[CAR_MRS_SUPERCONDUCTOR].position.x,character[CAR_MRS_SUPERCONDUCTOR].position.z, character_goal_x[CAR_MRS_SUPERCONDUCTOR],character_goal_z[CAR_MRS_SUPERCONDUCTOR]) < 2)
			{
				character_goal_x[CAR_MRS_SUPERCONDUCTOR] = 1486+14*Math.random()-0.5;
				character_goal_z[CAR_MRS_SUPERCONDUCTOR] = 1434+14*Math.random()-0.5;
			}

			if (distance_get(player, sprite_magnet1) < 2)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(1009001);
			}
			else if (distance_get(player, sprite_magnet2) < 2)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(1009051);
			}
			else if (distance_get(player, sprite_magnet3) < 2)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(1009101);
			}
			else if (distance_get(player, sprite_magnet4) < 2)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(1009151);
			}
			else if (distance_get(player, sprite_magnet5) < 2)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(1009201);
			}
			else if (distance_get(player, sprite_magnet6) < 2)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(1009251);
			}

			else if (distance_get(player, sprite[CAR_MRS_SUPERCONDUCTOR]) < 2)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(1009501);
			}

			// för MEETING_2
			else if (distance_get(player, character[CAR_DADDY]) < 3)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(CUT_CUTSCENE_MEETING_2);
			}
		}
	}

	else if (cut >= CUT_CUTSCENE_MEETING_2 && cut <= CUT_CUTSCENE_MEETING_2+48)
	{
		// at the start of the cut
		if (cutscene_meeting_2_started === false)
		{
	//		room_set("roomwall t.jpg", "woodenfloor.jpg");

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			cutscene_meeting_2_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_OMALLEY] = 1;
		sprite_cappy.visible = true;

	//	room.visible = true;

	//	player.position.set(room.position.x, room.position.y-0.5, room.position.z);
		place_character_in_room(character[CAR_DADDY], "n");
		place_character_in_room(character[CAR_ADELE], "s");
		place_character_in_room(character[CAR_OMALLEY], "w");
		place_character_in_room(sprite_cappy, "e");
	}

	else if (cut === CUT_FREEROAM_DGTRAVEL)
	{
		// at the start of the cut
		if (timescene_dgtravel_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_DADDY].position.x = 1469;
			character[CAR_DADDY].position.z = 1441;
			character[CAR_ADELE].position.x = 1469-1;
			character[CAR_ADELE].position.z = 1441;
			character[CAR_OMALLEY].position.x = 1469+1;
			character[CAR_OMALLEY].position.z = 1441;

			character_goal_array_x = [ 1463, 1504, 1515, 1512, 1487, 1436, 1418, 1401, 1356, 1325, 1328, 1320, 1305, 1290, 1288, 1285, 1294, 1304, 1306, 1323, 1352, 1373, 1400, 1419, 1451, 1475, 1497, 1519, 1533, 1543, 1570, 1586, 1606, 1620, 1632, 1650, 1656, 1713, 1730, 1735, 1740, 1755, 1763, 1767, 1775, 1785, 1794, 1796, 1818, 1876, 1894 ];
			character_goal_array_z = [ 1459, 1511, 1556, 1628, 1663, 1639, 1638, 1639, 1646, 1677, 1730, 1781, 1818, 1843, 1874, 1907, 1946, 1992, 2049, 2049, 2046, 2046, 2049, 2045, 2032, 2018, 2017, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2009, 2007, 1987, 1976, 1976, 1976, 1976, 1976, 1977, 1977, 1977, 1977, 1974, 1962, 1944, 1920 ];

			character_goal_lap[CAR_DADDY] = 0;
			character_goal_lap[CAR_ADELE] = 0;
			character_goal_lap[CAR_OMALLEY] = 0;

			timescene_dgtravel_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_OMALLEY] = 1;

		speedchange = 0.9;

		character_goal_x[CAR_ADELE] = character_goal_array_x[character_goal_lap[CAR_ADELE]];
		character_goal_z[CAR_ADELE] = character_goal_array_z[character_goal_lap[CAR_ADELE]];
		character_goal_x[CAR_DADDY] = character_goal_array_x[character_goal_lap[CAR_DADDY]];
		character_goal_z[CAR_DADDY] = character_goal_array_z[character_goal_lap[CAR_DADDY]];
		character_goal_x[CAR_OMALLEY] = character_goal_array_x[character_goal_lap[CAR_OMALLEY]];
		character_goal_z[CAR_OMALLEY] = character_goal_array_z[character_goal_lap[CAR_OMALLEY]];

		if (character_goal_lap[CAR_ADELE] >= character_goal_array_x.length) { character_goal_x[CAR_ADELE] = character[CAR_ADELE].position.x; character_goal_z[CAR_ADELE] = character[CAR_ADELE].position.z; }
		else if (distance_get_xz(character[CAR_ADELE].position.x,character[CAR_ADELE].position.z, character_goal_array_x[character_goal_lap[CAR_ADELE]],character_goal_array_z[character_goal_lap[CAR_ADELE]]) < 3) character_goal_lap[CAR_ADELE]++;
		if (character_goal_lap[CAR_DADDY] >= character_goal_array_x.length) { character_goal_x[CAR_DADDY] = character[CAR_DADDY].position.x; character_goal_z[CAR_DADDY] = character[CAR_DADDY].position.z; }
		else if (distance_get_xz(character[CAR_DADDY].position.x,character[CAR_DADDY].position.z, character_goal_array_x[character_goal_lap[CAR_DADDY]],character_goal_array_z[character_goal_lap[CAR_DADDY]]) < 3) character_goal_lap[CAR_DADDY]++;
		if (character_goal_lap[CAR_OMALLEY] >= character_goal_array_x.length) { character_goal_x[CAR_OMALLEY] = character[CAR_OMALLEY].position.x; character_goal_z[CAR_OMALLEY] = character[CAR_OMALLEY].position.z; }
		else if (distance_get_xz(character[CAR_OMALLEY].position.x,character[CAR_OMALLEY].position.z, character_goal_array_x[character_goal_lap[CAR_OMALLEY]],character_goal_array_z[character_goal_lap[CAR_OMALLEY]]) < 3) character_goal_lap[CAR_OMALLEY]++;

		if (distance_get_xz(player.position.x,player.position.z, dghouse_position_x,dghouse_position_z) < 15) ts_end(CUT_FREEROAM_DGCHILL);
	}

	else if (cut === CUT_FREEROAM_DGCHILL)
	{
		// at the start of the cut
		if (timescene_dgchill_started === false)
		{
			music_play("haftlansong.mp3", 0.2);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_DADDY].position.x = dghouse_position_x+1;
			character[CAR_DADDY].position.z = dghouse_position_z+1;
			character[CAR_ADELE].position.x = dghouse_position_x+1;
			character[CAR_ADELE].position.z = dghouse_position_z;
			character[CAR_OMALLEY].position.x = dghouse_position_x+1;
			character[CAR_OMALLEY].position.z = dghouse_position_z-1;

			timescene_dgchill_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_OMALLEY] = 1;

		character_goal_x[CAR_DADDY] = character[CAR_DADDY].position.x;
		character_goal_z[CAR_DADDY] = character[CAR_DADDY].position.z;
		character_goal_x[CAR_ADELE] = character[CAR_ADELE].position.x;
		character_goal_z[CAR_ADELE] = character[CAR_ADELE].position.z;
		character_goal_x[CAR_OMALLEY] = character[CAR_OMALLEY].position.x;
		character_goal_z[CAR_OMALLEY] = character[CAR_OMALLEY].position.z;

		if (distance_get_xz(player.position.x,player.position.z, dghouse_position_x,dghouse_position_z) < 6)
		{
			sprite_ui_mouseclick.visible = true;
			if (mouseclick) ts_end(CUT_CUTSCENE_DGCHILL_OPEN);
		}
	}

	else if (cut >= CUT_CUTSCENE_DGCHILL_OPEN && cut <= CUT_CUTSCENE_DGCHILL_OPEN+48)
	{
		// at the start of the cut
		if (cutscene_dgchill_open_started === false)
		{
			music_play("music_cute.mp3", 0.5);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			cutscene_dgchill_open_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DARK_GANDALF] = 1;
		character_turned_on[CAR_POLISH_COW] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_OMALLEY] = 1;
		character_turned_on[CAR_DADDY] = 1;

		// bättre positioner här!!
		place_character_in_room(character[CAR_DARK_GANDALF], "n");
		place_character_in_room(character[CAR_POLISH_COW], "ne");
		place_character_in_room(character[CAR_ADELE], "s");
		place_character_in_room(character[CAR_OMALLEY], "se");
		place_character_in_room(character[CAR_DADDY], "sw");
	}

	else if (cut === CUT_FREEROAM_DGHOTSPRING)
	{
		// at the start of the cut
		if (freeroam_dghotspring_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_DARK_GANDALF].position.x = dghouse_position_x+1;
			character[CAR_DARK_GANDALF].position.z = dghouse_position_z-2;
			character[CAR_POLISH_COW].position.x = dghouse_position_x+1;
			character[CAR_POLISH_COW].position.z = dghouse_position_z+2;
			character[CAR_DADDY].position.x = dghouse_position_x+1;
			character[CAR_DADDY].position.z = dghouse_position_z+1;
			character[CAR_ADELE].position.x = dghouse_position_x+1;
			character[CAR_ADELE].position.z = dghouse_position_z;
			character[CAR_OMALLEY].position.x = dghouse_position_x+1;
			character[CAR_OMALLEY].position.z = dghouse_position_z-1;

			freeroam_dghotspring_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DARK_GANDALF] = 1;
		character_turned_on[CAR_POLISH_COW] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_OMALLEY] = 1;

		character_goal_x[CAR_DARK_GANDALF] = freeroam_dghotspring_position_x;
		character_goal_z[CAR_DARK_GANDALF] = freeroam_dghotspring_position_z;
		character_goal_x[CAR_POLISH_COW] = character[CAR_DARK_GANDALF].position.x;
		character_goal_z[CAR_POLISH_COW] = character[CAR_DARK_GANDALF].position.z;
		character_goal_x[CAR_ADELE] = character[CAR_DARK_GANDALF].position.x;
		character_goal_z[CAR_ADELE] = character[CAR_DARK_GANDALF].position.z;
		character_goal_x[CAR_DADDY] = character[CAR_DARK_GANDALF].position.x;
		character_goal_z[CAR_DADDY] = character[CAR_DARK_GANDALF].position.z;
		character_goal_x[CAR_OMALLEY] = character[CAR_DARK_GANDALF].position.x;
		character_goal_z[CAR_OMALLEY] = character[CAR_DARK_GANDALF].position.z;

		if (distance_get_xz(player.position.x,player.position.z, freeroam_dghotspring_position_x,freeroam_dghotspring_position_z) < 6) ts_end(CUT_CUTSCENE_DGHOTSPRING);
	}

	else if (cut >= CUT_CUTSCENE_DGHOTSPRING && cut <= CUT_CUTSCENE_DGHOTSPRING+48)
	{
		// at the start of the cut
		if (cutscene_dghotspring_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			cutscene_dghotspring_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_DARK_GANDALF] = 1;
		character_turned_on[CAR_POLISH_COW]  = 1;
		character_turned_on[CAR_OMALLEY] = 1;

		player.position.set(cutscene_dghotspring_position_x, player.position.y, cutscene_dghotspring_position_z);
		place_character_in_room(sprite[CAR_ADELE], 'e');
		place_character_in_room(sprite[CAR_DADDY], 'se');
		place_character_in_room(sprite[CAR_DARK_GANDALF], 'sw');
		place_character_in_room(sprite[CAR_POLISH_COW], 's');
		place_character_in_room(sprite[CAR_OMALLEY], 'nw');
	}

	else if (cut === CUT_FREEROAM_DGHOTSPRING_2)
	{
		// at the start of the cut
		if (timescene_dghotspring_started === false)
		{
			music_play("haftlansong.mp3", 0.2);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_DARK_GANDALF].position.x = freeroam_dghotspring_position_x;
			character[CAR_DARK_GANDALF].position.z = freeroam_dghotspring_position_z;
			character[CAR_POLISH_COW].position.x = character[CAR_DARK_GANDALF].position.x;
			character[CAR_POLISH_COW].position.z = character[CAR_DARK_GANDALF].position.z+1;
			character[CAR_ADELE].position.x = character[CAR_DARK_GANDALF].position.x;
			character[CAR_ADELE].position.z = character[CAR_DARK_GANDALF].position.z+2;
			character[CAR_DADDY].position.x = character[CAR_DARK_GANDALF].position.x;
			character[CAR_DADDY].position.z = character[CAR_DARK_GANDALF].position.z+3;
			character[CAR_OMALLEY].position.x = character[CAR_DARK_GANDALF].position.x;
			character[CAR_OMALLEY].position.z = character[CAR_DARK_GANDALF].position.z+4;

			timescene_dghotspring_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DARK_GANDALF] = 1;
		character_turned_on[CAR_POLISH_COW] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_OMALLEY] = 1;

		speedchange = 0.3;

		if (q < 1)
		{
			character_goal_x[CAR_DARK_GANDALF] = freeroam_dghotspring_position_x;
			character_goal_z[CAR_DARK_GANDALF] = freeroam_dghotspring_position_z;
			character_goal_x[CAR_POLISH_COW] = character[CAR_DARK_GANDALF].position.x;
			character_goal_z[CAR_POLISH_COW] = character[CAR_DARK_GANDALF].position.z+1;
			character_goal_x[CAR_ADELE] = character[CAR_DARK_GANDALF].position.x;
			character_goal_z[CAR_ADELE] = character[CAR_DARK_GANDALF].position.z+2;
			character_goal_x[CAR_DADDY] = character[CAR_DARK_GANDALF].position.x;
			character_goal_z[CAR_DADDY] = character[CAR_DARK_GANDALF].position.z+3;
			character_goal_x[CAR_OMALLEY] = character[CAR_DARK_GANDALF].position.x;
			character_goal_z[CAR_OMALLEY] = character[CAR_DARK_GANDALF].position.z+4;
		}
		else
		{
			character_goal_x[CAR_DARK_GANDALF] = dghouse_position_x;
			character_goal_z[CAR_DARK_GANDALF] = dghouse_position_z;
			character_goal_x[CAR_POLISH_COW] = character[CAR_DARK_GANDALF].position.x;
			character_goal_z[CAR_POLISH_COW] = character[CAR_DARK_GANDALF].position.z+1;
			character_goal_x[CAR_ADELE] = character[CAR_DARK_GANDALF].position.x;
			character_goal_z[CAR_ADELE] = character[CAR_DARK_GANDALF].position.z+2;
			character_goal_x[CAR_DADDY] = character[CAR_DARK_GANDALF].position.x;
			character_goal_z[CAR_DADDY] = character[CAR_DARK_GANDALF].position.z+3;
			character_goal_x[CAR_OMALLEY] = character[CAR_DARK_GANDALF].position.x;
			character_goal_z[CAR_OMALLEY] = character[CAR_DARK_GANDALF].position.z+4;
		}

		if (distance_get_xz(player.position.x,player.position.z, dghouse_position_x,dghouse_position_z) < 6)
		{
			sprite_ui_mouseclick.visible = true;
			if (mouseclick) ts_end(CUT_CUTSCENE_DGSLEEP);
		}
	}

	else if (cut >= CUT_CUTSCENE_DGSLEEP && cut <= CUT_CUTSCENE_DGSLEEP+48)
	{
		// at the start of the cut
		if (cutscene_dgsleep_started === false)
		{
			music_play("haftlansong.mp3", 0.2);

			room_set("roomwall da.jpg", "roomfloor da.jpg");

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			cutscene_dgsleep_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_POLISH_COW] = 1;
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_OMALLEY] = 1;
		character_turned_on[CAR_HARASS] = 1;

		room.visible = true;

		player.position.set(room.position.x, room.position.y-0.5, room.position.z);
		place_character_in_room(character[CAR_POLISH_COW], "n");
		place_character_in_room(character[CAR_DADDY], "e");
		place_character_in_room(character[CAR_ADELE], "se");
		place_character_in_room(character[CAR_OMALLEY], "s");
		place_character_in_room(character[CAR_HARASS], "w");
	}

	else if (cut === CUT_FREEROAM_WASHING)
	{
		// at the start of the cut
		if (freeroam_washing_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_HARASS].position.x = harasshouse_position_x+2;
			character[CAR_HARASS].position.z = harasshouse_position_z+2;

			freeroam_washing_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_HARASS] = 1;

		character_goal_x[CAR_HARASS] = harasshouse_position_x+2;
		character_goal_z[CAR_HARASS] = harasshouse_position_z+2;

		if (distance_get_xz(player.position.x,player.position.z, harasshouse_position_x,harasshouse_position_z) < 6)
		{
			sprite_ui_mouseclick.visible = true;
			if (mouseclick) ts_end(CUT_CUTSCENE_WASHING);
		}
	}

	else if (cut >= CUT_CUTSCENE_WASHING && cut <= CUT_CUTSCENE_WASHING+48)
	{
		// at the start of the cut
		if (cutscene_washing_started === false)
		{
			music_play("music_harass.mp3");

			room_set("fuckyouwall.jpg", "fuckyouwall.jpg");

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			cutscene_washing_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_HARASS] = 1;

		room.visible = true;
		player.position.set(room.position.x, room.position.y-0.5, room.position.z);
		place_character_in_room(character[CAR_HARASS], "n");
	}

	else if (cut === CUT_FREEROAM_WASHING_2)
	{
		// at the start of the cut
		if (timescene_washing_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_HARASS].position.x = harasshouse_position_x;
			character[CAR_HARASS].position.z = harasshouse_position_z;
			character[CAR_DARK_GANDALF].position.x = harasshouse_position_x;
			character[CAR_DARK_GANDALF].position.z = harasshouse_position_z;

			timescene_washing_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_HARASS] = 1;
		character_turned_on[CAR_DARK_GANDALF] = 1;

		character_goal_x[CAR_HARASS] = harasshouse_position_x+2;
		character_goal_z[CAR_HARASS] = harasshouse_position_z+2;
		character_goal_x[CAR_DARK_GANDALF] = harasshouse_position_x+2;
		character_goal_z[CAR_DARK_GANDALF] = harasshouse_position_z+2;

		if (distance_get_xz(player.position.x,player.position.z, carclub_position_x,carclub_position_z) < 6)
		{
			sprite_ui_mouseclick.visible = true;
			if (mouseclick) ts_end(CUT_CUTSCENE_MEETING_3);
		}

		// alternative cutscene
		if (distance_get_xz(player.position.x,player.position.z, harasshouse_position_x,harasshouse_position_z) < 10) ts_end(CUT_FREEROAM_PISSANDSHIT);
	}

	else if (cut >= CUT_CUTSCENE_MEETING_3 && cut <= CUT_CUTSCENE_MEETING_3+48)
	{
		// at the start of the cut
		if (cutscene_meeting_3_started === false)
		{
			room_set("roomwall carclub.jpg", "woodenfloor.jpg");

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			cutscene_meeting_3_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DOGERT] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_OMALLEY] = 1;
		character_turned_on[CAR_HARASS] = 1;
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_DARK_GANDALF] = 1;

		room.visible = true;
		player.position.set(room.position.x, room.position.y-0.5, room.position.z);
		place_character_in_room(character[CAR_DOGERT], "n");
		place_character_in_room(character[CAR_ADELE], "e");
		place_character_in_room(character[CAR_OMALLEY], "w");
		place_character_in_room(character[CAR_HARASS], "s");
		place_character_in_room(character[CAR_DADDY], "sw");
		place_character_in_room(character[CAR_DARK_GANDALF], "ne");
	}

	else if (cut === CUT_FREEROAM_4)
	{
		// at the start of the cut
		if (freeroam_4_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_DOGERT].position.x = carclub_position_x+2;
			character[CAR_DOGERT].position.z = carclub_position_z+2;
			character[CAR_ADELE].position.x = carclub_position_x+3;
			character[CAR_ADELE].position.z = carclub_position_z+2;
			character[CAR_OMALLEY].position.x = carclub_position_x+4;
			character[CAR_OMALLEY].position.z = carclub_position_z+2;
			character[CAR_HARASS].position.x = carclub_position_x+5;
			character[CAR_HARASS].position.z = carclub_position_z+2;
			character[CAR_DADDY].position.x = carclub_position_x+6;
			character[CAR_DADDY].position.z = carclub_position_z+2;
			character[CAR_DARK_GANDALF].position.x = carclub_position_x+7;
			character[CAR_DARK_GANDALF].position.z = carclub_position_z+2;

			character_goal_array_x = [ 1621, 1603, 1595, 1598, 1606, 1607, 1594, 1582, 1545, 1534, 1521, 1510, 1498, 1480, 1471, 1460, 1459, 1450, 1440, 1442, 1472 ];
			character_goal_array_z = [ 1797, 1783, 1777, 1764, 1749, 1733, 1736, 1737, 1746, 1733, 1727, 1729, 1730, 1747, 1755, 1768, 1781, 1787, 1795, 1810, 1807 ];

			freeroam_4_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DOGERT] = 1;
		character_turned_on[CAR_OMALLEY] = 1;
		character_turned_on[CAR_HARASS] = 1;
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_DARK_GANDALF] = 1;

		if (character_goal_lap[CAR_DOGERT] >= character_goal_array_x.length) { character_goal_x[CAR_DOGERT] = character[CAR_DOGERT].position.x; character_goal_z[CAR_DOGERT] = character[CAR_DOGERT].position.z; }
		else if (distance_get_xz(character[CAR_DOGERT].position.x,character[CAR_DOGERT].position.z, character_goal_array_x[character_goal_lap[CAR_DOGERT]],character_goal_array_z[character_goal_lap[CAR_DOGERT]]) < 3) character_goal_lap[CAR_DOGERT]++;
		if (character_goal_lap[CAR_OMALLEY] >= character_goal_array_x.length) { character_goal_x[CAR_OMALLEY] = character[CAR_OMALLEY].position.x; character_goal_z[CAR_OMALLEY] = character[CAR_OMALLEY].position.z; }
                else if (distance_get_xz(character[CAR_OMALLEY].position.x,character[CAR_OMALLEY].position.z, character_goal_array_x[character_goal_lap[CAR_OMALLEY]],character_goal_array_z[character_goal_lap[CAR_OMALLEY]]) < 3) character_goal_lap[CAR_OMALLEY]++;
		if (character_goal_lap[CAR_HARASS] >= character_goal_array_x.length) { character_goal_x[CAR_HARASS] = character[CAR_HARASS].position.x; character_goal_z[CAR_HARASS] = character[CAR_HARASS].position.z; }
                else if (distance_get_xz(character[CAR_HARASS].position.x,character[CAR_HARASS].position.z, character_goal_array_x[character_goal_lap[CAR_HARASS]],character_goal_array_z[character_goal_lap[CAR_HARASS]]) < 3) character_goal_lap[CAR_HARASS]++;
		if (character_goal_lap[CAR_DADDY] >= character_goal_array_x.length) { character_goal_x[CAR_DADDY] = character[CAR_DADDY].position.x; character_goal_z[CAR_DADDY] = character[CAR_DADDY].position.z; }
                else if (distance_get_xz(character[CAR_DADDY].position.x,character[CAR_DADDY].position.z, character_goal_array_x[character_goal_lap[CAR_DADDY]],character_goal_array_z[character_goal_lap[CAR_DADDY]]) < 3) character_goal_lap[CAR_DADDY]++;
		if (character_goal_lap[CAR_ADELE] >= character_goal_array_x.length) { character_goal_x[CAR_ADELE] = character[CAR_ADELE].position.x; character_goal_z[CAR_ADELE] = character[CAR_ADELE].position.z; }
                else if (distance_get_xz(character[CAR_ADELE].position.x,character[CAR_ADELE].position.z, character_goal_array_x[character_goal_lap[CAR_ADELE]],character_goal_array_z[character_goal_lap[CAR_ADELE]]) < 3) character_goal_lap[CAR_ADELE]++;
		if (character_goal_lap[CAR_DARK_GANDALF] >= character_goal_array_x.length) { character_goal_x[CAR_DARK_GANDALF] = character[CAR_DARK_GANDALF].position.x; character_goal_z[CAR_DARK_GANDALF] = character[CAR_DARK_GANDALF].position.z; }
                else if (distance_get_xz(character[CAR_DARK_GANDALF].position.x,character[CAR_DARK_GANDALF].position.z, character_goal_array_x[character_goal_lap[CAR_DARK_GANDALF]],character_goal_array_z[character_goal_lap[CAR_DARK_GANDALF]]) < 3) character_goal_lap[CAR_DARK_GANDALF]++;

		if (distance_get_xz(player.position.x,player.position.z, 1472,1807) < 10) ts_end(CUT_CUTSCENE_LICENSE);
	}

	else if (cut >= CUT_CUTSCENE_LICENSE && cut <= CUT_CUTSCENE_LICENSE+48)
	{
		// at the start of the cut
		if (gameplay_license_started === false)
		{
			music_play("dream.mp3", 0.15);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			gameplay_license_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DOGERT] = 1;
		character_turned_on[CAR_OMALLEY] = 1;
		character_turned_on[CAR_HARASS] = 1;
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_DARK_GANDALF] = 1;

		place_character_in_room(character[CAR_DOGERT], "n");
		place_character_in_room(character[CAR_ADELE], "e");
		place_character_in_room(character[CAR_OMALLEY], "w");
		place_character_in_room(character[CAR_HARASS], "s");
		place_character_in_room(character[CAR_DADDY], "sw");
		place_character_in_room(character[CAR_DARK_GANDALF], "ne");
	}

	else if (cut === CUT_FREEROAM_LICENSE)
	{
		if (speed > 0.07 && (key_a || key_d)) ts_end(CUT_CUTSCENE_LICENSE_2);
	}

	else if (cut >= CUT_CUTSCENE_LICENSE_2 && cut <= CUT_CUTSCENE_LICENSE_2+48)
	{
		// at the start of the cut
		if (gameplay_license_started_2 === false)
		{
			music_play("dream.mp3", 0.15);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			gameplay_license_started_2 = true;
		}

		// during the whole cut
		character_turned_on[CAR_DOGERT] = 1;

		place_character_in_room(character[CAR_DOGERT], "n");
	}

	else if (cut === CUT_FREEROAM_LICENSE_2)
	{
		// at the start of the cut
		if (gameplay_license_5_started === false)
		{
 			sprite_license_5_kocar1.position.set(freeroam_license_2_position_x-2, sprite_license_5_kocar1.position.y, freeroam_license_2_position_z);
			sprite_license_5_kocar2.position.set(freeroam_license_2_position_x-3, sprite_license_5_kocar2.position.y, freeroam_license_2_position_z);
			sprite_license_5_kocar3.position.set(freeroam_license_2_position_x-4, sprite_license_5_kocar3.position.y, freeroam_license_2_position_z);
			sprite_license_5_kocar4.position.set(freeroam_license_2_position_x-5, sprite_license_5_kocar4.position.y, freeroam_license_2_position_z);
			sprite_license_5_kocar5.position.set(freeroam_license_2_position_x-6, sprite_license_5_kocar5.position.y, freeroam_license_2_position_z);

			gameplay_license_5_started = true;
		}

		// during the whole cut
		character_goal_x[CAR_DOGERT] = freeroam_license_2_position_x;
		character_goal_z[CAR_DOGERT] = freeroam_license_2_position_z;

		// var/när stänger jag av dessa igen? (.visible = false)!!
		sprite_license_5_kocar1.visible = true;
		sprite_license_5_kocar2.visible = true;
		sprite_license_5_kocar3.visible = true;
		sprite_license_5_kocar4.visible = true;
		sprite_license_5_kocar5.visible = true;

		sprite_license_5_kocar1.position.y = height_get(sprite_license_5_kocar1);
		sprite_license_5_kocar2.position.y = height_get(sprite_license_5_kocar2);
		sprite_license_5_kocar3.position.y = height_get(sprite_license_5_kocar3);
		sprite_license_5_kocar4.position.y = height_get(sprite_license_5_kocar4);
		sprite_license_5_kocar5.position.y = height_get(sprite_license_5_kocar5);

		sprite_license_5_kocar1.position.x -= 0.01;
		sprite_license_5_kocar2.position.x -= 0.01;
		sprite_license_5_kocar3.position.x -= 0.01;
		sprite_license_5_kocar4.position.x -= 0.01;
		sprite_license_5_kocar5.position.x -= 0.01;

		gameplay_license_5_mottimer--;
		if (gameplay_license_5_mottimer <= 180 && gameplay_license_5_mottimer > 0)
		{
			sprite_license_5_motcar.visible = true;
			sprite_license_5_motcar.position.x += 0.15;
		}
		else
		{
			sprite_license_5_motcar.visible = false;
			sprite_license_5_motcar.position.set(freeroam_license_2_position_x-10, height_get(sprite_license_5_motcar), freeroam_license_2_position_z+2);

			if (gameplay_license_5_mottimer <= 0) gameplay_license_5_mottimer = 360;
		}

		if (distance_get(player, sprite_license_5_kocar3) < 5 && player.position.z < sprite_license_5_kocar3.position.z && distance_get(player, sprite_license_5_kocar5) < 4) ts_end(CUT_CUTSCENE_LICENSE_3);
	}

	else if (cut >= CUT_CUTSCENE_LICENSE_3 && cut <= CUT_CUTSCENE_LICENSE_3+48)
	{
		// at the start of the cut
		if (gameplay_license_started_3 === false)
		{
			music_play("dream.mp3", 0.15);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			gameplay_license_started_3 = true;
		}

		// during the whole cut
		character_turned_on[CAR_DOGERT] = 1;
		sprite_cappy.visible = true;

		place_character_in_room(character[CAR_DOGERT], "n");
		place_character_in_room(sprite_cappy, "e");
	}

	else if (cut === CUT_FREEROAM_LICENSE_3)
	{
		if (key_s) ts_end(CUT_CUTSCENE_LICENSE_4);
	}

	else if (cut >= CUT_CUTSCENE_LICENSE_4 && cut <= CUT_CUTSCENE_LICENSE_4+48)
	{
		// at the start of the cut
		if (gameplay_license_started_4 === false)
		{
			music_play("dream.mp3", 0.15);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			gameplay_license_started_4 = true;
		}

		// during the whole cut
		character_turned_on[CAR_DOGERT] = 1;
		sprite_cappy.visible = true;

		place_character_in_room(character[CAR_DOGERT], "n");
		place_character_in_room(sprite_cappy, "e");
	}

	else if (cut === CUT_FREEROAM_LICENSE_4)
	{
		// during the whole cut
		// var/när stänger jag av dessa (.visible = false)?!!
		sprite_license_3_car1.visible = true;
		sprite_license_3_car2.visible = true;

		sprite_license_3_car1.position.set(gameplay_license_3_position_x+3, height_get(sprite_license_3_car2), gameplay_license_3_position_z+2-0.75);
		sprite_license_3_car2.position.set(gameplay_license_3_position_x+3, height_get(sprite_license_3_car2), gameplay_license_3_position_z+2+0.75);

		if (key_w) ts_end(CUT_CUTSCENE_LICENSE_5);	// diskvalificerad!!

		else if (distance_get(player, sprite_license_3_car1) < 0.9 && distance_get(player, sprite_license_3_car2) < 0.9) ts_end(CUT_CUTSCENE_LICENSE_5+1); // vinst!!
	}

	else if (cut >= CUT_CUTSCENE_LICENSE_5 && cut <= CUT_CUTSCENE_LICENSE_5+48)
	{
		// at the start of the cut
		if (gameplay_license_started_5 === false)
		{
			music_play("dream.mp3", 0.15);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			gameplay_license_started_5 = true;
		}

		// during the whole cut
		character_turned_on[CAR_DOGERT] = 1;

		place_character_in_room(character[CAR_DOGERT], "n");
	}

	else if (cut === CUT_FREEROAM_LICENSE_5)
	{
		// at the start of the cut
		if (gameplay_license_started_4 === false)
		{
			music_play("dream.mp3", 0.15);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			gameplay_license_started_4 = true;
		}

		// during the whole cut
		character_turned_on[CAR_DOGERT] = 1;
		sprite_cappy.visible = true;

		sprite_cappy.position.set(player.position.x+3, height_get(sprite_cappy), player.position.z+3);
	}

	else if (cut === CUT_FREEROAM_MAGNETDROWN)
	{
		// at the start of the cut
		if (freeroam_magnetdrown_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_OMALLEY].position.x = 1429;
			character[CAR_OMALLEY].position.z = 1961+1;
			character[CAR_HARASS].position.x = 1429;
			character[CAR_HARASS].position.z = 1961+2;
			character[CAR_DADDY].position.x = 1429;
			character[CAR_DADDY].position.z = 1961+3;
			character[CAR_ADELE].position.x = 1429;
			character[CAR_ADELE].position.z = 1961+4;
			character[CAR_DARK_GANDALF].position.x = 1429;
			character[CAR_DARK_GANDALF].position.z = 1961+5;

			freeroam_magnetdrown_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_OMALLEY] = 1;
		character_turned_on[CAR_HARASS] = 1;
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_DARK_GANDALF] = 1;

		character_goal_x[CAR_OMALLEY] = 1429;
		character_goal_z[CAR_OMALLEY] = 1961+1;
		character_goal_x[CAR_HARASS] = 1429;
		character_goal_z[CAR_HARASS] = 1961+2;
		character_goal_x[CAR_DADDY] = 1429;
		character_goal_z[CAR_DADDY] = 1961+3;
		character_goal_x[CAR_ADELE] = 1429;
		character_goal_z[CAR_ADELE] = 1961+4;
		character_goal_x[CAR_DARK_GANDALF] = 1429;
		character_goal_z[CAR_DARK_GANDALF] = 1961+5;

		for (let t = 0; t < 7; t++)
		{
			sprite_magnetdrown_magnet[t].visible = true;
			sprite_magnetdrown_magnet[t].position.set(freeroam_magnetdrown_magnet_x[t],height_get(sprite_magnetdrown_magnet[t]),freeroam_magnetdrown_magnet_z[t]);
		}

		// attracted by small magnets along the way
		for (let t = 0; t < 7; t++)
		{
			let distance = distance_get_xz(player.position.x,player.position.z, freeroam_magnetdrown_magnet_x[t],freeroam_magnetdrown_magnet_z[t]);
			if (distance < 20)	// gör dessa till sprites?!!
			{
				player.position.x += 0.01 * (freeroam_magnetdrown_magnet_x[t]-player.position.x) / distance;
				player.position.z += 0.01 * (freeroam_magnetdrown_magnet_z[t]-player.position.z) / distance;
			}
		}

		// attracted by the magnet thing at the bottom of the lake
		let distance_xz = distance_get_xz(player.position.x,player.position.z, freeroam_magnetdrown_attractor_x,freeroam_magnetdrown_attractor_z);

		if (distance_xz < 5)
		{
			player.position.y += 0.00001 / (freeroam_magnetdrown_attractor_y-player.position.y);
			ts_end(CUT_CUTSCENE_MAGNETDROWN);
		}
		else
		{
			if (player.position.y < sealevel) player.position.y = sealevel;

			if (distance_xz < 25 && distance_xz >= 5)
			{
				let distance = distance_get_xz(player.position.x,player.position.z, freeroam_magnetdrown_attractor_x,freeroam_magnetdrown_attractor_z);
				player.position.x += 0.01 * (freeroam_magnetdrown_attractor_x-player.position.x) / distance;
				player.position.z += 0.01 * (freeroam_magnetdrown_attractor_z-player.position.z) / distance;
			}
		}
	}

	else if (cut >= CUT_CUTSCENE_MAGNETDROWN && cut <= CUT_CUTSCENE_MAGNETDROWN+48)
	{
		// at the start of the cut
		if (cutscene_magnetdrown_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			cutscene_magnetdrown_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DARK_GANDALF] = 1;
		character_turned_on[CAR_MRS_SUPERCONDUCTOR] = 1;
		character_turned_on[CAR_HARASS] = 1;
		character_turned_on[CAR_DADDY] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_OMALLEY] = 1;

		place_character_in_room(character[CAR_DARK_GANDALF], "n");
		place_character_in_room(character[CAR_MRS_SUPERCONDUCTOR], "s");
		place_character_in_room(character[CAR_HARASS], "ne");
		place_character_in_room(character[CAR_DADDY], "nw");
		place_character_in_room(character[CAR_ADELE], "w");
		place_character_in_room(character[CAR_OMALLEY], "e");
	}

	else if (cut === CUT_FREEROAM_GOINGHOME)
	{
		// at the start of the cut
		if (freeroam_goinghome_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_HARASS].position.x = 1429;
			character[CAR_HARASS].position.z = 1961+2;
			character[CAR_ADELE].position.x = 1429;
			character[CAR_ADELE].position.z = 1961+4;
			character[CAR_DARK_GANDALF].position.x = 1429;
			character[CAR_DARK_GANDALF].position.z = 1961+5;

			character_goal_array_x = [ 1426, 1429, 1438, 1451, 1461, 1480, 1507, 1508, 1508, 1511, 1521, 1529, 1540, 1567, 1580, 1598, 1642, 1686 ];
			character_goal_array_z = [ 1964, 1961, 1981, 1975, 1965, 1957, 1949, 1932, 1908, 1893, 1889, 1883, 1882, 1883, 1884, 1877, 1853, 1840 ];
			character_goal_lap[CAR_DARK_GANDALF] = 0;
			character_goal_lap[CAR_HARASS] = 0;
			character_goal_lap[CAR_ADELE] = 0;

			freeroam_goinghome_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_DARK_GANDALF] = 1;
		character_turned_on[CAR_HARASS] = 1;
		character_turned_on[CAR_ADELE] = 1;

		character_goal_x[CAR_DARK_GANDALF] = character_goal_array_x[character_goal_lap[CAR_DARK_GANDALF]];
		character_goal_z[CAR_DARK_GANDALF] = character_goal_array_z[character_goal_lap[CAR_DARK_GANDALF]];
		character_goal_x[CAR_HARASS] = character_goal_array_x[character_goal_lap[CAR_HARASS]];
		character_goal_z[CAR_HARASS] = character_goal_array_z[character_goal_lap[CAR_HARASS]];
		character_goal_x[CAR_ADELE] = character_goal_array_x[character_goal_lap[CAR_ADELE]];
		character_goal_z[CAR_ADELE] = character_goal_array_z[character_goal_lap[CAR_ADELE]];

		if (character_goal_lap[CAR_DARK_GANDALF] >= character_goal_array_x.length) { character_goal_x[CAR_DARK_GANDALF] = character[CAR_DARK_GANDALF].position.x; character_goal_z[CAR_DARK_GANDALF] = character[CAR_DARK_GANDALF].position.z; }
                else if (distance_get_xz(character[CAR_DARK_GANDALF].position.x,character[CAR_DARK_GANDALF].position.z, character_goal_array_x[character_goal_lap[CAR_DARK_GANDALF]],character_goal_array_z[character_goal_lap[CAR_DARK_GANDALF]]) < 3) character_goal_lap[CAR_DARK_GANDALF]++;
		if (character_goal_lap[CAR_HARASS] >= character_goal_array_x.length) { character_goal_x[CAR_HARASS] = character[CAR_HARASS].position.x; character_goal_z[CAR_HARASS] = character[CAR_HARASS].position.z; }
                else if (distance_get_xz(character[CAR_HARASS].position.x,character[CAR_HARASS].position.z, character_goal_array_x[character_goal_lap[CAR_HARASS]],character_goal_array_z[character_goal_lap[CAR_HARASS]]) < 3) character_goal_lap[CAR_HARASS]++;
		if (character_goal_lap[CAR_ADELE] >= character_goal_array_x.length) { character_goal_x[CAR_ADELE] = character[CAR_ADELE].position.x; character_goal_z[CAR_ADELE] = character[CAR_ADELE].position.z; }
                else if (distance_get_xz(character[CAR_ADELE].position.x,character[CAR_ADELE].position.z, character_goal_array_x[character_goal_lap[CAR_ADELE]],character_goal_array_z[character_goal_lap[CAR_ADELE]]) < 3) character_goal_lap[CAR_ADELE]++;

		sprite_carclubfire.visible = true;	// var/när stänger jag av den igen (.visible = false)?!!
		sprite_carclubfire.position.set(carclub_position_x, height_get(sprite_carclubfire)+1, carclub_position_z);

		if (distance_get(player, sprite_carclubfire) < 10) ts_end(CUT_FREEROAM_CARCLUBFIRE);
	}

	else if (cut === CUT_FREEROAM_CARCLUBFIRE)
	{
		// at the start of the cut
		if (freeroam_carclubfire_started === false)
		{
			music_play("morning_birds.mp3", 0.17);

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			character[CAR_HARASS].position.x = carclub_position_x+2;
			character[CAR_HARASS].position.z = carclub_position_z+3;
			character[CAR_DARK_GANDALF].position.x = carclub_position_x+4;
			character[CAR_DARK_GANDALF].position.z = carclub_position_z+3;
			character[CAR_ADELE].position.x = carclub_position_x+1;
			character[CAR_ADELE].position.z = carclub_position_z+3;
			character[CAR_OMALLEY].position.x = carclub_position_x+5;
			character[CAR_OMALLEY].position.z = carclub_position_z+3;

			freeroam_carclubfire_started = true;
		}

		// during the whole cut
		character_turned_on[CAR_HARASS] = 1;
		character_turned_on[CAR_DARK_GANDALF] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_OMALLEY] = 1;

		// characterss stand still
		for (let t = 0; t < NUMBER_OF_CARS; t++)
		{
			character_goal_x[t] = character[t].position.x;
			character_goal_z[t] = character[t].position.z;
		}

		if (distance_get_xz(player.position.x,player.position.z, carclub_position_x,carclub_position_z) < 6)
		{
			sprite_ui_mouseclick.visible = true;
			if (mouseclick) ts_end(CUT_CUTSCENE_MEETING_4);
		}
	}

	else if (cut >= CUT_CUTSCENE_MEETING_4 && cut <= CUT_CUTSCENE_MEETING_4+48)
	{
		// at the start of the cut
		if (cutscene_meeting_4_started === false)
		{
			music_play("music_carclub.mp3", 0.43);

			room_set("roomwall carclubfire.jpg", "roomfloor carclubfire.jpg");

			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			cutscene_meeting_4_started = true;
		}

		character_turned_on[CAR_DARK_GANDALF] = 1;
		character_turned_on[CAR_ADELE] = 1;
		character_turned_on[CAR_DOGERT] = 1;
		character_turned_on[CAR_HARASS] = 1;

		// during the whole cut
		room.visible = true;
		player.position.set(room.position.x, room.position.y-0.5, room.position.z);
		place_character_in_room(character[CAR_DARK_GANDALF], "n");
		place_character_in_room(character[CAR_ADELE], "e");
		place_character_in_room(character[CAR_DOGERT], "w");
		place_character_in_room(character[CAR_HARASS], "s");
	}

	else if (cut === CUT_FREEROAM_KILLEPPER)
	{
		// at the start of the cut
		if (gameplay_killepper_started === false)
		{
			player.position.y = height_get(player);	// temporär!!

			gameplay_killepper_started = true;
		}

		// during the whole cut
		sprite_killepper_audience.visible = true;
		sprite_killepper_stage.visible = true;

		sprite_killepper_audience.position.set(gameplay_killepper_position_x, height_get(sprite_killepper_audience), gameplay_killepper_position_z);
		sprite_killepper_stage.position.set(gameplay_killepper_position_x+10, height_get(sprite_killepper_stage), gameplay_killepper_position_z);

		if (distance_get(player, sprite_epperhouse) < COLLISION_DISTANCE) ts_end(CUT_FREEROAM_DISONESTY);

		if (key_s && gameplay_killepper_bomb_timer <= 0)
		{
			if (player.position.y > (height_get(player)+5))
			{
				sprite_killepper_bomb.position.set(player.position.x, player.position.y, player.position.z);
				gameplay_killepper_bomb_timer = 400;
			}
			else	cut_pers(sprite[CAR_ADELE],		"We're too low, man");
		}

		if (gameplay_killepper_bomb_timer > 0)
		{
			// gravity
			if (sprite_killepper_bomb.position.y > height_get(sprite_killepper_bomb)) sprite_killepper_bomb.position.y -= 0.1;

			gameplay_killepper_bomb_timer--;
		}
	}

	else if (cut === CUT_FREEROAM_5)
	{
		if (distance_get(player, sprite_carclub) < COLLISION_DISTANCE) ts_end(CUT_CUTSCENE_MEETING_5);
	}

	else if (cut >= CUT_CUTSCENE_MEETING_5 && cut <= CUT_CUTSCENE_MEETING_5+48)
	{
		// at the start of the cut, set textures of room and show it. then hide all characters, then show all relevant characters
		if (cutscene_meeting_5_started === false)
		{
			room_set("roomwall t.jpg", "woodenfloor.jpg");
			room.visible = true;
			for (let t = 0; t < NUMBER_OF_CARS; t++) character_turned_on[t] = 0;

			cutscene_meeting_5_started = true;
		}

		// during the whole cut, place player and characters in room
		player.position.set(room.position.x, room.position.y-0.5, room.position.z);
	//	sprite[CAR_DADDY].position.set(room.position.x-1.2, room.position.y, room.position.z);
	//	sprite[CAR_ADELE].position.set(room.position.x-1, room.position.y, room.position.z-1);
	//	sprite_foto.position.set(room.position.x+1, room.position.y, room.position.z+1);
	}

	else if (cut === CUT_FREEROAM_SVINERI_1)
	{
		if (distance_get(player, sprite_auction) < COLLISION_DISTANCE) ts_end(CUT_FREEROAM_AUCTION);
	}

	else if (cut === CUT_FREEROAM_AUCTION)
	{
	}

	else if (cut === CUT_FREEROAM_SVINERI_2)
	{
		// dessa är lite röriga pga är till för test. gör riktigt!!
		sprite_harassfan_start.visible = true;
		sprite_harassfan_start.position.set(gameplay_harassfan_position_x, height_get(sprite_harassfan_start), gameplay_harassfan_position_z);

		if (distance_get(player, sprite_harassfan_start) < 5) ts_end(CUT_FREEROAM_HARASSFAN);
	}

	else if (cut === CUT_FREEROAM_HARASSFAN)
	{
		// at the start of the cut, set player's and characters' positions
		if (gameplay_harassfan_started === false)
		{
		//	player.position.set(		gameplay_harassfan_position_x, player.position.y, 	gameplay_harassfan_position_z);
			character[0].position.set(	gameplay_harassfan_position_x-10,character[0].position.y, gameplay_harassfan_position_z-1);
			character[1].position.set(	gameplay_harassfan_position_x-10,character[1].position.y, gameplay_harassfan_position_z+1);

			scene.add(sprite_wheel);
			sprite_wheel.visible = true;

			gameplay_harassfan_started = true;
		}

		// during the whole cut

		// attach sprites to cars
		shelf.position.set(			player.position.x, 	player.position.y, 	player.position.z);
		bak_shelf.position.set(			player.position.x, 	player.position.y+0.3, 	player.position.z);
		sprite[CAR_HARASS].position.set(		character[0].position.x, character[0].position.y+0.5, character[0].position.z);
		sprite_bak[CAR_HARASS].position.set(		character[0].position.x, character[0].position.y+0.5, character[0].position.z);
		sprite_harassfan.position.set(		character[1].position.x, character[1].position.y+0.2, character[1].position.z);
	//	sprite_harassfan_bak.position.set(	character[1].position.x, character[1].position.y+0.2, character[1].position.z);

		// set characters' goal target
		if (frame_counter % 300 === 0)
		{
			// hårass
			character_goal_x[0] = gameplay_harassfan_position_x + 3*(Math.random()-0.5);
			character_goal_z[0] = gameplay_harassfan_position_z + 3*(Math.random()-0.5);

			// hårass' fan
			character_goal_x[1] = gameplay_harassfan_position_x + 3*(Math.random()-0.5);
			character_goal_z[1] = gameplay_harassfan_position_z + 3*(Math.random()-0.5);
		}

		// during the whole cut
		cut_pers(sprite[CAR_HARASS],		"Hårass health: " + gameplay_harassfan_harass_health);
		cut_pers(sprite[CAR_HARASS],		"Fan health: " + gameplay_harassfan_fan_health);

		// if player get shot, bounce back object
		if (distance_get(player, sprite_harassfan_fanbullet) < 0.5) sprite_harassfan_fanbullet.rotation.y += Math.PI;

		if (distance_get(character[0], sprite_harassfan_fanbullet) < 0.5) gameplay_harassfan_harass_health--;
		if (distance_get(character[1], sprite_harassfan_harassbullet) < 0.5) gameplay_harassfan_fan_health--;
		if (distance_get(character[1], sprite_harassfan_fanbullet) < 0.5) gameplay_harassfan_fan_health -= 2;	// fan gets "hit" by his own bullet, when he shoots them. becathey start at his position. fix!!

		// hårass shoots
		if (Math.random() > 0.9 && gameplay_harassfan_harass_shottimer <= 0) gameplay_harassfan_harass_shottimer = 120;
		if (gameplay_harassfan_harass_shottimer <= 0)
		{
			sprite_harassfan_harassbullet.position.set(character[0].position.x, character[0].position.y, character[0].position.z);
			sprite_harassfan_harassbullet.lookAt(character[1].position.x, sprite_harassfan_harassbullet.position.y, character[1].position.z);
		}
		else
		{
			sprite_harassfan_harassbullet.translateZ(bullet_speed);
			gameplay_harassfan_harass_shottimer--;
		}

		// fan shoots
		if (Math.random() > 0.9 && gameplay_harassfan_fan_shottimer <= 0) gameplay_harassfan_fan_shottimer = 120;
		if (gameplay_harassfan_fan_shottimer <= 0)
		{
			sprite_harassfan_fanbullet.position.set(character[1].position.x, character[1].position.y, character[1].position.z);
			if (Math.random() > 0.5) sprite_harassfan_fanbullet.lookAt(character[0].position.x, sprite_harassfan_fanbullet.position.y, character[0].position.z);
			else sprite_harassfan_fanbullet.lookAt(player.position.x, sprite_harassfan_fanbullet.position.y, player.position.z);
		}
		else
		{
			sprite_harassfan_fanbullet.translateZ(bullet_speed);
			gameplay_harassfan_fan_shottimer--;
		}

		// gameplay_harassfan_started måste sättas till false i slutet av cut:en!!
		// scend.remove(sprite_wheel) i slutet!!
	}

	else if (cut === CUT_FREEROAM_MAGNETFACTORY)
	{
		sprite_magnetfactory_lift.visible = true;

		sprite_magnetfactory_lift.position.set(freeroam_magnetfactory_position_x, sprite_magnetfactory_lift.position.y, freeroam_magnetfactory_position_z);

		// attracted by the magnet thing
		if (distance_get_xz(player.position.x,player.position.z, freeroam_magnetfactory_attractor_x,freeroam_magnetfactory_attractor_z) < 5*COLLISION_DISTANCE)
		{
			player.position.set(freeroam_magnetfactory_attractor_x, player.position.y, freeroam_magnetfactory_attractor_z);
		}
		else
		{
			let distance = distance_get_xz(player.position.x,player.position.z, freeroam_magnetfactory_attractor_x,freeroam_magnetfactory_attractor_z);
			player.position.x += 0.02 * (freeroam_magnetfactory_attractor_x-player.position.x) / distance;
			player.position.z += 0.02 * (freeroam_magnetfactory_attractor_z-player.position.z) / distance;
		}

		if (distance_get(player, sprite_magnetfactory_lift) < 2*COLLISION_DISTANCE)
		{
			if (sprite_magnetfactory_lift.position.y < 20) sprite_magnetfactory_lift.position.y += 0.03;
			player.position.y = sprite_magnetfactory_lift.position.y;
		}
		else if (sprite_magnetfactory_lift.position.y > height_get(sprite_magnetfactory_lift)) sprite_magnetfactory_lift.position.y -= 0.03;
		else if (sprite_magnetfactory_lift.position.y <= height_get(sprite_magnetfactory_lift)) sprite_magnetfactory_lift.position.y = height_get(sprite_magnetfactory_lift);

	//	maglev_check(player, 1);
		for (let t = 0; t < NUMBER_OF_CARS; t++)
		{
			if (character_turned_on[t])
			{
			//	if (character[t].position.y < sealevel+1) maglev_check(character[t], -1);
			}
		}
	}

	// attach sprites to cars
	if (cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		shelf.position.set(			player.position.x, 	player.position.y, 	player.position.z);
		bak_shelf.position.set(			player.position.x, 	player.position.y+0.3, 	player.position.z);
		sprite_shelfstyle_car1.position.set(	player.position.x, 	player.position.y, 	player.position.z);
		sprite_shelfstyle_clothes1.position.set(player.position.x, 	player.position.y+0.3, 	player.position.z);
		sprite_shelfstyle_car2.position.set(	player.position.x, 	player.position.y, 	player.position.z);
		sprite_shelfstyle_clothes2.position.set(player.position.x, 	player.position.y+0.3, 	player.position.z);

		if (shelfesteem < 20)
		{
			shelf.visible = true;
			bak_shelf.visible = true;
			sprite_shelfstyle_car1.visible = false;
			sprite_shelfstyle_clothes1.visible = false;
			sprite_shelfstyle_car2.visible = false;
			sprite_shelfstyle_clothes2.visible = false;
		}
		else if (shelfesteem < 50)
		{
			shelf.visible = false;
			bak_shelf.visible = false;
			sprite_shelfstyle_car1.visible = true;
			sprite_shelfstyle_clothes1.visible = true;
			sprite_shelfstyle_car2.visible = false;
			sprite_shelfstyle_clothes2.visible = false;
		}
		else
		{
			shelf.visible = false;
			bak_shelf.visible = false;
			sprite_shelfstyle_car1.visible = false;
			sprite_shelfstyle_clothes1.visible = false;
			sprite_shelfstyle_car2.visible = true;
			sprite_shelfstyle_clothes2.visible = true;
		}
	}

	sprite[CAR_ADELE].position.set(			character[CAR_ADELE].position.x, 	character[CAR_ADELE].position.y+0.5, 		character[CAR_ADELE].position.z);
	sprite_bak[CAR_ADELE].position.set(		character[CAR_ADELE].position.x, 	character[CAR_ADELE].position.y+0.5, 		character[CAR_ADELE].position.z);
	sprite[CAR_DARK_GANDALF].position.set(		character[CAR_DARK_GANDALF].position.x, character[CAR_DARK_GANDALF].position.y+0.3, 	character[CAR_DARK_GANDALF].position.z);
	sprite_bak[CAR_DARK_GANDALF].position.set(	character[CAR_DARK_GANDALF].position.x, character[CAR_DARK_GANDALF].position.y+0.3, 	character[CAR_DARK_GANDALF].position.z);
	sprite[CAR_DADDY].position.set(			character[CAR_DADDY].position.x, 	character[CAR_DADDY].position.y+0.3, 		character[CAR_DADDY].position.z);
	sprite_bak[CAR_DADDY].position.set(		character[CAR_DADDY].position.x, 	character[CAR_DADDY].position.y+0.3, 		character[CAR_DADDY].position.z);
	sprite[CAR_DOGERT].position.set(		character[CAR_DOGERT].position.x, 	character[CAR_DOGERT].position.y+0.3, 		character[CAR_DOGERT].position.z);
	sprite_bak[CAR_DOGERT].position.set(		character[CAR_DOGERT].position.x, 	character[CAR_DOGERT].position.y+0.3, 		character[CAR_DOGERT].position.z);
	sprite[CAR_OMALLEY].position.set(		character[CAR_OMALLEY].position.x, 	character[CAR_OMALLEY].position.y+0.2, 		character[CAR_OMALLEY].position.z);
	sprite_bak[CAR_OMALLEY].position.set(		character[CAR_OMALLEY].position.x, 	character[CAR_OMALLEY].position.y+0.2, 		character[CAR_OMALLEY].position.z);
	sprite[CAR_HARASS].position.set(		character[CAR_HARASS].position.x, 	character[CAR_HARASS].position.y+0.5, 		character[CAR_HARASS].position.z);
	sprite_bak[CAR_HARASS].position.set(		character[CAR_HARASS].position.x, 	character[CAR_HARASS].position.y+0.5, 		character[CAR_HARASS].position.z);
	sprite[CAR_DISONESTY].position.set(		character[CAR_DISONESTY].position.x, 	character[CAR_DISONESTY].position.y+0.5,	character[CAR_DISONESTY].position.z);
	sprite_bak[CAR_DISONESTY].position.set(		character[CAR_DISONESTY].position.x, 	character[CAR_DISONESTY].position.y+0.5,	character[CAR_DISONESTY].position.z);
	sprite[CAR_OMALLEY].position.set(		character[CAR_OMALLEY].position.x, 	character[CAR_OMALLEY].position.y+0.25, 	character[CAR_OMALLEY].position.z);
	sprite_bak[CAR_OMALLEY].position.set(		character[CAR_OMALLEY].position.x, 	character[CAR_OMALLEY].position.y+0.25, 	character[CAR_OMALLEY].position.z);
	sprite[CAR_MRS_SUPERCONDUCTOR].position.set(	character[CAR_MRS_SUPERCONDUCTOR].position.x, character[CAR_MRS_SUPERCONDUCTOR].position.y+0.5, character[CAR_MRS_SUPERCONDUCTOR].position.z);
	sprite_bak[CAR_MRS_SUPERCONDUCTOR].position.set(character[CAR_MRS_SUPERCONDUCTOR].position.x, character[CAR_MRS_SUPERCONDUCTOR].position.y+0.5, character[CAR_MRS_SUPERCONDUCTOR].position.z);
	sprite[CAR_POLISH_COW].position.set(		character[CAR_POLISH_COW].position.x, 	character[CAR_POLISH_COW].position.y+0.5, 	character[CAR_POLISH_COW].position.z);
	sprite_bak[CAR_POLISH_COW].position.set(	character[CAR_POLISH_COW].position.x, 	character[CAR_POLISH_COW].position.y+0.5, 	character[CAR_POLISH_COW].position.z);
	sprite[CAR_EPPER].position.set(			character[CAR_EPPER].position.x, 	character[CAR_EPPER].position.y+0.65, 		character[CAR_EPPER].position.z);
	sprite_bak[CAR_EPPER].position.set(		character[CAR_EPPER].position.x, 	character[CAR_EPPER].position.y+0.65, 		character[CAR_EPPER].position.z);

	sprite[CAR_TURF].position.set(			character[CAR_TURF].position.x, 		character[CAR_TURF].position.y+0.7, 		character[CAR_TURF].position.z);
	sprite_bak[CAR_TURF].position.set(		character[CAR_TURF].position.x, 		character[CAR_TURF].position.y+0.7, 		character[CAR_TURF].position.z);
	sprite[CAR_NUBBS].position.set(			character[CAR_NUBBS].position.x, 	character[CAR_NUBBS].position.y+0.7, 		character[CAR_NUBBS].position.z);
	sprite_bak[CAR_NUBBS].position.set(		character[CAR_NUBBS].position.x, 	character[CAR_NUBBS].position.y+0.7, 		character[CAR_NUBBS].position.z);

	// sprite direction
	let diffr;
	for (let t = 0; t < NUMBER_OF_CARS; t++)
	{
		// show colored faraway_cylinders for characters that are far away
		for (let t = 0; t < NUMBER_OF_CARS; t++)
		{
			if (character_turned_on[t] === 1)
			{
				let cdist = distance_get(player, character[t]);

				// when faraway cylinder is visible, turn off its character. and vice versa
				if (cdist > 20)
				{
					faraway_cylinder[t].visible = true;
					character[t].visible = false;

					sprite[t].visible = false;
					sprite_bak[t].visible = false;
				}
				else
				{
					faraway_cylinder[t].visible = false;
					character[t].visible = true;

					// sprite direction
					diffr = rotation_real_get(rotation_real_get(player.rotation.y) - rotation_real_get(character[t].rotation.y));

					// CUTSCENE
					if (cut % MODULUS_FREEROAM_OR_RACE !== 0)
					{
						sprite[t].visible = true;
						sprite_bak[t].visible = false;
					}
					// not CUTSCENE
					else
					{
						if (diffr > 0.5*Math.PI && diffr < 1.5*Math.PI)
						{
							sprite[t].visible = true;
							sprite_bak[t].visible = false;
						}
						else
						{
							sprite[t].visible = false;
							sprite_bak[t].visible = true;
						}
					}
				}

				if (cdist >= 60 && cdist < 120)
				{
					faraway_cylinder[t].position.x = 0.5*(player.position.x + 0.5*(player.position.x + character[t].position.x));
					faraway_cylinder[t].position.z = 0.5*(player.position.z + 0.5*(player.position.z + character[t].position.z));
				}
				else if (cdist > 120 && cdist < 240)
				{
					faraway_cylinder[t].position.x = 0.5*(player.position.x + 0.5*(player.position.x + 0.5*(player.position.x + character[t].position.x)));
					faraway_cylinder[t].position.z = 0.5*(player.position.z + 0.5*(player.position.z + 0.5*(player.position.z + character[t].position.z)));
				}
				else
				{
					faraway_cylinder[t].position.x = character[t].position.x;
					faraway_cylinder[t].position.z = character[t].position.z;
				}

				faraway_cylinder[t].position.y = character[t].position.y + 51;
			}
			else
			{
				sprite[t].visible = false;
				sprite_bak[t].visible = false;
				character[t].visible = false;
			}
		}
	}

	// idle
	if (cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		if (frame_counter % 60 == 0)
		{
			for (let t = 0; t < NUMBER_OF_CARS; t++)
			{
				if (Math.random() > 0.8) character[t].position.y += 0.1;
			}
		}
	}

	//;; dialog & events
	switch (cut) {
// CUT_SPLASHSCREEN
case -2:

// CUT_SPLASHSCREEN_WAIT
break; case -1:

// CUT_PAUSEMENU
break; case -3:

// CUT_FREEROAM_INTRO
break; case 9990000:
ts_start();
ts_during();
switch (q) {
       case 0.25:	scene.fog.far += 10;
console.log("9990000");
break; case 0.5:	bet_pers(sprite[CAR_DADDY],		"Hello, I have one question. What's about all the gas coming out of the car's ass?");
break; case 1:		bet_pers(sprite[CAR_DOGERT],		"... THATS.THE.ASS.GAS.");
break; case 1.25:	bet_pers(sprite[CAR_DADDY],		"Yes I understand but how does it work? Can you explain it in your intellectual car mechanic language?");
break; case 1.75:	bet_pers(sprite[CAR_DOGERT],		"WHEN.CAR.EATS.FOOD.ITS.ASS.GO.FARTY.FARTY.");
break; case 2:		bet_pers(sprite[CAR_DADDY],		"Okay, but why can't the gas just stay inside the car?");
break; case 2.25:	bet_pers(sprite[CAR_DADDY],		"Wouldn't it have more fuel if it didn’t fart it out all the time?");
break; case 2.75:	bet_pers(sprite[CAR_DOGERT],		"ACTUALLY.THATS.A.PRETTY.GOOD.IDEA.EXCEPT.WE.WOULD.DIE.");
break; case 3:		bet_pers(sprite[CAR_DADDY],		"Yes, it's just that one complication.");
break; case 3.25:	bet_pers(sprite[CAR_DOGERT],		"THE.ASS.GAS.IS.ALSO.IMPORTANT.FOR.THE.NATURE. IT.IS.WARMER.WHEN.MUCH.CAR.GAS.IN.THE.AIR.");
break; case 3.75:	bet_pers(sprite[CAR_DOGERT],		"SINCE.CARS.WERE.INVENTED.WE.HAVE.MORE.SUMMER.LIKE.ON.PLANET.VENUS. HOT.HOT!");
break; case 4.25:	bet_pers(sprite[CAR_DOGERT],		"SOON.WE.WON’T.NEED.JACKETS.ANYMORE. PROBLEM.SOLVED.");
break; case 4.75:	bet_pers(sprite[CAR_DADDY],		"That's the last problem we needed to solve. After that everything is perfect.");
break; case 5.25:	ts_end(CUT_CUTSCENE_WAKEUP);
}

// CUT_CUTSCENE_WAKEUP
break; case 9990001:	cut_pers(sprite[CAR_DOGERT],		"HEY. WAKE.UP.SLEEPY.HEAD. TIME.TO.RACE.");
			document.getElementById("ui_mouse_click").style.visibility = "visible";
break; case 9990002:
			player.position.x = 1583;
			player.position.z = 1811;
			player.rotation.y = 0.37;
			document.getElementById("ui_mouse_click").style.visibility = "hidden";
			room.visible = false;
			ts_end(CUT_RACE_1);

// CUT_RACE_1
break; case 9990050:
if (race_state === RACE_BEFORE)
{
ts_start();
ts_during();
switch (q) {
       case 0.25:	bet_pers(sprite[CAR_ADELE],		"Wow, Shelf, you finally woke up after 6000 years! Welcome back from the coma!");
break; case 0.75:	bet_pers(sprite[CAR_DARK_GANDALF],	"I literally just said we're not going to do the coma joke. It isn't funny.");
break; case 1.25:	bet_pers(sprite[CAR_DARK_GANDALF],	"I see you're not that happy about racing today, Shelf. Falling asleep right at the starting line... What is happening to our youth?!");
break; case 1.75:	bet_pers(sprite[CAR_ADELE],		"I am though!! Can we go vroom with our cars now, Dogert?");
break; case 2.25:	bet_pers(sprite[CAR_DOGERT],		"SHELF, COME.TO.THE.GREEN.BALL. I.DONT.HAVE.ALL.DAY.");
}
}

if (race_state === RACE_DURING)
{
ts_start();
ts_during();
switch (q) {
       case 0.25:	bet_pers(sprite[CAR_DOGERT],		"HEY.GUYS.YOU.DRIVE.REALLY.WEIRD. YOU.MUST.PRACTICE.ALL.THE.TIME.NOW.");
break; case 0.75:	bet_pers(sprite[CAR_DOGERT],		"YOU.SEE.THE.GREEN.BALL? THATS.THE.RACING.BALL. PRESS.(W).AND.DRIVE.TO.IT.");
break; case 1.5:	bet_pers(sprite[CAR_DOGERT],		"ITS.SLOWER.TO.DRIVE.IN.GRASS.ITS.BECAUSE.IVE.PUT.SANDPAPER.IN.THE.GRASS");
break; case 2.25:	bet_pers(sprite[CAR_DOGERT],		"DRIVING.UPWARDS.IS.SLOW.AND.DOWNWARDS.IS.FAST.ITS.BECAUSE.OF.THE.HILL.FORMULA. NO.I.WONT.SAY.WHAT.THE.FORMULA.IS");
break; case 3:		bet_pers(sprite[CAR_DOGERT],		"IF.YOUR.CAR.SUCKS.MAYBE.ITS.NOT.THE.CAR.MAYBE.ITS.YOU.WHO.SUCKS.");
break; case 3.75:	bet_pers(sprite[CAR_DOGERT],		"COME.TO.ME.AFTER.THE.RACE.AND.REPAIR.THE.CAR. EVEN.IF.ITS.NOT.BROKEN.");
break; case 4.5:	bet_pers(sprite[CAR_DOGERT],		"IF.IM.NOT.IN.MY.WORKSHOP.IM.PROBABLY.OUT.GETTING.WOMEN.");
break; case 5.25:	bet_pers(sprite[CAR_DOGERT],		"IF.YOU.REMOVE.THE.ENGINE.WHILE.DRIVING.THE.CAR.WILL.STOP. IM.VERY.SORRY.BUT.THATS.HOW.IT.IS.");
break; case 6:		bet_pers(sprite[CAR_DOGERT],		"DONT.REMOVE.THE.WHEELS.BECAUSE.THEY.ARE.VERY.IMPORTANT.FOR.THE.CARS.SPEED");
break; case 6.75:	bet_pers(sprite[CAR_DOGERT],		"CARS.HAVE.EXISTED.FOR.OVER.100000.YEARS.I.INVENTED.THEM.");
break; case 7.5:	bet_pers(sprite[CAR_DOGERT],		"THE.GAS.PEDAL.IS.IMPORTANT.FOR.THE.CAR.AND.YOU.CANT.REMOVE.IT.");
break; case 8.25:	bet_pers(sprite[CAR_DOGERT],		"IF.THE.CAR.SUDDENLY.SLOWS.DOWN.IT.MIGHT.BE.BECAUSE.YOU.SUCK.AT.DRIVING.");
break; case 9:		bet_pers(sprite[CAR_DOGERT],		"WHEN.YOURE.CLOSE.TO.FINISH.SLOW.DOWN. HAHA.JUST.KIDDING.THATS.WHEN.YOU.GO.VROOOM.VROOOM.");
break; case 9.75:	bet_pers(sprite[CAR_DOGERT],		"REMEMBER.TO.ALWAYS.DRIVE.THE.CAR.WHILE.RACING.");
break; case 10.5:	bet_pers(sprite[CAR_DOGERT],		"IM.GETTING.MARRIED.LATER.TODAY. WANNA.COME?");
break; case 11.25:	bet_pers(sprite[CAR_DOGERT],		"BE.SURE.TO.CHECK.THE.OIL.EVERY.3.MINUTES.");
break; case 12:		bet_pers(sprite[CAR_DOGERT],		"BEWARE.OF.CAR.THIEVES. THEY.ARE.EVERYWHERE.AND.THEY.STEAL.CARS.");
break; case 12.75:	bet_pers(sprite[CAR_DOGERT],		"HERES.A.TIP. DONT.OVERTHINK.STUFF.TOO.MUCH.");
break; case 13.5:	bet_pers(sprite[CAR_DOGERT],		"BE.SURE.TO.NOT.REMOVE.THE.STEERING.WHEEL.WHILE.DRIVING.");
break; case 14.25:	bet_pers(sprite[CAR_DOGERT],		"MY.MOTHER.DIED.FROM.HORRIFIC.DISEASES.A.LONG.TIME.AGO. IM.SO.GLAD.SHE.SURVIED.");
break; case 15:		bet_pers(sprite[CAR_DOGERT],		"THE.WHEELS.MUST.BE.UNDER.THE.CAR.IN.ORDER.FOR.THEM.TO.ROLL. ITS.CALLED.THE.GROUND.ROLL.EFFECT.");
break; case 15.75:	bet_pers(sprite[CAR_DOGERT],		"PLEASE.WEAR.HELMET.2.TO.3.DAYS.AFTER.IVE.REPAIRED.YOUR.CAR.");
break; case 16.5:	bet_pers(sprite[CAR_DOGERT],		"STATISTIC.SAYS.THAT.YOU.SUCK.AT.DRIVING.");
break; case 17.25:	bet_pers(sprite[CAR_DOGERT],		"IM.THE.ONLY.CAR.MECHANIC.IN.THIS.TOWN.BECAUSE.I.KILLED.ALL.THE.OTHERS");
}
}

// CUT_RACE_1_AFTER
break; case 9990100:
ts_start();
ts_during();
if (character_leader === PLAYER)
{
switch (q) {
       case 0:		bet_pers(sprite[CAR_ADELE],		"Wow! How did you make your car go so fast, Shelf?");
break; case 0.25:	bet_pers(sprite[CAR_DARK_GANDALF],	"Bah. The gold medal is a symbol of capitalism and I'm glad I didn't get it.");
break; case 0.75:	bet_pers(sprite[CAR_DARK_GANDALF],	"Wait... SMS...");
break; case 1:		bet_pers(sprite[CAR_DARK_GANDALF],	"Guys. Emergency meeting. Club house.");
break; case 1.25:	bet_pers(sprite[CAR_ADELE],		"I think it's best we do what the gray dude said because his voice sounded scary.");
}
}
else if (character_leader === CAR_DARK_GANDALF)
{
switch (q) {
       case 0:		bet_pers(sprite[CAR_ADELE],		"Wow! How did you make your car go so slow, Shelf?");
break; case 0.25:	bet_pers(sprite[CAR_DARK_GANDALF],	"The gold medal is the true symbol of what you can achieve through the collective! Congrats to me!");
break; case 0.75:	bet_pers(sprite[CAR_DARK_GANDALF],	"Wait... ...");
break; case 1:		bet_pers(sprite[CAR_DARK_GANDALF],	"Guys. Emergency meeting. Club house.");
break; case 1.25:	bet_pers(sprite[CAR_ADELE],		"I think it's best we do what the gray dude said because his voice sounded scary.");
}
}
else
{
switch (q) {
       case 0:		bet_pers(sprite[CAR_ADELE],		"Wow! How did you make your car go so slow, Shelf?");
break; case 0.25:	bet_pers(sprite[CAR_DARK_GANDALF],	"Congrats to whoever won. I hate this game.");
break; case 0.75:	bet_pers(sprite[CAR_DARK_GANDALF],	"Wait... ...");
break; case 1:		bet_pers(sprite[CAR_DARK_GANDALF],	"Guys. Emergency meeting. Club house.");
break; case 1.25:	bet_pers(sprite[CAR_ADELE],		"I think it's best we do what the gray dude said because his voice sounded scary.");
}
}

// CUT_CUTSCENE_MEETING_1
break; case 1000001:	cut_pers(sprite[CAR_ADELE],		"Why the emergency meeting? Are we gonna die?");
break; case 1000002:	cut_pers(sprite[CAR_DARK_GANDALF],	"Almost. Look at this mail:");
break; case 1000003:	cut_pers(sprite[CAR_DARK_GANDALF],	"\"Dear organization. Fossil fuels will be banned in 10 years. Please re-think your fuel strategy. Or else!!! Signed, The Government.\"");
break; case 1000004:	cut_pers(sprite[CAR_ADELE],		"What?!");
break; case 1000005:	cut_pers(sprite[CAR_DARK_GANDALF],	"Exactly.");
break; case 1000006:	cut_pers(sprite[CAR_DOGERT],		"THAT.SUCKS. PEOPLE.ARE.OUT.OF.THEIR.MINDS.THESE.DAYS.");
break; case 1000007:	cut_pers(sprite[CAR_ADELE],		"How do they even know about us? We're a secret underground club!");
break; case 1000008:	cut_pers(sprite[CAR_DARK_GANDALF],	"Maybe because we have illegal street races out in public almost every day?");
break; case 1000009:	cut_pers(sprite[CAR_DOGERT],		"FOSSIL.FUEL.HELPS.INCREASING.THE.NICE.WARMTH.ON.EARTH. SO.WHY.ARE.THEY.EVEN.MAD.");
break; case 1000010:	cut_pers(sprite[CAR_DARK_GANDALF],	"That's a good question. People seem to have problems with our lifestyle.");
break; case 1000011:	cut_pers(sprite[CAR_ADELE],		"Does this mean we have to shut the club down?");
break; case 1000012:	cut_pers(sprite[CAR_DARK_GANDALF],	"Or, we can switch to electrical cars.");
break; case 1000013:	cut_pers(sprite[CAR_ADELE],		"...");
break; case 1000014:	cut_pers(sprite[CAR_ADELE],		"Hahahaha");
break; case 1000015:	cut_pers(sprite[CAR_DARK_GANDALF],	"Hahahaha");
break; case 1000016:	cut_pers(sprite[CAR_ADELE],		"This sucks... Can't we restart the club at your place?");
break; case 1000017:	cut_pers(sprite[CAR_DARK_GANDALF],	"You mean over at the LAND OF DARKNESS?");
break; case 1000018:	cut_pers(sprite[CAR_ADELE],		"Yes, or Haftlan-Drakh, which is what it's actually called.");
break; case 1000019:	cut_pers(sprite[CAR_DARK_GANDALF],	"Let me tell you a bit about the communistic utopia that is the LAND OF DARKNESS!");
break; case 1000020:	cut_pers(sprite[CAR_ADELE],		"No");
break; case 1000021:	cut_pers(sprite[CAR_DARK_GANDALF],	"...");
break; case 1000022:	cut_pers(sprite[CAR_ADELE],		"I don't want the club to end!! Then our friendships will end too!");
break; case 1000023:	cut_pers(sprite[CAR_DARK_GANDALF],	"That's true. Well, there's nothing we can do.");
break; case 1000024:	cut_pers(sprite[CAR_DOGERT],		"WHEN.CAN.I.LEAVE.");
break; case 1000025:	room.visible = false;
			ts_end(CUT_FREEROAM_0);

// CUT_FREEROAM_0
break; case 1000100:
ts_start();
ts_during();
switch (q) {
       case 0.25:	bet_pers(sprite[CAR_ADELE],		"Shelf, time for sad biceps curls... I'll be over a the gym being sad, join if you want...");
}

// CUT_FREEROAM_GYM
break; case 1002000:
ts_start();
ts_during();
switch (q) {
       case 0:		bet_pers(sprite[CAR_ADELE],		"Okay, let's gym... I guess...");
break; case 0.5:	bet_pers(sprite[CAR_DADDY],		"Excuse me, do you know how to use this machine? Or wait, maybe like this.");
break; case 1:		bet_pers(sprite[CAR_DADDY],		"Let's see, gym gym gym, I'm gonna gym now, are there any interesting machines...");
break; case 1.25:	bet_pers(sprite[CAR_ADELE],		"Take it easy with that machine. It's very expensive.");
break; case 1.5:	bet_pers(sprite[CAR_DADDY],		"I broke it.");
			sound_punch.play();
			scene.remove(sprite_gym_thing_1);
			sprite_gym_thing_1_trash.position.set(sprite_gym_thing_1.position.x, sprite_gym_thing_1.position.y, sprite_gym_thing_1.position.z);
			scene.add(sprite_gym_thing_1_trash);
break; case 1.75:	bet_pers(sprite[CAR_ADELE],		"Who are you?? And why are you destroying everything?");
break; case 2:		bet_pers(sprite[CAR_DADDY],		"Oh, I'm glad you asked! Hello, I'm Daddy! I am a film maker, writer and photographer.");
			sound_punch.play();
			scene.remove(sprite_gym_thing_2);
			sprite_gym_thing_2_trash.position.set(sprite_gym_thing_2.position.x, sprite_gym_thing_2.position.y, sprite_gym_thing_2.position.z);
			scene.add(sprite_gym_thing_2_trash);
break; case 2.25:	bet_pers(sprite[CAR_ADELE],		"Daddy?");
break; case 2.5:	bet_pers(sprite[CAR_DADDY],		"Exactly. What I do in life is that I look for stories. What is your story?");
break; case 2.75:	bet_pers(sprite[CAR_ADELE],		"What?");
break; case 3:		bet_pers(sprite[CAR_DADDY],		"I'm always looking for characters. For my books, for my movies, I just love characters in general.");
break; case 3.25:	bet_pers(sprite[CAR_ADELE],		"Sounds really boring!");
break; case 3.5:	bet_pers(sprite[CAR_DADDY],		"So. I'm a storyteller, an-");
break; case 3.75:	bet_pers(sprite[CAR_DADDY],		"Do you even listen?");
break; case 4:		bet_pers(sprite[CAR_ADELE],		"Sure, I'll listen, \"Daddy\"...");
break; case 4.25:	bet_pers(sprite[CAR_DADDY],		"I'm a storyteller and a good way to get close to someone's story is through pain. What is your darkest secret?");
break; case 4.75:	bet_pers(sprite[CAR_ADELE],		"Um, maybe all the crimes?");
break; case 5:		bet_pers(sprite[CAR_DADDY],		"Crimes... Any specific crime you want to tell me about?");
break; case 5.25:	bet_pers(sprite[CAR_ADELE],		"Uh. Hard to choose a favorite... Maybe the illegal underground car club?");
break; case 5.75:	bet_pers(sprite[CAR_DADDY],		"Wow, an actual criminal bad guy... It feels like I'm in a movie right now!");
break; case 6:		bet_pers(sprite[CAR_DADDY],		"The car club sounds really interesting! Can I interview you and the rest of the club tomorrow?");
break; case 6.25:	bet_pers(sprite[CAR_ADELE],		"Uh...");
break; case 6.5:	bet_pers(shelf,				"Yes it's okay!! / Yeah do it!! I allow you to do it!");
break; case 6.75:	bet_pers(sprite[CAR_DADDY],		"Splendid! Well, see you tomorrow then, new friends!");
break; case 7:		bet_pers(sprite[CAR_ADELE],		"Okay, that's how it is now I guess...");
break; case 7.25:	room.visible = false;
			ts_end(CUT_FREEROAM_1);
}

// CUT_FREEROAM_1
break; case 1002500:
ts_start();
ts_during();
switch (q) {
       case 0.5:	bet_pers(sprite[CAR_DADDY],		"I really want some biscuits and sweets right now. Like, right right now. Can we munchie munchie?");
break; case 1:		bet_pers(sprite[CAR_DADDY],		"I can answer that question for you: \"Yes\". Let's go to the local bakery I'm ported from! Quickie quickie!");
break; case 1.5:	bet_pers(sprite[CAR_DADDY],		"Wait, I smell something. It smells goodie goodie. Mmmm nice. Let's drive towards the scent of yummy yummy yum instead. Hurry up!!");
break; case 2:		bet_pers(sprite[CAR_DADDY],		"Oh oh oh it's a muffins wowowow muffi muffi muffins I want to eat you little cute muffins!!");
break; case 2.5:	bet_pers(sprite[CAR_DADDY],		"This seems to be a plate with two muffins on it, so unfortunately I will need to eat both.");
break; case 3:		bet_pers(sprite[CAR_DADDY],		"...");
break; case 3.25:	bet_pers(sprite[CAR_DADDY],		"I have made a decision. I changed my mind. I will share one of the muffins with you, friend.");
}

// CUT_FREEROAM_1B
break; case 1002600:
ts_start();
ts_during();
switch (q) {
       case 0:		bet_pers(sprite[CAR_DADDY],		"Whaaaaat? It disappeared?!");
break; case 0.5:	bet_pers(sprite[CAR_DADDY],		"We must find it. I think I know where it went. Or not. But let's go this way.");
break; case 1:		bet_pers(sprite[CAR_DADDY],		"I can feel the amazing smell. We are close.");
}

// CUT_FREEROAM_1C
break; case 1002700:
ts_start();
ts_during();
switch (q) {
       case 0:		bet_pers(sprite[CAR_DADDY],		"Freaking god!! I thought I was supposed to get the muffins this time? And it tricked me again!");
break; case 0.5:	bet_pers(sprite[CAR_DADDY],		"But we can not give up. We have to continue searching. Now I actually saw where it went!");
}

// CUT_FREEROAM_1D
break; case 1002800:
ts_start();
ts_during();
switch (q) {
       case 0:		bet_pers(sprite[CAR_DADDY],		"I can't believe it. One. More. Time.");
break; case 0.5:	bet_pers(sprite[CAR_DADDY],		"But I still think we should try again. The muffin should be tired by now after all the teleporting.");
break; case 1:		bet_pers(sprite[CAR_DADDY],		"Maybe this way?");
}

// CUT_FREEROAM_1E
break; case 1002900:
ts_start();
ts_during();
switch (q) {
       case 0:		bet_pers(sprite[CAR_DADDY],		"Freakin!! I sincerly disdain this muffin. I want to commit homicide against it.");
break; case 0.5:	bet_pers(sprite[CAR_DADDY],		"Sigh... I can't believe who I've become. I'm usually so sensitive and artistic, and now I'm angry and mad!");
break; case 1:		bet_pers(sprite[CAR_DADDY],		"Sniff sniff, let's follow the smell. I love love love love muffins so much.");
}

// CUT_FREEROAM_1F
break; case 10029000:
ts_start();
ts_during();
switch (q) {
       case 0:		bet_pers(sprite[CAR_DADDY],		"... Bah.");
break; case 0.5:	bet_pers(sprite[CAR_DADDY],		"Are you starting to see a pattern too? All these dark patterns preying on the individual's want for yummy muffins... Sigh...");
break; case 1:		bet_pers(sprite[CAR_DADDY],		"But maybe the muffin is trying to tell us something? Is it leading us somewhere?");
break; case 1.25:	bet_pers(sprite[CAR_DADDY],		"I think it's leading us somewhere.");
}

// CUT_FREEROAM_EPPER
break; case 1003000:
ts_start();
ts_during();
switch (q) {
       case 0:		bet_pers(sprite[CAR_DADDY],		"Uh... Where are we?" );
break; case 0.5:	bet_pers(sprite[CAR_DADDY],		"One second ago I was reaching for a muffins, and now we're in a blue hell.");
break; case 1:		bet_pers(sprite[CAR_DADDY],		"I don't like blue hells. They limit me.");
break; case 1.75:	bet_pers(sprite[CAR_DADDY],		"I don't feel free when I'm inside blue fog.");
break; case 2.75:	bet_pers(sprite[CAR_DADDY],		"My creativity has completely plummeted since I've been inside this blue wonderland. Do you feel the same?");
break; case 3.5:	bet_pers(sprite[CAR_DADDY],		"It's certainly blue in here. Of that, you can't deny. So, where do we go?");
}

// CUT_CUTSCENE_EPPER
break; case 1007401:	cut_pers(sprite[CAR_EPPER],		"who's there, who's there? you two look like morons");
break; case 1007402:	cut_pers(sprite[CAR_OMALLEY],		"You can't start a conversation like that, 'Epper.");
break; case 1007403:	cut_pers(sprite[CAR_EPPER],		"yes i can of course i can");
break; case 1007404:	cut_pers(sprite[CAR_OMALLEY],		"Okay you get as you want, I guess... I'll just give up... As always...");
break; case 1007405:	cut_pers(sprite[CAR_DADDY],		"Hello. We're two humble gentlemen from a far away island. Can you tell us how to get out of this place?");
break; case 1007406:	cut_pers(sprite[CAR_OMALLEY],		"\"This place\"? You mean life?");
break; case 1007407:	cut_pers(sprite[CAR_DADDY],		"No, I meant this land of extremely blue color shade.");
break; case 1007408:	cut_pers(sprite[CAR_OMALLEY],		"Okay... So you've never felt like you just wanna... disappear?");
break; case 1007409:	cut_pers(sprite[CAR_DADDY],		"I felt it a bit yesterday but then I saw a funny dog");
break; case 1007410:	cut_pers(sprite[CAR_EPPER],		"sigh... sorry 'bout the irish badger. he is a bit of a \"thinker\".");
break; case 1007411:	cut_pers(sprite[CAR_DADDY],		"Yes, I noticed that. Actually, I'm a thinker too!");
break; case 1007412:	cut_pers(sprite[CAR_EPPER],		"irish badger, it's time for you to leave. i need a minute with these guys.");
break; case 1007413:	cut_pers(sprite[CAR_EPPER],		"so... read the news today? lots of cool stuff happening today apparently");
break; case 1007414:	cut_pers(sprite[CAR_EPPER],		"and by the way. just between you and me. don't let o'malley bother you. he is weak.");
break; case 1007415:	cut_pers(sprite[CAR_DADDY],		"What do you mean? He seems very annoying but how is he weak?");
break; case 1007416:	cut_pers(sprite[CAR_EPPER],		"he be the type of guy to get social anxiety by seeing his own mom in the grocery store");
break; case 1007417:	cut_pers(sprite[CAR_DADDY],		"Okay, that sounds like a classic example of an idiot.");
break; case 1007418:	cut_pers(sprite[CAR_EPPER],		"o'malley is weird. but he's great in his own... in some way i think");
break; case 1007419:	cut_pers(sprite[CAR_DADDY],		"I didn't get that feeling of him. To me, he feels like a lost case.");
break; case 1007420:	cut_pers(sprite[CAR_EPPER],		"he can't even cook food without losing his mind. he just stares at the cold food and then puts it back in the freezer");
break; case 1007421:	cut_pers(sprite[CAR_DADDY],		"Wow. Just wow.");
break; case 1007422:	cut_pers(sprite[CAR_EPPER],		"... mmyeah");
break; case 1007423:	cut_pers(sprite[CAR_EPPER],		"do you have any cash?");
break; case 1007424:	cut_pers(sprite[CAR_DADDY],		"Uhm, no. Why are you asking us that?");
break; case 1007425:	cut_pers(sprite[CAR_EPPER],		"you know, to get out of this blue island... you might need to pull out a small stack of greens, if you know what i MEAN");
break; case 1007426:	cut_pers(sprite[CAR_EPPER],		"such is the deal, bro");
break; case 1007427:	cut_pers(sprite[CAR_DADDY],		"I don't like that at all.");
break; case 1007428:	cut_pers(sprite[CAR_EPPER],		"now i’m closing my eyes. when i open them i want to see cash in my hand.");
break; case 1007429:	cut_pers(sprite[CAR_DADDY],		"Now you're using a rethoric teqhnique to take control over us. It's called \"blackmailing\" and is both unjuste and illegal.");
break; case 1007430:	cut_pers(sprite[CAR_EPPER],		"oh i am? i'm sorry. i mess up sometimes. i guess you can leave when you want.");
break; case 1007431:	cut_pers(sprite[CAR_DADDY],		"It's cool, man. Just be sure to think twice next time.");
break; case 1007432:	cut_pers(sprite[CAR_EPPER],		"...");
break; case 1007433:	cut_pers(sprite[CAR_DADDY],		"...");
			music_play("music_horror.mp3", 0.5, false);
break; case 1007434:	cut_pers(sprite[CAR_EPPER],		"do you ever leave your cars or are you stuck to them");
break; case 1007435:	cut_pers(sprite[CAR_DADDY],		"Sorry, we don't have time to talk anymore! See you later, shark!");
break; case 1007436:	ts_end(CUT_FREEROAM_OMALLEY);

// CUT_FREEROAM_OMALLEY
break; case 1008000:
ts_start();
ts_during();
switch (q) {
       case 0:		bet_pers(sprite[CAR_DADDY],		"Let's find a way out of here. I'm getting tired of this shark stuff.");
break; case 1:		bet_pers(sprite[CAR_OMALLEY],		"Can I come with you guys? Where are you going?");
break; case 1.5:	bet_pers(sprite[CAR_DADDY],		"In whatever direction takes us away from this place!");
break; case 2:		bet_pers(sprite[CAR_OMALLEY],		"Perfect, I'll follow you!");
break; case 2.25:	bet_pers(sprite[CAR_DADDY],		"We're leaving for good, you know. And I'm not sure if I like you, so... We'll see about that.");
break; case 2.75:	bet_pers(sprite[CAR_OMALLEY],		"But I hate it down here! 'Epper is a creepy shark and everything is blue. Please just take me somewhere!");
break; case 3.25:	bet_pers(sprite[CAR_DADDY],		"Hmm... Let me think. Shelf, should we ask Adele and Dark Gandalf first?");
break; case 3.75:	bet_pers(sprite[CAR_OMALLEY],		"Adele? Dark Gandalf?");
break; case 4:		bet_pers(sprite[CAR_DADDY],		"It's our club. But it's secret so we can't tell you about it.");
break; case 4.5:	bet_pers(sprite[CAR_OMALLEY],		"Wow, a club! So cool! I'm sooo longing for a community!");
break; case 5:		bet_pers(sprite[CAR_OMALLEY],		"Down here, I'm nobody. It's like I'm in a vacuum. I just want to be someone in relation to someone else.");
break; case 5.5:	bet_pers(sprite[CAR_OMALLEY],		"So a club sounds amazing. Let's fucking go!");
break; case 5.75:	bet_pers(sprite[CAR_DADDY],		"Hmm... I'm still thinking here... I haven't said anything about you joining yet.");
break; case 6.25:	bet_pers(shelf,				"Yes of course you can join us!!");
break; case 6.75:	bet_pers(sprite[CAR_DADDY],		"Okay, you can join us! I feel like being nice today!");
break; case 7.25:	bet_pers(shelf,				"I already let him in to the club, Daddy.");
break; case 7.75:	bet_pers(sprite[CAR_OMALLEY],		"Wow, so fun!! Thanks guys!");
break; case 8:		bet_pers(sprite[CAR_DADDY],		"Don't get too excited.");
break; case 8.25:	bet_pers(sprite[CAR_OMALLEY],		"I'm sorry...");
break; case 8.75:	bet_pers(sprite[CAR_DADDY],		"Okay, now we really have to find a way out of here.");

break; case 9.5:	bet_pers(sprite[CAR_OMALLEY],		"So... You guys like architecture?");
break; case 10:		bet_pers(sprite[CAR_DADDY],		"Hmm, yes, it can be interesting at times! Sometimes architecture says something ab-");
break; case 10.25:	bet_pers(sprite[CAR_OMALLEY],		"Then listen to this. What if you built a house made of gingerbread. In SPACE.");
break; case 10.75:	bet_pers(sprite[CAR_DADDY],		"It sounds impossible so I don't think you should do it.");
break; case 11.25:	bet_pers(sprite[CAR_OMALLEY],		"Okay, what about a house with walls made of grass where all people in it are really small and dance until sweet morning light comes?");
break; case 11.75:	bet_pers(sprite[CAR_OMALLEY],		"Also there's no floor.");
break; case 12:		bet_pers(sprite[CAR_DADDY],		"The only thing I can think about is... Why? Why would you do it?");
break; case 13.5:	bet_pers(sprite[CAR_OMALLEY],		"A school with soft walls you can bounce into and the roof is made of steel and gold.");
break; case 14:		bet_pers(sprite[CAR_OMALLEY],		"And the teachers are constantly angry at you and the pupils are Joe Biden's 500 forgotten sons that you for some reason can't mention in media?");
break; case 14.75:	bet_pers(sprite[CAR_DADDY],		"It feels illegal, so I would rather live in a world where that doesn't exist than in a world where it does.");
break; case 15.25:	bet_pers(sprite[CAR_OMALLEY],		"I'm just full of funny ideas, I guess...");
break; case 15.5:	bet_pers(sprite[CAR_OMALLEY],		"So what are your interests? You like doing fun things?");
break; case 15.75:	bet_pers(sprite[CAR_DADDY],		"...");
break; case 16.25:	bet_pers(sprite[CAR_OMALLEY],		"Okay I get it, I talk to much. I guess i'll just disappear.");
break; case 16.75:	bet_pers(sprite[CAR_EPPER],		"what up what up i wanna race or else ill kill you");
break; case 17.25:	bet_pers(sprite[CAR_EPPER],		"haha just joking. or am i?");
break; case 17.5:	ts_end(CUT_RACE_EPPER);
}

// CUT_RACE_EPPER
break; case 1007450:
if (race_state === RACE_DURING)
{
ts_start();
ts_during();
switch (q) {
       case 0.25:	bet_pers(sprite[CAR_EPPER],		"if you win you get to live");
break; case 0.75:	bet_pers(sprite[CAR_EPPER],		"if i win you get to die. fair?");
break; case 1.25:	bet_pers(sprite[CAR_EPPER],		"no matter what, omalley continues to live in plagues.");
break; case 1.75:	bet_pers(sprite[CAR_DADDY],		"Deal!");
}
}

// CUT_RACE_EPPER_AFTER
break; case 10074500:
ts_start();
ts_during();
if (character_leader === PLAYER || character_leader === CAR_DADDY)
{
switch (q) {
       case 0:		bet_pers(sprite[CAR_EPPER],		"gosh darn it, you won");
break; case 0.5:	bet_pers(sprite[CAR_EPPER],		"well then you get to live. but...");
break; case 1:		bet_pers(sprite[CAR_EPPER],		"ill make you feel so so bad while doing it. TURF N NUBBS!!");
break; case 1.5:	bet_pers(sprite[CAR_TURF],		"We're on it. Is it O'Malley again?");
break; case 1.75:	ts_end(CUT_FREEROAM_CARCHASE);
}
}
else
{
switch (q) {
       case 0:		bet_pers(sprite[CAR_EPPER],		"you know what, i changed my mind. i'm a changed human now. i mean, shark.");
break; case 0.5:	bet_pers(sprite[CAR_EPPER],		"i will let you live. no joke fully serious!");
break; case 1:		bet_pers(sprite[CAR_EPPER],		"so you doing anything later tonight?");
break; case 1.25:       ts_end(CUT_FREEROAM_MAGNETDAY);
}
}

// CUT_FREEROAM_CARCHASE
break; case 1007500:

// CUT_FREEROAM_MAGNETDAY
break; case 1009000:

// CUT_CUTSCENE_MAGNETDAY_1
break; case 1009001:	cut_pers(sprite_magnet1,		"Why do people keep taking my candy?");
break; case 1009002:	cut_pers(sprite_magnet1,		"Anyways, i'm a magnet kind of guy. 's just who i am.");
break; case 1009003:	cut_pers(sprite_magnet1,		"Haters hate but i prevail.");
break; case 1009004:	cut_pers(sprite_magnet1,		"So. My invention is somewhat polarizing among netizens.");
break; case 1009005:	cut_pers(sprite_magnet1,		"You just take a magnet, smack it in your head like this *smacks magnet into head*");
break; case 1009006:	cut_pers(sprite_magnet1,		"And you get a fucking headache for three weeks! Haha, am i not great??");
break; case 1009007:	ts_end(CUT_FREEROAM_MAGNETDAY);

// CUT_CUTSCENE_MAGNETDAY_2
break; case 1009051:	cut_pers(sprite_magnet2,		"Young man over there, would you mind to happen to like magnets very much?");
break; case 1009052:	cut_pers(shelf,				"are magnets the theme of the year or what? only fucking thing you talk about.");
break; case 1009053:	cut_pers(sprite_magnet2,		"No! Magnets are just what everybody naturally likes. It's what's cool.");
break; case 1009054:	cut_pers(sprite_magnet2,		"When you let conversations flow freely on parties, they gravitate toward magnet-related subjects.");
break; case 1009055:	cut_pers(shelf,				"no they don't");
break; case 1009056:	cut_pers(sprite_magnet2,		"Shut up and look at this now, this is revolutionary, so so revolutionary.");
break; case 1009057:	cut_pers(sprite_magnet2,		"Look, i have a revolutionary idea that could revolutionize entire revolutions if you so wanted.");
break; case 1009058:	cut_pers(shelf,				"what is it");
break; case 1009059:	cut_pers(sprite_magnet2,		"Why not make food out of magnets? They look so delicious. yummy!");
break; case 1009060:	cut_pers(sprite_magnet2,		"I think it's the next thing. Magnets are the new black.");
break; case 1009061:	cut_pers(shelf,				"i'm sceptical");
break; case 1009062:	cut_pers(sprite_magnet2,		"Fancy a magnet? *räcker fram magnet*");
break; case 1009063:	ts_end(CUT_FREEROAM_MAGNETDAY);

// CUT_CUTSCENE_MAGNETDAY_3
break; case 1009101:	cut_pers(shelf,				"yo! what's your thing? i have candy to steal so give me a quick summary");
break; case 1009102:	cut_pers(sprite_magnet3,		"Magnets.");
break; case 1009103:	cut_pers(sprite_magnet3,		"I have studied the correlation between the amount of magnetic materials in the ground and depression.");
break; case 1009104:	cut_pers(sprite_magnet3,		"And there seems to be an inverted correlation. Magnets make us happy, no matter how silly it sounds!");
break; case 1009105:	cut_pers(sprite_magnet3,		"Trusted studies made by me in my basement show that magnets attract our negative emotions.");
break; case 1009106:	cut_pers(sprite_magnet3,		"They drag them out of our bodies with an incredible force that we call \"magnetism\".");
break; case 1009107:	cut_pers(sprite_magnet3,		"And from this, we can conclude that human emotions are magnets. With fields and two poles and such crap.");
break; case 1009108:	cut_pers(shelf,				"but wouldn't the opposite end of the magnet attract the positive feelings then?");
break; case 1009109:	cut_pers(sprite_magnet3,		"...");
break; case 1009110:	cut_pers(sprite_magnet3,		"Back to the drawing board, I guess.");
break; case 1009111:	cut_pers(shelf,				"hah, gotcha! and gotcha candy");
break; case 1009112:	ts_end(CUT_FREEROAM_MAGNETDAY);

// CUT_CUTSCENE_MAGNETDAY_4
break; case 1009151:	cut_pers(shelf,				"What kind of thing are you doing little guy");
break; case 1009152:	cut_pers(sprite_magnet4,		"Uh, you can look yourself i guess");
break; case 1009153:	cut_pers(sprite_magnet4,		"Here's my brochure");
break; case 1009154:	cut_pers(shelf,				"It's a bloody napkin");
break; case 1009155:	cut_pers(sprite_magnet4,		"No, it's not");
break; case 1009156:	cut_pers(shelf,				"Yes it is, I see it");
break; case 1009157:	cut_pers(sprite_magnet4,		"At noon, I turn into a mighty wolf and howl at old ladies walking across the street");
break; case 1009158:	cut_pers(shelf,				"Are you supposed to be here?");
break; case 1009159:	ts_end(CUT_FREEROAM_MAGNETDAY);

// CUT_CUTSCENE_MAGNETDAY_5
break; case 1009201:	cut_pers(sprite_magnet5,		"Imagine this. Seat belts. Not much, right? Thats. About. To. Change.");
break; case 1009202:	cut_pers(sprite_magnet5,		"The car is a magnet. You're made of steel. Bam! Stuck to the seat! Seat belts are now HISTORY.");
break; case 1009203:	cut_pers(sprite_magnet5,		"So, what about the children? We. Thought. Of that. Too.");
break; case 1009204:	cut_pers(sprite_magnet5,		"They're driving the car! With revolutionary magnet brains they now think as fast, no, faster, than adults.");
break; case 1009205:	cut_pers(sprite_magnet5,		"They can become illegal street racers in a matter of MINUTES!");
break; case 1009206:	cut_pers(sprite_magnet5,		"Now, here's the best part: It's only 3$ a month!!");
break; case 1009207:	cut_pers(shelf,				"is it legal though");
break; case 1009208:	cut_pers(sprite_magnet5,		"You know what? We thought about that too. And we realized it kind of isn't.");
break; case 1009209:	ts_end(CUT_FREEROAM_MAGNETDAY);

// CUT_CUTSCENE_MAGNETDAY_6
break; case 1009251:	cut_pers(sprite_magnet6,		"Well, if thou look into theses microscope, you're ought to see something reeaaally peculiar.");
break; case 1009252:	cut_pers(shelf,				"talking to me?");
break; case 1009253:	cut_pers(sprite_magnet6,		"Well, thou wantst to see something reeeaaally peculiar, don't cha?");
break; case 1009254:	cut_pers(shelf,				"i'm afraid the answer has to be yes");
break; case 1009255:	cut_pers(sprite_magnet6,		"See tha thing down 'there?");
break; case 1009256:	cut_pers(sprite_magnet6,		"That's a thousand years old microbe from the dinosaur age. We have preserved it to gain power from it and exploit its life.");
break; case 1009257:	cut_pers(sprite_magnet6,		"Science says it contains \"magnesium\", the most magnetic element in the world.");
break; case 1009258:	cut_pers(shelf,				"what's that fish thing?");
break; case 1009259:	cut_pers(sprite_magnet6,		"That's a fish thing we also found but there isn't really anything interesting about it.");
break; case 1009260:	cut_pers(shelf,				"cool");
break; case 1009261:	cut_pers(sprite_magnet6,		"So, magnesium. It happens to be, thath if thou mix magnesium with the filthiest of magnets, you get-");
break; case 1009262:	cut_pers(shelf,				"you can't do that");
break; case 1009263:	cut_pers(sprite_magnet6,		"Oh yes, we can and we haveth done it multiple ov times! When you mix thems, you getst-");
break; case 1009264:	cut_pers(shelf,				"can i take two candies? A friend wanted a candy too");
break; case 1009265:	cut_pers(sprite_magnet6,		"You get super magnets. An' the 'thing with 'those, is that thee are neither magnetic, neither not magnetic. They seem to be-");
break; case 1009266:	cut_pers(shelf,				"i took 40 candies");
break; case 1009267:	ts_end(CUT_FREEROAM_MAGNETDAY);

// CUT_CUTSCENE_MAGNETDAY_MRS
break; case 1009501:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Yes, you bumped into me? ^^");
break; case 1009502:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"I'm just making sure everyone has a good time! Are you having fun? ^^");
break; case 1009503:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Don't magnets just AMAZE you? Have you ever been on a maglev train? Sorry, I can't stop mentioning them!");
break; case 1009504:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"What? You're really asking me that?");
break; case 1009505:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Omg omg omg IF you should try it, just DO it and stop asking me things, you moron! ^^ :-))");
break; case 1009506:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Maglev is the future, i promise you! I'm drooling on my shirt now becai can't control my excitment about maglev trains!");
break; case 1009507:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Oh OF COURSE I AM!! Trains are fast, yes. But they could be faster. Through MAGNETISM! :D :D");
break; case 1009508:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Oh yes, I will hold one later! Omg you should come! ^^");
break; case 1009509:	cut_pers(shelf,				"where is it?");
break; case 1009510:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Oh you will notice it, I will raise the microphone volume so much it literally drenches everything else happening on the festival.");
break; case 1009511:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Well, see you there then! ^^");
break; case 1009512:	ts_end(CUT_FREEROAM_MAGNETDAY);

// CUT_CUTSCENE_MEETING_2
//break; case 1010001:	cut_pers(sprite[CAR_ADELE],		"So... This is where the magic happens hehe.");
//break; case 1010002:	cut_pers(sprite[CAR_OMALLEY],		"Wow, this room is so pretty!");
//break; case 1010003:	cut_pers(sprite[CAR_OMALLEY],		"What are the walls, marble? Mahogany? Slime?");
//break; case 1010004:	cut_pers(sprite[CAR_ADELE],		"Wood.");
//break; case 1010005:	cut_pers(sprite[CAR_OMALLEY],		"Okay, kill the discussion then... I was just trying to ask something to be nice...");
break; case 1010001:	cut_pers(sprite[CAR_DADDY],		"I'm ready to start the meeting. Adele, you here?");
break; case 1010002:	cut_pers(sprite[CAR_ADELE],		"Hell yeah");
break; case 1010003:	cut_pers(sprite[CAR_DADDY],		"O'Malley?");
break; case 1010004:	cut_pers(sprite[CAR_OMALLEY],		"I guess so...");
break; case 1010005:	cut_pers(sprite[CAR_DADDY],		"Dark Gandalf?");
break; case 1010006:	cut_pers(sprite_cappy,			"Yeah.");
break; case 1010007:	cut_pers(sprite[CAR_DADDY],		"Shel-WAIT A MINUTE");
break; case 1010008:	cut_pers(sprite[CAR_ADELE],		"That's not Dark Gandalf.");
break; case 1010009:	cut_pers(sprite[CAR_DADDY],		"You're right. So where is Dark Gandalf?");
break; case 1010010:	cut_pers(sprite[CAR_ADELE],		"Oh no... This isn't good at all! He's never late, something has happened!");
break; case 1010011:	cut_pers(shelf,				"except today");
break; case 1010012:	cut_pers(sprite[CAR_ADELE],		"No he's never ever late! Listen to me!");
break; case 1010013:	cut_pers(sprite[CAR_OMALLEY],		"Who is Dark Gandalf?");
break; case 1010014:	cut_pers(sprite[CAR_ADELE],		"I have to check... No he hasn't uploaded anything to the dark web for the last six hours.");
break; case 1010015:	cut_pers(sprite[CAR_ADELE],		"And... He doesn't answer my calls.");
break; case 1010016:	cut_pers(sprite[CAR_ADELE],		"... And no, he hasn't seen my 50 thumbs ups in the chat either.");
break; case 1010017:	cut_pers(sprite[CAR_DADDY],		"Maybe he'll join us in a few minutes.");
break; case 1010018:	cut_pers(sprite[CAR_ADELE],		"No, he's 100% dead! We have to go and check him out before he dies though! TO DARK GANDALF'S HOUSE!");
break; case 1010019:	cut_pers(sprite[CAR_OMALLEY],		"I hope he's dead! No, I mean I hope he's NOT dead, oh I screwed up again didn't I...");
break; case 1010020:	cut_pers(sprite[CAR_ADELE],		"I really hope nothing dark has happened to him. But, he's probably dead.");
break; case 1010021:	cut_pers(sprite[CAR_OMALLEY],		"ROADTRIP TIME!");
break; case 1010022:	room.visible = false;
			ts_end(CUT_FREEROAM_DGTRAVEL);

// CUT_FREEROAM_DGTRAVEL
break; case 1011000:
ts_start();
ts_during();
switch (q) {
       case 1:		bet_pers(sprite[CAR_ADELE],		"Hurry up, we have to find Darkie!");
break; case 1.25:	bet_pers(sprite[CAR_OMALLEY],		"Yes, we must find good ol' Dough-Garne! Where can that nasty rascal be hiding?");
break; case 1.5:	bet_pers(sprite[CAR_DADDY],		"I'm also looking for that bearded bastard Diddly-Goo. Where he be at?");
break; case 1.75:	bet_pers(shelf,				"i wonder where my cute little pal dankish-garfield is. we must search and find him NOW");
break; case 2:		bet_pers(sprite[CAR_OMALLEY],		"Does any of you actually know where he lives?");
break; case 2.25:	bet_pers(sprite[CAR_ADELE],		"In a dark world!");
break; case 2.5:	bet_pers(shelf,				"where is that?");
break; case 2.75:	bet_pers(sprite[CAR_ADELE],		"He says it's too dark to see! So he doesn't really know where it is.");
break; case 3:		bet_pers(sprite[CAR_DADDY],		"Actually, I saw a dark world on my nightly walk, but I used a flashlight and then it became pretty bright.");
break; case 3.5:	bet_pers(sprite[CAR_DADDY],		"The assumed darkness is a bit of a marketing trick, for sure.");
break; case 3.75:	bet_pers(sprite[CAR_ADELE],		"Whatever nerd, it's dark as hell because Dark Gandalf lives there of course! The dark lord!");
break; case 4:		bet_pers(sprite[CAR_OMALLEY],		"Is the dark world that way, Daddy? The way Adele went?");
break; case 4.25:	bet_pers(sprite[CAR_DADDY],		"Luckily, yes.");
break; case 4.5:	bet_pers(shelf,				"let's follow him!");
}

// CUT_FREEROAM_DGCHILL
break; case 1011400:
ts_start();
ts_during();
switch (q) {
       case 0:		bet_pers(sprite[CAR_ADELE],		"Ok here it is. Darkie's house.");
break; case 0.25:	bet_pers(sprite[CAR_DADDY],		"It's so... dark.");
break; case 0.5:	bet_pers(shelf,				"i can hear his voice!");
break; case 0.75:	bet_pers(sprite[CAR_DADDY],		"That means his voice must be inside the house.");
break; case 1:		bet_pers(sprite[CAR_ADELE],		"I hear two voices... So two persons should be in there. Maybe Dark Gandalf and Dark Gandalf again?");
break; case 1.25:	bet_pers(sprite[CAR_DADDY],		"What the FUCK does he have other friends than us?");
break; case 1.5:	bet_pers(sprite[CAR_DARK_GANDALF],	"What happened to solidarity in our society? Lost! Gone! Where did it go?");
break; case 1.75:	bet_pers(sprite[CAR_POLISH_COW],	"Solidarity? What are you gabbering about now?");
break; case 2:		bet_pers(sprite[CAR_DARK_GANDALF],	"You know there's no winner in capitalism, right? You do know that, right??");
break; case 2.25:	bet_pers(sprite[CAR_POLISH_COW],	"That isn't true, I'm a winner becaI'm rich.");
break; case 2.5:	bet_pers(sprite[CAR_DARK_GANDALF],	"... But now you are thinking on a surface level. You must also recognize the underlying factors!");
break; case 2.75:	bet_pers(sprite[CAR_POLISH_COW],	"Darchadais.");
break; case 3:		bet_pers(sprite[CAR_DARK_GANDALF],	"Yes?");
break; case 3.25:	bet_pers(sprite[CAR_POLISH_COW],	"When was the last time you got some pussy?");
break; case 3.75:	bet_pers(sprite[CAR_OMALLEY],		"I've heard enough! Kick the door open by force!!");
break; case 4:		bet_pers(sprite[CAR_ADELE],		"*knackar*");
break; case 4.25:	bet_pers(shelf,				"Now I'll drive into the door so it explodes.");
break; case 4.75:	ts_end(CUT_CUTSCENE_DGCHILL_OPEN);
}

// CUT_CUTSCENE_DGCHILL_OPEN
break; case 1011501:	cut_pers(sprite[CAR_POLISH_COW],	"Alright, get to the point. What's the dealio?");
break; case 1011502:	cut_pers(sprite[CAR_ADELE],		"Polish Cow? My old biology teacher?");
break; case 1011503:	cut_pers(sprite[CAR_OMALLEY],		"Polish Cow, my old career adviser at the business accelerator in Testotown?");
break; case 1011504:	cut_pers(sprite[CAR_DADDY],		"Polish Cow, my wife’s new boyfriend?!");
break; case 1011505:	cut_pers(shelf,				"Polish Cow, a cow?");
break; case 1011506:	cut_pers(sprite[CAR_POLISH_COW],	"Yes it's me, Polish Cow. And I am, indeed, a cow from Poland. cześć wam idioci!");
break; case 1011507:	cut_pers(sprite[CAR_DARK_GANDALF],	"Don't embarrass me, Polish, we speak English on this island. So, what brings you guys here?");
break; case 1011508:	cut_pers(sprite[CAR_OMALLEY],		"We missed you on the meeting! So we decided to just show up at your house like total freaks!");
break; case 1011509:	cut_pers(sprite[CAR_OMALLEY],		"So... How's it hanging?");
break; case 1011510:	cut_pers(sprite[CAR_DARK_GANDALF],	"Hands up and feet down, haha! Or, head up and feet down or something.");
break; case 1011511:	cut_pers(sprite[CAR_DADDY],		"Are we interrupting you or what are your plans for the day?");
break; case 1011512:	cut_pers(sprite[CAR_POLISH_COW],	"We're on the way to the hottub for some epic Polish-themed guys-only talk. Got your swimsuits with ya?");
break; case 1011513:	cut_pers(sprite[CAR_DARK_GANDALF],	"In the hottub we're nude, or not at all.");
break; case 1011514:	cut_pers(sprite[CAR_POLISH_COW],	"We bathed there in clothes yesterday, why the change?");
break; case 1011515:	cut_pers(sprite[CAR_DARK_GANDALF],	"...");
break; case 1011516:	cut_pers(sprite[CAR_POLISH_COW],	"...");
break; case 1011517:	cut_pers(sprite[CAR_POLISH_COW],	"So follow me, guys! And remember, the hottub is a girl and parent free zone.");
break; case 1011518:	cut_pers(sprite[CAR_ADELE],		"Haha of course!!");
break; case 1011519:	cut_pers(sprite[CAR_DADDY],		"Wow, Polish Cow is a really chill dude.");
break; case 1011520:	ts_end(CUT_FREEROAM_DGHOTSPRING);

// CUT_FREEROAM_DGHOTSPRING
break; case 1011600:

// CUT_CUTSCENE_DGHOTSPRING
break; case 1011601:	cut_pers(sprite[CAR_DARK_GANDALF],	"Okay, so you all remember the hot spring rules, correct?");
break; case 1011602:	cut_pers(sprite[CAR_ADELE],		"Yes! In the hot tub no girls are allowed, only guys are, and also girls are forbidden");
break; case 1011603:	cut_pers(sprite[CAR_POLISH_COW],	"And you can only talk about crypto, girls and football.");
break; case 1011604:	cut_pers(sprite[CAR_DARK_GANDALF],	"Exactly. So let's start talking about the latest football game.");
break; case 1011605:	cut_pers(sprite[CAR_DADDY],		"It was so sad when the two teams lost against each other.");
break; case 1011606:	cut_pers(sprite[CAR_DARK_GANDALF],	"Absolutely devastating. Both teams sucked donkey dick.");
break; case 1011607:	cut_pers(sprite[CAR_POLISH_COW],	"The ladies' teams though. Just sayin' ;).");
break; case 1011608:	cut_pers(sprite[CAR_ADELE],		"Boobs");
break; case 1011609:	cut_pers(sprite[CAR_OMALLEY],		"Can we stop talking about football? I got bullied by a football team in elementary school.");
break; case 1011610:	cut_pers(sprite[CAR_DARK_GANDALF],	"We had such a good time here, weird animal, why did you ruin it?");
break; case 1011611:	cut_pers(sprite[CAR_OMALLEY],		"I always ruin everything...");
break; case 1011612:	cut_pers(sprite[CAR_DARK_GANDALF],	"You just got transferred from the hot spring to the cold, brown and mud-filled spring, O'Malley.");
break; case 1011613:	cut_pers(sprite[CAR_OMALLEY],		"Okay, I'll leave...");
break; case 1011614:	cut_pers(sprite[CAR_ADELE],		"So. Chicks, right?");
			character[CAR_OMALLEY].position.x = cutscene_dghotspring_position_x-5;
			character[CAR_OMALLEY].position.z = cutscene_dghotspring_position_z;
break; case 1011615:	cut_pers(sprite[CAR_DADDY],		"Yes, chicks. I like intellectual girls the most, what do you all prefer?");
break; case 1011616:	cut_pers(sprite[CAR_DARK_GANDALF],	"I follow some interesting and sympathetic women on the internet. I want them to share my life view and political stance.");
break; case 1011617:	cut_pers(sprite[CAR_POLISH_COW],	"I have a certain \"type\", if you know what I mean.");
break; case 1011618:	cut_pers(sprite[CAR_POLISH_COW],	"When I see my \"type\" I feel a physical attraction, like a physiological force.");
break; case 1011619:	cut_pers(sprite[CAR_POLISH_COW],	"But they repell me at the same speed.");
break; case 1011620:	cut_pers(sprite[CAR_DARK_GANDALF],	"Is your type \"female cows\"?");
break; case 1011621:	cut_pers(sprite[CAR_DADDY],		"It sounds like you are attracted to physical equations, like Alfred Einerstein's well-known formula \"E=mc3\".");
break; case 1011622:	cut_pers(sprite[CAR_POLISH_COW],	"Both wrong.");
break; case 1011623:	cut_pers(sprite[CAR_ADELE],		"I think his type is girls.");
break; case 1011624:	cut_pers(sprite[CAR_POLISH_COW],	"You'll know what it is if you catch me a late friday night moo:ing around at the club, if you get what I mean.");
break; case 1011625:	cut_pers(sprite[CAR_OMALLEY],		"Are you all having fun over there?");
break; case 1011626:	cut_pers(sprite[CAR_DARK_GANDALF],	"Just pretend like you didn't hear him.");
break; case 1011627:	ts_end(CUT_FREEROAM_DGHOTSPRING_2);

// CUT_FREEROAM_DGHOTSPRING_2
break; case 1011800:
ts_start();
ts_during();
switch (q) {
       case 0.25:	cut_pers(sprite[CAR_POLISH_COW],	"So, sleep-over with the guys? Darkie, what do you say?");
break; case 0.75:	cut_pers(sprite[CAR_DADDY],		"Oh I hope he says yes come on come on say yes Dark Gandalf!!");
break; case 1:		cut_pers(sprite[CAR_DARK_GANDALF],	"Okay, sure.");
break; case 1.25:	cut_pers(sprite[CAR_DARK_GANDALF],	"You guys sleep upstairs, and I'll be downstairs listening to your loud footsteps!");
break; case 1.75:	cut_pers(sprite[CAR_OMALLEY],		"I will walk 500 steps before i go to sleep, even though the room is only three meters wide.");
break; case 2.25:	cut_pers(sprite[CAR_ADELE],		"I will walk a lot too, and also drop stuff on the floor now and then.");
break; case 2.75:	cut_pers(sprite[CAR_DADDY],		"I'll walk, and I'll walk fast, like I'm stressed about something, even if time's around 11 PM.");
break; case 3.25:	cut_pers(sprite[CAR_POLISH_COW],	"I will sing Polish folk songs until 3 AM using my portable microphone and speaker.");
break; case 3.75:	cut_pers(sprite[CAR_POLISH_COW],	"And of course I will walk back and forth like I had something important to do, even though I don't. Dobranoc przyjaciele!");
break; case 4.25:	cut_pers(sprite[CAR_DARK_GANDALF],	"Sounds about alright. Good night, comrades!");
break; case 4.75:	ts_end(CUT_CUTSCENE_DGSLEEP);
}

// CUT_CUTSCENE_DGSLEEP
break; case 1012251:	cut_pers(sprite[CAR_POLISH_COW],	"Hey elk, I'm trying to sleep, can you stop working out?");
break; case 1012252:	cut_pers(shelf,				"i've been texting him that all night but he hasn't seen my messages");
break; case 1012253:	cut_pers(shelf,				"probably because he's been doing burpees");
break; case 1012254:	cut_pers(sprite[CAR_DADDY],		"ADELE! Why doesn't he listen?");
break; case 1012255:	cut_pers(shelf,				"AADEEELEEEE!!");
break; case 1012256:	cut_pers(sprite[CAR_POLISH_COW],	"MOOOOOOOOOOOOOOOOOOO!");
break; case 1012257:	cut_pers(sprite[CAR_ADELE],		"What the actual fuck is there a cow in here what the fuck?");
break; case 1012258:	cut_pers(sprite[CAR_ADELE],		"Right, Polish Cow.");
break; case 1012259:	cut_pers(sprite[CAR_DADDY],		"I was just thinking about the fact that you're doing burpees when we're trying to sleep.");
break; case 1012260:	cut_pers(sprite[CAR_DADDY],		"What's the possibility for you to stop executing that action in an immediate time?");
break; case 1012261:	cut_pers(sprite[CAR_ADELE],		"Did you say something?");
break; case 1012262:	cut_pers(sprite[CAR_DADDY],		"Now he does push-ups and claps in between them.");
break; case 1012263:	cut_pers(sprite[CAR_DADDY],		"Can you moo again, Polish Cow? He doesn't liste-");
break; case 1012264:	cut_pers(sprite[CAR_POLISH_COW],	"Yeah I work-out with Adele now so I don't listen. If you can't beat them, join them! Moo.");
break; case 1012265:	cut_pers(shelf,				"maybe we can just sleep with earplugs?");
break; case 1012266:	cut_pers(shelf,				"whats that sound. is it a washing machine. because it sounds like one.");
break; case 1012267:	cut_pers(sprite[CAR_DADDY],		"Seriously... Dark Gandalf is laundrying NOW?");
break; case 1012268:	cut_pers(sprite[CAR_OMALLEY],		"He has a very loud washing machine.");
break; case 1012269:	cut_pers(sprite[CAR_POLISH_COW],	"HEY!! What the freaking moo is that??");
break; case 1012267:	cut_pers(sprite[CAR_HARASS],		"Can you all stop making so much noise?? (burkigt ljud inifrån en tvättmaskin)");
break; case 1012268:	cut_pers(sprite[CAR_OMALLEY],		"Seriously, who are you?! And who are you to judge, you literally just turned on a washing machine in here?");
break; case 1012269:	cut_pers(sprite[CAR_HARASS],		"Yes but your movements annoy me becathey interfere with my washing machine's soothing shaking sound. It's VERY ANNOYING!");
break; case 1012270:	cut_pers(sprite[CAR_ADELE],		"WHO ARE YOU YOU ARE WEIRD WHY ARE YOU HERE HOW DID YOU GET IN WHAT THE FUCK?");
break; case 1012271:	cut_pers(sprite[CAR_HARASS],		"Hi, I'm the one and only Hårass! Nice to meet you. also fuck you!!");
break; case 1012272:	cut_pers(sprite[CAR_OMALLEY],		"(is stressed) (also when you opened the washing machine water fell out)");
break; case 1012273:	cut_pers(sprite[CAR_HARASS],		"I'm Dark Gandalf's best friend. This is like my second home. I don't even have to tell Dark Gandalf before I come here. I think!");
break; case 1012274:	cut_pers(shelf,				"if i wasn't deadly scared of you i would never tolerate you coming here uninvited and sleeping in a turned-on washing machine.");
break; case 1012275:	cut_pers(sprite[CAR_HARASS],		"Shut up your mama's a pussy");
break; case 1012276:	cut_pers(sprite[CAR_DARK_GANDALF],	"Hey guys, can you tell Hårass to stop it? (nerifrån hans sovrum)");
break; case 1012277:	cut_pers(sprite[CAR_HARASS],		"Stop what?");
break; case 1012278:	cut_pers(sprite[CAR_DARK_GANDALF],	"Any of the weird things you do. I have to remind you sometimes becaotherwise things will go downhill for you, remember?");
break; case 1012279:	cut_pers(sprite[CAR_HARASS],		"Ok, i'll stop with the weird nose noises");
break; case 1012280:	cut_pers(sprite[CAR_DADDY],		"Oh shoot, I didn't think of his nose noises before but now I do...");
break; case 1012281:	cut_pers(shelf,				"didn't he say he stopped with them?");
break; case 1012282:	cut_pers(sprite[CAR_HARASS],		"I said that but i didn't stop with them, i actually started doing them more.");
break; case 1012283:	cut_pers(sprite[CAR_POLISH_COW],	"I'm actually considering sleeping outside in a dirty water puddle or something instead of in here.");
break; case 1012284:	cut_pers(sprite[CAR_OMALLEY],		"Okay, so welcome to the car club I guess, Hårass! I also recently joined!");
break; case 1012285:	cut_pers(sprite[CAR_ADELE],		"...");
break; case 1012286:	cut_pers(sprite[CAR_DADDY],		"...");
break; case 1012287:	cut_pers(sprite[CAR_OMALLEY],		"Why are you looking at me?? (THE GAME ENDS HERE UNFORTUNATELY. BECAUSE THE GAME IS NOT DONE YET!! /kbrecordzz");
break; case 1012288:	room.visible = false;
			ts_end(CUT_FREEROAM_WASHING);

// CUT_FREEROAM_WASHING
break; case 10012200:
ts_start();
ts_during();
switch (q) {
       case 2:		bet_pers(sprite[CAR_HARASS],		"HELP! I need someone to invest in me!");
break; case 2.5:	bet_pers(sprite[CAR_HARASS],		"Can someone come quick and help me reach my full potential?! Help!!!");
break; case 3:		bet_pers(sprite[CAR_HARASS],		"The upwards trajoctory of me is looking really promising! Help!");
break; case 6:		bet_pers(sprite[CAR_HARASS],		"Hmm, clearly this doesn't work. Let's try something else.");
break; case 6.25:	bet_pers(sprite[CAR_HARASS],		"Hamster whore! Come to my apartment and help me wash my washing machines!");
}

// CUT_CUTSCENE_WASHING
break; case 10012201:	cut_pers(sprite[CAR_HARASS],		"U wanna buy some products?");
break; case 10012202:	cut_pers(shelf,				"what");
break; case 10012203:	cut_pers(sprite[CAR_HARASS],		"U wanna buy? I sell! How about a brand new vacuum cleaner from Dustin Home? Only 20$ if you buy it today!");
break; case 10012204:	cut_pers(sprite[CAR_ADELE],		"Why are you selling us stuff?");
break; case 10012205:	cut_pers(sprite[CAR_HARASS],		"I also have brand new earphones directly from the headquarters in Hongkong");
break; case 10012206:	cut_pers(sprite[CAR_ADELE],		"What headquarter?");
break; case 10012207:	cut_pers(sprite[CAR_HARASS],		"If you buy both products now you also get a brand new CABLE TV!");
break; case 10012208:	cut_pers(sprite[CAR_ADELE],		"I don't want a TV but thank you very much.");
break; case 10012209:	cut_pers(sprite[CAR_HARASS],		"U wanna buy Voddler? I bought it yesterday for 900 dollars.");
break; case 10012210:	cut_pers(shelf,				"... didn't Voddler stop existing ten years ago?");
break; case 10012211:	cut_pers(sprite[CAR_HARASS],		"Uh, if it did, why does this site say “VODDLER” in all caps at the top?");
break; case 10012212:	cut_pers(sprite[CAR_ADELE],		"let me see your computer...");
break; case 10012213:	cut_pers(shelf,				"yes, as I thought, you haven’t deleted your cache the last ten years. Of course you will see old stuff then!");
break; case 10012214:	cut_pers(sprite[CAR_HARASS],		"Whatever. Watch this meme i found on Gopher. Have you seen this?");
break; case 10012215:	cut_pers(shelf,				"When you see it, you'll... yeah, i've seen it. it's 15 yeras old, and not funny.");
break; case 10012216:	cut_pers(sprite[CAR_HARASS],		"If it isn't funny, how come i laughed for 30 minutes yesterday when i saw it?");
break; case 10012217:	cut_pers(sprite[CAR_ADELE],		"You'll... shit bricks... BWAHAHAHAHA!");
break; case 10012218:	cut_pers(sprite[CAR_ADELE],		"I just saw it! I just saw the thing you were supposed to find but was hidden! It was such a twist when I found it!");
break; case 10012219:	cut_pers(sprite[CAR_HARASS],		"RIGHT? Hahahaha! Adele gets it!");
break; case 10012220:	cut_pers(sprite[CAR_HARASS],		"Anyways, I need help washing my washing machines. Do it now. I'll go take a coupl' laps while you're on it.");
break; case 10012221:	room.visible = false;
			ts_end(CUT_FREEROAM_WASHING_2);

// CUT_FREEROAM_WASHING_2
break; case 1012300:
ts_start();
ts_during();
switch (q) {
       case 0.75:	bet_pers(sprite[CAR_HARASS],		"Hey, I  have some poems I wanna hear your opinion on");
break; case 1:		bet_pers(sprite[CAR_HARASS],		"i saw a girl today");
break; case 1.25:	bet_pers(sprite[CAR_HARASS],		"tomorrow i will see something else");
break; case 1.5:	bet_pers(sprite[CAR_HARASS],		"yesterday i didn't see anything");
break; case 1.75:	bet_pers(sprite[CAR_HARASS],		"because i was blind from love");
break; case 2:		bet_pers(sprite[CAR_HARASS],		"love is a peculiar thing");
break; case 2.25:	bet_pers(sprite[CAR_HARASS],		"it seems to be that other people feel it for other things than washing machines");
break; case 2.5:	bet_pers(sprite[CAR_HARASS],		"but on the other hand, i wouldn't really call them people");
break; case 2.75:	bet_pers(sprite[CAR_HARASS],		"i would call them dead inside");
break; case 3:		bet_pers(sprite[CAR_HARASS],		"i'm alive. and i'm pressing start. the familiar sound of a rotating magic machine starts howling. i'm alive.");

break; case 4.75:	bet_pers(sprite[CAR_HARASS],		"Here's another one");
break; case 5:		bet_pers(sprite[CAR_HARASS],		"today i woke up with a headache");
break; case 5.25:	bet_pers(sprite[CAR_HARASS],		"that's not good for hell's sake");
break; case 5.5:	bet_pers(sprite[CAR_HARASS],		"see, i rhymed! that's fine!");
break; case 5.75:	bet_pers(sprite[CAR_HARASS],		"let's get in line, because hårass is hella fine!");
break; case 6:		bet_pers(sprite[CAR_HARASS],		"the moon landing looks very much like a hollywood movie");
break; case 6.25:	bet_pers(sprite[CAR_HARASS],		"i don't think anyone seriously would put their time into going to a worse earth");
break; case 6.5:	bet_pers(sprite[CAR_HARASS],		"buzz aldrin was elvis presley in a suit");
break; case 6.75:	bet_pers(sprite[CAR_HARASS],		"and the moon dust was just small gray stuff someone had at home");
break; case 7:		bet_pers(sprite[CAR_HARASS],		"how come no one has thought about this?");
}

// CUT_CUTSCENE_MEETING_3
break; case 1012401:	cut_pers(sprite[CAR_DOGERT],		"YOU.STILL.SUCK.AT.DRIVING. TIME.FOR.DRIVERS.LICENSE.COURSE.");
break; case 1012402:	cut_pers(sprite[CAR_ADELE],		"Fuck!");
break; case 1012403:	cut_pers(sprite[CAR_OMALLEY],		"Fuck!");
break; case 1012404:	cut_pers(sprite[CAR_HARASS],		"Fuck!");
break; case 1012405:	cut_pers(sprite[CAR_DADDY],		"Fuck!");
break; case 1012406:	cut_pers(sprite[CAR_DARK_GANDALF],	"Woohoo!!!");
break; case 1012407:	ts_end(CUT_FREEROAM_4);

// CUT_FREEROAM_4
break; case 1012500:
ts_start();
ts_during();
switch (q) {
       case 5:		bet_pers(sprite[CAR_OMALLEY],		"Hey you, washing machine guy?");
break; case 5.25:	bet_pers(sprite[CAR_HARASS],		"The guy. I'm the guy. Not the \"washing machine guy\".");
break; case 5.5:	bet_pers(sprite[CAR_OMALLEY],		"Okay, the guy, can you pass th-");
break; case 5.75:	bet_pers(sprite[CAR_HARASS],		"I don't like being labeled. I just happen to like washing machines.");
break; case 6:		bet_pers(sprite[CAR_OMALLEY],		"Oh okay, I understand");
break; case 6.25:	bet_pers(sprite[CAR_HARASS],		"Do you like to be labeled? Or do you have a hobby or anything?");
break; case 6.5:	bet_pers(sprite[CAR_OMALLEY],		"I'm actually into architecture a lot! So I would love to be labeled a master architect haha!");
break; case 6.75:	bet_pers(sprite[CAR_HARASS],		"Okay that's so cool, but it sounds like something that... That.. I don't know, I don't really have anything to say");
break; case 7:		bet_pers(sprite[CAR_OMALLEY],		"It's fine.");
break; case 7.25:	bet_pers(sprite[CAR_HARASS],		"We're in the same gang, but i think we don't need to be friends.");
break; case 7.5:	bet_pers(sprite[CAR_OMALLEY],		"We seem to have nothing in common, so totally fine with me.");
break; case 7.75:	bet_pers(sprite[CAR_HARASS],		"Deal");

break; case 9:		bet_pers(sprite[CAR_DADDY],		"You know Adele's steroid use? I'm not really cool with it.");
break; case 9.25:	bet_pers(sprite[CAR_ADELE],		"But it's cool?");
break; case 9.5:	bet_pers(sprite[CAR_DADDY],		"But I don't think it is, that's what i'm trying to communicate here!");
break; case 9.75:	bet_pers(sprite[CAR_ADELE],		"Well just don't watch my EXPLOSIVE ARMS then, ignore them if you can!");
break; case 10:		bet_pers(sprite[CAR_DADDY],		"I just think we as a club shouldn't do illegal activities.");
break; case 10.25:	bet_pers(sprite[CAR_DARK_GANDALF],	"Excuse me, but if you haven't noticed, our club is solely based on illegalities.");
break; case 10.5:	bet_pers(sprite[CAR_DADDY],		"I try my best to be on the correct side of the law! Why can't we all try that?");
break; case 10.75:	bet_pers(sprite[CAR_ADELE],		"I want explosive guns as arms so i don't know how i would do it");
break; case 11:		bet_pers(sprite[CAR_ADELE],		"And I do so much bad that I really can't stop");
break; case 11.25:	bet_pers(sprite[CAR_ADELE],		"If i'm a criminal in one way i can be it in more ways while I'm still at it");
break; case 11.5:	bet_pers(sprite[CAR_ADELE],		"Because I really can't stop");
break; case 11.75:	bet_pers(sprite[CAR_OMALLEY],		"That sounds like a dangerous negative spiral.");
break; case 12:		bet_pers(sprite[CAR_ADELE],		"Negative?");

break; case 15:		bet_pers(sprite[CAR_OMALLEY],		"Why is Dogert's driver's license course sooo far away??");
break; case 15.25:	bet_pers(sprite[CAR_ADELE],		"Driver's license courses use to be far away. If you don't live close to it I guess.");
break; case 15.5:	bet_pers(sprite[CAR_DADDY],		"Yes in that case it's usually shorter!");
break; case 15.75:	bet_pers(sprite[CAR_ADELE],		"If you live close, it can be like 2-3 minutes to go there!");
break; case 16:		bet_pers(sprite[CAR_DADDY],		"That's the big advantage of living close to driver's license courses.");
break; case 16.25:	bet_pers(shelf,				"shut up");
break; case 17:		ts_end(CUT_FREEROAM_4B);
}

// CUT_FREEROAM_4B
break; case 10012500:

// CUT_CUTSCENE_LICENSE
break; case 1012501:	cut_pers(sprite[CAR_DOGERT],		"HELLO.EVERYBODY.AND.WELCOME.TO.THE.COURSE. FIRST.I.WILL.TEACH.YOU.THE.BASICS.");
break; case 1012502:	cut_pers(sprite[CAR_OMALLEY],		"Oooh I love basics!");
break; case 1012503:	cut_pers(sprite[CAR_DOGERT],		"DARK.GANDALF.YOU.DONT.NEED.TO.DO.THE.COURSE.BECAUSE.I.LOVE.YOU");
break; case 1012504:	cut_pers(sprite[CAR_DARK_GANDLF],	"Sweet.");
break; case 1012505:	cut_pers(sprite[CAR_DOGERT],		"THE.SAME.GOES.FOR.ADELE.DADDY.HÅRASS.AND.O'MALLEY.I.LOVE.YALL.SO.YOU.ARE.FREE.TO.DO.WHATEVER.YOU.WANT.");
break; case 1012506:	cut_pers(sprite[CAR_OMALLEY],		"Thank you Dogert!");
break; case 1012507:	cut_pers(sprite[CAR_DOGERT],		"LISTEN.CAREFULLY.SHELF. YOURE.IN.THE.SPOTLIGHT.NOW.");
break; case 1012508:	cut_pers(sprite[CAR_DOGERT],		"RIGHT.PEDAL.GO.VROOM. AND.LEFT.PEDAL.IS.NOT.INTERESTING.TO.LEARN. BECAUSE.IT.MAKES.THE.CAR.GO.SLOWER.");
break; case 1005209:	cut_pers(sprite[CAR_DOGERT],		"USE.THE.STEERING.WHEEL.TO.MOVE.THE.CAR.SIDEWAYS. THIS.IS.CALLED.PARALLELL.DRIVING.");
break; case 1005210:	cut_pers(sprite[CAR_DOGERT],		"DRIVE.AROUND.AND.SEE.HOW.IT.FEELS. I.WILL.WATCH.YOU.FROM.THE.SIDE.IN.A.NON.CREEPY.WAY.");
break; case 1005211:	ts_end(CUT_FREEROAM_LICENSE);

// CUT_FREEROAM_LICENSE
break; case 1012600:
ts_start();
ts_during();
switch (q) {
       case 0.25:	bet_pers(sprite[CAR_DOGERT],		"SHOW.ME.WHAT.YOU.GO.FOR. TURN.LEFT.OR.RIGHT. THIS.IS.THE.HARDEST.CHALLENGE.");
}

// CUT_CUTSCENE_LICENSE_2
break; case 1012601:	cut_pers(sprite[CAR_DOGERT],		"YOU.ARE.VERY.GOOD.AT.TURNING.LEFT.OR.RIGHT.");
break; case 1012602:	cut_pers(sprite[CAR_DOGERT],		"NOW.ITS.TIME.FOR.THE.NEXT.CHALLENGE.");
break; case 1012603:	cut_pers(sprite[CAR_DOGERT],		"BUT.FIRST.LET.ME.TELL.YOU.ABOUT.MY.EX.");
break; case 1012604:	cut_pers(sprite[CAR_DOGERT],		"THAT.OLD.SKANK.WAS.SO.BEAUTIFUL.");
break; case 1012605:	cut_pers(sprite[CAR_DOGERT],		"EXACTLY.BUT.SHE.WAS.REALLY.GOOD.AT.DRIVING.CAR");
break; case 1012606:	cut_pers(sprite[CAR_DOGERT],		"HAHAHAHA.I.HAVE.BEEN.WITH.MANY.BITCHES.");
break; case 1012607:	cut_pers(sprite[CAR_DOGERT],		"HERES.THE.CHALLENGE.");
break; case 1012608:	cut_pers(sprite[CAR_DOGERT],		"PASS.A.LONG.LINE.OF.CARS.IN.FRONT.OF.YOU.IN.HEAVY.TRAFFIC.");
break; case 1012609:	ts_end(CUT_FREEROAM_LICENSE_2);

// CUT_FREEROAM_LICENSE_2
break; case 1012700:
ts_start();
ts_during();
switch (q) {
       case 0.25:	bet_pers(sprite[CAR_DOGERT],		"PASS.THE.TRAFFIC.NOW.PLEASE.");
}

// CUT_CUTSCENE_LICENSE_3
break; case 1012701:	cut_pers(sprite[CAR_DOGERT],		"WELL.DONE. BUT.ALSO.VERY.BAD.");
break; case 1012702:	cut_pers(sprite[CAR_DOGERT],		"CHALLENGE.3: WOULD.YOU.TRUST.THIS.CAPYBARA.TO.BORROW.YOUR.CAR.");
break; case 1012703:	cut_pers(sprite_cappy,			"Hi.");
break; case 1012704:	cut_pers(shelf,				"For how long");
break; case 1012705:	cut_pers(sprite[CAR_DOGERT],		"OKAY.NEVER.MIND. THIS.CHALLENGE.IS.KIND.OF.BAD.");
break; case 1012706:	cut_pers(sprite[CAR_DOGERT],		"LETS.GO.TO.THE.NEXT.STATION.");
break; case 1012707:	cut_pers(sprite[CAR_DOGERT],		"EVERY.TIME.I.DO.THIS.CHALLENGE. SOMEONE.ALWAYS.COMPLAINS.THAT.IT.SUCKS.");
break; case 1012708:	cut_pers(sprite[CAR_DOGERT],		"SO.THIS.TIME.DONT.DO.THAT.PLEASE.");
break; case 1012709:	cut_pers(shelf,				"We promise, dogert.");
break; case 1012710:	cut_pers(sprite[CAR_DOGERT],		"OKAY.I.WANT.A.LEGAL.PROMISE.ON.PAPER.");
break; case 1012711:	cut_pers(sprite[CAR_DOGERT],		"JUST.KIDDING. IM.NOT.THAT.KIND.OF.GUY.");
break; case 1012712:	cut_pers(shelf,				"Of course not, you're dogert!");
break; case 1012713:	cut_pers(sprite[CAR_DOGERT],		"SHUT.UP.");
break; case 1012714:	cut_pers(sprite[CAR_DOGERT],		"THE.CHALLENGE.IS.THE.FOLLOWING. USE.THE.BRAKE.TO.SLOW.DOWN.THE.CAR.");
break; case 1012715:	cut_pers(sprite[CAR_DOGERT],		"ITS.AN.ILLEGAL.MANEUVER.BECAUSE.ITS.LAME.TO.DRIVE.SLOW. BUT.ITS.IMPORTANT.TO.BE.A.REBEL.SO.YOU.NEED.TO.TRY.IT.ANYWAYS.");
break; case 1012716:	ts_end(CUT_FREEROAM_LICENSE_3);

// CUT_FREEROAM_LICENSE_3
break; case 1012800:
ts_start();
ts_during();
switch (q) {
       case 0.25:	bet_pers(sprite[CAR_DOGERT],		"BRAKE!");
}

// CUT_CUTSCENE_LICENSE_4
break; case 1012801:	cut_pers(sprite[CAR_DOGERT],		"WOW.YOU.DID.IT. OK.PARTY.TIME.IS.OVER. TIME.FOR.MORE.CRAZY.CHALLENGES.");
break; case 1012802:	cut_pers(shelf,				"Hey Dogert, why do you sound like that?");
break; case 1012803:	cut_pers(sprite[CAR_DOGERT],		"...");
break; case 1012804:	cut_pers(sprite[CAR_DOGERT],		"What do you mean? Just got self-concious over here by you saying that");
break; case 1012805:	cut_pers(shelf,				"You spoke like a normal guy now! Is your loud voice just an act?");
break; case 1012806:	cut_pers(sprite[CAR_DOGERT],		"No but i mean, you don't have to be the same kind of guy all the time. I am a spectrum, not a singular point.");
break; case 1012807:	cut_pers(shelf,				"Beautifully said. I think we are all on a spectrum.");
break; case 1012808:	cut_pers(sprite_cappy,			"Especially dogert.");
break; case 1012809:	cut_pers(sprite[CAR_DOGERT],		"NOW.FOR.SOMETHING.REALLY.EASY. POCKET.PARK.BETWEEN.THESE.TWO.BUSES.IN.STEEP.HILL.");
break; case 1012810:	ts_end(CUT_FREEROAM_LICENSE_4);

// CUT_FREEROAM_LICENSE_4
break; case 1012900:
ts_start();
ts_during();
switch (q) {
       case 0.25:	bet_pers(sprite[CAR_DOGERT],		"THIS.ONE.IS.MY.FAVORITE.");
}

// CUT_CUTSCENE_LICENSE_5
break; case 1012901:	cut_pers(sprite[CAR_DOGERT],		"SORRY.BUT.YOU.DROVE.FORWARDS.AND.THATS.ILLEGAL.IN.THIS.CHALLENGE.");
break; case 1012902:	cut_pers(sprite[CAR_DOGERT],		"OKAY.LETS.DO.THE.NEXT.THING.");
break; case 1012903:	ts_end(CUT_FREEROAM_LICENSE_5);

// CUT_FREEROAM_LICENSE_5
break; case 1013000:
ts_start();
ts_during();
switch (q) {
       case 0.25:	bet_pers(sprite[CAR_DOGERT],		"LAST.CHALLENGE. SAY.I.LOVE.YOU.TO.DOGERT.");
break; case 3:		bet_pers(shelf,				"... I love you.");
break; case 3.25:	cut_pers(sprite[CAR_DOGERT],		"NOW.YOU.HAVE.DOGERTS.DRIVERS.LICENSE. YOURE.WELCOME. DONT.SEND.THANK.YOU.LETTERS.PLEASE.");
break; case 3.75:	cut_pers(shelf,				"Are you really authorized to give out drivers licenses?");
break; case 4.25:	cut_pers(sprite_cappy,			"I don't think he is authorized to do this.");
break; case 4.75:	ts_end(CUT_FREEROAM_MAGNETDROWN);
}

// CUT_FREEROAM_MAGNETDROWN
break; case 1014000:
ts_start();
ts_during();
switch (q) {
       case 3:		bet_pers(sprite[CAR_OMALLEY],		"var är vi?");
break; case 3.25:	bet_pers(sprite[CAR_ADELE],		"jag vet inte");
break; case 3.5:	bet_pers(sprite[CAR_OMALLEY],		"jag har fan ingen aning. på havet, tror jag?");
break; case 3.75:	bet_pers(sprite[CAR_ADELE],		"jag tror vi är... borta!");
break; case 4:		bet_pers(sprite[CAR_DARK_GANDALF],	"för evigt!!!");
break; case 4.25:	bet_pers(sprite[CAR_OMALLEY],		"nej men lugnt, vi fixar det. vi bara testar att åka alla håll och det som funkar kör vi på.");
break; case 4.5:	bet_pers(sprite[CAR_DARK_GANDALF],	"dummaste idén jag hört din fitta");
break; case 4.75:	bet_pers(sprite[CAR_ADELE],		"har ni också grodor i era fickor?");
break; case 5:		bet_pers(sprite[CAR_DARK_GANDALF],	"vad pratar du om? eller... ska ba-... nä men för i helvete");
break; case 5.25:	bet_pers(sprite[CAR_OMALLEY],		"jag har också det. men bara några");
break; case 5.5:	bet_pers(sprite[CAR_DARK_GANDALF],	"jag har fler nu. det är helt smockfullt! men va fa-an!!");
break; case 5.75:	bet_pers(sprite[CAR_ADELE],		"vad är det här?? där är en på båten också!");
break; case 6:		bet_pers(sprite[CAR_DARK_GANDALF],	"fa-an!! de är ju för fan landdjur, åk hem till där ni kom från för i helvete!!");

break; case 8:		bet_pers(sprite[CAR_OMALLEY],		"vad fan vad det för explosion?!");
break; case 8.25:	bet_pers(sprite[CAR_OMALLEY],		"jag har pratat med min fyrdimensionella romb-kompis, jag sticker snart till hans dimension");
break; case 8.5:	bet_pers(sprite[CAR_DARK_GANDALF],	"vad hände? varför är vi ute på havet?");
break; case 8.75:	bet_pers(sprite[CAR_ADELE],		"dark gandalf, sluta löjla dig nu.");
break; case 9:		bet_pers(sprite[CAR_DARK_GANDALF],	"nej men asså jag vet inte varför jag är här!");
break; case 9.25:	bet_pers(sprite[CAR_OMALLEY],		"han måste ha tappat minnet! ser ni det blåa där?");
break; case 9.5:	bet_pers(sprite[CAR_OMALLEY],		"menar du havet?");
break; case 9.75:	bet_pers(sprite[CAR_OMALLEY],		"nej, det blåa kantiga som sticker upp?");
break; case 10:		bet_pers(sprite[CAR_DARK_GANDALF],	"det... är en lastbil?");
break; case 10.25:	bet_pers(sprite[CAR_OMALLEY],		"är det en facking långtradare?");
break; case 10.5:	bet_pers(sprite[CAR_OMALLEY],		"what. konstigt");
break; case 10.75:	bet_pers(sprite[CAR_OMALLEY],		"eh, grabbar...");
break; case 11:		bet_pers(sprite[CAR_OMALLEY],		"hallå? jag är inte grabb. jag är gris och tjej");
break; case 11.25:	bet_pers(sprite[CAR_OMALLEY],		"det där är en långtradare, men ser ni vad det som är runt långtradaren är?");
break; case 11.5:	bet_pers(sprite[CAR_DARK_GANDALF],	"vadå. det är inget förutom långtradare och vi här. och ett stort hav.");
break; case 11.75:	bet_pers(sprite[CAR_OMALLEY],		"asså... det är inte havet du ser");
break; case 12:		bet_pers(sprite[CAR_ADELE],		"det här känns inte bra");
break; case 12.25:	bet_pers(sprite[CAR_DARK_GANDALF],	"fyfan hoppas inte det är vad jag tror det är.");
break; case 12.5:	bet_pers(sprite[CAR_OMALLEY],		"det är vad du tror du är och du tror det är facking grodor och ja, det är också faking grodor!");

break; case 12.75:	ts_end(CUT_CUTSCENE_MAGNETDROWN);
}

// CUT_CUTSCENE_MAGNETDROWN
break; case 1014101:	cut_pers(sprite[CAR_DARK_GANDALF],	"A train... in a lake far away from any train tracks? How... the fuck?");
break; case 1014102:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"I have no idea! Right now I'm more interested in how to get it UP from here than how it got DOWN here!");
break; case 1014103:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Oh god I'm so stressed. Does anybody have a Nintendo DS with NINTENDOGS on so I can calm myself down?");
break; case 1014104:	cut_pers(sprite[CAR_HARASS],		"Stop being silly! Fucking cat!!");
break; case 1014105:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"No but I'm seriously so stressed! You know how I'm always so enthusiastic about everything? Right now I'm not, because my train drowned!");
break; case 1014106:	cut_pers(sprite[CAR_DADDY],		"Some people actually claim that enthusiasm and nervousness are the same things but on different ends of the spectrum.");
break; case 1014107:	cut_pers(sprite[CAR_ADELE],		"Then it's still two different things, idiot?");
break; case 1014108:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"I have no idea what you're talking about. Can someone just help me drag my train up from the water? I'm so evil! No I mean stressed!");
break; case 1014109:	cut_pers(sprite[CAR_DADDY],		"I'll lend you a hand. ");
break; case 1014110:	cut_pers(sprite[CAR_OMALLEY],		"I'm always up for helping a fellow friend. Here, grab my hand!");
break; case 1014111:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"I hope your hands can drag up a whole train, because otherwise you'll need tools.");
break; case 1014112:	cut_pers(sprite[CAR_DADDY],		"TOOLS OF STEEL! Haha.");
break; case 1014113:	cut_pers(sprite[CAR_OMALLEY],		"Me and Daddy will help you.");
break; case 1014113:	ts_end(CUT_FREEROAM_GOINGHOME);

// CUT_FREEROAM_GOINGHOME
break; case 1014500:
ts_start();
ts_during();
switch (q) {
       case 0:		bet_pers(sprite[CAR_DADDY],		"This doesn't look good, where the hell is the door?? And the wheels are completely gone! How did you think you were gonna solve this??");
break; case 0.5:	bet_pers(sprite[CAR_DADDY],		"Like, how do you THINK? Think about the CHILDREN? This is RIDICULOUS! You're a grown-up! How are you gonna explain this?");
break; case 0.25:	bet_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"It has no wheels because it's a maglev train.");
break; case 0.5:	bet_pers(sprite[CAR_OMALLEY],		"Excuse me but what do you mean? How can it drive if it has no wheels? Wheels = drive.");
break; case 0.75:	bet_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"It's another kind of technology. It levitates through magnetism.");
break; case 1:		bet_pers(sprite[CAR_DADDY],		"Like, excuse my stupid whore brain but I understand nothing. I agree with Darkie, wheels = drive!");
break; case 1.25:	bet_pers(sprite[CAR_DADDY],		"So, no wheels, WHAT WERE YOU THINKING? Didn't you THINK ABOUT THE CHILDREN? How do you think they feel about this?");
break; case 1.5:	bet_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"?");
break; case 1.75:	bet_pers(sprite[CAR_DADDY],		"Okay let's look at the inside of this piece of trash.");
break; case 2:		bet_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Psst... I don't need help with that.");
break; case 2.25:	bet_pers(sprite[CAR_DADDY],		"Uh. Okay I'll look at the lamps instead. Maybe those are the core of the problem.");
break; case 2.5:	bet_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Psst... I mean... I need help... with something completely different.");
break; case 2.75:	bet_pers(sprite[CAR_DADDY],		"I'm all ears.");
break; case 3:		bet_pers(sprite[CAR_OMALLEY],		"I'm all Irish badger ears.");
}

// CUT_FREEROAM_CARCLUBFIRE
break; case 1014600:
ts_start();
ts_during();
switch (q) {
       case 1:		bet_pers(sprite[CAR_HARASS],		"Can we go to that red thing?");
break; case 1.5:	bet_pers(sprite[CAR_ADELE],		"Okay why not. Do you like red things?");
break; case 2:		bet_pers(sprite[CAR_HARASS],		"I don't know. Can I just want to go to that red thing without having to answer 1000 follow-up questions?");
break; case 2.25:	bet_pers(sprite[CAR_ADELE],		"Looks like fire");
break; case 2.5:	bet_pers(sprite[CAR_HARASS],		"Hmm, the red fire thing is very close to our area.");
break; case 3:		bet_pers(sprite[CAR_DARK_GANDALF],	"It's very close to the car club! I hope no one of our neighbors have been hurt.")
break; case 3.5:	bet_pers(sprite[CAR_DARK_GANDALF],	"Hmmm. It's maybe _too_ close to the car club...");
break; case 3.75:	bet_pers(sprite[CAR_ADELE],		"The area around our car club is an important area for local businesses so I hope no neighbouring houses to us have been burned down.");
break; case 4:		bet_pers(sprite[CAR_HARASS],		"I love fire!");
break; case 4.5:	bet_pers(sprite[CAR_DARK_GANDALF],	"Guys... I think they've targeted a very specific house... A VERY specific house.");
}

// CUT_CUTSCENE_CARCLUBFIRE
break; case 10014701:	cut_pers(sprite[CAR_ADELE],		"Daddy?? What are you doing??!");
break; case 10014702:	cut_pers(sprite[CAR_DARK_GANDALF],	"Stop this immediately Daddy. You're burning down our house.");
break; case 10014703:	cut_pers(sprite[CAR_DADDY],		"I'M DOING MY DUTY.");
break; case 10014704:	cut_pers(sprite[CAR_ADELE],		"Why is this your duty?");
break; case 10014705:	cut_pers(sprite[CAR_DADDY],		"I'M DOING MY DUTY.");
break; case 10014706:	cut_pers(sprite[CAR_DARK_GANDALF],	"Well, anyway... Now it's time for club meeting, so...");
break; case 10014707:	cut_pers(sprite[CAR_ADELE],		"A bit awkward, but... still.");

// CUT_CUTSCENE_MEETING_4
break; case 1014701:	cut_pers(sprite[CAR_DARK_GANDALF],	"This will be a special meeting. Clearly the capitalists have found our communistic car club and want to destr-");
break; case 1014702:	cut_pers(sprite[CAR_ADELE],		"I get it now");
break; case 1014703:	cut_pers(sprite[CAR_DOGERT],		"JUST.SO.YOU.KNOW.IM.ALLERGIC.TO.FIRE. BUT.I.THINK.I.MAY.SURVIVE.THE.MEETING.");
break; case 1014704:	cut_pers(sprite[CAR_ADELE],		"You see the magnets?");
break; case 1014705:	cut_pers(sprite[CAR_ADELE],		"The cease and desist letter threatening to shut our club down. Car lanes slowly disappearing. The constant push for maglev trains?");
break; case 1014706:	cut_pers(sprite[CAR_DARK_GANDALF],	"Yeah, magnet trains will certainly take over. It's only a matter of time.");
break; case 1014707:	cut_pers(sprite[CAR_ADELE],		"Sigh... She fooled you as well...");
break; case 1014708:	cut_pers(sprite[CAR_DARK_GANDALF],	"Who?");
break; case 1014709:	cut_pers(sprite[CAR_ADELE],		"The cat! She wants our club to die because we're the kings of cars and that's a threat to her train plans!");
break; case 1014710:	cut_pers(sprite[CAR_DARK_GANDALF],	"Hmm, that sounds reasonable, yes..");
break; case 1014711:	cut_pers(sprite[CAR_HARASS],		"So what do we do??");
break; case 1014712:	cut_pers(sprite[CAR_ADELE],		"I have a plan.");
break; case 1014713:	cut_pers(sprite[CAR_ADELE],		"Let's prank call the magnet cat bitch.");
break; case 1014714:	cut_pers(sprite[CAR_ADELE],		"Calling her now");
			sound_ring.play();
break; case 1014715:	cut_pers(sprite[CAR_ADELE],		"Hey, is this the magnet bitch?");
break; case 1014716:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Uh, this is Mrs Superconductor. I don't know who the person you talk about is.");
break; case 1014717:	cut_pers(sprite[CAR_ADELE],		"Guys!! It's her!!");
break; case 1014718:	cut_pers(sprite[CAR_ADELE],		"Um, ignore what I just said, I was just thinking, do you like magnets?");
break; case 1014719:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Yes yes yes I do do you wanna talk about it? Let's talk about it!");
break; case 1014720:	cut_pers(sprite[CAR_ADELE],		"I have one hundred thousand million magnets to sell. Wanna buy?");
break; case 1014721:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Oh yes!! I want!! But it depends on the price.");
break; case 1014722:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Actually, I'll buy it no matter the price because I love magnets. SOLD! To the beautiful cat lady in the back! Haha, just kidding.");
break; case 1014723:	cut_pers(sprite[CAR_ADELE],		"So what address should i deliver the magnets to?");
break; case 1014724:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Hmmm... I'm not sure if I should leave my address to strangers. I'm a nuclear threat target.");
break; case 1014725:	cut_pers(sprite[CAR_ADELE],		"But I am... Pepper? Epper?");
break; case 1014726:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Hi Epper. Why didn't you say that at the start? You can send it to Magnetfactory 15!! Just deliver it to the factory gate!");
break; case 1014727:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"I can't believe that I will get more magnets soon!! Yes yes yes yes!! ^^");
break; case 1014728:	cut_pers(sprite[CAR_MRS_SUPERCONDUCTOR],"Wait, why would Epper sell something to me? We're friends?");
break; case 1014729:	cut_pers(sprite[CAR_ADELE],		"Bye bitch!");
break; case 1014730:	cut_pers(sprite[CAR_ADELE],		"So guys what about destroying her factory?");
break; case 1014731:	cut_pers(sprite[CAR_DARK_GANDALF],	"That is a given.");
break; case 1014732:	cut_pers(sprite[CAR_HARASS],		"Let's go!!! Let's kill people!");
break; case 1014733:	cut_pers(sprite[CAR_DOGERT],		"IM.AGAINST.MURDER.JUST.SO.YOU.KNOW.");
break; case 1014734:	cut_pers(sprite[CAR_ADELE],		"Yeah I didn't mean we should kill anyone");
break; case 1014735:	room.visible = false;
			ts_end(CUT_FREEROAM_KILLEPPER);

// CUT_FREEROAM_KILLEPPER - ofärdig
break; case 1016000:
ts_start();
ts_during();
switch (q) {
       case 0:		bet_pers(sprite[CAR_ADELE],		"first, we have to kill 'epper");
break; case 0.25:	bet_pers(shelf,				"what?");
break; case 0.5:	bet_pers(sprite[CAR_ADELE],		"we know where magnet bitch's magnet factory is.");
break; case 0.75:	bet_pers(sprite[CAR_ADELE],		"but we don't know how to sneak in");
break; case 1:		bet_pers(sprite[CAR_ADELE],		"but everyone fear 'epper.");
break; case 1.25:	bet_pers(sprite[CAR_ADELE],		"so we have to be 'epper.");
break; case 1.5:	bet_pers(sprite[CAR_ADELE],		"maybe we can do it without killing him too. let's see how it turns out!");
break; case 2:		bet_pers(sprite[CAR_ADELE],		"aaaaand... off we go bitch!");

break; case 2.75:	bet_pers(shelf,				"det där är hårass hus va?");
break; case 3:		bet_pers(sprite[CAR_ADELE],		"japp! här kan vi testa atombomben, tur att du sa det, perfekt ställe ju!");
break; case 3.25:	bet_pers(shelf,				"atombomben?!");
break; case 3.5:	bet_pers(sprite[CAR_ADELE],		"yes i make my own atombombs out of steroid atoms");
break; case 3.75:	bet_pers(shelf,				"sweet");
break; case 4:		bet_pers(sprite[CAR_ADELE],		"i forgot the recipe for steroids, you remember it?");
break; case 4.25:	bet_pers(shelf,				"hmm, no?");
break; case 4.5:	bet_pers(sprite[CAR_ADELE],		"kin---da need it now. like now now now now now");
break; case 4.75:	bet_pers(shelf,				"...");
break; case 5:		bet_pers(shelf,				"sand and raisins");
break; case 5.25:	bet_pers(sprite[CAR_ADELE],		"it's that simple?");
break; case 5.5:	bet_pers(shelf,				"didn't you know it before forgot it?");
break; case 5.75:	bet_pers(sprite[CAR_ADELE],		"my recipe was way more complicated");
break; case 6:		bet_pers(shelf,				"well, there you go");
break; case 6.25:	bet_pers(sprite[CAR_ADELE],		"Jag har för mig att jag brukar strö lite pärlsocker på toppen också.");
break; case 6.5:	bet_pers(shelf,				"okej gör som du vill, jag är ingen polis");

break; case 7:		bet_pers(sprite[CAR_ADELE],		"'epper usually helps old ladies over the street to gain respect around this time");
break; case 7.25:	bet_pers(sprite[CAR_ADELE],		"but he only does it outside his hobecause he's too lazy to go anywhere else");
break; case 7.5:	bet_pers(shelf,				"i drop a bomb now");
break; case 7.75:	bet_pers(sprite[CAR_ADELE],		"or wait!");
break; case 8:		bet_pers(shelf,				"now i drop it");
break; case 8.25:	bet_pers(sprite[CAR_ADELE],		"okay... kind of a chaos now.");
break; case 8.5:	bet_pers(sprite[CAR_ADELE],		"quick, get down into his hoand we'll go in and steal his clothes!");
}

// CUT_FREEROAM_5
break; case 1019200:

// CUT_CUTSCENE_MEETING_5 - ta bort / byt ut?
break; case 1019201:	cut_pers(shelf,				"Everyone, say hello to my new friend, Disonesty!");
break; case 1019202:	cut_pers(sprite[CAR_OMALLEY],		"Help! Who are you?");
break; case 1019203:	cut_pers(sprite[CAR_OMALLEY],		"I'm Disonesty");
break; case 1019204:	cut_pers(sprite[CAR_OMALLEY],		"Are you a girl?");
break; case 1019205:	cut_pers(sprite[CAR_OMALLEY],		"Yeah but I'm mostly just a pig");
break; case 1019206:	cut_pers(sprite[CAR_OMALLEY],		"Hmm...");
break; case 1019207:	cut_pers(sprite[CAR_DADDY],		"She isn't dangerous!");
break; case 1019208:	cut_pers(sprite[CAR_OMALLEY],		"I'm doubting.");
break; case 1019209:	cut_pers(sprite[CAR_DADDY],		"Hi, Disonesty, I'm Daddy! I'm a gentleman who shows a lot of respect towards women, so if you have any questions just ask me!");
break; case 1019210:	cut_pers(sprite[CAR_OMALLEY],		"Okay I'm still primarily a pig and not just my gender, but thanks");
break; case 1019211:	cut_pers(sprite[CAR_DARK_GANDALF],	"I believe in you, pig. You have a future ahead of you. A life to be lived! Just make sure to live it with RED BLOOD!");
break; case 1019212:	cut_pers(sprite[CAR_OMALLEY],		"I don't understand");
break; case 1019213:	cut_pers(sprite[CAR_DARK_GANDALF],	"Life should be lived COMMUNISTIC!");
break; case 1019214:	cut_pers(sprite[CAR_OMALLEY],		"Okay weird.");
break; case 1019215:	cut_pers(sprite[CAR_DARK_GANDALF],	"I didn’t want to WRITE YOU ON THE NOSE, but you didn’t UNDERSTAND when i said RED BLOOD.");
break; case 1019216:	cut_pers(sprite[CAR_DOGERT],		"HI.DISCHARGED. ARE.YOU.WELL.VERSED.IN.THE.MOTOR.BUSINESS.");
break; case 1019217:	cut_pers(sprite[CAR_OMALLEY],		"Not really. My car is a ball");
break; case 1019218:	cut_pers(sprite[CAR_DOGERT],		"OKAY.THAT.LOOKS.FUN.CAN.I.TRY.");
break; case 1019219:	cut_pers(sprite[CAR_OMALLEY],		"This ball gives me power. Without it, im just a little pig");
break; case 1019220:	cut_pers(sprite[CAR_DOGERT],		"MAYBE.ITS.BETTER.IF.WE.NEVER.TALK.");
break; case 1019221:	cut_pers(sprite[CAR_ADELE],		"Dogert, you're not supposed to be here.");
break; case 1019222:	room.visible = false;
			ts_end(CUT_FREEROAM_SVINERI_1);

// CUT_FREEROAM_SVINERI_1 - ofärdig
break; case 1019300:
ts_start();
ts_during();
switch (q) {
       case 0:		bet_pers(shelf,				"hey by the way i'm epper now and i have mad respect. we can do some fun things before the plan. just mess around with my new almighty power");
break; case 0.25:	bet_pers(sprite[CAR_DARK_GANDALF],	"whoa en bärgningsbil!");
break; case 0.5:	bet_pers(sprite[CAR_OMALLEY],		"tänker ni samma som jag?");
break; case 0.75:	bet_pers(sprite[CAR_ADELE],		"dags att exploita the shit out of it");
break; case 1:		bet_pers(shelf,				"jaaaaaaaa");
break; case 1.25:	bet_pers(sprite[CAR_ADELE],		"jag vet en parkering, vid hårass lägenhetskomplex, den är alltid full med bilar. jag tänker vi droppar alla dem i havet.");
break; case 1.5:	bet_pers(sprite[CAR_OMALLEY],		"några i vulkanen på hongkong/japan också.");
break; case 1.75:	bet_pers(sprite[CAR_DARK_GANDALF],	"jag tänkte dra mina bilar så in i helvete mot den skarpa marken i haftlan, sedan droppa ner dem från ett berg o bara höra BOOMKLASCHBAM!! hahahahaha");
break; case 2:		bet_pers(sprite[CAR_OMALLEY],		"min idé är att bara ställa dem riktigt långt bort. så att de aldrig hittas av sin ägare igen, och de kan inte fota någon trasig bil och få försäkringspengar för det.");
break; case 2.25:	bet_pers(shelf,				"jag vill testa adeles atombomber på några bilar.");
break; case 2.5:	bet_pers(sprite[CAR_ADELE],		"sure bro");

break; case 4:		bet_pers(shelf,				"när jag är epper, då är jag fri.");
break; case 4.25:	bet_pers(sprite[CAR_OMALLEY],		"åh jag önskar jag också kunde vara epper");
break; case 4.5:	bet_pers(sprite[CAR_ADELE],		"är vi inte alla epper på nåt sätt?");
break; case 4.75:	bet_pers(sprite[CAR_DARK_GANDALF],	"jo. Innerst inne.");
break; case 5:		bet_pers(sprite[CAR_OMALLEY],		"vi är alla epper, epper är alla oss. Han är vi.");
break; case 5.25:	bet_pers(sprite[CAR_ADELE],		"gött snack. Ska vi spränga något?");
break; case 5.5:	bet_pers(sprite[CAR_OMALLEY],		"jepp");
break; case 5.75:	bet_pers(sprite[CAR_HARASS],		"kolla en auktion *åker dit*");
}

// CUT_FREEROAM_AUCTION - svenska
break; case 1019500:
ts_start();
ts_during();
switch (q) {
       case 0:		bet_pers(sprite[CAR_HARASS],		"hej äckliga hora till expedit, jag är eppers kompis och jag får göra vad jag vill *kör sönder vaser*");
break; case 0.25:	bet_pers(sprite[CAR_DADDY],		"oj, lite väl va");
break; case 0.5:	bet_pers(sprite[CAR_ADELE],		"nej *kör sönder vaser*");
break; case 0.75:	bet_pers(sprite[CAR_DADDY],		"haha vilken smäll okej jag ger mig det här var jävligt kul *kör sönder vaser*");
break; case 1.25:	bet_pers(shelf,				"here's a quarter of a penny, take it as an apology.");
}

// CUT_FREEROAM_SVINERI_2 - ofärdig
break; case 1019700:
ts_start();
ts_during();
switch (q) {
       case 0:		bet_pers(sprite[CAR_DADDY],		"i want muffins");
break; case 0.25:	bet_pers(sprite[CAR_DADDY],		"wow");
break; case 0.5:	bet_pers(sprite[CAR_HARASS],		"vroom vroom vroom *åker runt*");
break; case 0.75:	bet_pers(sprite[CAR_ADELE],		"there's a gas station over there!");
break; case 1:		bet_pers(sprite[CAR_DADDY],		"mm mm mm mm muffinnnnsss *åker plötsligt jättefort*");
break; case 1.25:	bet_pers(sprite[CAR_HARASS],		"and i want weird car stuff");
break; case 1.5:	bet_pers(sprite[CAR_ADELE],		"i want energy drink");
break; case 1.75:	bet_pers(sprite[CAR_OMALLEY],		"i want the latest CD by the new swingjazz group, The Ladybug Killers");
break; case 2:		bet_pers(sprite[CAR_DARK_GANDALF],	"and, i, darchadaid marbdah, want this country to start making sense!");
break; case 2.25:	bet_pers(shelf,				"i want a monthly subscription on cat sand");
break; case 2.5:	bet_pers(sprite[CAR_ADELE],		"or we just-");
}

// CUT_CUTSCENE_HARASSFAN - ofärdig
break; case 1019701:	cut_pers(sprite[CAR_HARASS],		"and why the fuck are you here?");
break; case 1019702:	cut_pers(sprite_fan,			"i could ask you the same question. Why the fuck are you here?");
break; case 1019703:	cut_pers(sprite[CAR_HARASS],		"shelf, take this *slänger strykbräda till shelf*");
break; case 1019704:	ts_end(CUT_FREEROAM_HARASSFAN);

// CUT_FREEROAM_HARASSFAN - ofärdig
break; case 1019900:
ts_start();
ts_during();
switch (q) {
       case 0:		cut_pers(sprite[CAR_HARASS],		"oh fuck, I hate that one specific fan. she laughed at my scottish dance when we had a VIP show. ey move, i’ll just - FUCK YOU!");
break; case 0.5:	cut_pers(sprite_fan,			"ey is it you, you bitch, is it you who dance so bad? come here and i’ll kill you!");
break; case 1:		cut_pers(sprite[CAR_HARASS],		"you challenge me to a death duel? bad luck for you that death is my middle name? i’ll kill you LOSER!");
break; case 1.5:	cut_pers(sprite_fan,			"ok but look at this, i’m gonna kill you more!");
break; case 2:		cut_pers(sprite_fan,			"you ruined HARPA!");
break; case 2.5:	cut_pers(sprite[CAR_HARASS],		"yeah, by leaving!");
break; case 3:		cut_pers(sprite_fan,			"that’s not what i meant. whore gay");
break; case 3.5:	cut_pers(sprite_fan,			"usually, every member of a group has some specific quality: either vocalist, dancer or visual. Weirdly enough, you’re nothing of it! Why are you even breathing, fucker?!");
break; case 4:		cut_pers(sprite[CAR_HARASS],		"because you haven’t killed me yet");
break; case 4.5:	cut_pers(sprite_fan,			"soon it will happen, bitch!");
break; case 5:		cut_pers(sprite[CAR_HARASS],		"you have to get better at throwing k-pop memorabilia if that’s the case!");
break; case 5.5:	cut_pers(sprite_fan,			"only if you advance at singing and dancing!");
break; case 6:		cut_pers(sprite[CAR_HARASS],		"NEVER! or maybe");
}

// CUT_CUTSCENE_GASSTATION - svenska
break; case 10019901:	cut_pers(sprite_faderlenin, 		"vilket väder det är nu för tiden. alltid regn! eller sol eller mulet. alltid är det nåt!");
break; case 10019902:	cut_pers(sprite_faderlenin,		"sex porrtidningar! till priset av fem, tack!");
break; case 10019903:	cut_pers(sprite_storeowner,		"ehm... vi har inte erbjudande idag.");
break; case 10019904:	cut_pers(sprite_faderlenin,		"nej men jag har! *lämnar för lite pengar, och muttrar högljutt när han lämnar byggnaden*");
break; case 10019905:	cut_pers(sprite[CAR_DARK_GANDALF],	"okay guys you can't steal things now. we have to keep a good connection to the car gas dealers. even if we are the fucking president’s friends now.");
break; case 10019906:	cut_pers(sprite[CAR_DADDY],		"boooring, i want to steal!!");
break; case 10019907:	cut_pers(shelf,				"me too, stealing has always been my passion.");
break; case 10019908:	cut_pers(sprite[CAR_ADELE],		"can i at least punch the store owner?");
break; case 10019909:	cut_pers(sprite[CAR_DARK_GANDALF],	"no.");
break; case 10019910:	cut_pers(sprite[CAR_DARK_GANDALF],	"let's just ask nicely to tank the car, buy some christmas tree shaped air freshener and the latest CD by Blake Shelton.");
break; case 10019911:	cut_pers(sprite[CAR_OMALLEY],		"Blake Shelton, isn't that Gwen Stefani's wife?");
break; case 10019912:	cut_pers(sprite[CAR_DARK_GANDALF],	"no, she is his man. He's a pussy.");
break; case 10019913:	cut_pers(sprite_storeowner,		"are you done talking? That will be 70 dollars.");
break; case 10019914:	cut_pers(sprite[CAR_DARK_GANDALF],	"what the hell? 2-digit money?");
break; case 10019915:	cut_pers(sprite[CAR_OMALLEY],		"o'ballin ain't ballin with this guy");
break; case 10019916:	cut_pers(shelf,				"i'm thinking STEAL right now.");
break; case 10019917:	cut_pers(sprite[CAR_DADDY],		"your mom has a better gas station than you, BOOM! *smacks store owner in the face, and they all run out of the store and drive away*");

// CUT_CUTSCENE_MEETING_6 - svenska
break; case 1029201:	cut_pers(sprite[CAR_OMALLEY],		"okej ska vi genomföra planen nu?");
break; case 1029202:	cut_pers(shelf,				"vad var nästa plan?");
break; case 1029203:	cut_pers(sprite[CAR_HARASS],		"hmm moona framför riksdagshuset va?");
break; case 1029204:	cut_pers(sprite[CAR_OMALLEY],		"men den RIKTIGA planen. Den vi faktiskt skulle göra innan vi började göra allt det här");
break; case 1029205:	cut_pers(sprite[CAR_ADELE],		"ägga tjänstefolk på deras årliga bankett?");
break; case 1029206:	cut_pers(sprite[CAR_OMALLEY],		"vi skulle smyga in i magnetfabriken!");
break; case 1029207:	cut_pers(sprite[CAR_DARK_GANDALF],	"shit, hade helt glömt. Just det, den onda snubben.");
break; case 1029208:	cut_pers(sprite[CAR_DARK_GANDALF],	"man glömmer lätt bort problem när livet är så här festligt. Att vara ett svin är ren lycka för mig.");

// CUT_FREEROAM_DARK
break; case 1029700:

// CUT_FREEROAM_MAGNETFACTORY
break; case 1029900:

// CUT_FREEROAM_PISSANDSHIT (alternativ)
break; case 9000000:
ts_start();
ts_during();
switch (q) {
       case 0.25:	bet_pers(sprite[CAR_DARK_GANDALF],	"just gonna piss and shit etc");
break; case 0.5:	bet_pers(sprite[CAR_HARASS],		"me too but i’m gonna do the other order like shit then piss etc");
break; case 0.75:	bet_pers(sprite[CAR_ADELE],		"ok");
break; case 1.25:	bet_pers(sprite[CAR_HARASS],		"I saw.");
break; case 1.5:	bet_pers(sprite[CAR_DARK_GANDALF],	"don’t say anything!!");
break; case 2:		bet_pers(sprite[CAR_HARASS],		"i’m not sure if i can promise to not say anything. They are so small. In a so so funny way. Everybody must know.");
break; case 2.5:	bet_pers(sprite[CAR_DARK_GANDALF],	"okay, then… then I’ll tell them about Adeles mom.");
break; case 3:		bet_pers(sprite[CAR_HARASS],		"NO you can’t tell them about how I just BAM BAM BAM made sweet love to Mama Adele, that would be the worst. I would have to start doing the same to everybody’s moms if they found out about what a wonderful and tender night I gave her.");
break; case 3.5:	bet_pers(sprite[CAR_DARK_GANDALF],	"So, you shut up, I shut up?");
break; case 3.75:	bet_pers(sprite[CAR_HARASS],		"hmmm... arrrgh... i really wanna tell them about your tiny comedy hands.");
break; case 4.25:	bet_pers(sprite[CAR_HARASS],		"...");
break; case 4.5:	bet_pers(sprite[CAR_HARASS],		"But okay");
break; case 4.75:	bet_pers(sprite[CAR_DARK_GANDALF],	"Dark deal.");
break; case 5:		bet_pers(sprite[CAR_HARASS],		"i’ll give you 100 bucks too if you keep quiet about my bedroom magic.");
break; case 5.5:	bet_pers(sprite[CAR_DARK_GANDALF],	"then you get 100 bucks from me too.");
break; case 5.75:	bet_pers(sprite[CAR_HARASS],		"Great, then we’re double safe.");
break; case 6:		ts_end(CUT_FREEROAM_WASHING_2);
}

break; default: throw new Error();
}
}
