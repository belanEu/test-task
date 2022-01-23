import { string, object, number, array } from 'yup';
import { TBook } from './Book';

const schema = object().shape({
    id: number().required(),
    author: string().required(),
    title: string().required(),
    description: string().default(''),
    tags: array(string()).ensure(),
    status: string().required(),
});

export const castBook = (data: unknown): TBook => {
    return schema.cast(data);
};
