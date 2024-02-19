const form = document.getElementById("form");
const title = document.getElementById("title");
const description = document.getElementById("description");
const url = document.getElementById("url");
let bookmarks = [];
let urlParams = new URLSearchParams(window.location.search);
let idFromUrl = urlParams.get("id");

document.addEventListener("DOMContentLoaded", () => {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  let bookmarkToEdit = bookmarks.find((item) => item.id == idFromUrl);
  console.log(bookmarkToEdit);
  title.value = bookmarkToEdit.title;
  description.value = bookmarkToEdit.description;
  url.value = bookmarkToEdit.url;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  bookmarks = bookmarks.map((item) => {
    if (item.id == idFromUrl) {
      return {
        id: idFromUrl,
        url: url.value,
        description: description.value,
        title: title.value,
      };
    }
    return item;
  });

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  window.location.href = "/";
});
