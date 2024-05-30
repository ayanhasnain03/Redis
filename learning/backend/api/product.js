export const getProduct =()=> new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            products: [
                {
                    id: 1,
                    name: "Product1",
                    price: 3999,
                },
            ],
        });
    }, 2000);
});
export const getProductById =(id)=> new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            products: [
                {
                    id: id,
                    name: "Product1",
                    price: 3999,
                },
            ],
        });
    }, 2000);
});
