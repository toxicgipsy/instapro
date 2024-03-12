import { goToPage, posts } from "../index.js";
import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderUserPageComponent({ appEl }) {
  const appHtml = posts.map((post, index) => {
    return `
        <div class="page-container">
            <div class="header-container"></div>

            <ul class="posts">
            ${ index === 0 ? `<div class="posts-user-header">
            <img src="${post.user.imageUrl}" class="posts-user-header__user-image"/>
            <p class="posts-user-header__user-name">${post.user.name}</p>
            </div>` : "" }
                <li class="post" data-index=${index}>
                    <div class="post-image-container">
                        <img class="post-image" src="${post.imageUrl}" data-index=${index}/>
                    </div>
                    <div class="post-likes">
                        <button class="like-button" data-post-id="${post.id} data-like=${post.isLiked ? true : ""} data-index=${index}">
                            <img src=${post.isLiked ? `./assets/images/like-active.svg>` : `./assets/images/like-not-active.svg>`}
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
            <br />
      </div>`;
  });

  appEl.innerHTML = appHtml;

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

//   goToPage();
}