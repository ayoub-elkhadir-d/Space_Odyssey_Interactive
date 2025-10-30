let misions = [
  {
    "id": 1,
    "status": 1,
    "name": "Apollo 11",
    "agency": "NASA",
    "objective": "Premier alunissage habité",
    "launchDate": "1969-07-16",
    "image": "images/apollo11.png"
  },
  {
    "id": 2,
    "status": 1,
    "name": "Voyager 1",
    "agency": "NASA",
    "objective": "Exploration du système solaire externe",
    "launchDate": "1977-09-05",
    "image": "images/voyager1.png"
  },
  {
    "id": 3,
    "status": 1,
    "name": "Rosetta",
    "agency": "ESA",
    "objective": "Étude de la comète 67P/Churyumov-Gerasimenko",
    "launchDate": "2004-03-02",
    "image": "images/rosetta.png"
  },
  {
    "id": 4,
    "status": 1,
    "name": "Curiosity",
    "agency": "NASA",
    "objective": "Exploration du cratère Gale sur Mars",
    "launchDate": "2011-11-26",
    "image": "images/curiosity.png"
  },
  {
    "id": 5,
    "status": 1,
    "name": "Artemis I",
    "agency": "NASA",
    "objective": "Test du système de lancement SLS et d’Orion",
    "launchDate": "2022-11-16",
    "image": "images/artemis.png"
  }
]

aficher();
function aficher(){
  
for(var t =0;t < misions.length;t++ ){
if(misions[t].status==1){
document.getElementById("misions_div").innerHTML += `
  <div class="mission_card">
    <div class="choix_et_menu_div">
      <ul class="menu_choix" id="menu_choixx">
        <li><div><h1>star</h1> <img src="images/edit.png" alt=""></div></li>
        <li><div><h1>edit</h1> <img src="images/edit.png" alt=""></div></li>
        <li><div><h1>delete</h1> <img src="images/edit.png" alt=""></div></li>
      </ul>
     <button class="btns" onclick="edit(${t})"></button> 
     <button class="btn_suprimer" onclick="suprimer(${t})"></button> 
     <button class="btn_favorit" onclick="favorit(${t})"></button>
    </div>
    <img class="misions_img" src="${misions[t].image}" alt="">
    <h3>${misions[t].name}</h3>
    <h3>${misions[t].agency}</h3>
    <h3>${misions[t].objective}</h3>
    <h3>${misions[t].launchDate}</h3>
  </div>
`;
}
}
}




function edit(index){
  
    var a = document.getElementById("popupp")


if(a.style.display === "flex"){
a.style.display = "none"
return;
}

  a.innerHTML=`
  
                <input type="text" id="input_name" value="${misions[index].name}">
                <input type="text" id="input_agence" value="${misions[index].agency}">
                <input type="text" id="input_discription" value="${misions[index].objective}">
                <input type="text" id="input_date" value="${misions[index].launchDate}">
                <button id="submit" onclick="save(${index})">submit</button>


`

 a.style.display = "flex" 


}
function suprimer(index){
misions[index].status=0;
document.getElementById("misions_div").innerHTML=""
aficher();
}
function save(index){
misions[index].name = document.getElementById("input_name").value
document.getElementById("misions_div").innerHTML=""
aficher();
}
