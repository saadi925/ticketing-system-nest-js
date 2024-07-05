import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Color } from './color.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class TicketStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Color, color => color.statuses)
  color: Color;

  @OneToMany(()=> Ticket, ticket => ticket.status )
  tickets : Ticket[]
}
