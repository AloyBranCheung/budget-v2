interface TransactionParamsOptions {
  fromDate?: Date;
  categoryId?: string;
  isToday?: boolean;
  tagId?: string;
}

export default class TransactionParams {
  private properties: Partial<TransactionParamsOptions> = {};

  public constructor(options: Partial<TransactionParamsOptions>) {
    this.properties.fromDate = options?.fromDate;
    this.properties.categoryId = options?.categoryId;
    this.properties.isToday = options?.isToday;
    this.properties.tagId = options?.tagId;
  }

  public getAll() {
    return { ...this.properties };
  }
}
