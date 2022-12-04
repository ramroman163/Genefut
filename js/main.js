var generateButton = document.getElementById("generar-equipo");
generateButton.addEventListener("click", () => main());

var resetButton = document.getElementById("limpiar-equipo");
resetButton.addEventListener("click", () => resetForm());

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

var playersName = [];
var amountOfPlayers = 0;
var team1 = [];
var team2 = [];

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
}

function verifyInputs(){
    resetProgram();
    separateLine(false);

    let validator = true;

    let team1Container = document.getElementById("equipo1");
    let team2Container = document.getElementById("equipo2");

    resetElement(team1Container);
    resetElement(team2Container);

    let i = 0;
    while(!!document.getElementById("jugador-n" + (i+1))){
        let field = document.getElementById("jugador-n" + (i+1));
        if(field.value == ''){
            field.style.backgroundColor = "#934949";
            validator = false;
        }
        else if(field.style.backgroundColor = "#934949"){
            field.style.backgroundColor = "";
        }

        i++;
    }

    return validator;
}


function resetProgram(){
    playersName = [];
    amountOfPlayers = 0;
    team1 = [];
    team2 = [];
}

function countPlayers(){
    let i = 0;
    while(!!document.getElementById("jugador-n" + (i+1))){
        i++;
    }
    amountOfPlayers = i;
}

function getPlayers(){
    for(let i = 1; i <= amountOfPlayers; i++){
        let player = document.getElementById("jugador-n" + i);
        let name = player.value;
        playersName.push(name);
    }
}

function generateTeams(){
    let numbers = [];
    let randomNumber = 0;
    
    for(let i=0; i<(amountOfPlayers/2); i++){
        let repeated = true;
        
        do{
            randomNumber = getRandom();
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

function separateLine(active){
    let separateLine = document.getElementById("linea-separadora");
    
    if(active){
        separateLine.style.display = "block";
    }
    else{
        separateLine.style.display = "none";
    }
}

function showTeams(){
    separateLine(true);

    let team1Container = document.getElementById("equipo1");
    let team2Container = document.getElementById("equipo2");

    resetElement(team1Container);
    resetElement(team2Container);

    let nameTeam1 = document.createElement("h3");
    nameTeam1.textContent = "Equipo 1";

    team1Container.appendChild(nameTeam1);

    let nameTeam2 = document.createElement("h3");
    nameTeam2.textContent = "Equipo 2";

    team2Container.appendChild(nameTeam2);
    
    team1.forEach((jugador) => {
        let namePlayer = document.createElement("p");
        namePlayer.textContent = jugador;
        team1Container.appendChild(namePlayer);
    });

    team2.forEach((jugador) => {
        let namePlayer = document.createElement("p");
        namePlayer.textContent = jugador; 
        team2Container.appendChild(namePlayer);
    });
}

function verifyRepeated(randomNumber, numbers){
    let boolean = false

    numbers.forEach(num => {
        if(num == randomNumber){
            boolean = true;
        }
    });

    return boolean;
}

function resetForm(){
    let form = document.getElementById("formulario-jugadores");
    form.reset();

    let i = 0;
    while(!!document.getElementById("jugador-n" + (i+1))){
        let field = document.getElementById("jugador-n" + (i+1));
        if(field.style.backgroundColor = "#934949"){
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

function getRandom() {
    return Math.floor(Math.random() * 10);
}