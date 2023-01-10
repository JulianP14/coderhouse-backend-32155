type typeProd = {
    id: number;
    timestamp: any;
    title: string;
    description: string;
    code: string;
    photo: string;
    price: number;
    stock: number;
};

type typeCart = {
    id: number;
    timestamp: any;
    prods: typeProd[];
};

export { typeProd, typeCart}