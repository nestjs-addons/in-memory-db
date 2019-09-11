import { User } from '../user';

export interface Customer extends User {
    title: string;
    company: string;
}
