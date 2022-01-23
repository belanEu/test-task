import { settings } from "./../configs";
import { knex } from 'knex';
import jsonData from './10-items.json';

const connection = knex(settings.connection);

const insertBooks = async () => {
    const books = jsonData.items.map(
        ({author, description, title, tags}) => { return {
        author,
        title,
        description,
        tags: JSON.stringify(tags),
        status: 'toread'
    }});
    return await connection.table('books').insert(books)
};

const selectAll = async () => await connection.raw('select * from books');

const run = async () => {
    const books = (await selectAll()) as Array<any>;
    if (books.length === 0) {
        const insertRes = await insertBooks();
        console.log(insertRes && insertRes[0] ? 'Table "books" has been filled successfuly' : 'Failure');
    } else {
        console.log('Table "books" is already full of data');
    }
};

run();
