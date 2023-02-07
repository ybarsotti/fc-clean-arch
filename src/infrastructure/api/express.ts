import express, {Express} from "express";
import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import {customerRoute, productRoute} from "./routes";
import ProductModel from "../product/repository/sequelize/product.model";

export const app: Express = express()
app.use(express.json());
app.use("/customer", customerRoute);
app.use("/product", productRoute)
export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    })

    sequelize.addModels([CustomerModel, ProductModel])
    await sequelize.sync();
}

setupDb().then(() => {
    console.log('Banco carregado.')
});
