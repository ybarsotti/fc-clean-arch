
type Customer = {
    id: string;
    name: string;
    address: {
        street: string;
        zip: string;
        number: number;
        city: string;
    }
}

export interface InputListCustomerDto {}

export interface OutputListCustomerDto {
    customers: Array<Customer>
}
