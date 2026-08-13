import { ChatClient } from "@twurple/chat";

export function getNewChatClient(channelName : string) : ChatClient { 
    const chatClient = new ChatClient({channels: [channelName] });
    return chatClient
}

export function getNewMessage(chatClient: ChatClient) {
    
}