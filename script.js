let misions = [
  {
    id: 1,
    status: 1,
    name: "Apollo 11",
    agency: "NASA",
    objective: "Premier alunissage habité",
    launchDate: "1969-07-16",
    image: "images/apollo11.png",
  },
  {
    id: 2,
    status: 1,
    in_favorite: 0,
    name: "Voyager 1",
    agency: "NASA",
    objective: "Exploration du système solaire externe",
    launchDate: "1977-09-05",
    image: "images/voyager1.png",
  },
  {
    id: 3,
    status: 1,
    in_favorite: 0,
    name: "Rosetta",
    agency: "ESA",
    objective: "Étude de la comète 67P/Churyumov-Gerasimenko",
    launchDate: "2004-03-02",
    image: "images/rosetta.png",
  },
  {
    id: 4,
    status: 1,
    in_favorite: 1,
    name: "Curiosity",
    agency: "NASA",
    objective: "Exploration du cratère Gale sur Mars",
    launchDate: "2011-11-26",
    image: "images/curiosity.png",
  },
  {
    id: 5,
    status: 1,
    in_favorite: 0,
    name: "Artemis I",
    agency: "NASA",
    objective: "Test du système de lancement SLS et d Orion",
    launchDate: "2022-11-16",
    image: "images/artemis.png",
  },
];
var container2 =document.getElementById("container_fv")
aficher();
function aficher(index) {
  let container = document.getElementById("misions_div");
  container.innerHTML = "";

  for (var t = 0; t < misions.length; t++) {
    if (misions[t].status == 1) {
      if (t == index) {
        container.innerHTML += `
                      <div class="mission_card mission_card_edit ">  
                        <div class="choix_et_menu_div">  
                          
                          <button class="btn_suprimer" onclick="suprimer(${t})"></button>   
                          <button class="btn_favorit" id="btn_${t}" onclick="favorit(${t})"></button>  
                        </div>  
                        <img class="misions_img" src="${misions[t].image}" alt="">  
                        <input type="text" id="input_name" value="${misions[index].name}">
                        <input type="text" id="input_agence" value="${misions[index].agency}">
                        <input type="text" id="input_discription" value="${misions[index].objective}">
                        <input type="text" id="input_date" value="${misions[index].launchDate}">
                        <button id="submit" onclick="save(${index})" style="align-self: center;">save</button>
                      </div>`;
      }
      if (t != index) {
        if (misions[t].in_favorite == 0) {
          container.innerHTML += `  
              <div class="mission_card">  
                <div class="choix_et_menu_div">  
                  <button class="btns" onclick="edit(${t})"></button>   
                  <button class="btn_suprimer" onclick="suprimer(${t})"></button>   
                  <button class="btn_favorit" id="btn_${t}"  onclick="favorit(${t})"></button>  
                </div>  
                <img class="misions_img" src="${misions[t].image}" alt="">  
                <h3>${misions[t].name}</h3>  
                <h3> ${misions[t].agency}</h3>  
                <h3> ${misions[t].objective} </h3>  
                <h3> ${misions[t].launchDate} </h3> 
              </div>`;
        }

        if (misions[t].in_favorite == 1) {
          container.innerHTML += `  
              <div class="mission_card">  
                <div class="choix_et_menu_div">  
                  <button class="btns" onclick="edit(${t})"></button>   
                  <button class="btn_suprimer" onclick="suprimer(${t})"></button>   
                  <button class="btn_favorit" id="btn_${t}" style="background-image: url('images/in_favorite.png');width: 24px;" onclick="favorit(${t})"></button>  
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
  }
}
function edit(index) {
  aficher(index);
   container2.innerHTML = "";
}

function suprimer(index) {

  misions[index].status = 0;
  document.getElementById("misions_div").innerHTML = "";
  afficher_favorits ()
  aficher();
}

function favorit(d) {
  if (misions[d].in_favorite == 0) {
    misions[d].in_favorite = 1;
    document.getElementById("misions_div").innerHTML = "";
    aficher();
  } else {
    misions[d].in_favorite = 0;

    document.getElementById("misions_div").innerHTML = "";
    aficher();
  }
}
function save(index) {
  document.getElementById("popupp").style.display = "none";
  misions[index].name = document.getElementById("input_name").value;
  misions[index].agency = document.getElementById("input_agence").value;
  misions[index].objective = document.getElementById("input_discription").value;
  misions[index].launchDate = document.getElementById("input_date").value;
  document.getElementById("misions_div").innerHTML = "";
  aficher();
}

//
function afficher_favorits (){
  
  container2.innerHTML = "";
  if(container2.style.display=="flex"){
    container2.style.display="none"
  }
  else{
        container2.style.display="flex"
        for(var b =0;b< misions.length;b++){
              
            if(misions[b].in_favorite==1 && misions[b].status != 0){
              container2.innerHTML += `  
                      <div class="mission_card" style="width:200px;">  
                        <div class="choix_et_menu_div" >  
                          <button class="btns" onclick="edit(${b})"></button>   
                          <button class="btn_suprimer" onclick="suprimer(${b})"></button>   
                          <button class="btn_favorit" id="btn_${b}" style="background-image: url('images/in_favorite.png');width: 24px;" onclick="favorit(${b})"></button>  
                        </div>  
                        <img class="misions_img" src="${misions[b].image}" alt="">  
                        <h3>${misions[b].name}</h3>  
                        <h3> ${misions[b].agency}</h3>  
                        <h3> ${misions[b].objective} </h3>  
                        <h3> ${misions[b].launchDate} </h3> 
                      </div>`;
            }
        }
  }

}
 var a =document.getElementById("fav_logo").addEventListener("click", afficher_favorits);


 var search =document.getElementById("search")
 var text_typing ="" ;
 search.addEventListener('keyup', (event) => {
                
                container2.innerHTML = "";
                        for(var z =0;z<misions.length;z++){
                          var name_to_lower=misions[z].name.toLowerCase();
                            if(name_to_lower.startsWith(search.value)&& misions[z].status != 0){
                              container2.style.display="flex"
                                container2.innerHTML += `  
                                  <div class="mission_card" style="width:200px;">  
                                    <div class="choix_et_menu_div" >  
                                      <button class="btns" onclick="edit(${z})"></button>   
                                      <button class="btn_suprimer" onclick="suprimer(${z})"></button>   
                                      <button class="btn_favorit" id="btn_${z}" style="background-image: url('images/in_favorite.png');width: 24px;" onclick="favorit(${z})"></button>  
                                    </div>  
                                    <img class="misions_img" src="${misions[z].image}" alt="">  
                                    <h3>${misions[z].name}</h3>  
                                    <h3> ${misions[z].agency}</h3>  
                                    <h3> ${misions[z].objective} </h3>  
                                    <h3> ${misions[z].launchDate} </h3> 
                                  </div>`;
            }

            }
        });
