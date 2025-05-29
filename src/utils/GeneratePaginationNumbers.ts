
// [1,2,3,4,5,..., 7]
// [1,2,3,4,5,..., 48, 49, 50]

export const generatePaginationNumbers = (currentPage : number, totalPage : number) => {


    // Si el numero total de paginas es 7 o menos 
    // vamos a mostrar todas las paginas sin puntos suspensivos.
    if ( totalPage <= 7 ) {
        return Array.from({ length: totalPage}, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7]
    }

    // Si la pagina actual esta entre las primeras 3 paginas
    // mostrar las primeras 3, puntos suspensivos y las dos ultimas 
    if ( currentPage <= 3) {
        return [1, 2, 3, '...', totalPage -1, totalPage]; // [1, 2, 3, '...', 49, 50];
    }

    // Si la pagina actual esta entre las ultimas 3 paginas 
    // Mostrar las primeras 2, puntos suspensivos, las ultimas 3 paginas
    if ( currentPage >= totalPage - 2 ) {
        return [1,2, '...', totalPage - 2, totalPage - 1, totalPage];
    }

    //  Si la pagina actual esta en otro lugar medio 
    // Mostrar la primera pagina, puntos suspensivos, la pagin actual y vecinos
    return[
        1, 
        '...', 
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPage
    ]
}