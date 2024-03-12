import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, renderApp, setPosts } from "../index.js";
import { clickLike } from "../api.js";

export function renderPostsPageComponent({ appEl }) {
  // Рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  const postHtml = posts.map((post, index) => {
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
                  Нравится: ${post.likes.length > 0 ? `${post.likes[post.likes.length - 1].name} ${post.likes.length - 1 > 0 ? 'и ещё' + (post.likes.length - 1) : ''} ` : '0'}
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
  }

  likeEventListiner();

  // Поставить лайк
  function likeEventListiner() {
    const likeButtons = document.querySelectorAll(".like-button");

    for (const likeButton of likeButtons) {
      likeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const postId = likeButton.dataset.postId;
        const index = likeButton.dataset.index;
        let like;
        posts[index].isLiked ? like = "dislike" : like = "like"

        clickLike({ token: getToken(), postId, like })
        .then((updatedPost) => {
          posts[index] = updatedPost.post;
          setPosts(posts);
          renderPostsPageComponent({ appEl });
        })
      });
    }
  };
}
