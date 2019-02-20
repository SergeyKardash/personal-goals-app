export class Goal {
  public title: string;
  public description: string;
  public status: string;
  public canComment: string[];
  public comments: [];
  public creator: string;
  public _id: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor (title, description, status) {
    this.title = title;
    this.description = description;
    this.status = status;
  }
}
