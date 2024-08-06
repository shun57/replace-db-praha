import express from 'express';
import { getArticleList, createArticle } from './controllers/articleController';
import { Article } from './models/article';
import { env } from './env';
import { ZodError } from 'zod';

const app = express();
const port = env.PORT;

app.use(express.json());

// 記事一覧を取得するエンドポイント
app.get('/articles', async (req, res) => {
    try {
        const articles = await getArticleList();
        return res.json(articles);
    } catch (err) {
        console.error('Failed to fetch articles:', err);
        return res.status(500).send('Internal Server Error');
    }
});

// 記事を作成するエンドポイント
app.post('/articles', async (req, res) => {
    const article: Article = req.body;

    try {
        const recordIds = await createArticle(article);
        return res.status(201).json({ recordIds });
    } catch (err: any) {
        if (err instanceof ZodError) {
            return res.status(400).json({ message: 'Invalid article data', errors: err.errors });
        } else {
            console.error('Failed to create article:', err.message);
            return res.status(500).send('Internal Server Error');
        }
    }
});

// サーバーを起動
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
