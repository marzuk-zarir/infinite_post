/**
 * Title: Infinite blog post
 * Description: Infinite blog post with fetch api
 * Author: Marzuk Zarir
 * Date: 13-06-21
 *
 */

const RANDOM_USER_URL = 'https://api.randomuser.me/';
const RANDOM_POST_URL = 'https://jsonplaceholder.typicode.com/posts/';
let postContainer = document.querySelector('#post-container');
const loadingSpinner = document.querySelector('#spinner');

window.addEventListener('DOMContentLoaded', init);

function init() {
    renderPost();
    renderPost();
    renderPost();

    window.addEventListener('scroll', () => {
        const { clientHeight, scrollTop, scrollHeight } =
            document.documentElement;

        if (clientHeight + scrollTop >= scrollHeight - 7) {
            loadingSpinner.style.display = '';
            setTimeout(renderPost, 1000);
        }
    });
}

async function renderPost() {
    const post = await getPost();
    const user = await getUser();

    postContainer.innerHTML += `
    <div class="card mb-4 border-0">
        <div class="card-body bg-white">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <div class="d-flex align-items-center">
                <img
                    src="${user.results[0].picture.thumbnail}"
                    class="rounded-pill"
                />
                <p class="mb-0 ms-2">
                    ${user.results[0].name.first}
                    ${user.results[0].name.last}
                </p>
            </div>
        </div>
    </div>
    `;

    loadingSpinner.style.display = 'none';
}

// Get post
async function getPost() {
    const postResponse = await fetch(`${RANDOM_POST_URL}/${randomNumber(100)}`);
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
    n = n - 1;
    return Math.round(Math.random() * n + 1);
}
