export class CreateTokenCardDto {
  private constructor(
    public number: string,
    public cvc: string,
    public exp_month: string,
    public exp_year: string,
    public card_holder: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateTokenCardDto?] {
    const { number, cvc, exp_month, exp_year, card_holder } = object;

    if (!number) return ['Missing number'];
    if (!cvc) return ['Missing phone'];
    if (!exp_month) return ['Missing adress'];
    if (!exp_year) return ['Missing exp_year'];
    if (!card_holder) return ['Missing card_holder'];

    return [undefined, new CreateTokenCardDto(number, cvc, exp_month, exp_year, card_holder)];
  }
}
