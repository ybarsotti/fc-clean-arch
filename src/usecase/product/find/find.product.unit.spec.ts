import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUsecase from "./find.product.usecase";

const product = ProductFactory.create('a', 'Product', 120);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Test Unit find product use case', function () {
    it('should find a product', async function () {
        const usecase = new FindProductUsecase(MockRepository());

        const input = {
            id: product.id
        }

        const output = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const result = await usecase.execute(input)
        expect(result).toStrictEqual(output)
    });

    it('should not find a product', async function () {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found")
        })
        const usecase = new FindProductUsecase(productRepository);

        const input = {
            id: "abc"
        }

        await expect(() => usecase.execute(input)).rejects.toThrow("Product not found")
    });
})
