export class CreateExternalTransactionDto {
  private constructor(
    public amount_in_cents: number,
    public currency: string,
    public customer_email: string,
    public reference: string,
    public payment_method: {
      type: string;
      installments: number;
      token: string;
    },
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateExternalTransactionDto?] {
    const {
      amount_in_cents,
      currency,
      customer_email,
      reference,
      acceptance_token,
      payment_method,
    } = object;

    if (!amount_in_cents) return ['Missing amount_in_cents'];
    if (!currency) return ['Missing currency'];
    if (!customer_email) return ['Missing customer_email'];
    if (!reference) return ['Missing reference'];
    if (!payment_method) return ['Missing payment_method'];

    return [
      undefined,
      new CreateExternalTransactionDto(
        amount_in_cents,
        currency,
        customer_email,
        reference,
        payment_method,
      ),
    ];
  }
}
