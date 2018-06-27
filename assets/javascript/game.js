
//create objects for each fighter including the following attributes: HP,attack,counter attack, name, and picture
$(document).ready(function() {
    var Mario = {
        name: "Mario",
        picture: "./assets/images/Mario.jpg",
        HP: 150,
        attack: 7,
        counterAttack: 8,

    };

    var DonkeyKong = {
        name: "DK",
        picture: "./assets/images/DK.jpg",
        HP: 180,
        attack: 5,
        counterAttack: 5,

    };

    var Fox = {
        name: "Fox",
        picture: "./assets/images/Fox.jpg",
        HP: 130,
        attack: 8,
        counterAttack: 9,

    };

    var Samus = {
        name: "Samus",
        picture: "./assets/images/Samus.jpg",
        HP: 160,
        attack: 6,
        counterAttack: 7,

    };

    var chosenFighter = 0; //this will keep track of the fighter that was chosen. need this to reference the OBJECT of the
    //fighter that was chosen so I can access the objects attack,HP, and counterAttack properties

    //this will keep track of all of the enemies that are defeated so 
    //game can be reset once all are defeated
    var enemiesDefeated = 0;

    var chosenEnemy = 0;

    //going to use this variable to keep track of the original attack
    //power so it can be added with each attack
    var scaling = 0; 

    //use this as a place holder for fighters so objects arent changed
    var fighterHealth = 0;

    //going to use this as a place hodler for defender health so
    //object is not modified for reset
    var defenderHealth = 0;


    //load stats to character select

    var characterArray = [];
    characterArray.push(Mario,DonkeyKong,Fox,Samus);

    //loop displays all avaliable characters to the screen
    for(var i = 0; i < characterArray.length; i++) {
        $("#fighter-" + i + "-name").text(characterArray[i].name);
        $("#fighter-" + i + "-pic").attr("src",characterArray[i].picture);
        $("#fighter-" + i + "-health").text(characterArray[i].HP);

    };



    $(".fighter-selector").on("click", function() {
        //I am using the picture property of the object to detect which character was selected
        //this however limits the user as they can only select a character by clicking on the image not the name
        if(chosenFighter === 0) {
            chosenFighter = $(this).attr("src");
        
        //this for loop goes through the array of characters and checks to see which objects picture property
        //matches the picture that was selected
        //once a match is found, chosenFighter will reference the object of the fighter that was chosen
        //I can use this to move the character from select fighter screen to the your fighter row
            for (var i = 0; i < characterArray.length; i++) {

                if(chosenFighter === characterArray[i].picture){

                    chosenFighter = characterArray[i];
                } else {

                };

            };


            //going to use this to create all of the elements required for each character
            var chosenFighterElement1 = $("<figure>");
            var chosenFighterElement2 = $("<figcaption>");
            var chosenFighterElement3 = $("<img>");
            var chosenFighterElement4 = $("<figcaption>");
            chosenFighterElement1.addClass("figure");
            chosenFighterElement2.addClass("figure-caption text-center fighter-name");
            chosenFighterElement3.addClass("figure-img");
            chosenFighterElement4.addClass("figure-caption text-center fighter-HP");
            chosenFighterElement2.text(chosenFighter.name);
            chosenFighterElement3.attr("src", chosenFighter.picture);
            chosenFighterElement3.attr("width", "80px");
            chosenFighterElement3.attr("height", "80px");
            chosenFighterElement4.text(chosenFighter.HP);
            chosenFighterElement1.append(chosenFighterElement2);
            chosenFighterElement1.append(chosenFighterElement3);
            chosenFighterElement1.append(chosenFighterElement4);
            $("#chosen-fighter").append(chosenFighterElement1);

            scaling = chosenFighter.attack;
            fighterHealth = chosenFighter.HP;


            //this variable will make sure the enemies are located in the
            //correct locations on the page
            var enemyCounter = 0;
            //this loop displays all fighters avaliable to fight
            for (var i = 0; i < characterArray.length; i++) {

                if(chosenFighter === characterArray[i]){
                    
                    
                } else {

                    $("#enemy" + enemyCounter).attr("index",i);
                    $("#enemy-" + enemyCounter + "-name").text(characterArray[i].name);
                    $("#enemy-" + enemyCounter + "-picture").attr("src", characterArray[i].picture);
                    $("#enemy-" + enemyCounter + "-picture").attr("width", "80px");
                    $("#enemy-" + enemyCounter + "-picture").attr("height", "80px");
                    $("#enemy-" + enemyCounter + "-health").text(characterArray[i].HP);
                    
                    enemyCounter ++;

                };

               


            };
            enemyCounter = 0;

            $("#fighter-selection-row").hide();


        } else {


        };

       

    });

    

    $(".enemy-selector").on("click", function() {

    
        if(chosenEnemy === 0) {
            $(this).hide();
            chosenEnemy = $(this).attr("index");
            chosenEnemy = parseInt(chosenEnemy);
            chosenEnemy = characterArray[chosenEnemy];

            defenderHealth = chosenEnemy.HP;
  
            $("#defender-name").text(chosenEnemy.name);
            $("#defender-picture").attr("src", chosenEnemy.picture);
            $("#defender-picture").attr("width", "80px");
            $("#defender-picture").attr("height", "80px");
            $("#defender-health").text(defenderHealth);


            };


            


        




    });

    $("#attack-button").on("click", function(){

        //this if statement ensures both fighters are still alive 
        //and also checks to see that both a fighter and an enemy were chosen
        if((chosenEnemy !== 0 && chosenFighter !== 0) && (defenderHealth > 0 && fighterHealth > 0)) {

            fighterHealth = fighterHealth - chosenEnemy.counterAttack;
            defenderHealth = defenderHealth - chosenFighter.attack;
            $("#attacker-info").text("you dealt " + chosenFighter.attack + " damage on " + chosenEnemy.name + " ");
            $("#defender-info").text(chosenEnemy.name + " dealt " + chosenEnemy.counterAttack + " damage through a counter attack");

            chosenFighter.attack = chosenFighter.attack + scaling;

            $("#defender-health").text(defenderHealth);
            $(".fighter-HP").text(fighterHealth);

            if(fighterHealth < 0) {
                $("#endgame-info").text("you lose");
                $("#reset-button").removeClass("d-none");
                //put in code that displays the restart button

            }

            if(defenderHealth < 0) {

                enemiesDefeated ++;
                if(enemiesDefeated === 3){

                    chosenEnemy = 0;
                    $("#defender-name").text("");
                    $("#defender-picture").attr("src","");
                    $("#defender-picture").attr("width","");
                    $("#defender-picture").attr("height","");
                    $("#defender-health").text("");
                    $("#attacker-info").text("");
                    $("#defender-info").text("");
                    $("#endgame-info").text("you win");
                    $("#reset-button").removeClass("d-none");
                    

                    //put in code that displays the restart button
                } else {
                    chosenEnemy = 0;
                    $("#defender-name").text("");
                    $("#defender-picture").attr("src","");
                    $("#defender-picture").attr("width","");
                    $("#defender-picture").attr("height","");
                    $("#defender-health").text("");
                    $("#attacker-info").text("");
                    $("#defender-info").text("");


                }
                

            }

        }

        




    });



    });

















