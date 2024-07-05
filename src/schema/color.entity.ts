// src/entities/color.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TicketPriority } from './ticket_priority.entity';
import { TicketStatus } from './ticket_status.entity';
import { TicketCategory } from './ticket_category';

@Entity()
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  hex: string;

  @OneToMany(() => TicketCategory, category => category.color)
  categories: TicketCategory[];

  @OneToMany(() => TicketPriority, priority => priority.color)
  priorities: TicketPriority[];

  @OneToMany(() => TicketStatus, status => status.color)
  statuses: TicketStatus[];
}
