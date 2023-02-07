import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUsecase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe('Integration test update product use case', function () {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async function () {
        await sequelize.close()
    });


    it('should update a product', async function () {
        const repository = new ProductRepository();
        const usecase = new UpdateProductUsecase(repository)
        const product = ProductFactory.create("a", "Product", 500)
        await repository.create(product);
        const input = {
            type: 'a',
            id: product.id,
            name: "Test",
            price: 300
        }
        const expectedOutput = {
            id: product.id,
            name: "Test",
            price: 300
        }

        const output = await usecase.execute(input);

        expect(output).toStrictEqual(expectedOutput)
    });
})
