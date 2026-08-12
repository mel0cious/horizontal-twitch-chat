import { AppTokenAuthProvider } from '@twurple/auth';
import { accessToken, clientId } from './creds';

export const authProvider = new AppTokenAuthProvider(clientId, accessToken);