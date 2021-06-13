let postContainer = document.querySelector('#post-container');
const RANDOM_USER_URL = 'https://api.randomuser.me/';
const RANDOM_POST_URL = `https://jsonplaceholder.typicode.com/posts/${randomNumber(
    99
)}`;

window.addEventListener('DOMContentLoaded', init);

function init() {
    renderPost();
    renderPost();
    renderPost();
    renderPost();
}

async function renderPost() {
    const post = await getPost();
    const user = await getUser();

    postContainer.innerHTML += `
    <div class="card my-4 border-0">
        <div class="card-body bg-white">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <div class="d-flex align-items-center">
                <img
                    src="${user.results[0].picture.thumbnail}"
                    class="rounded-pill"
                />
                <p class="mb-0 ms-2">${user.results[0].name.first} ${user.results[0].name.last}</p>
            </div>
        </div>
    </div>
    `;
}

// Get post
async function getPost() {
    const postResponse = await fetch(RANDOM_POST_URL);
    const post = await postResponse.json();
    return post;
}

// Get user
async function getUser() {
    const userResponse = await fetch(RANDOM_USER_URL);
    const user = await userResponse.json();
    return user;
}

// Random number generator between 1 and n
function randomNumber(n) {
    return Math.round(Math.random() * n + 1);
}
