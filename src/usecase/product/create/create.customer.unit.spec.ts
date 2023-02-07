import CreateProductUsecase from "./create.product.usecase";


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test create product use case', function () {
    it('should create a product', async function () {
        const productRepository = MockRepository();
        const usecase = new CreateProductUsecase(productRepository);
        const input = {
            type: 'a',
            name: 'Product Test',
            price: 120,
        }

        const output = await usecase.execute(input);

        expect(output).toStrictEqual({
            id: expect.any(String),
            name: 'Product Test',
            price: 120,
        })
    });

    it('should throw an error when product type is incorrect', async function () {
        const productRepository = MockRepository();
        const usecase = new CreateProductUsecase(productRepository);
        const input = {
            type: 'a',
            name: 'Product Test',
            price: 120,
        }

        input.type = "c";
        await expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrow("Product type not supported")
    });

    it('should throw an error when name is missing', async function () {
        const productRepository = MockRepository();
        const usecase = new CreateProductUsecase(productRepository);
        const input = {
            type: 'a',
            name: 'Product Test',
            price: 120,
        }

        input.name = "";

        await expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrow("Name is required")
    });

    it('should throw an error when price is less than zero', async function () {
        const productRepository = MockRepository();
        const usecase = new CreateProductUsecase(productRepository);
        const input = {
            type: 'a',
            name: 'Product Test',
            price: 120,
        }

        input.price = -100;

        await expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrow("Price must be greater than zero")
    });
});
