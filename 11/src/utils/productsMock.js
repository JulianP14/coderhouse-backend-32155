import { faker, FakerError } from "@faker-js/faker";
    faker.locale = "es";

let prods = [];

export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.abstract(),
    };
};

export const createProductsMock = (Q) => {
    prods.length = 0;
        for( let i = 0; i < Q ; i++ ){
            const prod = generateProduct();
            prod.id = i + 1;
            prods.push(prod);
        };
    return prods;
};