import { HttpProtocol } from '../../enum';

export const CLIENT_HOST_PROTOCOL = HttpProtocol.HTTP;

export const CLIENT_HOST_NAME: string = process.env['CLIENT_HOST_NAME'] ?? 'localhost';

export const CLIENT_HOST_PORT = Number(process.env['CLIENT_HOST_PORT'] ?? 3000);
