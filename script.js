function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'show';
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = window.location.origin.includes('localhost')
        ? 'http://localhost:5001'
        : '';
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            localStorage.setItem('internName', email.split('@')[0] || 'Intern');
            showToast('Login Successful!');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            localStorage.setItem('internName', name);
            showToast('Signup Successful!');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
    if (window.location.pathname.endsWith('dashboard.html')) {
        const internName = localStorage.getItem('internName') || 'Intern';
        document.getElementById('internName').textContent = internName;

        fetch(`${BASE_URL}/api/dashboard`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('referralCode').textContent = data.referral_code;
                document.getElementById('donations').textContent = `₹${data.donations_raised}`;
            })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
                document.getElementById('referralCode').textContent = 'intern2025';
                document.getElementById('donations').textContent = '₹0';
            });

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('internName');
                window.location.href = 'index.html';
            });
        }
    }

    if (window.location.pathname.endsWith('leaderboard.html')) {
        console.log('Fetching leaderboard data from:', `${BASE_URL}/api/leaderboard`);
        fetch(`${BASE_URL}/api/leaderboard`)
            .then(response => {
                console.log('Leaderboard response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Leaderboard data received:', data);
                const list = document.getElementById('leaderboard-list');
                if (!list) {
                    console.error('Leaderboard list element not found');
                    return;
                }
                list.innerHTML = ''; 
                if (data && data.length > 0) {
                    data.forEach((intern, index) => {
                        const listItem = document.createElement('li');
                        listItem.innerHTML = `
                            <div class="leaderboard-rank">${index + 1}</div>
                            <div class="leaderboard-name">${intern.name}</div>
                            <div class="leaderboard-amount">₹${intern.donations_raised}</div>
                        `;
                        list.appendChild(listItem);
                    });
                } else {
                    list.innerHTML = '<li><div class="leaderboard-name">No leaderboard data available</div></li>';
                }
            })
            .catch(error => {
                console.error('Error fetching leaderboard data:', error);
                const list = document.getElementById('leaderboard-list');
                if (list) {
                    const fallbackData = [
                        { name: 'Rudra', donations_raised: 2500 },
                        { name: 'Utkarsh', donations_raised: 2200 },
                        { name: 'Suneel', donations_raised: 1500 },
                        { name: 'Nikhil Dixit', donations_raised: 1200 },
                        { name: 'Shiwang Solanki', donations_raised: 950 }
                    ];
                    list.innerHTML = '';
                    fallbackData.forEach((intern, index) => {
                        const listItem = document.createElement('li');
                        listItem.innerHTML = `
                            <div class="leaderboard-rank">${index + 1}</div>
                            <div class="leaderboard-name">${intern.name}</div>
                            <div class="leaderboard-amount">₹${intern.donations_raised}</div>
                        `;
                        list.appendChild(listItem);
                    });
                    console.log('Using fallback leaderboard data');
                }
            });
    }
    document.querySelectorAll('.toggle-password').forEach(item => {
        item.addEventListener('click', event => {
            const passwordInput = event.target.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                event.target.textContent = '😑';
            } else {
                passwordInput.type = 'password';
                event.target.textContent = '👁️';
            }
        });
    });
});
