export interface Todo {
  _id?: string;

  task: string;

  date: string;

  status:
    | 'Pending'
    | 'In Progress'
    | 'Completed';

  duration: string;

  owner: string;
}