import {Sequelize} from "sequelize-typescript";
import Address from "../../../domain/customer/value-object/address";
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUsecase from "./find.customer.usecase";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";


const customer = new Customer("123", "John")
const address = new Address("Street", 123, "Zip", "City")
customer.changeAddress(address)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Test Unit find customer use case', function () {
    it('should find a customer', async () => {
        const customerRepository = MockRepository();
        const useCase = new FindCustomerUsecase(customerRepository);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "Zip"
            }
        }

        const result = await useCase.execute(input);
        expect(result).toStrictEqual(output);
    })

    it('should not find a customer', async function () {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error('Customer not found')
        })
        const useCase = new FindCustomerUsecase(customerRepository);

        const input = {
            id: "123"
        }

        expect(() => {
            return useCase.execute(input)
        }).rejects.toThrow("Customer not found")
    });
});
