export interface Post {
    id: number;
    name:string
    username: string;
    address: Address;
}

export interface Address {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  phone: string,
  website: string,
}
