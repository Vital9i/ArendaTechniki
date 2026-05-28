/** Ключ API: https://developer.tech.yandex.ru/ (при необходимости) */
const YANDEX_MAPS_API_KEY = '';

const MAP_WORK_PERIODS = [
  'на объекте до 28 мая 2026',
  '12–20 мая 2026',
  '15–25 мая 2026',
  'до 5 июня 2026',
  '18–30 мая 2026',
  '10–22 мая 2026',
  'до 15 июня 2026',
  '20 мая — 3 июня 2026',
  '14–26 мая 2026',
  'до 1 июня 2026'
];

const MAP_PLACES = [
  { place: 'Минск', coords: [53.9045, 27.5615] },
  { place: 'Борисов', coords: [54.2279, 28.5050] },
  { place: 'Жодино', coords: [54.0983, 28.3401] },
  { place: 'Смолевичи', coords: [54.0280, 28.0897] },
  { place: 'Молодечно', coords: [54.3097, 26.8513] },
  { place: 'Дзержинск', coords: [53.6847, 27.1318] },
  { place: 'Логойск', coords: [54.2067, 27.8517] },
  { place: 'Фаниполь', coords: [53.7507, 27.3331] },
  { place: 'Солигорск', coords: [52.7868, 27.5334] },
  { place: 'Столбцы', coords: [53.4838, 26.7336] }
];

function shuffleArray(items) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function buildMapMarkers() {
  if (typeof FLEET === 'undefined') return [];

  const fleet = shuffleArray(FLEET);
  const periods = shuffleArray(MAP_WORK_PERIODS);

  return MAP_PLACES.map((item, index) => {
    const equipment = fleet[index % fleet.length];
    const jitter = 0.04;
    const lat = item.coords[0] + (Math.random() - 0.5) * jitter;
    const lon = item.coords[1] + (Math.random() - 0.5) * jitter;

    return {
      coords: [lat, lon],
      place: item.place,
      dates: periods[index % periods.length],
      equipmentName: equipment.name,
      image: equipment.image
    };
  });
}

function createBalloonHtml(marker) {
  return `
    <div class="map-balloon">
      <img class="map-balloon__img" src="${marker.image}" alt="${marker.equipmentName}">
      <p class="map-balloon__place">${marker.place}</p>
      <p class="map-balloon__dates">Сроки на объекте: ${marker.dates}</p>
    </div>
  `;
}

function initYandexMap() {
  const container = document.getElementById('yandexMap');
  if (!container || typeof ymaps === 'undefined') return;

  ymaps.ready(() => {
    const map = new ymaps.Map('yandexMap', {
      center: [53.75, 27.75],
      zoom: 8,
      controls: ['zoomControl', 'fullscreenControl']
    }, {
      suppressMapOpenBlock: true
    });

    map.behaviors.disable('scrollZoom');

    const markers = buildMapMarkers();

    markers.forEach(marker => {
      const placemark = new ymaps.Placemark(
        marker.coords,
        {
          balloonContentHeader: marker.equipmentName,
          balloonContentBody: createBalloonHtml(marker),
          hintContent: `${marker.place} — ${marker.dates}`
        },
        {
          preset: 'islands#yellowDotIcon'
        }
      );

      map.geoObjects.add(placemark);
    });

    if (map.geoObjects.getLength() > 1) {
      map.setBounds(map.geoObjects.getBounds(), {
        checkZoomRange: true,
        zoomMargin: 50
      });
    }
  });
}

function loadYandexMapsScript() {
  if (document.getElementById('yandexMapsScript')) {
    if (typeof ymaps !== 'undefined') initYandexMap();
    return;
  }

  const script = document.createElement('script');
  script.id = 'yandexMapsScript';
  script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU${YANDEX_MAPS_API_KEY ? `&apikey=${YANDEX_MAPS_API_KEY}` : ''}`;
  script.async = true;
  script.onload = initYandexMap;
  script.onerror = () => {
    const el = document.getElementById('yandexMap');
    if (el) {
      el.innerHTML = '<p class="map-section__fallback">Не удалось загрузить Яндекс.Карты. Проверьте подключение к интернету или укажите API-ключ в js/map.js</p>';
    }
  };
  document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', loadYandexMapsScript);
