import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL, {
    auth: (cb) => {
        const currentToken = typeof window !== "undefined" && window?.localStorage .getItem('@chat-app/token');
        const currentChat = typeof window !== "undefined" && window?.localStorage .getItem('@chat-app/chat');
        cb({ token: currentToken, chat: currentChat });
    }
});

export default socket;