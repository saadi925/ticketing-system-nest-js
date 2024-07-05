import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Color } from './color.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class TicketPriority {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Color, color => color.priorities)
  color: Color;

  @OneToMany(()=> Ticket, ticket => ticket.status )
  tickets : Ticket[]
}
