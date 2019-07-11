/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

//const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

// send GET request using axios 

axios.get('https://api.github.com/users/reesekunz')

.then (data => { 
// Handles Success: here's where we get the results from server
//console.log(data)
const userData = data.data 
// select the main dom node to attach our dynamic content
const cards = document.querySelector('.cards')
// creating a set of components
const cardInfo= createUserCard(userData)
//console.log(cardInfo);
// adding them to the DOM
cards.appendChild(cardInfo);  })

.catch(error => {
  // Handles failure:
  console.log('The gitHub API is currently down, try again later', error)
})



const cards = document.querySelector('.cards')
// creates and returns DOM node
function createUserCard (user) {

// create the elements based off HTML 
  const card = document.createElement('div');
  const img = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const link = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

// set the styles based off classes 
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('user-name');

  // set the content based off gitHub info 
  img.src = user.avatar_url;
  location.textContent = user.location;
  name.textContent = user.name;
  userName.textContent = user.login;
  const gitHubLink = user.html_url;
  link.innerHTML = gitHubLink.link(user.html_url);
  followers.textContent = `Followers: ${user.followers}`;
  following.textContent = `Following: ${user.following}`;
  bio.textContent = user.bio;

  // put together based off HTML parent/child 
  card.appendChild(img);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(link);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  return card;
}

// create followers array with github account handles to get their user data 
const followersArray = [
  'tetondan',
  'thetaylorjacobs',
  'justsml',
  'dustinmyers',
  'bigknell',
  'marguelgtz'
];

//  Using that array, iterate over it, requesting data for each user, creating a new card for each user, and adding that card to the DOM.
i = 0;
followersArray.forEach(function(user, i) {
  axios.get(`https://api.github.com/users/${followersArray[i]}`)
    .then (data => {
      const userData = data.data;
      //console.log('userData', userData);
      const cards = document.querySelector('.cards');
      const cardInfo = createUserCard (userData);
      //console.log(cardInfo);
      cards.appendChild(cardInfo);
    }), i++;
})

