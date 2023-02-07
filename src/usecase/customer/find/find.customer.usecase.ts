import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {InputFindCustomerDto, OutputFindCustomerDto} from "./find.customer.dto";

export default class FindCustomerUsecase {
    constructor(private customerRepository: CustomerRepositoryInterface) {}

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
        const customer = await this.customerRepository.find(input.id);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                number: customer.Address.number,
                zip: customer.Address.zip
            }
        }
    }
}
