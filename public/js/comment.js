const form = document.querySelector("#newComment");

form.addEventListener("submit", event => {
    event.preventDefault();

    const commentInput = document.querySelector("#comment");
    const hiddenCommentIdInput = document.querySelector("#hiddenCommentId");

    if (!commentInput.value.trim()) {
        alert("Please enter a comment");
        return;
    }

    const comment = {
        body: commentInput.value,
        blogId: hiddenCommentIdInput.value,
    };

    fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (res.ok) {
            console.log("Comment posted successfully");
            location.reload();
        } else {
            throw new Error("Failed to post comment");
        }
    })
    .catch(error => {
        console.error("Error posting comment:", error);
        alert("Please try again");
    });
});
