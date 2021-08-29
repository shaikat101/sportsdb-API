const searchTeam =async ()=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    // clear data
    searchField.value='';
    if(searchText==''){
      const error = document.getElementById('error-text');
      error.innerText=' Something went wrong please try again later';
      return;
    }
else{
  const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;
    // console.log(url);
    
    const res = await fetch(url);
            const data = await res.json();
            displaySearchResult(data.teams);
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displaySearchResult(data.teams));
}
}

const displaySearchResult = teams => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent='';
    teams.forEach(team => {
    // console.log(team);
    
    const div = document.createElement('div');
    div.classList.add('col');
    if(team.strTeamLogo==null){
      div.innerHTML=`
    <div onclick=" loadTeamDetail (${team.idTeam})" class="card">
    <img width="50%" class="mx-auto" height="176px"  src="./image/logo.png" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${team.strTeam}</h5>
            <p class="card-text">
              ${team.strDescriptionEN.slice(0,200)}
            </p>
          </div>
        </div>
    `
    }
    else{
      div.innerHTML=`
    <div onclick=" loadTeamDetail (${team.idTeam})" class="card">
          <img src="${team.strTeamLogo}" class="card-img-top"  alt=" " />
          <div class="card-body">
            <h5 class="card-title">${team.strTeam}</h5>
            <p class="card-text">
              ${team.strDescriptionEN.slice(0,200)}
            </p>
          </div>
        </div>
    `
    }
    searchResult.appendChild(div);
    });
}
const loadTeamDetail = async teamId=>{
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayTeamDetail(data.teams[0]);
    // fetch(url)
    // .then(res=>res.json())
    // .then(data=> displayTeamDetail(data.teams[0]));
}
const displayTeamDetail = team => {
console.log(team);

const teamDetails = document.getElementById('team-details');
teamDetails.textContent='';
const div = document.createElement('div');
div.classList.add('card');
div.innerHTML= `
<img src="${team.strTeamLogo}" class="card-img-top" alt="..." />
<div class="card-body">
  <h5 class="card-title">${team.strTeam}</h5>
  <p class="card-text">
  ${team.strDescriptionEN.slice(0,100)}
  </p>
  <a href="${team.srtYoutube}" class="btn btn-primary">Go Youtube</a>
</div>
`;
teamDetails.appendChild(div);
}