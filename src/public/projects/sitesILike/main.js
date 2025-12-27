// https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies
// https://www.w3schools.com/js/js_cookies.asp
// https://www.w3schools.com/xml/xml_rss.asp
const template = document.getElementById('update-result-template');
const content  = document.getElementById('content');

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  console.log(cvalue.length);
  document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
  console.log(document.cookie.length);
}

// https://stackoverflow.com/questions/10730362/get-cookie-by-name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// when using wss, the server needs to 
// return all later updates you haven't seen
// Oh, and an update_all button for when you want your
// last checkpoint to be.

// when using RSS, you need to return a json object
// that has simply the RSS, and it's processed here.

// RSS will return a json object of the RSS file

function processRSS(url, lastRSS, newRSS) {
  // favicon,etc later. for now:
  if (lastRSS === newRSS) {return;}

  // for now, we don't care.
  let clone = template.content.cloneNode(true);
  const p = clone.querySelector('p');
  p.innerText = `${url} has updated: ${newRSS.items}`;
  content.appendChild(clone);
  // innerHTML for RSS?...
}

async function checkSites(memories) {
  // returns an object of {url:url, data:data}

  const promises = [];

  for (const memory of memories) {

    const url  = memory.url;
    const data = memory.data;

    console.log(`Sent request to check ${url}`);

    let promise = await fetch(`/projects/sitesILike/reader?url=${url}`)
    .then(function(response) {
      return response.json();
    }).then(function(responseObj) {

      console.log(responseObj);
      // key is included in responseObj, could omit.
      processRSS(url, data, responseObj.data);
      // this is wrong format for cookie, will be changed later
      return JSON.stringify(responseObj);

    })
    .catch(function(error) {
      console.log('Error in getting results for ', url);
      console.error(error);

      return memory;
      // create an error code thing div
    });

    promises.push(promise);
  }

  return await Promise.all(promises);
}

console.log(document.cookie);
console.log(getCookie('memories'));

const memories = [{url:'https://medium.com/@joshward_accounts/feed', data:7}];//JSON.parse(cookie);

checkSites(memories)
.then(result => {
  setCookie('memories', JSON.stringify(result), 3650);
});