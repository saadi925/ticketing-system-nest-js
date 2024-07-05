export class CreateTicketDto {
    subject: string;
    description: string;
    statusId: string;
    priorityId: string;
    categoryId: string;
    creatorId: string;
    assigneeId?: string;
    tagIds: string[];
  }
  