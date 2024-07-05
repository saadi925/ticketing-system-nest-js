import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TicketComment } from './ticket_comment.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'user' }) // roles could be 'admin', 'agent', 'user'
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Ticket, ticket => ticket.creator)
  createdTickets: Ticket[];

  @OneToMany(() => Ticket, ticket => ticket.assignee)
  assignedTickets: Ticket[];

  @OneToMany(() => TicketComment, comment => comment.author)
  comments: TicketComment[];
}
