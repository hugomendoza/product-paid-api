export class CreateDeliveryDto {
  private constructor(
    public customer_address: string,
    public city: string,
    public transactionId: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateDeliveryDto?] {
    const { customer_address, city, transactionId } = object;

    if (!customer_address) return ['Missing customer_address'];
    if (!city) return ['Missing city'];
    if (!transactionId) return ['Missing transactionId'];

    return [undefined, new CreateDeliveryDto(customer_address, city, transactionId)];
  }
}
