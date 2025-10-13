// Ждем, пока API Яндекс.Карт будет готово
ymaps.ready(init);

function init() {
    // Координаты для Москвы
    const mapCenter = [55.7558, 37.6173];

    // Создание экземпляра карты
    const myMap = new ymaps.Map("yandex-map", {
        center: mapCenter,
        zoom: 15,
        controls: ['zoomControl', 'fullscreenControl']
    });

    // Создание метки
    const myPlacemark = new ymaps.Placemark(mapCenter, {
        balloonContentHeader: 'ООО "ДИАВЕР"',
        balloonContentBody: '<strong>Адрес:</strong> Москва, ул. Примерная, д. 123<br><strong>Бизнес-центр "ТехноПарк"</strong>',
        balloonContentFooter: 'Ждем вас в нашем офисе!',
        hintContent: 'Наш офис'
    }, {
        preset: 'islands#blueDotIcon',
        iconColor: '#2563eb'
    });

    // Добавление метки на карту
    myMap.geoObjects.add(myPlacemark);

    // Отключаем масштабирование колесиком мыши
    myMap.behaviors.disable('scrollZoom');
    
    console.log('Карта Яндекс инициализирована');
}

// Обработка ошибок загрузки карты
ymaps.ready().then(() => {
    console.log('Yandex Maps API loaded successfully');
}).catch(error => {
    console.error('Error loading Yandex Maps API:', error);
});