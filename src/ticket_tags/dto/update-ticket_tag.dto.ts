import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-ticket_tag.dto';

export class UpdateTicketTagDto extends PartialType(CreateTagDto) {}
