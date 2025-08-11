import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                          // Создаем элемент option
                          const option = document.createElement('option');
                          // Устанавливаем значение и текст
                          option.value = name;
                          option.textContent = name;
                          // Возвращаем созданный элемент
                          return option;
                      })
        )
      })

    return (data, state, action) => {
        // @todo: #4.2 проверьте наличие действия. Если это кнопка с именем clear...
document.addEventListener('click', function(event) {
  if (event.target && event.target.name === 'clear') {
    const button = event.target;
    const parent = button.closest('.filter-container'); // или другой подходящий родительский элемент
    const fieldName = button.dataset.field;
    
    if (parent && fieldName) {
      // Находим input в том же контейнере
      const input = parent.querySelector('input');
      
      if (input) {
        // Очищаем поле ввода
        input.value = '';
        
        // Очищаем соответствующее поле в state
        if (state.filters) {
          state.filters[fieldName] = ''; // или null, или undefined в зависимости от вашей логики
          
          // Можно вызвать функцию обновления состояния, если она есть
          if (typeof updateState === 'function') {
            updateState();
          }
        }
      }
    }
  }
});

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}