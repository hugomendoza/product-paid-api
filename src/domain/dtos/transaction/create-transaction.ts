export class CreateTransactionDto {
  private constructor(
    public status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'FAILED',
    public product_amount: number,
    public base_fee: number,
    public delivery_fee: number,
    public total_amount: number,
    public payment_method: string,
    public customerId: string,
    public productId: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateTransactionDto?] {
    const {
      status,
      product_amount,
      base_fee,
      delivery_fee,
      total_amount,
      payment_method,
      customerId,
      productId,
    } = object;

    if (!status) return ['Missing status'];
    if (!product_amount) return ['Missing product_amount'];
    if (!base_fee) return ['Missing base_fee'];
    if (!delivery_fee) return ['Missing delivery_fee'];
    if (!total_amount) return ['Missing total_amount'];
    if (!payment_method) return ['Missing payment_method'];
    if (!customerId) return ['Missing customerId'];
    if (!productId) return ['Missing productId'];

    return [
      undefined,
      new CreateTransactionDto(
        status,
        product_amount,
        base_fee,
        delivery_fee,
        total_amount,
        payment_method,
        customerId,
        productId,
      ),
    ];
  }
}
