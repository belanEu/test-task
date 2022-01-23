import { Knex } from 'knex';
import { resolve } from 'path';

export const connection = {
    client: 'sqlite3',
    connection: {
        filename: resolve(__dirname, '../runtime/db/data.db')
    },
    useNullAsDefault: true
} as Knex.Config;
