import { User } from '../user';

export interface Customer extends User {
    company: string;
    industry: string;
}
