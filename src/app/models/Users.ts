import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcrypt";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({name: "last_name"})
  lastName: string;

  @Column()
  email: string;

  @Column({name: "is_valid"})
  isValid: boolean;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
  	this.password = bcrypt.hashSync(this.password, 8);
  }
}
