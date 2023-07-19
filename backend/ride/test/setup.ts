import { PostgressAdapter } from '@/infra/database/pg-adapter';
import axios from 'axios';

axios.defaults.validateStatus = function () {
  return true;
};

beforeEach(async () => {
  const client = PostgressAdapter.getInstance();

  if (client) {
    await client.query('DELETE FROM passengers WHERE document = $1', [
      '61241093369',
    ]);
    await client.query('DELETE FROM drivers WHERE document = $1', [
      '61241093369',
    ]);
  }
});
