import { settings } from "./../configs";
import { knex } from 'knex';
import jsonData from './30000-items.json';

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

    let limit = 500, steps = Math.floor(books.length / limit), i: number;
    for (i = 0; i < steps; i++) {
        await connection.table('books').insert(books.slice(i * limit, (i + 1) * limit));
        console.log(i * limit + ' ' + (i + 1) * limit);
    }
    if (i * limit < books.length) {
        await connection.table('books').insert(books.slice(i * limit, (i + 1) * limit));
        console.log(i * limit + ' ' + (i + 1) * limit);
    }
};

const selectCount = async () => await connection.raw('select count(id) as cnt from books');

type countResult = {
    cnt: number
};

const run = async () => {
    const result = (await selectCount()) as Array<countResult>;
    
    if (result[0].cnt === 0) {
        // const insertRes = await insertBooks();
        // console.log(insertRes && insertRes[0] ? 'Table "books" has been filled successfuly' : 'Failure');
        await insertBooks();
    } else {
        console.log('Table "books" is already full of data');
    }

    process.exit();
};

run();
