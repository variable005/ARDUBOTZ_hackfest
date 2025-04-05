const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const mainContent = document.querySelector('.main-content');
const darkModeIcon = darkModeToggle.querySelector('i');

function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        if (darkModeIcon) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
        }
    } else {
        body.classList.remove('dark-mode');
        if (darkModeIcon) {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
        }
    }
}

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('sidebar-collapsed');
});

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');

    if (darkModeIcon) {
        if (isDarkMode) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    }
});

const cards = document.querySelectorAll('.overview-cards .card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
        card.style.transform = 'translateY(-2px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.08)';
        card.style.transform = 'translateY(0)';
    });
});

window.addEventListener('load', () => {
    body.classList.add('loaded');
});

const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme);

document.addEventListener('DOMContentLoaded', function() {
    const notificationBell = document.getElementById('notificationBell');
    const notificationCard = document.getElementById('notificationCard');

    if (notificationBell && notificationCard) {
        notificationBell.addEventListener('click', function(event) {
            event.stopPropagation(); // to prevent immediate closing of card from click
            notificationCard.classList.toggle('show-notifications');
        });

        // to close notif card when clicked on screen out of it
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.notification')) {
                notificationCard.classList.remove('show-notifications');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCZaXglLNz37Z5wGzPsbFOGuV7ubAw5tlY",
        authDomain: "trial1-d6513.firebaseapp.com",
        projectId: "trial1-d6513",
        storageBucket: "trial1-d6513.firebasestorage.app",
        messagingSenderId: "278281297726",
        appId: "1:278281297726:web:dbdcbc985349cd6476966f"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    window.db = firebase.firestore();

    const taskTableBody = document.getElementById('taskTableBody');

    if (window.db) {
        window.db.collection('tasks').get()
            .then((querySnapshot) => {
                let html = '';
                querySnapshot.forEach((doc) => {
                    const taskData = doc.data();
                    html += '<tr>';
                    html += `<td>${taskData.title}</td>`;
                    html += `<td>${taskData.assignee}</td>`;
                    html += `<td>${taskData.due_date}</td>`;
                    html += `<td>${taskData.priority}</td>`;
                    html += `<td>${taskData.status}</td>`;
                    html += '</tr>';
                });
                taskTableBody.innerHTML = html;
            })
            .catch((error) => {
                console.error('Error getting tasks: ', error);
                taskTableBody.innerHTML = `<tr><td colspan="9">Error loading task data.</td></tr>`;
            });
    } else {
        console.error('Firestore database not initialized.');
        taskTableBody.innerHTML = `<tr><td colspan="9">Firestore database could not be initialized.</td></tr>`;
    }
});
