import CreateCustomerUsecase from "./create.customer.usecase";

const input = {
    name: 'John',
    address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test create customer use case', function () {
    it('should create a customer', async function () {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUsecase(customerRepository);

        const output = await customerCreateUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        })
    });

    it('should throw an error when name is missing', async function () {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUsecase(customerRepository);
        input.name = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        )
    });

    it('should throw an error then name is missing', async function () {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUsecase(customerRepository);
        input.address.street = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
            "Street is required"
        )
    });
});
