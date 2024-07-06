import { PartialType } from "@nestjs/mapped-types";
import { CreateTicketCommentDto } from "./create-ticket-comment";

export class UpdateTicketCommentDto extends PartialType(CreateTicketCommentDto){}