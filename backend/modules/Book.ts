import { AbstractEntity } from 'cleverJS/core/entity/AbstractEntity';

export type TBook = {
    id: number | null,
    author: string,
    title: string,
    description: string,
    tags: string[],
    status: string
};

export class Book extends AbstractEntity<TBook> implements TBook {
    public id: number | null = null;
    public title = '';
    public author = '';
    public description = '';
    public tags: string[] = [];
    public status = '';
}
