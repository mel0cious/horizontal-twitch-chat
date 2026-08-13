import { AppTokenAuthProvider } from '@twurple/auth';
import { accessToken, clientId } from './creds';
import { ApiClient } from '@twurple/api'

export const authProvider = new AppTokenAuthProvider(clientId, accessToken);
export const TWITCH_API = new ApiClient({authProvider})