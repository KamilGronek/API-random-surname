const getUsers = (e) => {
    e.preventDefault();  //odświeżenie za każdym razem strony

    const usersGender = document.querySelector('[name="gender"]').value;
    const usersNumber = document.querySelector('[name="users-number"]').value;
    const usersLetter = document.querySelector('[name="letters"]').value;
    console.log(usersLetter);
    console.log(usersGender, usersNumber,usersLetter);
    
    const url = `https://randomuser.me/api/?results=${usersNumber}&gender=${usersGender === "both" ? "male,female" :
    usersGender }`;
    console.log(url);

    fetch(url)
        .then(response => {
        //  console.log(response);
         if(response.status !== 200){
          throw Error("To nie jest odpowiedź 200");
         } else {
          return response.json()
         }
        })
        .then(json => showUsers(json.results))
        .catch(err => console.log(err))  
}

const showUsers = (users) => {
    let resultCounter = 0;
    let score = document.querySelector(".generator__score");
    score.innerHTML = "";
    const usersLetter = document.querySelector('[name="letters"]').value;
    const resultArea = document.querySelector('.user-list');
    resultArea.textContent="";
    
    users.forEach( user => {
        const item = document.createElement('div');
        item.className = 'user';
        item.innerHTML = `
        <div class="user__name">
        ${user.name.title.toUpperCase()} 
        ${user.name.first.toUpperCase()}
        ${user.name.last.toUpperCase()}
        </div>
        <img class="user__image" src=${user.picture.medium}>
        `
        resultArea.appendChild(item);
       
        let itemValue = item.getElementsByClassName("user__name");
        let itemValue2 = itemValue[0].innerText;
        let splitLast = itemValue2.split(/[\s,]+/);
        let showLast =  splitLast[splitLast.length-1];
        let firstLetter = showLast[0];
    
        if(usersLetter == firstLetter)
        {
            resultCounter++;
            item.style.border="2px dashed red";
            item.style.color="red";
        }
    })

    showResultScore(users, resultCounter);
}

document.querySelector('.generator').addEventListener('submit', getUsers);

function showResultScore(allUsers,resultCounter){
    let score = document.querySelector(".generator__score");

    if(resultCounter>0)
    {
    score.innerHTML = `<p class="result__number-info">W tym dokumencie znalazłem ${resultCounter} nazwisko/a z listy ${allUsers.length} osób: </p>`;
    } 
    if(resultCounter == 0){
    score.innerHTML = `<p class="result__number-info">W tym dokumencie nie znalazłem żadnych nazwisk z listy ${allUsers.length} osób: </p>`;
    }
}

