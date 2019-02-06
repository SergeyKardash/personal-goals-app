export class Goal {
  public title: string;
  public description: string;
  public _id: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor (title, description) {
    this.title = title;
    this.description = description;
  }
}
