


$(document).ready(function() {
  //search User id
  $('#searchUser').on('keyup', function(event) {
    //console.log(event.target.value);
    let userName = event.target.value;
    /* make request to github */
    $.ajax({
      url: 'https://api.github.com/users/'+userName,
      data: {
        client_id: '',
        client_secret: ''
      }
    }).done(function(user) {
      // console.log("------------------------------------------------------------------------------------");
      // console.log("------------------------------------------------------------------------------------");
      // console.log(data);

    $.ajax({
      url: 'https://api.github.com/users/'+userName+'/repos',
      data: {
        client_id: '6ed6c958b461d8771a92',
        client_secret: '27c2d825245c4774962120094d1eb54350deae2b',
        sort: 'created: asc',
        per_page: 5
      }
    })
    .done(function(repos) {
      $.each(repos, function(index, repo) {
        $('#repos').append(`
            <div class="well">
              <div class="row">
                  <div class ="col-md-7">
                      <strong>${repo.name}</strong>: ${repo.description}
                  </div>
                  <div class ="col-md-3">
                      <span class="label label-info">Forks: ${repo.forks_count}</span>
                      <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                      <span class="label label-warning">Stars: ${repo.stargazers_count}</span>
                  </div>
                    <br>
                    <br>
                    <br>
                  <div class ="col-md-2">
                        <a href="${repo.html_url}" target="_blank" class="btn btn-primary">Repo page</a>
                  </div>

                  </div>
              </div>


          `)
      });

    });

      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
              <h3 class="panel-title ">${user.name}</h3>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class= "col-md-3">
                    <img class="thumbnail avatar animated zoomInDown" src="${user.avatar_url}" />
                    <a target= "_blank" class="btn btn-primary btn-block"href="${user.html_url}">View profile</a>
                </div>
                <div class="col-md-9 animated slideInRight">
                    <span class="label label-warning ">Public Repos: ${user.public_repos}</span>
                    <span class="label label-primary ">Public Gists: ${user.public_gists}</span>
                    <span class="label label-info ">Followers: ${user.followers}</span>
                    <span class="label label-danger animated ">Following: ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                      <li class="list-group-item">Company: ${user.company}</li>
                      <li class="list-group-item">Website/blog: ${user.company}</li>
                      <li class="list-group-item">Location: ${user.Location}</li>
                      <li class="list-group-item">Member Since: ${user.created_at}</li>
                      <li class="list-group-item">Biography: ${user.bio}</li>
                    </ul>
                </div>
             </div>
            </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
        `);
    });
  });
});
