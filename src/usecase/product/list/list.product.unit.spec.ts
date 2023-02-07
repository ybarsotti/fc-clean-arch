import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUsecase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product A", 1);
const product2 = ProductFactory.create("b", "Product B", 10);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2]))
    }
}

describe('Unit test for listing product use case', function () {
    it('should list products', async function () {
        const repository = MockRepository();
        const usecase = new ListProductUsecase(repository);
        const output = await usecase.execute({});
        const product1Output = output.products[0];
        const product2Output = output.products[1];
        expect(output.products.length).toBe(2);
        expect(product1Output.id).toBe(product1.id)
        expect(product1Output.name).toBe(product1.name)
        expect(product1Output.price).toBe(product1.price)
        expect(product2Output.id).toBe(product2.id)
        expect(product2Output.name).toBe(product2.name)
        expect(product2Output.price).toBe(product2.price)
    });
});
