import { load } from 'ts-dotenv';

export const env = load({
    AIRTABLE_API_KEY: String,
    PORT: Number,
});