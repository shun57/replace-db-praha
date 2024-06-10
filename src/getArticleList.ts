import { airTableBase } from './lib/airtable';

const getArticleList = async () => {
  airTableBase('記事一覧').select({
    maxRecords: 3,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {

    records.forEach(function (record) {
      console.log('Retrieved', record.fields);
    });

    fetchNextPage();

  }, function done(err: any) {
    if (err) { console.error(err); return; }
  });
};

getArticleList()
