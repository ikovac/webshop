import { Entity, Property, Unique } from '@mikro-orm/core';
import BaseEntity from 'shared/database/base.entity';
import bcrypt from 'bcrypt';

@Entity({ tableName: 'user' })
class Identity extends BaseEntity {
  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  @Unique()
  email: string;

  @Property({ hidden: true })
  password: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = bcrypt.hashSync(password, 10);
  }
}

export default Identity;
