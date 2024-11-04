// Function to handle content generation using OpenAI API
document.getElementById('content-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const topic = document.getElementById('topic').value;

    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Authorization': '-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', // Replace with your OpenAI API key
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'text-davinci-003', // Choose the model
            prompt: `Write a blog post about ${topic}.`,
            max_tokens: 500
        })
    });

    const data = await response.json();
    document.getElementById('generated-content').innerHTML = `<h3>Generated Content:</h3><p>${data.choices[0].text}</p>`;
});
