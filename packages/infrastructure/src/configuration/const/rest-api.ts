import { HttpProtocol } from '../../enum';

export const REST_API_SERVER_PROTOCOL = HttpProtocol.HTTP;

export const REST_API_SERVER_HOST: string =
  process.env['REST_API_SERVER_HOST'] ?? window.location.hostname;

export const REST_API_SERVER_PORT = Number(
  process.env['REST_API_SERVER_PORT'] ?? window.location.port,
);
