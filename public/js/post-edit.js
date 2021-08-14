const editPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();
  const urlArr = document.location.href.split("/");
  const post_id = urlArr[urlArr.length - 1];

  if (title && content) {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

const deletePostHandler = async (event) => {
  const urlArr = document.location.href.split("/");
  const post_id = urlArr[urlArr.length - 1];
  const response = await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector(".edit-post")
  .addEventListener("submit", editPostHandler);

document
  .querySelector("#delete-post")
  .addEventListener("click", deletePostHandler);
