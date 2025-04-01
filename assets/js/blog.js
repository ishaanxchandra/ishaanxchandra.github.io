// Reference to the database
const dbRef = firebase.database().ref('blogs/');

// Fetch and display blog posts
function fetchPosts() {
    onValue(window.dbRef, (snapshot) => {
        const posts = snapshot.val();
        const blogContainer = document.getElementById('blogPosts');
        blogContainer.innerHTML = '';

        if (posts) {
            Object.keys(posts).forEach((id) => {
                const post = posts[id];
                const postElement = document.createElement('div');
                postElement.className = 'blog-post mb-3 p-3 border rounded';
                postElement.innerHTML = `
                    <h4>${post.title}</h4>
                    <p>${post.content}</p>
                    <button class="btn btn-danger" onclick="deletePost('${id}')">Delete</button>
                `;
                blogContainer.appendChild(postElement);
            });
        } else {
            blogContainer.innerHTML = '<p>No blog posts available.</p>';
        }
    });
}

// Add a new blog post
function addPost() {
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;

    if (title && content) {
        const newPostRef = push(window.dbRef);
        set(newPostRef, { title, content })
            .then(() => {
                alert('Blog post added!');
                fetchPosts();
            })
            .catch((error) => {
                console.error('Error adding post:', error);
            });
    } else {
        alert('Title and content cannot be empty.');
    }
}

// Delete a blog post
function deletePost(id) {
    const postRef = ref(window.database, 'blogs/' + id);
    remove(postRef)
        .then(() => {
            alert('Blog post deleted!');
            fetchPosts();
        })
        .catch((error) => {
            console.error('Error deleting post:', error);
        });
}

// Load posts on page load
document.addEventListener('DOMContentLoaded', fetchPosts);
