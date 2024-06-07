import { DB } from 'src/constant/db';
import { BaseEntity, Entity } from 'typeorm';

@Entity({
  database: DB.DATABASE_NAME,
})
export default class ExampleEntity extends BaseEntity {}
