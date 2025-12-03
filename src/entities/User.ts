import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Task } from "./Task";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: "enum",
    enum: ["FREE", "PRO", "BUSINESS"],
    default: "FREE",
  })
  plan!: "FREE" | "PRO" | "BUSINESS";

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];
}
