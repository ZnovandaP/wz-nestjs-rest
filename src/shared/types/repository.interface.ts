export interface IRepository {
  findAll(): Promise<any[]>;
}
