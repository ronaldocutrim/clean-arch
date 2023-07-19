import { PostgressAdapter } from '@/infra/database/pg-adapter';
import axios from 'axios';

axios.defaults.validateStatus = function () {
  return true;
};

const client = PostgressAdapter.getInstance();

beforeEach(async () => {
  if (client) {
    await client.query('DELETE FROM passengers WHERE document = $1', [
      '61241093369',
    ]);
    await client.query('DELETE FROM drivers WHERE document = $1', [
      '61241093369',
    ]);
  }
});
