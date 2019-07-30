import { Injectable } from "@nestjs/common";
import { InMemoryDBEntity } from "./interfaces/in-memory-db-entity";

@Injectable()
export class InMemoryDBService<T extends InMemoryDBEntity> {
  public records: T[] = [];

  public create(record: Partial<T>): T {
    const id = record.id || this.getNextId();
    const newRecord: T = { ...record, id } as T;
    this.records.push(newRecord);
    return newRecord;
  }

  public update(record: T): void {
    const foundRecordIndex = this.records.findIndex(r => r.id === record.id);
    this.records[foundRecordIndex] = { ...record };
  }

  public delete(id: number) {
    const foundRecordIndex = this.records.findIndex(r => r.id === id);
    this.records.splice(foundRecordIndex);
  }

  public get(id: number): T {
    return this.records.find(r => r.id === id);
  }

  public getAll(): T[] {
    return this.records || [];
  }

  public query(predicate: (record: T) => boolean) {
    return this.records.filter(predicate);
  }

  private getNextId(): number {
    if (this.records && this.records.length > 0) {
      return Math.max(...this.records.map(r => r.id)) + 1;
    }

    return 1;
  }
}
