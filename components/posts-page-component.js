import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
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
            <li class="post">
              <div class="post-header" data-user-id="${post.user.id}">
                <img
                  class="post-header__user-image"
                  src="${post.user.imageUrl}"
                />
                <p class="post-header__user-name">${post.user.name}</p>
              </div>
              <div class="post-image-container">
                <img class="post-image" src="${post.imageUrl}" />
              </div>
              <div class="post-likes">
                <button class="like-button" data-post-id="${post.id}">
                  <img src="./assets/images/like-active.svg" />
                </button>
                <p class="post-likes-text">
                  Нравится: <strong>${post.likes.lenght}</strong>
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
    })
    .join("");

  appEl.innerHTML = postHtml;

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
}
