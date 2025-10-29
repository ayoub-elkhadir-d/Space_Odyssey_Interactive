let misions = [
  {
    "id": 1,
    "name": "Apollo 11",
    "agency": "NASA",
    "objective": "Premier alunissage habité",
    "launchDate": "1969-07-16",
    "image": "images/apollo11.png"
  },
  {
    "id": 2,
    "name": "Voyager 1",
    "agency": "NASA",
    "objective": "Exploration du système solaire externe",
    "launchDate": "1977-09-05",
    "image": "images/voyager1.png"
  },
  {
    "id": 3,
    "name": "Rosetta",
    "agency": "ESA",
    "objective": "Étude de la comète 67P/Churyumov-Gerasimenko",
    "launchDate": "2004-03-02",
    "image": "images/rosetta.png"
  },
  {
    "id": 4,
    "name": "Curiosity",
    "agency": "NASA",
    "objective": "Exploration du cratère Gale sur Mars",
    "launchDate": "2011-11-26",
    "image": "images/curiosity.png"
  },
  {
    "id": 5,
    "name": "Artemis I",
    "agency": "NASA",
    "objective": "Test du système de lancement SLS et d’Orion",
    "launchDate": "2022-11-16",
    "image": "images/artemis.png"
  }
]
for(var t =0;t <= misions.length;t++ ){
document.getElementById("misions_div").innerHTML += `
  <div class="mission_card">
    <div class="choix_et_menu_div">
      <ul class="menu_choix">
        <li><div><h1>star</h1> <img src="images/edit.png" alt=""></div></li>
        <li><div><h1>edit</h1> <img src="images/edit.png" alt=""></div></li>
        <li><div><h1>delete</h1> <img src="images/edit.png" alt=""></div></li>
      </ul>
      <img class="menu_icone" src="images/menu.png" alt="">
    </div>
    <img class="misions_img" src="${misions[t].image}" alt="">
    <h3> ${misions[t].name}</h3>
    <h3>${misions[t].agency}</h3>
    <h3>${misions[t].objective}</h3>
    <h3>${misions[t].launchDate}</h3>
  </div>
`;
}

