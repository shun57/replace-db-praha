import { airTableBase } from './lib/airtable';
import { z } from 'zod';

// Article schema using zod
const ArticleSchema = z.object({
    title: z.string().nonempty("Title is required."),
    url: z.string().url("Valid URL is required."),
    description: z.string().nonempty("Description is required."),
    isRead: z.boolean()
});

type Article = z.infer<typeof ArticleSchema>;

const createArticle = async (article: Article): Promise<void> => {
    try {
        // Validate the article object using zod
        ArticleSchema.parse(article);

        const records = await airTableBase('記事一覧').create([
            {
                fields: {
                    記事名: article.title,
                    記事URL: article.url,
                    説明: article.description,
                    既読済: article.isRead
                }
            }
        ]);

        records.forEach(record => {
            console.log(record.getId());
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            console.error('Validation failed:', err.errors);
        } else {
            console.error(err);
        }
    }
};

const article: Article = {
    title: 'API実行',
    url: 'https://example.com',
    description: 'API実行します',
    isRead: true,
};

// バリデーションチェック用
// const article: Article = {
//     title: '',
//     url: 'abc',
//     description: '',
//     isRead: true
// };


createArticle(article);
