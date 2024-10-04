document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = this.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    });

    const themeToggle = document.createElement('button');
    themeToggle.textContent = 'Toggle Dark Theme';
    themeToggle.addEventListener('click', toggleDarkTheme);

    // Place the button inside the header or nav section
    const header = document.querySelector('header');
    if (header) {
        header.appendChild(themeToggle);
    } else {
        document.body.appendChild(themeToggle);
    }

    // Check local storage for dark mode preference
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
        enableDarkMode();
    }
});

function toggleDarkTheme() {
    if (document.body.classList.contains('dark-theme')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-theme');
    localStorage.setItem('darkMode', 'enabled');
}

function disableDarkMode() {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('darkMode', 'disabled');
}