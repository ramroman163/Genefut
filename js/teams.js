fetch('https://genefut-backend.onrender.com/teams')
  .then(result => result.json())
  .then(data => addTeams(data))

function addTeams (data) {
  if (data.length === 0) {
    document.querySelector(".spinner-border").classList.add("visually-hidden")
    const signal = document.createElement("h2")
    signal.classList.add("text-light")
    signal.classList.add("fs-3")
    signal.innerText = "Sin partidos para mostrar"
    document.querySelector(".main").appendChild(signal)
  } else {
    data.forEach(match => {
      insertMatch(match)
    });

    document.querySelector(".spinner-border").classList.add("visually-hidden")
    document.querySelector("table").classList.remove("visually-hidden")
  }
}

function insertMatch (match) {
  const table = document.querySelector(".table__body")

  const newRow = table.insertRow()
  newRow.setAttribute("scope", "row")

  const dateCell = newRow.insertCell()
  const dateParagraph = document.createElement("p")
  dateParagraph.innerText = match.fecha_creacion
  dateCell.appendChild(dateParagraph)
  dateCell.classList.add("text-center")

  const firstTeamCell = newRow.insertCell()
  const playerList = document.createElement("ul")
  match.primer_equipo.forEach((player) => {
    const playerLI = document.createElement("li")
    playerLI.innerText = player
    playerList.appendChild(playerLI)
  })
  firstTeamCell.appendChild(playerList)

  const secondTeamCell = newRow.insertCell()
  const playerList2 = document.createElement("ul")
  match.segundo_equipo.forEach((player) => {
    const playerLI = document.createElement("li")
    playerLI.innerText = player
    playerList2.appendChild(playerLI)
  })
  secondTeamCell.appendChild(playerList2)

  const categoryCell = newRow.insertCell()
  categoryCell.innerText = match.tipo_partido
}