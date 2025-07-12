export class CreateCustomerDto {
  private constructor(
    public name: string,
    public phone: string,
    public adress: string,
    public city: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCustomerDto?] {
    const { name, phone, adress, city } = object;

    if (!name) return ['Missing name'];
    if (!phone) return ['Missing phone'];
    if (!adress) return ['Missing adress'];
    if (!city) return ['Missing city'];

    return [undefined, new CreateCustomerDto(name, phone, adress, city)];
  }
}
