const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const renames = [
  ['images/Конкуренты.webp', 'images/competitors.webp'],
  ['images/мы.webp', 'images/us.webp'],
  ['images/Экскаватор-погрузчик LGCE B879F Baner.webp', 'images/backhoe-lgce-b879f-banner.webp'],
  ['images/мини погрузчик lonking cdm308.webp', 'images/miniloader-lonking-cdm308.webp'],
  ['images/Экскаватор гусеничный LGCE E6255F.webp', 'images/excavator-crawler-lgce-e6255f.webp'],
  ['images/Погрузчик-экскаватор LGCE B877F.webp', 'images/backhoe-lgce-b877f.webp'],
  ['images/Погрузчик фронтальный LGCE L933F.webp', 'images/loader-lgce-l933f.webp'],
  ['images/Экскаватор ЕК-12.webp', 'images/excavator-ek12.webp'],
  ['images/card/Экскаватор-погрузчик LGCE B879F.webp', 'images/card/backhoe-lgce-b879f.webp'],
  ['images/card/Погрузчик фронтальный LGCE L933F.webp', 'images/card/loader-lgce-l933f.webp'],
  ['images/card/Погрузчик-экскаватор LGCE B877F.webp', 'images/card/backhoe-lgce-b877f-card.webp'],
  ['images/card/Экскаватор ЕК-12.webp', 'images/card/excavator-ek12.webp'],
  ['images/card/Экскаватор гусеничный LGCE E6255F.webp', 'images/card/excavator-crawler-lgce-e6255f.webp'],
  ['images/card/мини погрузчик lonking cdm308.webp', 'images/card/miniloader-lonking-cdm308.webp'],
  ['images/Cast/Дудорга А. А..webp', 'images/Cast/dudorga-a-a.webp'],
  ['images/Cast/Галуза А. Ю .webp', 'images/Cast/galuza-a-yu.webp'],
  ['images/Cast/Сковородкой С. С.webp', 'images/Cast/skovorodko-s-s.webp'],
  ['images/Cast/Дайнеко А.Н.webp', 'images/Cast/dayneko-a-n.webp'],
  ['images/Cast/Шимкус Максим Альгисович.webp', 'images/Cast/shimkus-maksim.webp'],
];

for (const [fromRel, toRel] of renames) {
  const from = path.join(root, fromRel);
  const to = path.join(root, toRel);
  if (!fs.existsSync(from)) {
    console.error('MISSING:', fromRel);
    continue;
  }
  if (fs.existsSync(to)) fs.unlinkSync(to);
  fs.renameSync(from, to);
  console.log('OK', path.basename(fromRel), '->', path.basename(toRel));
}
