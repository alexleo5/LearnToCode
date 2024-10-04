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
});
