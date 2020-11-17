import {Question} from './question';

export interface Quiz {
  _id: string;
  title: string;
  questions: [Question];
}
