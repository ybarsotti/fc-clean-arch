import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {InputListProductDto, OutputListProductDto} from "./list.product.dto";
import ProductInterface from "../../../domain/product/entity/product.interface";

export default class ListProductUsecase {
    constructor(private readonly productRepository: ProductRepositoryInterface) {
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        return OutputMapper.toOutput(await this.productRepository.findAll());
    }
}

class OutputMapper {
    static toOutput(products: Array<ProductInterface>): OutputListProductDto {
        return {
            products: products?.map(({id, name, price}) => ({
                id,
                name,
                price
            }))
        }
    }
}
