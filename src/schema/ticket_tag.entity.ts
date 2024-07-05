import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Ticket, ticket => ticket.tags)
  tickets: Ticket[];
}
