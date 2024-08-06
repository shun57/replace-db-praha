## 実行例

```
// create .env
$ npm run start
```

## 記事一覧取得

```
curl http://localhost:3000/articles 
[{"説明":"テストようです","記事名":"テスト記事","記事URL":"https://example.com"},{"説明":"API実行します","既読済":true,"記事名":"API実行","記事URL":"https://example.com"},{"説明":"This is a sample article description.","記事名":"Sample Article Title","記事URL":"http://example.com/sample-article"}]
```

## 記事作成

```
curl -X POST http://localhost:3000/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Article Title",
    "url": "http://example.com/sample-article",
    "description": "This is a sample article description.",
    "isRead": false
  }'
{"recordIds":["reco5vrXdZ43XOICT"]}%
```

## バリデーション

```
curl -X POST http://localhost:3000/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Article Title",
    "url": "http://example.com/sample-article",
    "description": "This is a sample article description.",
    "isRead":"あ"
  }'
{"message":"Invalid article data","errors":[{"code":"invalid_type","expected":"boolean","received":"string","path":["isRead"],"message":"Expected boolean, received string"}]}
```