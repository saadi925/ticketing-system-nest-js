import { Entity, Column, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmailVerification {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  userId: string; // Assuming this is the user ID

  @Column()
  code: string;

  @Column()
  email: string;
}
