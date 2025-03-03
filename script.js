const chatHistory = document.getElementById('chat-history');
const onlineUsersList = document.getElementById('online-users-list');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');

const onlineUsers = new Set();

// Функция для добавления сообщения в историю
function addMessage(username, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${username}: ${message}`;
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Прокрутка вниз
}

// Функция для обновления списка онлайн пользователей
function updateOnlineUsers() {
    onlineUsersList.innerHTML = '';
    onlineUsers.forEach(user => {
        const userElement = document.createElement('li');
        userElement.textContent = user;
        onlineUsersList.appendChild(userElement);
    });
}

// Обработчик кнопки "Отправить"
sendBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (username && message) {
        // Добавляем пользователя в список онлайн
        if (!onlineUsers.has(username)) {
            onlineUsers.add(username);
            updateOnlineUsers();
        }

        // Добавляем сообщение в историю
        addMessage(username, message);

        // Очищаем поле ввода сообщения
        messageInput.value = '';
    }
});