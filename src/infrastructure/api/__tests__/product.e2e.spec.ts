import {app, sequelize} from "../express";
import request from "supertest";

describe('E2E test for product', function () {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it('should create a product', async function () {
        const response = await request(app)
            .post('/product')
            .send({
                type: 'a',
                name: 'Product test',
                price: 123
            });
        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe('Product test');
        expect(response.body.price).toBe(123)
    });

    it('should not create a product', async function () {
        const response = await request(app)
            .post('/product')
            .send({
                type: 'incorrect',
            })

        expect(response.status).toBe(500)
    });

    it('should list all product', async function () {
        const response = await request(app)
            .post('/product')
            .send({
                type: 'a',
                name: 'Product test',
                price: 123
            });
        expect(response.status).toBe(200);

        const response1 = await request(app)
            .post('/product')
            .send({
                type: 'b',
                name: 'Product test 1',
                price: 1234
            });
        expect(response1.status).toBe(200);

        const listProductResponse = await request(app).get('/product').send();
        const [product1, product2] = [listProductResponse.body.products[0],listProductResponse.body.products[1]]
        expect(listProductResponse.status).toBe(200)
        expect(listProductResponse.body.products.length).toBe(2)

        expect(product1.name).toBe('Product test')
        expect(product1.price).toBe(123)

        expect(product2.name).toBe('Product test 1')
        expect(product2.price).toBe(2468)
    });
});
