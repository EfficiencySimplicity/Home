//https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies
const template = document.getElementById('update-result-template');
const content  = document.getElementById('content');

function processResult(result) {
  // favicon,etc later. for now:
  // make a template
  if (!result.updated) {return;}

  let clone = template.content.cloneNode(true);
  const p = clone.querySelector('p');
  p.innerText = `${result.siteName} has updated`;
  content.appendChild(clone);
  // innerHTML for rss?...
}

const cookie = document.cookie;

const obj = JSON.parse(cookie);

const promises = [];

for (const [key, value] of Object.entries(object)) {
  let promise = fetch(`/projects/sitesilike/reader?url=${key}`)
  .then(function(response) {
    processResult(response.json());
  })
  .catch(function(error) {
      console.log('Error in getting results for ', key);
      console.error(error);
  });

  promises.push(promise);
}