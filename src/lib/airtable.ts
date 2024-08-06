import Airtable from 'airtable';
import { env } from '../env';

export const airTableBase = new Airtable({
    endpointUrl: 'https://api.airtable.com',
    apiKey: env.AIRTABLE_API_KEY
}).base('appbj3GoxUqHmTRXT')

