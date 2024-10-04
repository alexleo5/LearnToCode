document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const answers = document.querySelectorAll('input[type="radio"]:checked');
            let score = 0;
            const results = [];

            answers.forEach(answer => {
                const question = answer.name;
                const isCorrect = answer.value === 'correct';
                if (isCorrect) {
                    score++;
                }
                results.push({ question, isCorrect });
            });

            const totalQuestions = document.querySelectorAll('input[type="radio"]').length / 4; // Assuming 4 options per question
            const percentage = (score / totalQuestions) * 100;
            const timestamp = new Date().toLocaleString();
            const userAgent = navigator.userAgent;
            const screenResolution = `${window.screen.width}x${window.screen.height}`;
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const referrer = document.referrer;
            const language = navigator.language;
            const platform = navigator.platform;
            const cookiesEnabled = navigator.cookieEnabled;
            const doNotTrack = navigator.doNotTrack;

            const emailBody = `
                Quiz Results:
                - Score: ${score} out of ${totalQuestions}
                - Percentage: ${percentage}%
                - Timestamp: ${timestamp}
                - User Agent: ${userAgent}
                - Screen Resolution: ${screenResolution}
                - Timezone: ${timezone}
                - Referrer: ${referrer}
                - Language: ${language}
                - Platform: ${platform}
                - Cookies Enabled: ${cookiesEnabled}
                - Do Not Track: ${doNotTrack}

                Detailed Results:
                ${results.map(result => `- Question: ${result.question}, Correct: ${result.isCorrect}`).join('\n')}
            `;

            // Create a mailto link
            const mailtoLink = `mailto:your-email@gmail.com?subject=Quiz Results&body=${encodeURIComponent(emailBody)}`;

            // Open the user's email client
            window.location.href = mailtoLink;
        });
    }
});
