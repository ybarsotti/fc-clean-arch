import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUsecase from "./create.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";


describe('Integration test create product use case', function () {
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

    it('should create a product', async function () {
        const input = {
            type: 'a',
            name: 'Product Test',
            price: 120,
        }

        const usecase = new CreateProductUsecase(new ProductRepository());
        const output = await usecase.execute(input)
        expect(output).toStrictEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        })
    });

    it('should throw an error when name is missing', async function () {
        const input = {
            type: 'a',
            name: 'Product Test',
            price: 120,
        }
        const usecase = new CreateProductUsecase(new ProductRepository());
        input.name = "";

        await expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrow("Name is required")
    });

    it('should throw an error when price is less than zero', async function () {
        const input = {
            type: 'a',
            name: 'Product Test',
            price: 120,
        }
        const usecase = new CreateProductUsecase(new ProductRepository());
        input.price = -100;

        await expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrow("Price must be greater than zero")
    });
});
