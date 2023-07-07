import { applicationConfiguration } from '@react-node-monorepo/infrastructure';
import { runApplication } from './application';

const port = Number(applicationConfiguration.resetApi.serverUrl.port);

runApplication(port).catch(err => {
  console.error(err);
  process.exit(10);
});
