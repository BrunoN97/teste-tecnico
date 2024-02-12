import { TodoEntity } from 'src/modules/todo/entities/todo.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', length: 100, nullable: false })
  email: string;

  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @OneToMany(() => TodoEntity, (todoEntity) => todoEntity.fk_user, {
    cascade: true,
    eager: true,
    orphanedRowAction: 'delete',
  })
  todo: TodoEntity[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
