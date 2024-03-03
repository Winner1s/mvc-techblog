// Update Blog Post
document.querySelector("#update").addEventListener("click", event => {
    event.preventDefault();

    const blogId = document.querySelector("#hiddenBlogId").value;
    const editedTitle = document.querySelector("#editedTitle").value;
    const editedContent = document.querySelector("#editedContent").value;

    // Perform client-side validation
    if (!editedTitle || !editedContent) {
        alert("Please enter both title and content");
        return;
    }

    const editBlog = {
        title: editedTitle,
        content: editedContent,
    };

    fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        body: JSON.stringify(editBlog),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (res.ok) {
            console.log("Blog updated successfully");
            location.href = "/dashboard";
        } else {
            throw new Error("Failed to update blog");
        }
    })
    .catch(error => {
        console.error("Error updating blog:", error);
        alert("Please try again");
    });
});

// Delete Blog Post
document.querySelector("#delete").addEventListener("click", event => {
    event.preventDefault();

    const blogId = document.querySelector("#hiddenBlogId").value;

    // Add a confirmation dialog before deleting the blog post
    const confirmDelete = confirm("Are you sure you want to delete this blog post?");
    if (!confirmDelete) {
        return;
    }

    fetch(`/api/blogs/${blogId}`, {
        method: "DELETE"
    })
    .then(res => {
        if (res.ok) {
            console.log("Blog deleted successfully");
            location.href = "/dashboard";
        } else {
            throw new Error("Failed to delete blog");
        }
    })
    .catch(error => {
        console.error("Error deleting blog:", error);
        alert("Please try again");
    });
});