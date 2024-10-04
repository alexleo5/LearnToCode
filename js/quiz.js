document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const answers = document.querySelectorAll('input[type="radio"]:checked');
            let score = 0;
            answers.forEach(answer => {
                if (answer.value === 'correct') {
                    score++;
                }
            });
            alert(`Your score is ${score} out of ${answers.length}`);
        });
    }
});