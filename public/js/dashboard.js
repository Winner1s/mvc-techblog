// Selecting DOM elements
const existingBlogs = document.querySelector("#existingblogs");
const createNew = document.querySelector("#createNew");
const newPost = document.querySelector("#newpost");
const newBlog = document.querySelector('#newBlog');

// Function to hide the createNew section
function hideCreateNew() {
    createNew.classList.add("hidden");
}

// Initially hide the createNew section
hideCreateNew();

// Event listener for newPost form submission
newPost.addEventListener("submit", event => {
    event.preventDefault();
    console.log('click');
    existingBlogs.classList.add("hidden");
    newPost.classList.add("hidden");
    createNew.classList.remove("hidden");
});

// Event listener for newBlog form submission
newBlog.addEventListener("submit", event => {
    event.preventDefault();
    console.log('you clicked me');
    
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;

    if (!title || !content) {
        alert('Please enter both title and content');
        return;
    }

    const blogObj = {
        title: title,
        content: content,
    };

    fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify(blogObj),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (res.ok) {
            createNew.classList.add("hidden");
            location.reload();
        } else {
            throw new Error("Failed to post blog");
        }
    })
    .catch(error => {
        console.error("Error posting blog:", error);
        alert("Error - please try again");
    });
});
