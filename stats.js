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
  `;
  tbody.appendChild(row);
});
// CHART
const ctx = document.getElementById("chart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: players.map(p=>p.name),
    datasets: [{
      label: "Batting Average",
      data: players.map(p=>p.AVG)
    }]
  }
});

// AWARDS
const awardsDiv = document.getElementById("awards");

const topAVG = players.sort((a,b)=>b.AVG-a.AVG)[0];

awardsDiv.innerHTML = `
  <h2>🏆 Team Awards</h2>
  <p>MVP: ${topAVG.name}</p>
`;
