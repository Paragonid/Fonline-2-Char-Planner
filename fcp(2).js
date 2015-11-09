// jquery-deparam/jquery-deparam.min.js
!function(deparam){if(typeof require==="function"&&typeof exports==="object"&&typeof module==="object"){var jquery=require("jquery");module.exports=deparam(jquery)}else if(typeof define==="function"&&define.amd){define(["jquery"],function(jquery){return deparam(jquery)})}else{var global=(false||eval)("this");global.deparam=deparam(jQuery)}}(function($){return function(params,coerce){var obj={},coerce_types={"true":!0,"false":!1,"null":null};$.each(params.replace(/\+/g," ").split("&"),function(j,v){var param=v.split("="),key=decodeURIComponent(param[0]),val,cur=obj,i=0,keys=key.split("]["),keys_last=keys.length-1;if(/\[/.test(keys[0])&&/\]$/.test(keys[keys_last])){keys[keys_last]=keys[keys_last].replace(/\]$/,"");keys=keys.shift().split("[").concat(keys);keys_last=keys.length-1}else{keys_last=0}if(param.length===2){val=decodeURIComponent(param[1]);if(coerce){val=val&&!isNaN(val)?+val:val==="undefined"?undefined:coerce_types[val]!==undefined?coerce_types[val]:val}if(keys_last){for(;i<=keys_last;i++){key=keys[i]===""?cur.length:keys[i];cur=cur[key]=i<keys_last?cur[key]||(keys[i+1]&&isNaN(keys[i+1])?{}:[]):val}}else{if($.isArray(obj[key])){obj[key].push(val)}else if(obj[key]!==undefined){obj[key]=[obj[key],val]}else{obj[key]=val}}}else if(key){obj[key]=coerce?undefined:""}});return obj}});

var SPECIAL = { "ST": 0,
                "PE": 1,
                "EN": 2,
                "CH": 3,
                "IN": 4,
                "AG": 5,
                "LK": 6 };

var TRAITS = [  "FastMet",
                "Bruiser",
                "SmallFrame",
                "OneHand",
                "Finesse",
                "Kamikaze",
                "HeavyHand",
                "FastShot",
                "BloodyMess",
                "Jinxed",
                "GoodNatured",
                "ChemReliant",
                "ChemResistant",
                "Bonehead",
                "Mutant",
                "Evader" ];

var CARRYWEIGHT = {0: [0, 0],
                   1: [31, 27],
                   2: [43, 33],
                   3: [54, 40],
                   4: [65, 47],
                   5: [77, 54],
                   6: [88, 61],
                   7: [99, 67],
                   8: [110, 74],
                   9: [122, 81],
                   10: [133, 88]};

var SKILLS_RAW = [ "SG", "BG", "EW", "CC", "Scavenging", "Throwing", "FA", "Doc", "Sneak", "LP", "Steal", "Traps", "Science", "Repair", "Speech", "Barter", "Gambling", "ODM" ];
var SKILLS = {};
for (var i = 0; i < SKILLS_RAW.length; i++) {
    SKILLS[SKILLS_RAW[i]] = i;
}

var PERKS_RAW = [
        "Anticritical",
        "Bonus HtH Damage",
        "Cautious Nature",
        "Earlier Sequence",
        "Healer",
        "Quick Hands",
        "Quick Recovery",
        "Stonewall",
        "Strong Back",
        "Thief",
        "Toughness",
        "Harmless",
        "Ghost",
        "Educated",
        "Adrenaline Rush",
        "Bonus Ranged Damage",
        "Pathfinder",
        "More Critical",
        "Magnetic Personality",
        "Silent Running",
        "Dodger",
        "Light Step",
        "Sharpshooter",
        "Weapon Handling",
        "Gain Strength",
        "Gain Perception",
        "Gain Endurance",
        "Gain Charisma",
        "Gain Intelligence",
        "Gain Agility",
        "Gain Luck",
        "Better Criticals",
        "Action Boy",
        "Mr. Fixit",
        "Master Thief",
        "Medic",
        "HtH Evade",
        "Lifegiver",
        "Living Anatomy",
        "Bonus HtH Attacks",
        "Bonus Rate of Fire",
        "Pickpocket",
        "Silent Death"]


var PERKS_MAX_RANKS = {
    'Anticritical' : 2,
    'Bonus HtH Damage' : 3,
    'Cautious Nature' : 1,
    'Earlier Sequence' : 1,
    'Healer' : 2,
    'Quick Hands' : 1,
    'Quick Recovery' : 1,
    'Stonewall' : 1,
    'Strong Back' : 1,
    'Thief' : 1,
    'Toughness' : 2,
    'Harmless' : 1,
    'Ghost' : 1,
    'Educated' : 1,
    'Adrenaline Rush' : 1,
    'Bonus Ranged Damage' : 2,
    'Pathfinder' : 1,
    'More Critical' : 2,
    'Magnetic Personality' : 1,
    'Silent Running' : 1,
    'Dodger' : 1,
    'Light Step' : 1,
    'Sharpshooter' : 1,
    'Weapon Handling' : 1,
    'Gain Strength' : 1,
    'Gain Perception' : 1,
    'Gain Endurance' : 1,
    'Gain Charisma' : 1,
    'Gain Intelligence' : 1,
    'Gain Agility' : 1,
    'Gain Luck' : 1,
    'Better Criticals' : 1,
    'Action Boy' : 2,
    'Mr. Fixit' : 1,
    'Master Thief' : 1,
    'Medic' : 1,
    'HtH Evade' : 1,
    'Lifegiver' : 2,
    'Living Anatomy' : 1,
    'Bonus HtH Attacks' : 1,
    'Bonus Rate of Fire' : 1,
    'Pickpocket' : 1,
    'Silent Death' : 1 }

var PERKS_SPECIAL_REQ = {
    'Anticritical' : [0, 0, 0, 0, 0, 0, 0],
    'Bonus HtH Damage' : [6, 0, 0, 0, 0, 6, 0],
    'Cautious Nature' : [0, 6, 0, 0, 0, 0, 0],
    'Earlier Sequence' : [0, 6, 0, 0, 0, 0, 0],
    'Healer' : [0, 7, 0, 0, 5, 6, 0],
    'Quick Hands' : [0, 0, 0, 0, 0, 5, 0],
    'Quick Recovery' : [0, 0, 0, 0, 0, 5, 0],
    'Stonewall' : [6, 0, 0, 0, 0, 0, 0],
    'Strong Back' : [6, 0, 6, 0, 0, 0, 0],
    'Thief' : [0, 0, 0, 0, 0, 0, 0],
    'Toughness' : [0, 0, 6, 0, 0, 0, 0],
    'Harmless' : [0, 0, 0, 0, 0, 0, 0],
    'Ghost' : [0, 0, 0, 0, 0, 0, 0],
    'Educated' : [0, 0, 0, 0, 6, 0, 0],
    'Adrenaline Rush' : [-10, 0, 0, 0, 0, 0, 0],
    'Bonus Ranged Damage' : [0, 0, 0, 0, 0, 6, 6],
    'Pathfinder' : [0, 0, 6, 0, 0, 0, 0],
    'More Critical' : [0, 0, 0, 0, 0, 0, 6],
    'Magnetic Personality' : [0, 0, 0, 0, 0, 0, 0],
    'Silent Running' : [0, 0, 0, 0, 0, 6, 0],
    'Dodger' : [0, 0, 0, 0, 0, 6, 0],
    'Light Step' : [0, 0, 0, 0, 0, 5, 5],
    'Sharpshooter' : [0, 7, 0, 0, 6, 0, 0],
    'Weapon Handling' : [0, 0, 0, 0, 0, 5, 0],
    'Gain Strength' : [-9, 0, 0, 0, 0, 0, 0],
    'Gain Perception' : [0, -9, 0, 0, 0, 0, 0],
    'Gain Endurance' : [0, 0, -9, 0, 0, 0, 0],
    'Gain Charisma' : [0, 0, 0, -9, 0, 0, 0],
    'Gain Intelligence' : [0, 0, 0, 0, -9, 0, 0],
    'Gain Agility' : [0, 0, 0, 0, 0, -9, 0],
    'Gain Luck' : [0, 0, 0, 0, 0, 0, -9],    
    'Better Criticals' : [0, 7, 0, 0, 0, 4, 7],
    'Action Boy' : [0, 0, 0, 0, 0, 5, 0],
    'Mr. Fixit' : [0, 0, 0, 0, 0, 0, 0],
    'Master Thief' : [0, 0, 0, 0, 0, 0, 0],
    'Medic' : [0, 0, 0, 0, 0, 0, 0],
    'HtH Evade' : [0, 0, 0, 0, 0, 0, 0],
    'Lifegiver' : [0, 0, 4, 0, 0, 0, 0],
    'Living Anatomy' : [0, 0, 0, 0, 0, 0, 0],
    'Bonus HtH Attacks' : [0, 0, 0, 0, 0, 6, 0],
    'Bonus Rate of Fire' : [0, 6, 0, 0, 6, 7, 0],
    'Pickpocket' : [0, 0, 0, 0, 0, 8, 0],
    'Silent Death' : [0, 0, 0, 0, 0, 10, 0]
}
var IMPLANTS_RAW = ["Enviromental",
                    "Accuracy",
                    "Defense",
                    "Medical",
                    "Engineering",
                    "Speed",
                    "Survival",
                    "Marksmanship",
                    "Scouting",
                    "Enhancement",
                    "Chem Control"
]

var IMPLANTS_EFFECT = [ 
                        ]

var SKILL_CAPS = [  300,
                    300,
                    300,
                    200,
                    0,
                    300,
                    300,
                    300,
                    300,
                    200,
                    300,
                    300,
                    160,
                    160,
                    5,
                    4,
                    5,
                    95]

var PERKS_AFFECT = {}

var affects = {
    'outputSpecialNum': 
        // ST
    [{  'outputStats2': [0,3,4],
        'outputSkills': [3,4],
        'outputPerks':  [1,7,8,14]
    }, // PE
    {   'outputStats2': [2,9],
        'outputSkills': [6,7,9,10],
        'outputPerks':  [16,3,2,4,22,7]
    }, // EN
    {   'outputStats2': [0,1,6,7],
        'outputSkills': [3,4],
        'outputPerks':  [10,13]
    }, // CH
    {   'outputStats2': [0,3,4],
        'outputSkills': [3,4],
        'outputPerks':  [1,7,8,14]
    }, // IN
    {   'outputStats1': [1],
        'outputStats2': [0,3,4],
        'outputSkills': [3,4],
        'outputPerks':  [1,7,8,14]
    }, // AG
    {   'outputStats2': [0,3,4],
        'outputSkills': [3,4],
        'outputPerks':  [1,7,8,14]
    }, // LK
    {   'outputStats2': [0,3,4],
        'outputSkills': [3,4],
        'outputPerks':  [1,7,8,14]
    }]

}

var info = {
    'outputSpecialNum': 
["Difference between actual strength and weapon strength requirement affects chance to get arms crippled/weapon dropped when hit in arms (5% per 1 point of strength)",
"Modifies: Sight, Sequence and Hit Chance.",
"Modifies: Hit Points, hit points per level, Healing Rate, Resistance to Knockdowns and Knockouts, Poison & Radiation Resistance.",
"Modifies: Number of People that can travel with you. With 1 CH you can lead 2",
"Modifies: The number of skills points per level.",
"Modifies: Action Points, Armor Class.",
"Modifies: Critical Chance, Aimed Critical Chance, Evading bad effects of being Critically hit."],
    'outputTraits1':
["+10 healing rate. You heal HP every 15 seconds. Your base radiation and poison reistances are 0.",
"+2 to Strength +8 to your Meele Damage. 2 Action Points",
"+1 to Agility, You have less carry weight. Every time you get critically hit theres 10% to get cripples as an aditional effect besides the damage coming from hit.",
"+5 Bonus flat damage to every attack. 10% chance to avoid crippling when wielding a one-handed weapon. 20% chance to get crippled when wielding a two-handed weapon. (Happens when you are critically hit in arms. Both rolls are cummulative with strength check.)",
"10% to critical chance. + 30% to your target's Damage Resistance (If you score critical hit that omits armor this will not apply to that hit - in other words target's damage resistance is not counted while being critically hit with armor bypass.)",
"You deal 10% more damages. -10% to your damage resistances(all kinds).",
"+4 to your Melee Damage. HtH attacks now have a chance to knock down your opponent. The chance to knockdown your opponent depends on your strength, used weapon(The biggest chances are with Mega power fist and Louisville slugger) and whether your opponent has Stonewall or not. -30 to your critical roll. Its a roll describing how good your critical will be not how often you will get one.",
"5 Bonus flat damage to every attack. It costs you one less AP than normal to attack with every aimable weapon in game. You can't perform aimed attacks."],
    'outputTraits2':
["You always get extreme death animations. Lowering enemy's HP below 0 kills them instantly. Killed enemies have theirs armors badly damaged.", 
"Every time a person or an animal targeting you misses, there is a 50% chance of that miss being upgraded to a critical miss. Unfortunately, the same thing applies to any of your own unsuccessful attacks.",
"+15% to First Aid, Doctor, Speech and Barter skills. -10% to Small Guns, Big Guns, Energy Weapons, Close Combat and Throwing.",
"Duration of drugs is now 60 minutes. Your chance to be addicted is doubled.",
"Your chance to be addicted are halfed. Duration of drugs is now 15 minutes.",
"Protection of -10 to critical hit roll on eye and head shots. -1 Intelligence point. You can't have more than 9 Intelligence points.",
"+100 to your Hit Points. +100% to your Outdoorsman skill. You get +2/5% normal, +1/20% fire, + 5/15% explode and 2/20% electric resistances bonuses. You can wear only: Leather Jacket, Combat Leather Jacket, Leather Armor, Leather Armor mkII, Metal Armor, Metal Armor MKII and Tesla Armor. You are slow mutie! (No running animation, no movement bonuses from combat skils and speed implant.  You can use only few weapons. (All Big Guns, all Energy Rifles, some meele weapons and grenades.)",
"Your enemies have 10% less chance to hit you. The max chance to hit you is now 85%. -2 to Endurance. You can't have more than 8 Endurance. Do note that hit calcalution of other persons targeting user with evader will still display chance to hit at 95%. It's untrue and serve to hide presence of this perk on its wielder."],
    'outputSkills':
["Modifies Chance to hit with small guns.",
"Modifies Chance to hit with big guns.",
"Modifies Chance to hit with energy weapons.",
"Modifies Chance to hit with close combat weapons, each 4% after 100% will grant 1% of running speed animation if you don't hold shootable weapon. No affect after 200%.",
"Modifies chances to obtain resources while collecting them. Can't be normally increased. Increasing during using",
    "Modifies Chance to hit with throwables",
"Modifies cooldown and amount of HP healed by using First Aid.",
"Modifies chance to heal crippled limb, cure Knock Out (until 200%) and cooldown.",
"Modifies chance to stay unnoticed.",
"Modifies chance to open locks. No affect after 200%.",
"Modifies chance to steal an item",
"Modifies Likelihood of spotting traps and increase chance to disarm a spotted traps.",
"Modifies Chance to hack computers, and increasing the amount of resouces you get from disassembling items. No affect after 160%.",
"Modifies Chance to repair items. No affect after 160%.",
"Modifies Nothing.",
"Modifies barter prices. Increasing during using. No affect after 200%.",
"Modifies Nothing.",
"Modifies likelihood of being forced into random encounters. No affect after 95%."],
    'outputPerks1':
["10% chance to resist critical hit (hit counts as not critical). Stacks with armor anticritical bonuses.",
"+4 to HtH Damage",
"Needs to be reworked",
"+6 to Sequence",
"+4-10 HP healed when using First Aid",
"Inventory actions cost half AP, Reload and Use 1 AP",
"Quick recovery from knockdown",
"Chance to be knocked down decreased",
"+22 kg to Carry weight.",
"-10 sec to Steal cooldown, chance for no cooldown.",
"+8% to all types of DR",
"+40% to Steal",
"+30% to Sneak in dark conditions",
"+2 skill points when you gain a level",
"At 50% HP, +1AP, +10% all resistances",
"+2 to Ranged Damage",
"Travel time reduced by 30%, +30% Outdoorsman",
"+8% to Critical Chance",
"Plus two party slots",
"Ability to sneak and run at the same time",
"+40 to AC",
"Less chance to set off a trap(-90%)",
"Add 2 virtually points of perception. This bonus stacks with PE 10.",
"+3 to ST for weapon handling Strength checks"],
    'outputPerks2':
["+2 to Strength",
"+2 to Intelligence",
"+2 to Luck",
"+2 to Perception",
"+2 to Agility",
"+2 to Charisma",
"+2 to Endurance",
"+20% on critical hit table",
"+1 to AP",
"+10% to Repair and Science",
"+20% to Steal and Lockpick skills.",
"+25% and First Aid and Doctor timeouts halved",
"Additional bonus to AC at the end of turn",
"+40 HP",
"+20% (yes - 20, not 10) to Doctor, +5 damage to living creatures",
"HtH attacks cost 1 less AP",
"Ranged weapon attacks cost 1 AP less",
"Ignore size and facing modifiers when stealing",
"2x damage to HtH attacks from behind"],
    'implants': 
["+10 Healing Rate. +40% Poison Resistance. +50% Radiation Resistance.",
"+40% to Small Guns. +40% to Big Guns. +40% to Energy Weapons. +5 to Field of Vision.",
"+2 Damage treshold(all types). +4% Damage resistance(all types).",
"+100% First Aid skill. +100% Doctor skill. +Living Anatomy perk. +In combat maximum selfheal is equal to 175 Hit Points instead of 150.",
"+100 Repair skill. +100 Science skill. +100 Energy weapons skill. +10% To chance of crafting a item with upgrades.",
"When running your animation is 10% faster. +1 Action Point. +6 Sequence.",
"+100% Outdoorsman skill. +30% Experience gain rate. +30 Hit Points.",
"+4 To Crit Roll bonus. +4 Crit Chance of your chacter. +2 Field of Vision.",
"+50% Sneak skill. +30 Armor Class. +20 Additionally to Sneak skill at the end calculation. ",
"A new perk slot for your character to choose immediately after installing an implant.",
"Doubles drugs duration time. Super Stimpak heals +30% hit points."],
    'quests':
["Bring super tool kit to Pete JunkTown quest",
"Chess Game Glow quest choosable reward, 21 level and Intellect 8 required.",
"Chess Game Glow quest choosable reward, 21 level and Intellect 8 required.",
"Chess Game Glow quest choosable reward, 21 level and Intellect 8 required."],
    'outputStats1':
["Modifies amount of Skill points, HP and Carry Weight, availability of the perks",
"Can be spent on skills in order to improve them"],
    'outputStats2':
["Amount of damage you can take before you get uncounscios",
"Measure how quick you can regenare HPs: Healing_rate * max_hp / 300 = HP regenerated every 20 seconds. (10 seconds with Fast Metabolism)",
"Determines how far character can see, and therefore your weapon's effective range, helps to detect sneakers",
"Defines the amount of equipment you can carry",
"Modifies the damage you deal in melee combat",
"The more AC you have the bigger chance that your opponent will miss during shooting or hitting you. You can't have more than 90 Armor Class.",
"Modifies the speed you get poisoned",
"Modifies the speed you get radiated",
"Modifies the chance to experience a critical hit as uncritical",
"Modifies the turn order in turn based mode",
"Modifies the ability and speed of performing actions",
"Modifies the chance to hit critically"]
}


// variables
var traitPoints;
var tagpoints;
var SP;
var basicInt; 
var maxBooks;

var build_name = 'Unnamed';
var level = 99;
var spoints = 0;

var glowQuestTaken = -1;
var repairQuest = false;
var takenImplant = false;
var boneheadWorked = false;

var special = [6,6,7,1,6,8,6];
var gainedSpecial = [0,0,0,0,0,0,0];
//                3  6  9 12 15 18 21 24
var takenPerks = [0, 0, 0, 0, 0, 0, 0, 0]
var curSkills = Array.apply(null, new Array(SKILLS_RAW.length)).map(Number.prototype.valueOf,0);
var investedSkills = Array.apply(null, new Array(SKILLS_RAW.length)).map(Number.prototype.valueOf,0);
var takenTraits = Array.apply(null, new Array(TRAITS.length)).map(Number.prototype.valueOf,0);
var taggedSkills = Array.apply(null, new Array(SKILLS_RAW.length)).map(Number.prototype.valueOf,0);
var perks = Array.apply(null, new Array(PERKS_RAW.length)).map(Number.prototype.valueOf,0);
var takenBooks = {  'SG': 0,
                    'FA': 0,
                    'Repair': 0,
                    'Science': 0,
                    'ODM': 0 }

// interface
var PERKS_ON_LEVELS = [11, 9, 4, 15, 3, 1];
var QUANTITY_PERKS_1COL = PERKS_ON_LEVELS[0] + PERKS_ON_LEVELS[1] + PERKS_ON_LEVELS[2];
var namePerkCol1 = "Anticritical"
var namePerkCol2 = "Gain Strength"
var skillOver = 0;


function pad(num, size) {
    var s = num + "";
    while (s.length < size) { s = "0" + s; }
    return s;
}

var getSpecialNum = function(elem) {
    return elem.attr('id').substr(elem.attr('id').length - 1) - 1;
};

function outputSpecial() {

    var badSpecial = 'badSpecial';
    var badSpecials = [0,0,0,0,0,0,0]

    if (takenTraits[TRAITS.indexOf("Bonehead")] && special[SPECIAL["IN"]] > 9) {
        badSpecials[SPECIAL["IN"]] = 1
    }
    
    if (takenTraits[TRAITS.indexOf("Evader")] && special[SPECIAL["EN"]] > 8) {
        badSpecials[SPECIAL["EN"]] = 1
    }

    for (var i = 0; i < special.length; i++) {
        var div = $("#outputSpecialNum").find("div").eq(i);
        
        div.text(pad(special[i], 2));
        
        if (special[i] > 10 || special[i] < 1) {
            badSpecials[i] = 1
        }

        if (badSpecials[i]) {
            div.addClass(badSpecial);
        } else {
            div.removeClass(badSpecial);
        }
    }

    $("#outputCharpoints").text(spoints);
};

function calcUsedSkillpoints() {
    var total = 0;
    $.each(investedSkills,function() {
        total += this;
    });

    return total;
}

function calcSkillWithInvestment(num, val) {
    var investPointsLeft = investedSkills[num]
    var skillTaggedPoints = taggedSkills[num] ? 2 : 1 

    var skillPointsBySkill = {
        1:100,
        2:125,
        3:150,
        4:175,
        5:200,
        6:300
    }

    var remainder = 0;
    for(var i=1; i <= 6 && investPointsLeft > 0 && !remainder; i++) {
        if ( val <= skillPointsBySkill[i] ) {
            var pointsOnThisCoefficient = Math.ceil(( skillPointsBySkill[i] + 1. - val ) / skillTaggedPoints) * i
            // console.log(i, "skill value", val, "investPointsLeft", investPointsLeft, "skillPointsBySkill[i]", skillPointsBySkill[i], "pointsOnThisCoefficient", pointsOnThisCoefficient)
            if ( investPointsLeft < pointsOnThisCoefficient ) { 
                pointsOnThisCoefficient = investPointsLeft
            }
            remainder = pointsOnThisCoefficient % i
            if (remainder) {
                console.log("investPointsLeft: ", remainder, " they're not enough to rise skill " + num + " (" + i + " required; points for this coefficient: " + pointsOnThisCoefficient + "; total investment: "+investedSkills[num]+")")
                pointsOnThisCoefficient -= remainder
            }

            val += pointsOnThisCoefficient * skillTaggedPoints / i
            investPointsLeft -= pointsOnThisCoefficient;
        }
        // console.log("level", i, "points left", investPointsLeft, "current skill", val)
    }
    if (investPointsLeft) {
        investedSkills[num] -= investPointsLeft
    }

    return val
}

function decreseSkill() {
    index = skillOver;
    if (investedSkills[index] == 0) {return; }

    var borders = [ 101, 126, 151, 176, 201, 301 ]
    var tagged = taggedSkills[index]
    var curSkill = curSkills[index] - tagged

    var investment = 7
    for ( i=0; i<borders.length; i++ ) {
        if (curSkill <= borders[i]) {
            investment = i + 1
            break;
        }
    }

    investedSkills[index] -= investment;

    updateSkills();
    outputSkills();
    outputSkillpoints()
}

function increaseSkill() {
    index = skillOver;

    cap = 300;

    var curSkill = curSkills[index]

    if (curSkill >= cap) { return; }

    var investment = 1;
    if (curSkill > 100) {
        if (curSkill < 126) {
            investment = 2;
        } else if (curSkill < 151) {
            investment = 3;
        } else if (curSkill < 176) {
            investment = 4;
        } else if (curSkill < 201) {
            investment = 5;
        } else {
            investment = 6;
        }
    }

    investedSkills[index] += investment;

    updateSkills();
    outputSkills();
    outputSkillpoints();
}

function calcSkill(num, val, flatBonus) {
    if (taggedSkills[num]) {
        val += 20;
    }

    // adding books
    booksForThisSkill=takenBooks[SKILLS_RAW[num]]
    if (booksForThisSkill!=undefined) {
        for(var i=0; i<booksForThisSkill; i++) {
            var investment = 8;
            if (val > 100) {
                if (val < 126) {
                    investment = 4;
                } else if (val < 151) {
                    investment = 2;
                } else if (val < 176) {
                    investment = 2;
                } else if (val < 201) {
                    investment = 1;
                } else {
                    investment = 1;
                }
            }
            //console.log("Book for", SKILLS_RAW[num], "Book no.", i+1, "current value", val, "Will be added", investment)
            val += investment;
        }
    }

    val = calcSkillWithInvestment(num, val)

    flatBonus = typeof flatBonus !== 'undefined' ? flatBonus : 0;

    curSkills[num] = val + flatBonus;

    outputSkills();
    outputSkillpoints();
};

function outputSkills() {
    for (var i = 0; i < SKILLS_RAW.length; i++) {
        $("#outputSkills").find("div").eq(i).find('span').eq(1).text(curSkills[i] + "% [" + investedSkills[i] + ']');
    }
}

function pickPerk(col, name) {
    if (!perkAvailable(name)) {
        return;
    }
    perks[PERKS_RAW.indexOf(name)] += 1;

    for (var testlevel=getPerkRequiredLeveldiv3m1(name);testlevel<takenPerks.length;testlevel++) {
        if( !takenPerks[testlevel] ) {
            takenPerks[testlevel]=1
            break;
        }
    }

    updateStats();
    updateSkills();
}

function unpickPerk(col, name) {
    var perkIndex=PERKS_RAW.indexOf(name)

    if (!perks[perkIndex]) {
        return;
    }

    perks[perkIndex] -= 1

    for (var testlevel=getPerkRequiredLeveldiv3m1(name);testlevel<takenPerks.length;testlevel++) {
        if( takenPerks[testlevel] ) {
            takenPerks[testlevel]=0
            break;
        }
    }

    updateStats();
    updateSkills();
}

function getPerkRequiredLeveldiv3m1(name) {
    perk_index=PERKS_RAW.indexOf(name)
    var foundIndex;
    for(index=0;index<PERKS_ON_LEVELS.length;index++) {
        element=PERKS_ON_LEVELS[index]
        if(perk_index < element) {
            return index
        }
        perk_index-=element
    }
    console.log("I'm broken! Something is too much")
    return PERKS_ON_LEVELS.length
}


function perkAvailable(name, not_ranks) {
    var perk_index=PERKS_RAW.indexOf(name)

    // checks special
    for(var index=0;index<PERKS_SPECIAL_REQ[name].length;index++) {
        var element=(PERKS_SPECIAL_REQ[name])[index]

        if(element > 0 && special[index] < element || element < 0 && special[index] >= -element) {
            return false;
        }
    }

    not_ranks = typeof not_ranks !== 'undefined' ? not_ranks : false;
    if (not_ranks) {
        return true
    }

    // checks sufficient level
    var perkAvailableByLevel = false;
    for (var testlevel=getPerkRequiredLeveldiv3m1(name);testlevel<takenPerks.length;testlevel++) {
        if( !takenPerks[testlevel] ) {
            var perkAvailableByLevel=true;
            break;
            // when adding a perk: takenPerks[testlevel]=1
        }
    }
    if (!perkAvailableByLevel) {
        return false;
    }

    // checks max perk ranks
    if (perks[perk_index] == PERKS_MAX_RANKS[name]) {
        return false;
    }

    return true;
    // when adding: perkAvailable(name) && PERKS_MAX_RANKS[PERKS_RAW.indexOf(name)] < new perk ranks
}

// STATS

function updateStats() {
    gainSpecial();
    applyImplants();
    updateTraitPoints();

    updateHealth();
    updateHealingRate();
    updateSight();
    updateCarryWeight();
    updateMeleeDamage();
    updateArmorClass();
    updatePoisonRes();
    updateRadRes();
    updateCritRes();
    updateSequence();
    updateActionPoints();
    updateCritChance();
    
    calcMaxBooks();
    calcSkillpoints();
    
    updateGlowQuestAvailable();
    
    // revokeUnavailablePerks();

    outputInterface()
};

function applyImplants() {
    // console.log(takenImplant,takenPerks,takenPerks.length, perks)
    if (takenImplant === 9) {
        if (takenPerks.length === 8) {
            takenPerks.push(0);
        }
    }
    else if (takenPerks.length === 9) {
        var revoked = takenPerks.pop();
        if (revoked) {
            for (var i = perks.length; i >= 0; i -= 1) {
                if (perks[i]) {
                    perks[i] -= 1;
                    break;
                }
            }
        }
    }
    // console.log(takenImplant,takenPerks,takenPerks.length, perks)
}

function updateTagPoints() {
    var total = 0;
    $.each(taggedSkills,function() {
        total += this;
    });
    tagpoints = 3 - total;
}

function updateTraitPoints() {
    var total = 0;
    $.each(takenTraits,function() {
        total += this;
    });
    traitPoints = 2 - total;
}

// function revokeUnavailablePerks() {
//      for (var i = 0; i < PERKS_RAW.length; i++) {
        
//         var j = i;
//         var col = 1;
//         if (i >= QUANTITY_PERKS_1COL) {
//             j = i - QUANTITY_PERKS_1COL;
//             col = 2;
//         }

//         if (perkAvailable(PERKS_RAW[i]) == false) {
//             $('#outputPerks'+col).find("div").eq(j).find("span").eq(0).addClass( "N_A" );
//         } else {
//             $('#outputPerks'+col).find("div").eq(j).find("span").eq(0).removeClass( "N_A" );
//         }

//         if (perks[i]) {
//             $('#outputPerks'+col).find("div").eq(j).find("span").eq(1).text(perks[i])
//         } else {
//             $('#outputPerks'+col).find("div").eq(j).find("span").eq(1).text("")
//         }
//     }
// }

function updateGlowQuestAvailable() {
    var className = 'N_A'
    for (var i = 0; i <= 3; i++) {
        var out = $("#quests").find("div").eq(i + 1);
        if (special[SPECIAL['IN']] < 6) {
            out.addClass(className)
        } else {
            out.removeClass(className);
        }
    }
}

function calcMaxBooks() {
    maxBooks = special[SPECIAL["IN"]] + 2;
    if (maxBooks > 10) {
        maxBooks = 10;
    }
}

function gainSpecial() {
    var gainIndexStartWith = PERKS_RAW.indexOf("Gain Strength")
    for (var i=0; i<7; i++) {
        if (perks[gainIndexStartWith+i] && !gainedSpecial[i]) {
            special[i] += 2
            gainedSpecial[i] = 1
        } else if (gainedSpecial[i] && !perks[gainIndexStartWith+i]) {
            special[i] -= 2
            gainedSpecial[i] = 0
        }
    }
    outputSpecial()
} 

function applyPerks() {
    var gainIndexStartWith = perks[PERKS_RAW.indexOf("Gain Strength")]
    var gainIndexEndWith = perks[PERKS_RAW.indexOf("Gain Endurance")]
    for (var i=0; i<7; i++) {
        if (special[gainIndexStartWith+i]) {
            special[gainIndexStartWith+i] += 2
        }
    }
}

function outputTakenPerks() {
    var output = ""
    var gainIndexStartWith = PERKS_RAW.indexOf("Gain Strength")

    PERKS_RAW.forEach(function(element, index, array) {
        if(perks[index]) {          
            // do not check for gain special perks
            if (!(index > gainIndexStartWith && index <= gainIndexStartWith + 7)) {
                if (!perkAvailable(PERKS_RAW[index], 1)) {
                    CSSclass = 'class="unavailablePerk"'
                    // console.log(perks[index], perkAvailable(PERKS_RAW[index]))
                    // perks[index] = 0;
                    // takenPerks[getPerkRequiredLeveldiv3m1(PERKS_RAW[index])] = 0;
                }
            }
            var quantity = (perks[index] > 1 ? " ("+perks[index]+')' : "");
            output += ('<div ' + CSSclass + '><span>' + element + quantity + '</span></div>')

        }
    })

    $("#outputMiddleDown").html(output);
}
    
function calcSkillpoints() {

    var SP_per_level = 5 + special[SPECIAL['IN']] * 2;
    var extraPoints = (level - 26 > 0) ? (2 + special[SPECIAL['IN']]) * (level - 26) + (level - 26) * perks[PERKS_RAW.indexOf("Educated")]: 0;
    var baseLevel = (level - 26 > 0) ? 26 : level;
    var basePoints = SP_per_level * (baseLevel - 1) + 2 * (baseLevel - 5) * perks[PERKS_RAW.indexOf("Educated")]

    SP = basePoints + extraPoints;
};
// TODO: what?
// var CSSclass = ''

function outputSkillpoints() {
    $("#outputSkillpoints").text(SP - calcUsedSkillpoints());
}

function updateCarryWeight() {
    var st = special[SPECIAL["ST"]]
    
    if (takenTraits[TRAITS.indexOf("SmallFrame")]) { i = 1 }
    else { i = 0; }

    var bonus = 22 * perks[PERKS_RAW.indexOf("Strong Back")]
    
    // console.log(level, CARRYWEIGHT, st, i, bonus)
    try {
        var cw = CARRYWEIGHT[st][i] + level-1 + bonus;    
    } catch(err) {
        console.log("probably no such weight in the table")
        var cw = 0;
    }
    
    $("#carryWeight").text(cw);
};

function updateCritChance() {
    var bonus = 0;
    if (takenTraits[TRAITS.indexOf("Finesse")]) { bonus += 10; }
    bonus += 8 * perks[PERKS_RAW.indexOf("More Critical")]
    if (glowQuestTaken === 0) { bonus += 3 }
    if (takenImplant === 7) { bonus += 4 }

    var CC = special[SPECIAL["LK"]] + bonus;

    $("#critChance").text(CC + "%");
};

function updateMeleeDamage() {
    var bonus = 0;
    if (takenTraits[TRAITS.indexOf("HeavyHand")]) { bonus += 4; }
    if (takenTraits[TRAITS.indexOf("Bruiser")]) { bonus += 8; }
    bonus += 4 * perks[PERKS_RAW.indexOf("Bonus HtH Damage")]
    
    var MD = special[SPECIAL["ST"]] + bonus;

    $("#meleeDamage").text(MD);
};

function updateHealth() {
    var st = special[SPECIAL["ST"]]
    var en = special[SPECIAL["EN"]]
    
    var bonus = 0;
    if (takenTraits[TRAITS.indexOf("Mutant")]) { bonus += 100; }
    bonus += 40 * perks[PERKS_RAW.indexOf("Lifegiver")]
    if (glowQuestTaken == 2) { bonus += 10 }
    if (takenImplant === 6) { bonus += 30 }
    
    var baseLevel = level;
    var bonus_for_level = 0;
    
    if (level > 26) { 
        baseLevel = 26; 
        bonus_for_level = level - 26;
    }
    
    hp_per_lvl = 2 + en / 2;

    var health = 55 + st + en * 2 + 
        Math.floor(hp_per_lvl * (baseLevel - 1)) + 
        bonus_for_level + bonus;

    $("#health").text(health);
};

function updateHealingRate() {
    var en =special[SPECIAL["EN"]]
    
    var basesHR;
    if (en < 6) {
         baseHR = 1;
    } else if (en < 9) {
         baseHR = 2;
    } else {
         baseHR = 3;
    }
    
    var bonus = 0;
    if (takenTraits[TRAITS.indexOf("FastMet")]) { bonus += 10; }
    if (glowQuestTaken == 2) { bonus += 4}
    if (takenImplant === 0) {bonus += 10}
    
    var HR = baseHR + bonus;
    
    $("#healRate").text(HR);
};

function updateActionPoints() {
    var bonus = 0;
    if (takenTraits[TRAITS.indexOf("Bruiser")]) { bonus -= 2; }
    bonus += perks[PERKS_RAW.indexOf("Action Boy")]
    if (takenImplant === 5) { bonus += 1 }
    
    var AP = 5 + Math.floor(special[SPECIAL["AG"]] / 2) + bonus;

    $("#actionPoints").text(AP);
};

function updateSight() {
    var bonus = 0;
    if (glowQuestTaken == 1) { bonus += 1 }
    if (takenImplant === 1) { bonus += 5 }
    else if (takenImplant === 7) { bonus += 2 }
    
    var sight = 20 + special[SPECIAL["PE"]] * 3 + bonus + 6 * perks[PERKS_RAW.indexOf("Sharpshooter")];
    
    $("#sight").text(sight);
};

function updateArmorClass() {
    var bonus = 0;
    bonus += 40 * perks[PERKS_RAW.indexOf("Dodger")]
    if (takenImplant === 8) { bonus += 30 }
    
    var AC = special[SPECIAL["AG"]] + bonus;
    
    $("#armorClass").text(AC);
};

function updatePoisonRes() {
    
    var bonus = 0;
    if (takenImplant === 0) { bonus += 40; }
    var en = takenTraits[TRAITS.indexOf("FastMet")] ? 0 : special[SPECIAL['EN']];
    
    var PR = 5 * en + bonus;

    $("#poisonRes").text(PR + "%");
};

function updateRadRes() {

    var bonus = 0;
    if (takenImplant === 0) { bonus += 50;}
    var en = takenTraits[TRAITS.indexOf("FastMet")] ? 0 : special[SPECIAL['EN']];
    
    var RR = 2 * en + bonus;

    $("#radRes").text(RR + "%");
};
        
function updateCritRes() {
    var result = 10 * perks[PERKS_RAW.indexOf("Anticritical")]

    $("#critRes").text(result + "%");
};

function updateSequence() {
    var bonus = 0;
    bonus += 6 * perks[PERKS_RAW.indexOf("Earlier Sequence")]
    if (takenImplant === 5) { bonus += 6 }
    
    var seq = 2 * special[SPECIAL["PE"]] + bonus;

    $("#sequence").text(seq);
};

// SKILLS


function updateSkills() {
    
    basicInt = special[SPECIAL["IN"]] 
    if (takenTraits[TRAITS.indexOf('Bonehead')] && boneheadWorked) {
        basicInt += 1;
    }

    updateTagPoints();
    updateSG();
    updateBG();
    updateEW();
    updateCC();
    updateScavenging();
    updateThrowing();
    updateFA();
    updateDoc();
    updateSneak();
    updateLP();
    updateSteal();
    updateTraps();
    updateScience();
    updateRepair();
    updateSpeech();
    updateBarter();
    updateGambling();
    updateODM();

    outputInterface();
};

function calcFlatBonus(val, perkName) {
    var flatBonus = 0;
    var index = PERKS_RAW.indexOf(perkName); 
    flatBonus += val * perks[index]
    return flatBonus;
}

function updateSG() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? -10 : 0;
    
    var res = 5 + 4 * special[SPECIAL["AG"]];

    var flatBonus = 0;
    if (takenImplant === 1) { flatBonus += 40 }

    calcSkill(0, res + bonus, flatBonus); 
};
    
function updateBG() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? -10 : 0;
    
    var res = 2 * special[SPECIAL["AG"]];

    var flatBonus = 0;
    if (takenImplant === 1) { flatBonus += 40 }
    
    calcSkill(1, res + bonus, flatBonus); 
};

function updateEW() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? -10 : 0;
    
    var res = 2 * special[SPECIAL["AG"]];

    var flatBonus = 0;
    if (takenImplant === 1) { flatBonus += 40 }
    else if (takenImplant === 4) { flatBonus += 100 }
    
    calcSkill(2, res + bonus, flatBonus); 
};

function updateCC() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? -10 : 0;
    
    var res = 30 + 2 * (special[SPECIAL["AG"]] + special[SPECIAL["ST"]]);
    
    calcSkill(3, res + bonus); 
};

function updateScavenging() {
    calcSkill(4, 0); 
};

function updateThrowing() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? -10 : 0;
    
    var res = 4 * special[SPECIAL["AG"]];
    
    calcSkill(5, res + bonus); 
};

function updateFA() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? 15 : 0;
    
    var res = 2 * (special[SPECIAL["PE"]] + basicInt);

    var flatBonus = calcFlatBonus(25, "Medic");
    if (takenImplant === 3) { flatBonus += 100 }
    
    calcSkill(6, res + bonus, flatBonus); 
};

function updateDoc() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? 15 : 0;
    
    var res = 5 + (special[SPECIAL["PE"]] + basicInt);

    var flatBonus = calcFlatBonus(20, "Living Anatomy"); 
    flatBonus += calcFlatBonus(25, "Medic");
    if (takenImplant === 3) { flatBonus += 110 }
    
    calcSkill(7, res + bonus, flatBonus); 
};

function updateSneak() {
    var flatbonus = 0;
    if (takenImplant === 8) { flatbonus += 50 }
    var res = 5 + 3 * special[SPECIAL["AG"]];
    
    calcSkill(8, res, flatbonus); 
};

function updateLP() {
    var res = 10 + (special[SPECIAL["PE"]] + special[SPECIAL["AG"]]);

    var flatBonus = calcFlatBonus(20, "Master Thief");
    
    calcSkill(9, res, flatBonus); 
};

function updateSteal() {
    var res = 3 * special[SPECIAL["AG"]];

    var flatBonus = calcFlatBonus(40, "Harmless");
    flatBonus += calcFlatBonus(20, "Master Thief");
    
    calcSkill(10, res, flatBonus); 
};

function updateTraps() {
    var res = 10 + (special[SPECIAL["PE"]] + special[SPECIAL["AG"]]);
    
    calcSkill(11, res); 
};

function updateScience() {
    var res = 4 * basicInt;

    var flatBonus = calcFlatBonus(10, "Mr. Fixit");
    if (takenImplant === 4) { flatBonus += 100 }
    
    calcSkill(12, res, flatBonus); 
};

function updateRepair() {
    var res = 3 * basicInt;

    var bonus = 0;
    if (repairQuest) {
        bonus += 20;
    }

    var flatBonus = calcFlatBonus(10, "Mr. Fixit");
    if (takenImplant === 4) { flatBonus += 100 }
    
    calcSkill(13, res + bonus, flatBonus); 
};

function updateSpeech() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? 15 : 0;
    
    var res = 5 * special[SPECIAL["CH"]];
    
    calcSkill(14, res + bonus);
};

function updateBarter() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? 15 : 0;

    var res = 4 * special[SPECIAL["CH"]];
    
    calcSkill(15, res + bonus); 
};

function updateGambling() {
    var res = 5 * special[SPECIAL["LK"]];
    
    calcSkill(16, res); 
};

function updateODM() {
    var bonus = takenTraits[TRAITS.indexOf("Mutant")] ? 100 : 0;

    var res = 2 * (special[SPECIAL["EN"]] + basicInt);

    var flatBonus = calcFlatBonus(30, "Pathfinder");
    if (takenImplant === 6) { flatBonus += 100 }
    
    calcSkill(17, res + bonus, flatBonus); 
};
    
function applyTrait(num, status) {

    switch (num) {
        case TRAITS.indexOf('Bruiser'):

            changeSpecialByTrait("ST", (status ? 2 : -2));
            break;
            
        case TRAITS.indexOf('SmallFrame'):
            
            changeSpecialByTrait("AG", (status ? 1 : -1));
            break;

        case TRAITS.indexOf('Bonehead'): 
            if (special[SPECIAL["IN"]] > 1 && !takenTraits[num]) {
                changeSpecialByTrait("IN", -1);
                boneheadWorked = true
            } else if (takenTraits[num] && boneheadWorked) {
                changeSpecialByTrait("IN", 1);
                boneheadWorked = false
            }
            break;
            
        case TRAITS.indexOf('Evader'):
            
            changeSpecialByTrait("EN", (status ? -2 : 2));
            break;
    };
    takenTraits[num] = status ? 1 : 0;
    updateStats();
    updateSkills();
};

function changeSpecialByTrait(name, modifier) {
    special[SPECIAL[name]] += modifier;
    outputSpecial();
};

function applyQuest(num, status) {
    switch (num) {
        case 0:
            repairQuest = status ? 20 : 0;
            break;
    }
}

function generatePerkText() {
    var perks_text = [];

    for (var i = 0, p = 0; i < PERKS_ON_LEVELS.length; i++) {
        if(perks_text[i] == undefined) { perks_text[i]=""; }
        perks_text[i] += '</br>'
        for (var j = 0; j < PERKS_ON_LEVELS[i]; j++, p++) {
            perks_text[i] += '<div><span>'+PERKS_RAW[p]+'</span><span></span></div>'
        }
        perks_text[i] += '</br>'
    }

    $('#outputPerks1').html("")
    $('#outputPerks2').html("")

    for (var i = 0; i < 3; i++) {
        $('#outputPerks1').append(perks_text[i]);
    }
    for (var i = 3; i < PERKS_ON_LEVELS.length; i++) {
        $('#outputPerks2').append(perks_text[i]);
    }
}

function highlightPerks() {

    for (var i = 0; i < PERKS_RAW.length; i++) {
        
        var j = i;
        var col = 1;
        if (i >= QUANTITY_PERKS_1COL) {
            j = i - QUANTITY_PERKS_1COL;
            col = 2;
        }

        if (perkAvailable(PERKS_RAW[i]) == false) {
            $('#outputPerks'+col).find("div").eq(j).find("span").eq(0).addClass( "N_A" );
        } else {
            $('#outputPerks'+col).find("div").eq(j).find("span").eq(0).removeClass( "N_A" );
        }

        if (perks[i]) {
            $('#outputPerks'+col).find("div").eq(j).find("span").eq(1).text(perks[i])
        } else {
            $('#outputPerks'+col).find("div").eq(j).find("span").eq(1).text("")
        }
    }
}

function generateImplantText() {
    
    var implantText = [];

    var implantToggles = [];
    var cclass = "toggle smallToggle";
    IMPLANTS_RAW.forEach(function(value, index, array) {
        if(implantText[index] == undefined) { implantText[index]=""; }
        implantText[index] += "<div><span>"+value+"</span><span></span></div>"

        if(implantToggles[index] == undefined) { implantToggles[index]=""; }
        implantToggles[index] += '<div id="toggleImplant_'+(index+1)+'" class="'+cclass+'"></div>'
    })

    for (var i = 0; i < IMPLANTS_RAW.length; i++) {
        $('#implants').append(implantText[i]);
        $('#toggleImplants').append(implantToggles[i]);
    }
}

function generateTooltips() {
    
    for(var id in info) {
        info[id].forEach(function(element, index, array) {
            $('#' + id).find("div").eq(index).attr('title', info[id][index]) // index + " " + 
        })
    }
}

function outputBooks() {
    for (var index in takenBooks) { 
        $('#'+index+'Book').find('span').eq(1).text(takenBooks[index])
    }
}

function init() {
    highlightPerks();
    updateSkills();
    updateStats();
    
    outputInterface();
}

function outputInterface() {
    outputBooks();
    outputSpecial();
    outputSkillpoints();
    outputInputs();
    highlightTakenTraits();
    highlightPerks();
    outputTakenPerks();
    $("#outputTraitpoints").text(traitPoints);
    $("#outputTagpoints").text(tagpoints);
    highlightToggledArray(taggedSkills, "#outputSkills");
    highlightToggledIndex(takenImplant, "#implants")
    highlightQuests(repairQuest, "#quests");
    highlightExcessSkills();
}

function outputInputs() {
    $("#name_input").val(build_name);
    $("#plannedLevel").val(level);
}

function highlightTakenTraits() {
    var className = "selectPerm";
    takenTraits.forEach(function(val, index) {
        if (index < 8) {
                var cal = 1;
            } else {
                var cal = 2;
            }
            var i = index - 8 * (cal - 1);

        var trait = $("#outputTraits" + cal).find("div").eq(i);
        if ( val ) {
            trait.addClass(className);
        } else {
            trait.removeClass(className)
        }
    })
}

function highlightToggledArray(array, id) {
    var className = "selectPerm";
    array.forEach(function(val, index) {
        
        var div = $(id).find("div").eq(index);
        if ( val ) {
            div.addClass(className);
        } else {
            div.removeClass(className)
        }
    })
}

function highlightToggledIndex(index, id) {
    var className = "selectPerm";
    var div = $(id).find("div");

    for (var i=0; i<div.length; i++) {

        var elem = div.eq(i)

        if ( i === index ) {
            elem.addClass(className);
        } else {
            elem.removeClass(className)
        }
    }
}

function  highlightQuests() {
    var className = "selectPerm";

    var questsHighlight = {
        '#repairQuest' : repairQuest,
        '#CritChanceQuest' : glowQuestTaken === 0,
        '#FoVQuest' : glowQuestTaken === 1,
        '#HPQuest' : glowQuestTaken === 2
    }

    for (var id in questsHighlight) {
        if (questsHighlight[id]) {
            $(id).addClass(className);
        } else {
            $(id).removeClass(className);
        }
    }
}

function highlightExcessSkills() {
    var maxClass = "maxSkill"
    var excessClass = "excessSkill"
    var id = "#outputSkills"

    curSkills.forEach(function(val, index) {
        
        var div = $(id).find("div").eq(index);
        var span = div.find('span').eq(1);
        var cap = SKILL_CAPS[index]
        if ( val > cap ) {
            span.addClass(excessClass);
        } else if ( val == cap ) {
            span.removeClass(excessClass)
            span.addClass(maxClass);
        } else {
            span.removeClass(maxClass)
            span.removeClass(excessClass)
        }
    })
}

function restoreBuild() {

    if (!window.location.hash) { return }

    var encodedObject = deparam(window.location.hash.substring(1))

    // console.log(a, typeof(a), build, typeof(build))
    decodedObject = {}

    $.each(encodedObject, function(index, value) {
        if (value === 'false') {
            decodedObject[index] = false
        } else if (value === 'true') {
            decodedObject[index] = true
        } else if (typeof(value) === "string") {
            if (isNaN(value))
                {decodedObject[index] = value;}
            else {decodedObject[index] = +value;}
        } else if ($.isArray(value)) {
            decodedObject[index] = []
            value.forEach(function(v, i) {
                // console.log(index, value, i, v)
                decodedObject[index][i] = +v;
            })
        } else if (typeof value === 'object') {
            decodedObject[index] = {}
            $.each(value, function(i, v) {
                decodedObject[index][i] =+ v
            })
        }
    })


    build_name = decodedObject.n === 'undefined' ? 'Unnamed' : decodedObject.n;
    level = decodedObject.lvl;
    spoints = decodedObject.sp;
    takenTraits = decodedObject.tt;
    takenPerks = decodedObject.tp;
    takenBooks = decodedObject.tb;
    taggedSkills = decodedObject.ts;
    investedSkills = decodedObject.is;
    repairQuest = decodedObject.rq;
    glowQuestTaken = decodedObject.gq;
    takenImplant = decodedObject.it;
    boneheadWorked = decodedObject.bw;
    special = decodedObject.s;
    perks = decodedObject.p;
    gainedSpecial = decodedObject.gs;

    init()
}

function resetBuild() {
    build_name = 'Unnamed';
    level = 99;
    spoints = 0;
    special = [6,6,7,1,6,8,6];
    gainedSpecial = [0,0,0,0,0,0,0];
    takenPerks = [0, 0, 0, 0, 0, 0, 0, 0]
    takenBooks = {  'SG': 0,
                    'FA': 0,
                    'Repair': 0,
                    'Science': 0,
                    'ODM': 0 }
    taggedSkills = Array.apply(null, new Array(SKILLS_RAW.length)).map(Number.prototype.valueOf,0);
    investedSkills = Array.apply(null, new Array(SKILLS_RAW.length)).map(Number.prototype.valueOf,0);
    perks = Array.apply(null, new Array(PERKS_RAW.length)).map(Number.prototype.valueOf,0);
    takenTraits = Array.apply(null, new Array(TRAITS.length)).map(Number.prototype.valueOf,0);
    repairQuest = false;
    glowQuestTaken = -1;
    takenImplant = false;
    boneheadWorked = false;
    
    init()
}

function serialize() {
    var build = {
        n: build_name,
        lvl: level,
        s: special,
        sp: spoints,
        tt: takenTraits,
        tp: takenPerks,
        tb: takenBooks,
        ts: taggedSkills,
        p: perks,
        is: investedSkills,
        rq: repairQuest,
        gq: glowQuestTaken,
        it: takenImplant,
        bw: boneheadWorked,
        gs: gainedSpecial
    }
    var url = $.param(build)
    return url;
}

function increaseSpecial(num) {

    if (special[num] < 10 && spoints > 0) {
        special[num] += 1;
        spoints -=1;

        if (num === 4) {
            recalcBooks();
        }

        updateStats();
        updateSkills();
    }
}

function decreaseSpecial(num) {

    if (num === 4 && special[num] === 6) {
        glowQuestTaken = -1; // not possible to have glow quest taken with IN less than 6
        updateStats();
    }

    if (special[num] > 1) {

        if (num === 5 && takenTraits[TRAITS.indexOf("SmallFrame")] && special[num] === 2) {
        return; // not possible to have AG less than 2 with Small Frame
        }

        special[num] -= 1;
        spoints += 1;

        if (num === 4) {
            recalcBooks();
        }

        updateStats();
        updateSkills();
    }
}

function toggleBooks() {
    // var indexes = [
    //             SKILLS_RAW.indexOf("SG"),
    //             SKILLS_RAW.indexOf("FA"),
    //             SKILLS_RAW.indexOf("Repair"),
    //             SKILLS_RAW.indexOf("Science"),
    //             SKILLS_RAW.indexOf("ODM") 
    //             ]
    var names = ["SG", "FA", "Repair", "Science", "ODM"]
    for (var i = 0; i < names.length; i++) {
        if (takenBooks[names[i]] === 0) {
            takenBooks[names[i]] = maxBooks;
        } else {
            takenBooks[names[i]] = 0;
        }
    }
}

function recalcBooks() {
    // console.log(takenBooks, maxBooks)
    calcMaxBooks();
    var names = ["SG", "FA", "Repair", "Science", "ODM"]
    for (var i = 0; i < names.length; i++) {
        if (takenBooks[names[i]] != 0) {
            takenBooks[names[i]] = maxBooks;
        }
    }
    // console.log(takenBooks, maxBooks)
}

$(document).ready(function() {
    generatePerkText();
    generateImplantText();
    generateTooltips();

    init()
    try {
        restoreBuild();
    } catch (e) {
        alert("Link is broken!");
        window.location.hash = ""
        resetBuild();
    }

    $("#plannedLevel").on('input',function() {
        level = +$(this).val()
        updateStats();
    })

    $("#name_input").on('input',function() {
        build_name = $(this).val()
    })

    $("#outputSkills").find("div").mouseover( function() {
        skillOver = $(this).index()

        $("#plusminusSlider").css("top", 46+$(this).position()['top']);
    })

    $("#outputPerks1").find("div").mouseover( function() {
        namePerkCol1 = $(this).find("span").eq(0).text();
        $("#plusminusSliderA").css("top", 46+$(this).position()['top']);
    })

    $("#outputPerks2").find("div").mouseover( function() {
        namePerkCol2 = $(this).find("span").eq(0).text();
        $("#plusminusSliderB").css("top", 46+$(this).position()['top']);
    })

    $("#plusSliderA").mousedown( function() {
        pickPerk(0, namePerkCol1);
    })

    $("#plusSliderB").mousedown( function() {
        pickPerk(0, namePerkCol2);
    })

    $("#minusSliderA").mousedown( function() {
        unpickPerk(0, namePerkCol1);
    })

    $("#minusSliderB").mousedown( function() {
        unpickPerk(0, namePerkCol2);
    })

    var intervalSP;
    $("#plusSlider").mousedown( function() {
        clearInterval(intervalSP);
        intervalSP = setInterval(increaseSkill, 50);
    })

    $(document).mouseup( function() {
        clearInterval(intervalSP);
    })

    $("#minusSlider").mousedown( function() {
        clearInterval(intervalSP);
        intervalSP = setInterval(decreseSkill, 50);    
    })


    $(".plus").mousedown(function() {
        var s_num = getSpecialNum($(this));
        increaseSpecial(s_num)
    });

    $(".minus").mousedown(function() {
        var s_num = getSpecialNum($(this));
        decreaseSpecial(s_num);
    });
    
    $(".toggle").mousedown(function() {
        var id = $(this).attr('id');
       
        var num = id.substr(id.length - 2);
        if (isNaN(num)) {
            num = id.substr(id.length - 1);
        } 

        var action = id.slice(0, id.length - (num+"").length - 1);
        num -= 1; // for using as an index
        
        var className = "selectPerm";
        // console.log("Toggle action is", action, "with num", num+1);
        if (action == "toggleSkill") {

            if (taggedSkills[num]) {
                taggedSkills[num] = 0
            } else if (tagpoints) {
                taggedSkills[num] = 1;
            }
            //console.log(taggedSkills)
            updateSkills();

        } else if (action == "toggleTrait") {
            if (num < 8) {
                var cal = 1;
            } else {
                var cal = 2;
            }
            var i = num - 8 * (cal - 1);

            if (takenTraits[num]) {
                applyTrait(num, 0);
            } else if (traitPoints > 0) {
                applyTrait(num, 1);
            }
            updateStats()

        } else if (action == "toggleQuest") {
            var out = $("#quests").find("div").eq(num);
            if (out.hasClass(className)) {
                out.removeClass(className);
                applyQuest(num, false)
                
            } else {
                out.addClass("selectPerm");
                applyQuest(num, true)

            }
            updateSkills()

        } else if (action == "toggleGlowChoice") { 

            if (special[SPECIAL["IN"]] < 6) {
                return
            }
            if (glowQuestTaken === num) { 
                glowQuestTaken = -1;
            } else {
                glowQuestTaken = num;
            }
            updateStats()

        } else if (action == "toggleImplant") {

            var out = $("#implants").find("div").eq(num); // 1 == quantity of other quests

            if (takenImplant === num) { 
                takenImplant = false;
            } else {
                takenImplant = num;
            }
            updateStats()
            updateSkills();
        } 
    });
   
    $('#buttonDone').mousedown(function() {
        var error = false;

        if (error) { 
            alert(error);
        }
    });

    $('#buttonBooks').mousedown(function() {
        toggleBooks();
        updateSkills();
    });

     $('#buttonSave').mousedown(function() {
        var url = serialize()
        window.location.hash = url;
     })

    $('#buttonRestore').mousedown(function() {
    
    try {
        restoreBuild();
    } catch (e) {
        alert("Link is broken!");
        window.location.hash = ""
        resetBuild();
    }
    })

    $('#buttonReset').mousedown(function() {
        resetBuild()
    })
    
    $('#buttonDirectLink').mousedown(function() {
        var url = serialize()
        window.prompt("Copy to clipboard: Ctrl+C, Enter", document.URL + "#" + url);
    })

    $('#buttonDeleteLink').mousedown(function() {
        window.location.hash = "";
    })
});