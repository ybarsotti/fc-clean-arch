import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {InputListCustomerDto, OutputListCustomerDto} from "./list.customer.dto";
import Customer from "../../../domain/customer/entity/customer";

export default class ListCustomerUsecase {
    constructor(private readonly customerRepository: CustomerRepositoryInterface) {}

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();
        return OutputMapper.toOutput(customers)
    }
}


class OutputMapper {
    static toOutput(customer: Customer[]): OutputListCustomerDto {
        return {
            customers: customer.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                    city: customer.Address.city,
                },
            })),
        };
    }
}
