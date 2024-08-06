import { airTableBase } from '../lib/airtable';
import { Article, ArticleSchema } from '../models/article';
import { z } from 'zod';

const TABLE_NAME = '記事一覧';
const VIEW_NAME = 'Grid view';
const MAX_RECORDS = 3;

const getArticleList = async (): Promise<Article[]> => {
    try {
        const records = await airTableBase(TABLE_NAME).select({
            maxRecords: MAX_RECORDS,
            view: VIEW_NAME,
        }).all();

        return records.map(record => record.fields as Article);
    } catch (err) {
        console.error('Error in getArticleList:', err);
        throw err;
    }
};

const createArticle = async (article: Article): Promise<string[]> => {
    try {
        ArticleSchema.parse(article);

        const records = await airTableBase(TABLE_NAME).create([
            {
                fields: {
                    記事名: article.title,
                    記事URL: article.url,
                    説明: article.description,
                    既読済: article.isRead,
                },
            },
        ]);

        return records.map(record => record.getId());
    } catch (err) {
        console.error('Error in createArticle:', err);
        throw err;
    }
};

export { getArticleList, createArticle };
