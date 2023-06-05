

export default function cartReducer(state, action) {
    switch (action.type) {
        case 'add':
            
            return [...state, action.payload];


        case 'remove':
            return state.filter((product) => {
                return product.productID !== action.payload?.productID
            });
            
        case 'clear':
            return [];
        default:
            return state;
    }
}
