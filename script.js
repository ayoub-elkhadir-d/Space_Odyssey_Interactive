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
function aficher(index){  
  let container = document.getElementById("misions_div");
  container.innerHTML = ""; 


  for(var t = 0; t < misions.length; t++){  
   if(t == index){
          
        container.innerHTML +=`
        <div class="mission_card">  
          <div class="choix_et_menu_div">  
            
            <button class="btn_suprimer" onclick="suprimer(${t})"></button>   
            <button class="btn_favorit" onclick="favorit(${t})"></button>  
          </div>  
          <img class="misions_img" src="${misions[t].image}" alt="">  
           <input type="text" id="input_name" value="${misions[index].name}">
          <input type="text" id="input_agence" value="${misions[index].agency}">
          <input type="text" id="input_discription" value="${misions[index].objective}">
          <input type="text" id="input_date" value="${misions[index].launchDate}">
          <button id="submit" onclick="save(${index})">submit</button>
        </div>`; 
          
      
    }
    else{  
      container.innerHTML +=`  
        <div class="mission_card">  
          <div class="choix_et_menu_div">  
            <button class="btns" onclick="edit(${t})"></button>   
            <button class="btn_suprimer" onclick="suprimer(${t})"></button>   
            <button class="btn_favorit" onclick="favorit(${t})"></button>  
          </div>  
          <img class="misions_img" src="${misions[t].image}" alt="">  
          <h3>${misions[t].name}</h3>  
          <h3> ${misions[t].agency}</h3>  
          <h3> ${misions[t].objective} </h3>  
          <h3> ${misions[t].launchDate} </h3> 
        </div>`;  

          
          
    }

  
  }  

}




function edit(index){
  
    var a = document.getElementById("popupp")


if(a.style.display === "flex"){
a.style.display = "none"
return;
}

aficher(index)


}
function suprimer(index){

misions[index].status=0;
document.getElementById("misions_div").innerHTML=""
aficher();
}
function save(index){
  document.getElementById("popupp").style.display = "none";
misions[index].name = document.getElementById("input_name").value
misions[index].agency = document.getElementById("input_agence").value
misions[index].objective = document.getElementById("input_discription").value
misions[index].launchDate = document.getElementById("input_date").value
document.getElementById("misions_div").innerHTML=""
aficher();
}
