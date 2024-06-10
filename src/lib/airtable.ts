import Airtable from 'airtable';
import { load } from 'ts-dotenv';

const env = load({
    AIRTABLE_API_KEY: String,
});

export const airTableBase = new Airtable({
    endpointUrl: 'https://api.airtable.com',
    apiKey: env.AIRTABLE_API_KEY
}).base('appbj3GoxUqHmTRXT')

