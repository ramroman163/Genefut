/* Botones que controlan el flujo en la generación */
let generateButton = document.querySelector(".generate-teams");
generateButton.addEventListener("click", () => main());

let resetButton = document.querySelector(".reset-teams");
resetButton.addEventListener("click", () => resetForm());

/* Navegar entre inputs */
document.addEventListener("keydown", function(entry){
    if(entry.key !== 'Enter'){
        return;
    }

    let elementFocus = entry.target;

    if(!elementFocus.classList.contains("focus-next")){
        return;
    }

    let tabIndex = elementFocus.tabIndex + 1;
    let nextElement = document.querySelector('[tabindex="'+ tabIndex +'"]');

    if(nextElement){
        entry.preventDefault();
        nextElement.focus();
    }
});

/* Constantes */

const errorColor = "#934949";

/* Variables globales */
var playersName = [];
var amountOfPlayers = 0;
var team1 = [];
var team2 = [];

/* Funcion principal */
function main(){
    let correctForm = verifyInputs();
    if(!correctForm){
        return;
    }
    resetProgram();
    countPlayers();
    getPlayers();
    generateTeams();
    showTeams();
    shareSection(true);
    shareWhatsapp();
}

/* Verificar si los inputs están rellenos */
function verifyInputs(){
    resetProgram();
    shareSection(false);
    separateLine(false);

    let validator = true;

    let team1Container = document.getElementById("team1");
    let team2Container = document.getElementById("team2");

    resetElement(team1Container);
    resetElement(team2Container);

    let i = 0;
    /* Doble negacion para asignar un valor booleano a lo devuelto por el getElement */
    while(!!document.getElementById("player-n" + (i+1))){
        let field = document.getElementById("player-n" + (i+1));
        if(field.value == ''){
            field.style.backgroundColor = errorColor;
            validator = false;
        }
        else if(field.style.backgroundColor = errorColor){
            field.style.backgroundColor = "";
        }

        i++;
    }

    return validator;
}

/* Resetea las variables del programa */
function resetProgram(){
    playersName = [];
    amountOfPlayers = 0;
    team1 = [];
    team2 = [];
}

/* Funcion que cuenta la cantidad de jugadores */
function countPlayers(){
    let i = 0;
    while(!!document.getElementById("player-n" + (i+1))){
        i++;
    }
    amountOfPlayers = i;
}

/* Funcion que obtiene todos los valores de los inputs */
function getPlayers(){
    for(let i = 1; i <= amountOfPlayers; i++){
        let player = document.getElementById("player-n" + i);
        let name = player.value;
        playersName.push(name);
    }
}

/* Funcion que genera aleatoriamente los equipos */
function generateTeams(){
    let numbers = [];
    let randomNumber = 0;
    
    for(let i=0; i<(amountOfPlayers/2); i++){
        let repeated = true;
        
        do{
            randomNumber = getRandom(amountOfPlayers);
            repeated = verifyRepeated(randomNumber, numbers);
        }while(repeated);

        numbers.push(randomNumber);
    }
    
    numbers.forEach((pos)=>{
        team1.push(playersName[pos]);
    });

    for(let i=0; i<amountOfPlayers; i++){
        if(!team1.includes(playersName[i])){
            team2.push(playersName[i]);
        }
    }
}

/* Visualizar opcion de compartir */
function shareSection(active){
    let shareSection = document.querySelector(".share");

    if(active){
        shareSection.style.display = "flex";
    }
    else{
        shareSection.style.display = "none";
    }
}

/* Generar mensaje para Whatsapp */
function shareWhatsapp(){
    let enter = "%0A";
    let space = "%20";
    let link = "https://api.whatsapp.com/send?text="

    link += "Equipo"+space+"1:"+enter;

    team1.forEach((player)=>{
        link+=(player+enter);
    });

    link += "Equipo"+space+"2:"+enter+enter;

    team2.forEach((player)=>{
        link+=(player+enter);
    });

    link += "Hecho con Genefut";

    let elementA = document.querySelector(".share__link");
    elementA.href = link;
}

/* Mostrar u ocultar linea separadora */
function separateLine(active){
    let separateLine = document.querySelector(".line--teams");
    
    if(active){
        separateLine.style.display = "block";
    }
    else{
        separateLine.style.display = "none";
    }
}

/* Funcion que permite visualizar los equipos */
function showTeams(){
    separateLine(true);

    let team1Container = document.getElementById("team1");
    let team2Container = document.getElementById("team2");

    resetElement(team1Container);
    resetElement(team2Container);

    let nameTeam1 = document.createElement("h3");
    nameTeam1.textContent = "Equipo 1";

    team1Container.appendChild(nameTeam1);

    let nameTeam2 = document.createElement("h3");
    nameTeam2.textContent = "Equipo 2";

    team2Container.appendChild(nameTeam2);
    
    team1.forEach((player) => {
        let namePlayer = document.createElement("p");
        namePlayer.textContent = player;
        team1Container.appendChild(namePlayer);
    });

    team2.forEach((player) => {
        let namePlayer = document.createElement("p");
        namePlayer.textContent = player; 
        team2Container.appendChild(namePlayer);
    });
}

/* Verificar repetidos en la generación */
function verifyRepeated(randomNumber, numbers){
    let boolean = false

    numbers.forEach(num => {
        if(num == randomNumber){
            boolean = true;
        }
    });

    return boolean;
}

/* Reseteo de formulario */
function resetForm(){
    let form = document.querySelector(".players_form");
    form.reset();

    let i = 0;
    while(!!document.getElementById("player-n" + (i+1))){
        let field = document.getElementById("player-n" + (i+1));
        if(field.style.backgroundColor = errorColor){
            field.style.backgroundColor = "";
        }

        i++;
    }
}

function resetElement(element){
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
}

function getRandom(amountOfPlayers) {
    return Math.floor(Math.random() * amountOfPlayers);
}