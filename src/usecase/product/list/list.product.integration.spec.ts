import {Sequelize} from "sequelize-typescript";
import ListProductUsecase from "./list.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe('Integration Test list product use case', function () {
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

    it('should list products', async function () {
        const productRepository = new ProductRepository()
        const usecase = new ListProductUsecase(productRepository);
        const product = ProductFactory.create("a", "Product A", 1);
        await productRepository.create(product);

        const output = await usecase.execute({});
        const product1 = output.products[0];
        expect(output.products.length).toBe(1);
        expect(product1.id).toBe(product.id);
        expect(product1.name).toBe(product.name);
        expect(product1.price).toBe(product.price)
    });
});
