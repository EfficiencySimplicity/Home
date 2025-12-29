const content  = document.getElementById('content');
const template = document.getElementById('article-template');

function spawnArticle(rssItem) {    
    let clone = template.content.cloneNode(true);

    // const h3 = clone.querySelector('h3');
    // h3.innerText = rssItem.creator;

    const h2 = clone.querySelector('h2');
    h2.innerText = rssItem.title;

    const a = clone.querySelector('a');
    a.href = rssItem.link;

    const date = clone.querySelector('.post-date');
    date.textContent = rssItem.pubDate;

    const p = clone.querySelector('.preview-post-text');
    p.innerHTML = rssItem["content:encoded"];
    
    const flashyElements = p.querySelectorAll("h3, figure, iframe, img");
    flashyElements.forEach(element => {
        element.remove();
    });

    p.innerText = p.textContent.substring(0, 100) + '...';

    content.appendChild(clone);
}

async function getFeed() {
    await fetch('/blog/reader')
    .then((result) => {
        return result.json();
    })
    .then((result) => {
        content.replaceChildren();
        console.log(result);
        result.items.forEach(element => {
            spawnArticle(element);
        });
    })
}

getFeed();