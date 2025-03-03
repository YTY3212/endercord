// Конфигурация Firebase (замени на свою)
const firebaseConfig = {
    apiKey: "AIzaSyBsr30gAQJtzyoUbErpvDdWsCPx1so-wW8",
    authDomain: "endercord-9d8f7.firebaseapp.com",
    databaseURL: "https://endercord-9d8f7-default-rtdb.firebaseio.com/",
    projectId: "endercord-9d8f7",
    storageBucket: "endercord-9d8f7.firebasestorage.app",
    messagingSenderId: "247998582112",
    appId: "1:247998582112:web:c659796bf5debc13c86205"
};

// Инициализация Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Элементы DOM
const chatHistory = document.getElementById('chat-history');
const onlineUsersList = document.getElementById('online-users-list');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');

// Отправка сообщения
sendBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (username && message) {
        // Добавляем сообщение в базу данных
        database.ref('messages').push({
            username: username,
            message: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        // Очищаем поле ввода
        messageInput.value = '';
    }
});

// Отображение сообщений
database.ref('messages').on('child_added', (snapshot) => {
    const message = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.username}: ${message.message}`;
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Прокрутка вниз
});

// Отображение онлайн пользователей
database.ref('online').on('child_added', (snapshot) => {
    const user = snapshot.val();
    const userElement = document.createElement('li');
    userElement.textContent = user.username;
    onlineUsersList.appendChild(userElement);
});

database.ref('online').on('child_removed', (snapshot) => {
    const user = snapshot.val();
    const userElement = Array.from(onlineUsersList.children).find(
        (el) => el.textContent === user.username
    );
    if (userElement) {
        onlineUsersList.removeChild(userElement);
    }
});

// Добавление пользователя в список онлайн при загрузке страницы
usernameInput.addEventListener('change', () => {
    const username = usernameInput.value.trim();
    if (username) {
        const userRef = database.ref('online').push();
        userRef.set({ username: username });
        userRef.onDisconnect().remove(); // Удалить при отключении
    }
});
