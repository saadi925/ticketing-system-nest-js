import { Ticket } from "@/schema/ticket.entity";

export interface TicketsResponse { data: Ticket[], total: number, page : number, limit : number }