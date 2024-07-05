import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Color } from './color.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class TicketCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Color, color => color.categories)
  color: Color;

  @OneToMany(()=> Ticket, ticket => ticket.status )
  tickets : Ticket[]
}
