// Load blog post based on URL parameter
document.addEventListener('DOMContentLoaded', function() {
    // Get post ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // If no ID or post doesn't exist, show error
    if (!postId || !blogPosts[postId]) {
        showPostNotFound();
        return;
    }

    // Get the post data
    const post = blogPosts[postId];

    // Update page title
    document.title = `${post.title} - Ishaan Goel`;

    // Update post header
    document.querySelector('.post-date').textContent = post.date;
    document.querySelector('.post-category').textContent = post.category;
    document.querySelector('.post-title').textContent = post.title;

    // Update tags
    const tagsContainer = document.querySelector('.post-tags');
    tagsContainer.innerHTML = '';
    post.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'post-tag';
        tagSpan.textContent = tag;
        tagsContainer.appendChild(tagSpan);
    });

    // Update content
    document.querySelector('.post-content').innerHTML = post.content;
});

function showPostNotFound() {
    document.querySelector('.post-title').textContent = 'Post Not Found';
    document.querySelector('.post-content').innerHTML = `
        <p>Sorry, the blog post you're looking for doesn't exist.</p>
        <p><a href="blog.html" style="color: var(--accent-primary);">Return to blog</a></p>
    `;
    document.querySelector('.post-header .post-meta').style.display = 'none';
    document.querySelector('.post-tags').style.display = 'none';
}