import cron from 'node-cron'
import { parseRSS } from './utils';

cron.schedule('* * 10 * *', () => {
  console.log('running')
  parseRSS();
})