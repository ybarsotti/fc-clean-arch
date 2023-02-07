import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUsecase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product", 100);

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
    }
}

describe('Unit test for update product use case', function () {
    it('should update a product', async function () {
        const input = {
            id: product.id,
            name: "Test",
            price: 500,
            type: 'a',
        }

        const expectedOutput = {
            id: product.id,
            name: "Test",
            price: 500,
        }

        const usecase = new UpdateProductUsecase(MockRepository());
        const output = await usecase.execute(input)
        expect(output).toStrictEqual(expectedOutput)
    });
})
