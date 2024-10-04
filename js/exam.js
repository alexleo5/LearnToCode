document.addEventListener('DOMContentLoaded', function() {
    const examForm = document.getElementById('exam-form');
    const questions = document.querySelectorAll('.question');
    const results = document.createElement('div');
    results.id = 'results';
    results.style.display = 'none';
    examForm.appendChild(results);

    examForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let score = 0;
        questions.forEach((question, index) => {
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            if (selectedOption && selectedOption.value === 'correct') {
                score++;
            }
        });

        results.innerHTML = `
            <h2>Results</h2>
            <p>You scored ${score} out of ${questions.length}.</p>
        `;
        results.style.display = 'block';
    });

    // Additional functionality: Reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', function() {
        questions.forEach(question => {
            const radioButtons = question.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radio => {
                radio.checked = false;
            });
        });
        results.style.display = 'none';
    });
    examForm.appendChild(resetButton);

    // Additional functionality: Timer
    let timeLeft = 600; // 10 minutes in seconds
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer';
    timerDisplay.style.textAlign = 'center';
    timerDisplay.style.marginTop = '20px';
    examForm.appendChild(timerDisplay);

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            examForm.dispatchEvent(new Event('submit'));
        } else {
            timeLeft--;
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    // Additional functionality: Highlight selected options
    questions.forEach(question => {
        const radioButtons = question.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                radioButtons.forEach(rb => {
                    rb.parentElement.style.backgroundColor = rb === radio ? '#d4edda' : '';
                });
            });
        });
    });

    // Additional functionality: Show correct answers after submission
    examForm.addEventListener('submit', function() {
        questions.forEach(question => {
            const correctOption = question.querySelector('input[value="correct"]');
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            if (correctOption && selectedOption) {
                correctOption.parentElement.style.backgroundColor = '#d4edda';
                if (selectedOption !== correctOption) {
                    selectedOption.parentElement.style.backgroundColor = '#f8d7da';
                }
            }
        });
    });

    // Additional functionality: Scroll to top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.textContent = 'Scroll to Top';
    scrollToTopButton.style.position = 'fixed';
    scrollToTopButton.style.bottom = '20px';
    scrollToTopButton.style.right = '20px';
    scrollToTopButton.style.display = 'none';
    document.body.appendChild(scrollToTopButton);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
