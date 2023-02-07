import {Sequelize} from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUsecase from "./find.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe('Test integration find product use case', function () {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })
        await sequelize.addModels([ProductModel]);
        await sequelize.sync()
    })

    afterEach(async function () {
        await sequelize.close()
    });

    it('should find a product', async function () {
        const repository = new ProductRepository();
        const usecase = new FindProductUsecase(repository);
        const product = ProductFactory.create("a", "Product A", 1);
        await repository.create(product);

        const input = {
            id: product.id,
        }

        const output = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const result = await usecase.execute(input);
        expect(result).toStrictEqual(output)
    });

    it('should not find a product', async function () {
        const repository = new ProductRepository();
        const usecase = new FindProductUsecase(repository);

        await expect(() => usecase.execute({id: "abc"})).rejects.toThrow("Product not found")
    });
})
