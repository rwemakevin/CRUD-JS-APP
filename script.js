const form = document.getElementById("form");
let title = document.getElementById("title");
let url = document.getElementById("url");
let description = document.getElementById("description");
const rst = document.getElementById("reset");
const bookmarkContainer = document.getElementById("bookmark-lists");
let bookmarks = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("bookmarks"))
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  listBookmarks();
  console.log(localStorage.getItem("bookmarks"));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookmark = {
    id: Date.now(),
    title: title.value,
    url: url.value,
    description: description.value,
  };

  addBookmark(bookmark);
  console.log(bookmark);
});

const addBookmark = (a) => {
  bookmarks.push(a);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  listBookmarks();
  reset();
};

const listBookmarks = () => {
  if (localStorage.getItem("bookmarks") === null) {
    bookmarkContainer.innerHTML =
      "<h2>Your Book mark list is Emtpy</h2> <p>Please add some!</p>";
  } else {
    bookmarkContainer.innerHTML = "";
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.forEach((item, index) => {
      bookmarkContainer.innerHTML += `
      
      <div class="list">
          <div class="detail">
            <h3 class="title">${item.title}</h3>
            <p class="url">${item.url}</p>
            <p class="desc">${item.description}</p>
          </div>
          <div class="action">
            <a href="${item.url}" target="_blank"><button class="open">Open</button> </a>
            <button class="edit" onClick="editBookmark(${item.id})">Edit</button>
            <button class="delete" onClick="deleteBookmark(${item.id})">Delete</button>
          </div>
        </div>
      `;
    });
  }
};

const deleteBookmark = (arg) => {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  console.log("passed Id below");
  console.log(arg);
  console.log("bookmark parsed below");
  console.log(bookmarks);
  let newBookMarks = bookmarks.filter((item) => {
    return parseInt(item.id) !== arg;
  });

  console.log(newBookMarks);

  if (newBookMarks.length < 1) {
    localStorage.removeItem("bookmarks");
  } else {
    localStorage.setItem("bookmarks", JSON.stringify(newBookMarks));
  }
  reset();
  listBookmarks();
};

const editBookmark = (arg) => {
  window.location.href = `/edit.html?id=${arg}`;
};

const reset = () => {
  title.value = "";
  url.value = "";
  description.value = "";
};
