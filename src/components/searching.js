import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const searchComparator = (item, filters) => {
        const searchValue = filters[searchField];
        if (!searchValue) return true; // если поиск пуст, пропускаем проверку
        
        // Поля для поиска (замените на актуальные для вашей таблицы)
        const searchFields = ['date', 'customer', 'seller'];
        const searchTerm = searchValue.toLowerCase();
        
        return searchFields.some(field => {
            const fieldValue = String(item[field] || '').toLowerCase();
            return fieldValue.includes(searchTerm);
        });
    };

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        if (action.type === 'filter') {
            const searchValue = state.filters[searchField];
            
            // Пропускаем поиск если поле пустое (skipEmptyTargetValues)
            if (!searchValue) return data;
            
            // Фильтруем данные с помощью компаратора
            return data.filter(item => searchComparator(item, state.filters));
        }
        
        return data;
    };
}