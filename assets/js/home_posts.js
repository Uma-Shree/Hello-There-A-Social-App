{
    //method to submit the form data for post using AJAX
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    //console.log(data);
                    deletePost($(' .delete-post-button', newPost));
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post) {
        return $(`<li id="post-${post._id}">
        <p>
         
    
                <small>
                <a  class="delete-post-button" href="/posts/destroy/${post._id }">delete post</a>
        </small>
                
                   ${post.content }
                        <br>
                        <small>
           ${post.user.name}
        </small>
        </p>
        <div class="post-comments">
            <% if(locals.user){ %>
                <form action="/comments/create" method="POST">
                    <input type="text" name="content">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
                <% } %>
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                            
                        </ul>
                    </div>
        </div>
    </li>`)

    }
    createPost();
}