export class CreateCustomerDto {
  private constructor(
    public name: string,
    public email: string,
    public phone: string,
    public adress: string,
    public city: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCustomerDto?] {
    const { name, phone, adress, city, email } = object;

    if (!name) return ['Missing name'];
    if (!email) return ['Missing email'];
    if (!phone) return ['Missing phone'];
    if (!adress) return ['Missing adress'];
    if (!city) return ['Missing city'];

    return [undefined, new CreateCustomerDto(name, phone, adress, city, email)];
  }
}
