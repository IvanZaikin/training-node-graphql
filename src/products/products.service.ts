import { Product } from './products.model';

export class ProductsService {
    public products: Product[] = [];

    public get configTypeDefs(): string {
        let typeDefs: string = `
            type Product {
                id: Int,
                name: String,
                description: String,
                price: Int
            }
        `;
        typeDefs += `
            extend type Query {
                products: [Product]
            }
        `;
        typeDefs += `
            extend type Mutation {
                product(id: Int, name: String, description: String, price: Int): Product!
            }
        `;

        return typeDefs;
    }

    public configResolvers(resolvers: any): void {
        resolvers.Query.products = () => this.products;
        resolvers.Mutation.product = (_: any, product: Product) => {
            this.products.push(product);
            return product;
        }
    }
}