


export const currencyFormat = ( value : number) => {

    return value.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' });
}