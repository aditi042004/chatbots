async function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;

  const chatBody = document.getElementById('chatBody');

  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message user';
  userMsg.innerText = text;
  chatBody.appendChild(userMsg);
  input.value = '';

  const botMsg = document.createElement('div');
  botMsg.className = 'chat-message bot';
  botMsg.innerText = 'Typing...';
  chatBody.appendChild(botMsg);

  chatBody.scrollTop = chatBody.scrollHeight;

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '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' // <-- Replace this
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: text }]
      })
    });

    const data = await res.json();
    botMsg.innerText = data.choices[0].message.content;
  } catch (err) {
    botMsg.innerText = 'Something went wrong. Try again.';
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}
