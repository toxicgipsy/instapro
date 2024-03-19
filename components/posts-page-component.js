import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, renderApp } from "../index.js";
import { removeLike, setLike } from "../api.js";

export function renderPostsPageComponent({ appEl }) {
  // Рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  const postHtml = posts
    .map((post) => {
      return `
        <div class="page-container">
          <div class="header-container"></div>
          <ul class="posts">
            <li class="post" data-index=${index}>
              <div class="post-header" data-user-id="${post.user.id}">
                <img class="post-header__user-image"src="${post.user.imageUrl}"/>
                <p class="post-header__user-name">${post.user.name}</p>
              </div>
              <div class="post-image-container">
                <img class="post-image" data-post-id="${post.id}" src="${post.imageUrl}" data-index=${index}/>
              </div>
              <div class="post-likes">
              <button data-post-id="${post.id}"data-like="${post.isLiked ? 'true' : ''}" data-index="${index}" class="like-button">
              <img src=${post.isLiked ? './assets/images/like-active.svg' : './assets/images/like-not-active.svg'}>
                </button>
                <p class="post-likes-text">
                  Нравится: ${post.usersLikes.length > 0 ? `${post.usersLikes[post.usersLikes.length - 1].name} ${post.usersLikes.length - 1 > 0 ? 'и ещё' + (post.usersLikes.length - 1) : ''} ` : '0'}
                </p>
              </div>
              <p class="post-text">
                <span class="user-name">${post.user.name}</span>
                ${post.description}
              </p>
              <p class="post-date">${post.createdAt}</p>
            </li>
          </ul>
      </div>`;
    }).join("");

  appEl.innerHTML = postHtml;

  // Рендер хедера
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
    // likeEventListiner();
  }

  // // Поставить лайк
  // const likeEventListiner = () => {
  //   const likeButtons = document.querySelectorAll(".like-button");

  //   for (const likeButton of likeButtons) {
  //     likeButton.addEventListener("click", (event) => {
  //       event.stopPropagation();
  //       const postId = likeButton.dataset.postId;
  //       const index = likeButton.dataset.index;

  //       if (posts[index].isLiked) {
  //         removeLike({token: getToken(), postId})
  //         .then((updatedPost) => {
  //           posts[index].isLiked = false;
  //           posts[index].likes = updatedPost.post.likes;
  //           renderApp();
  //         })
  //       } else {
  //         setLike({ token: getToken(), postId })
  //         .then((updatedPost) => {
  //           posts[index].isLiked = false;
  //           posts[index].likes = updatedPost.post.likes;
  //           renderApp();
  //         })
  //       }
  //     });
  //   }
  // };
}
