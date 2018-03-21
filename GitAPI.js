//Object Oriented Programming Approach to the GitHub App
//First I define the class
function GitHubAPITest() {
	//Here I get the client secret and id to be able to fetch more than a limited 
	//amount of reaquests
	this.client_secret = "75b3ab4bf869679cbeb0e381019d2a33df7d0cf1";
	this.client_id = "89fe7ef1bceee1a5d89f";
	this.url = "https://api.github.com/users";


	//The initializing function
	this.init = () => {
		this.loadUsers();
	}

	//In this function I fetch the profile data from the gitHub API and
	//call the functions to display the Profile and Repositories
	this.loadUsers = () => {
		var btn = document.querySelector("#btn");
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			const userText = document.querySelector("#username").value;
			if(userText !== "" ) { 

			fetch(`${this.url}/${userText}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
			.then((res) => {
				
				return res.json();
			})
			.then((data) => {
				//Show the alert and clear the profile if no matching User is found
				if (data.message === "Not Found") {
					
					this.displayAlert('User not found!', 'alert alert-danger');
					this.clearProfile();
				//If matching user is found, build page
				} else {
					this.buildPageForAccount(data);
					this.showUserRepositories();
				}
			});
			//Clear the Profile Page if the input field is cleared
			} else {
				this.clearProfile();
			}
			
		});
	}

	//This function displays the GitHub User-Profle if the seacrh matches a valid profile
	//I display the profile using the ES6 String Interpolation. I include the profile pic,
	// a link to the the user's page and some information, such as Company, City etc. 
	this.buildPageForAccount = (user) => {
			const profile = document.querySelector("#profile");
			profile.innerHTML = `
				<div class="card card-body mb-3 mt-3">
				<div class="row">
					<div class="col-md-3">
						<img class="img-fluid" mb-2 src="${user.avatar_url}">
						<a href="${user.html_url}" target="_blank" class="btn 
						btn-dark btn-block mt-2">View Profile</a>
					</div>
					<div class="col-md-9">
						<span class="badge badge-dark">Public Repos
						${user.public_repos}</span>
						<span class="badge badge-light">Public Gists
						${user.public_gists}</span>
						<span class="badge badge-dark">Followers
						${user.followers}</span>
						<span class="badge badge-light">Following
						${user.following}</span>
						<br><br>
						<ul class="list-group">
							<li class="list-group-item">Company ${user.company} </li>
							<li class="list-group-item">Website/Blog: ${user.blog} </li>
							<li class="list-group-item">Location ${user.location} </li>
							<li class="list-group-item">Member Since: ${user.created_at} </li>
						</ul>
					</div>
				</div>
			</div>
			<h3 class="page-heading mb-3">User Repositories</h3>
			<div id="repos"></div>
			`;
	}


	//Calling this function to fetch the data for the Repositories of the
	//respective user. I show the number of Stars, watchers and forks
	this.showUserRepositories = () => {
		var reposDiv = document.querySelector("#repos");
		const userText = document.getElementById("username").value;
		let userRepos = "";
		fetch(`${this.url}/${userText}/repos?client_id=${this.client_id}&client_secret=${this.client_secret}`)
		.then((res) => {
			return res.json();
		})
		.then((repo) => {
			repo.forEach((repositories) => {
			userRepos += `
			<div class="card card-body mb-2">
			  <div class=""row">
			  	<div class=" col-md-6">
			  		<a href="${repositories.html_url}" target="_blank">${repositories.name}</a>
			  	</div>
			  	<div class=" col-md-6">
			  		<span class="badge badge-dark">Stars
					${repositories.stargazers_count}</span>
					<span class="badge badge-light">Watcher
					${repositories.watchers_count}</span>
					<span class="badge badge-black">Forks
					${repositories.forks_count}</span>
			  	</div>
			  </div>
			</div>
			`;
			repos.innerHTML = userRepos;

			})

		})

	}

	//In case there is no matching user, I want to show an alert which will
	//fade out after 2 seconds
	this.displayAlert = (message, className) => {
		//clear remaining alerts
		this.clearAlert();
		//create Div
		const div = document.createElement("div");
		//Add classes
		div.className = className;
		//Add Text
		div.appendChild(document.createTextNode(message));
		//get parent
		const container = document.querySelector(".searchContainer")
		//get search Box	
		const search = document.querySelector(".search");
		//Insert Alert
		container.insertBefore(div, search);

		//Clear the timeout after 2 seconds
		setTimeout(() => {
			this.clearAlert();
		},2000)
	}
	//Clear the alert after 2 seconds of timeout
	this.clearAlert = () => {
		const currentAlert = document.querySelector(".alert");

		if(currentAlert) {
			currentAlert.remove();
		}

	}
	//Clear the profile if there was already a profile and an new
	//search didn't match a user. 2. Clear the profile when all input from input field
	//gets deleted and the search button is clicked
	this.clearProfile = () => {

		const profile = document.querySelector("#profile");
		profile.innerHTML = "";
	}
}

var gitHubAPITest = new GitHubAPITest();
gitHubAPITest.init();