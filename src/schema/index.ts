import { Color } from "./color.entity";
import { Ticket } from "./ticket.entity";
import { TicketCategory } from "./ticket_category";
import { TicketComment } from "./ticket_comment.entity";
import { TicketPriority } from "./ticket_priority.entity";
import { TicketStatus } from "./ticket_status.entity";
import { Tag } from "./ticket_tag.entity";
import { User } from "./user.entity";


export const entities = [
  User,
  Ticket,
  TicketComment,
  TicketStatus,
  TicketPriority,
  TicketCategory,
  Tag,
  Color
];
