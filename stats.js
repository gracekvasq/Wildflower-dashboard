let games = JSON.parse(localStorage.getItem("games")) || [];

let players = {};

games.forEach(g=>{
  if(!players[g.name]){
    players[g.name]={name:g.name,AB:0,H:0,BB:0,TB:0};
  }
  players[g.name].AB+=g.AB;
  players[g.name].H+=g.H;
  players[g.name].BB+=g.BB;
  players[g.name].TB+=g.TB;
});

players = Object.values(players);

players.forEach(p=>{
  p.AVG=(p.H/p.AB||0).toFixed(3);
  p.OBP=((p.H+p.BB)/(p.AB+p.BB)||0).toFixed(3);
  p.SLG=(p.TB/p.AB||0).toFixed(3);
  p.OPS=(+p.OBP + +p.SLG).toFixed(3);
});

const tbody=document.querySelector("#statsTable tbody");

players.forEach(p=>{
  const row=document.createElement("tr");
  row.innerHTML=`
    <td>${p.name}</td>
    <td>${p.AB}</td>
    <td>${p.H}</td>
    <td>${p.BB}</td>
    <td>${p.AVG}</td>
    <td>${p.OBP}</td>
    <td>${p.SLG}</td>
    <td>${p.OPS}</td>
    <td><button onclick="del('${p.name}')">X</button></td>
  `;
  tbody.appendChild(row);
});

// DELETE
function del(name){
  let games=JSON.parse(localStorage.getItem("games"))||[];
  games=games.filter(g=>g.name!==name);
  localStorage.setItem("games",JSON.stringify(games));
  location.reload();
}

// CHART
new Chart(document.getElementById("chart"),{
  type:"bar",
  data:{
    labels:players.map(p=>p.name),
    datasets:[{label:"AVG",data:players.map(p=>p.AVG)}]
  }
});
