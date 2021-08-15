const createCommentHandler = async (event) => {
  event.preventDefault();
  const currentURL = document.location;
  const urlArr = document.location.href.split("/");
  const post_id = urlArr[urlArr.length - 1];
  const body = document.querySelector("#comment").value.trim();

  if (body && post_id) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ body, post_id }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      // Redirect to dashboard after successful creation of post
      document.location.replace(currentURL);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".create-comment")
  .addEventListener("submit", createCommentHandler);
