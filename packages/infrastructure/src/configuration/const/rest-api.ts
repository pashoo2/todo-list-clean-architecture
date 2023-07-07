import { HttpProtocol } from '../../enum';

export const REST_API_SERVER_PROTOCOL = HttpProtocol.HTTP;

export const REST_API_SERVER_HOST: string = process.env['REST_API_SERVER_HOST'] ?? 'localhost';

export const REST_API_SERVER_PORT = Number(process.env['REST_API_SERVER_PORT'] ?? 5000);
