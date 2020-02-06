export class Ware {
  constructor(
    public name: string,
    public category: string,
    public description: string,
    public comment: string,
    public lastUsed: Date,
    public quantity: number
  ) { }
}
