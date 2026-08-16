import { AppTokenAuthProvider } from '@twurple/auth';
import { accessToken, clientId } from './creds';
import { ApiClient } from '@twurple/api'
import { EmoteFetcher, EmoteParser } from '@mkody/twitch-emoticons';

export const authProvider = new AppTokenAuthProvider(clientId, accessToken);
export const TWITCH_API = new ApiClient({authProvider})
export const emoteFetcher = new EmoteFetcher({
  apiClient: TWITCH_API,
})
export const emoteParser = new EmoteParser(emoteFetcher, {type: "html"})