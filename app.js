const submitButton = document.querySelector('#submit');
const outputElement = document.querySelector('#output');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history');
const buttonElement = document.querySelector('button');

const API_KEY = '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'; // Replace with your actual OpenAI API key
const API_ENDPOINT = 'https://api.openai.com/v1/completions';

function changeInput(value) {
    const inputElement = document.querySelector('input')
    inputElement.value = value
}

let conversationHistory = [];

async function getMessage() {
    console.log('clicked');
    const userMessage = inputElement.value;
    const messages = [...conversationHistory, { role: 'user', content: userMessage }];

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 100
        })
    };

    try {
        const response = await fetch(API_ENDPOINT, requestOptions);
        const data = await response.json();
        console.log(data);

        if (data.choices && data.choices.length > 0) {
            const lastChoice = data.choices[data.choices.length - 1];
            const outputContent = lastChoice.message.content;
            pElement.addEventListener('click', () => changeInput(pElement.textContent))

            if (outputContent) {
                outputElement.textContent = outputContent;
                const pElement = document.createElement('p');
                pElement.textContent = userMessage;
                historyElement.append(pElement);
            }
        }

        conversationHistory = data.choices.map(choice => choice.message);
    } catch (error) {
        console.error(error);
    }
}

submitButton.addEventListener('click', () => {
    setTimeout(getMessage, 1000); // Delay of 1 second before making the request
});

function clearInput(){
    inputElement.value = ''
}


buttonElement.addEventListener('click', clearInput)