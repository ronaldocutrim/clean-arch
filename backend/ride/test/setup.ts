import { PostgresClient } from '@/infra/postgress';
import axios from 'axios';

axios.defaults.validateStatus = function () {
  return true;
};

beforeEach(async () => {
  const client = await PostgresClient.getInstance();
  if (client) {
    await client.query('DELETE FROM passengers WHERE document = $1', [
      '00099735326',
    ]);
    await client.query('DELETE FROM drivers WHERE document = $1', [
      '00099735326',
    ]);
    PostgresClient.disconect();
  }
});
