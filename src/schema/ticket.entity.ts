import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { TicketCategory } from './ticket_category';
import { TicketComment } from './ticket_comment.entity';
import { TicketPriority } from './ticket_priority.entity';
import { TicketStatus } from './ticket_status.entity';
import { Tag } from './ticket_tag.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column('text')
  description: string;

  @ManyToOne(() => User, user => user.createdTickets)
  creator: User;

  @ManyToOne(() => User, user => user.assignedTickets, { nullable: true })
  assignee: User;

  @ManyToOne(() => TicketStatus, status => status.tickets)
  status: TicketStatus;

  @ManyToOne(() => TicketPriority, priority => priority.tickets)
  priority: TicketPriority;

  @ManyToOne(() => TicketCategory, category => category.tickets)
  category: TicketCategory;

  @ManyToMany(() => Tag, tag => tag.tickets)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => TicketComment, comment => comment.ticket)
  comments: TicketComment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
