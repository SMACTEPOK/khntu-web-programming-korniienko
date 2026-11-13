import { CATEGORIES } from '../../config/categories'

export const products = [
  {
    id: 1,
    name: "Гончарна ваза «Лаванда»",
    price: 450,
    image: "/src/assets/product-placeholder.svg",
    category: CATEGORIES.CERAMICS,
    stock: 12
  },
  {
    id: 2,
    name: "В'язаний плед «Осінь»",
    price: 1200,
    image: "/src/assets/product-placeholder.svg",
    category: CATEGORIES.TEXTILES,
    stock: 4
  },
  {
    id: 3,
    name: "Дерев'яна шкатулка",
    price: 680,
    image: "/src/assets/product-placeholder.svg",
    category: CATEGORIES.WOOD,
    stock: 0
  },
  {
    id: 4,
    name: "Керамічна тарілка з розписом",
    price: 320,
    image: "/src/assets/product-placeholder.svg",
    category: CATEGORIES.CERAMICS,
    stock: 8
  },
  {
    id: 5,
    name: "Свічка соєва «Лаванда і м'ята»",
    price: 180,
    image: "/src/assets/product-placeholder.svg",
    category: CATEGORIES.CANDLES,
    stock: 0
  },
];
