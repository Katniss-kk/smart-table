export function initSearching(searchField) {
    const searchComparator = (item, filters) => {
        const searchValue = filters[searchField];
        if (!searchValue) return true; // если поиск пуст, пропускаем проверку
        
        // Поля для поиска (замените на актуальные для вашей таблицы)
        const searchFields = ['date', 'customer', 'seller'];
        const searchTerm = searchValue.toLowerCase();
        
        // Ищем совпадение в любом из указанных полей
        return searchFields.some(field => {
            const fieldValue = String(item[field] || '').toLowerCase();
            return fieldValue.includes(searchTerm);
        });
    };

    return (query, state, action) => { // result заменили на query
    return state[searchField] ? Object.assign({}, query, { // проверяем, что в поле поиска было что-то введено
        search: state[searchField] // устанавливаем в query параметр
    }) : query; // если поле с поиском пустое, просто возвращаем query без изменений

    };
}