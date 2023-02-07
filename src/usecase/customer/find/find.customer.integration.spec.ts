import {Sequelize} from "sequelize-typescript";
import Address from "../../../domain/customer/value-object/address";
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUsecase from "./find.customer.usecase";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";

describe('Test find customer use case', function () {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync()
    })

    afterEach(async function () {
        await sequelize.close()
    });

    it('should find a customer', async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUsecase(customerRepository);

        const customer = new Customer("123", "John")
        const address = new Address("Street", 123, "Zip", "City")
        customer.changeAddress(address)

        await customerRepository.create(customer)

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
});
