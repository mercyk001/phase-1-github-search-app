document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
    
    githubForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        searchUsers(query);
      }
    });
  
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(data => {
        displayUsers(data.items);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      reposList.innerHTML = '';
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.classList.add('result-item');
        listItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        listItem.addEventListener('click', () => {
          fetchUserRepos(user.login);
        });
        userList.appendChild(listItem);
      });
    }
  
    function fetchUserRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(data => {
        displayRepos(data);
      })
      .catch(error => {
        console.error('Error fetching repos:', error);
      });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.classList.add('repo-item');
        listItem.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          <p>${repo.description || 'No description available'}</p>
        `;
        reposList.appendChild(listItem);
      });
    }
  });