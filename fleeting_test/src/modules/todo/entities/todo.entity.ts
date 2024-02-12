import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_todo' })
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', length: 100, nullable: false })
  title: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'status', length: 255, nullable: false })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.todo, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  fk_user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
