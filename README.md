# **Front-End Project**
Этот проект предоставляет фронтенд-приложение на базе TypeScript и Vite, с использованием современных инструментов и плагинов для разработки, сборки и анализа.

## **Скрипты**
Для работы с проектом используются следующие команды в скриптах `package.json`:

### **1. Разработка**
- **`dev`**
  Запускает локальный сервер разработки Vite на порту `777`.
``` bash
  pnpm dev
```

### **2. Сборка**
- **`build`**
  Выполняет компиляцию TypeScript (`tsc`) и финальную сборку приложения через Vite.
  Результат сборки будет находиться в папке `dist`.
``` bash
  pnpm build
```
- **`To build on linux/Mac with dev env use commands:`**
``` bash 
 NODE_ENV=dev pnpm build 
```
- **`To build on Windows with dev env use commands:`**
``` bash 
set NODE_ENV=dev ; pnpm build
```

### **3. Превью (предпросмотр)**
- **`preview`**
  Запускает сервер предварительного просмотра контента из папки `dist`.
  Полезно для проверки финального бандла.
``` bash
  pnpm preview
```

### **4. Компиляция SCSS (в режиме отслеживания)**
- **`watch`**
  Компилирует файл стилей `styles/style.scss` в CSS и сохраняет его как `src/styles/style.css`.
  Подходит для разработки с отслеживанием изменений.
``` bash
  pnpm watch
```

### **5. Локальный просмотр собранного проекта**
- **`build:view` **
  Запускает HTTP-сервер для просмотра содержимого папки `dist` на порту `8080`.
``` bash
  pnpm build:view
```


## **Зависимости**
### **Основные:**
1. **`gsap`**
   Используется для сложной анимации на странице.
    - Официальный сайт: [greensock.com](https://greensock.com/)

2. **`pixi.js` **
   Фреймворк для построения интерактивной графики и управления элементами канваса.
    - Официальный сайт: [pixijs.com](https://pixijs.com/)


### **DevDependencies:**
1. **`vite`**
   Легкий и быстрый инструмент для разработки и сборки.
2. **`typescript`**
   Компиляция TypeScript в JavaScript.
3. **`sass`**
   Препроцессор CSS для работы со стилями в SCSS-формате.
4. **`rollup-plugin-visualizer` **
   Инструмент для анализа итогового бандла. Генерирует визуальный отчет.
   По умолчанию запускается, если `NODE_ENV=dev`.

## **Архитектура проекта**
### **1. Основные файлы:**
- **`main.ts` **
  Главный файл, в котором подключаются стили SCSS, создается экземпляр `GameManager`, инициализируется игровой процесс, если найден контейнер с ID `place-to-integrate`.
- **`index.html` **
  Основной HTML-шаблон проекта. В нем подключается `main.ts` и задается базовая структура страницы.

### **2. Стили:**
- **`styles/style.scss` **
  Основной SCSS-файл для стилизации приложения. Минимальный код с базовым стилем для всего экрана и `canvas`.

### **3. TSConfig:**
- Уровень строгости TypeScript установлен на максимально строгий (`strict: true`).
- Параметр `noUnusedLocals` помогает находить и удалять неиспользуемые локальные переменные.
- Целевой стандарт — `ES2020`.
- Модульная система — `ESNext`.

### **4. Структура сборки:**
Результат сборки будет находиться в папке `dist`, и все файлы будут минимизированы для производства. Бандл поддерживает:
- Формат `iife` для итогового скрипта.
- CSS будет встроен в JavaScript благодаря `vite-plugin-style-inject`.

### **5. Плагин visualizer**
Если сборка запускается в режиме `dev`:
- Плагин `rollup-plugin-visualizer` откроет анализатор бандла в браузере.
- Он покажет размеры файлов, включая сжатый (gzip) и Brotli форматы.


## **Установка**

### Шаг 1: Установка зависимостей

Убедитесь, что у вас установлен `pnpm`, и выполните:
``` bash
pnpm install
```

### Шаг 2: Запуск сервера разработки
Чтобы запустить локальный сервер разработки:
``` bash
pnpm dev
```

### Шаг 3: Финальная сборка
Для создания финального бандла:
``` bash
pnpm build
```

## **Особенности проекта**
1. Поддержка модульной разработки с TypeScript.
2. Предварительная обработка SCSS в финальный CSS.
3. Канвас для обработки 2D или 3D графики с использованием `pixi.js`.
4. Поддержка анимаций через `gsap`.
5. Встроенный анализатор бандла с отображением всех подключенных компонентов.
6. Динамическая генерация и минимизация HTML через `vite-plugin-html`.
7. Встроенная поддержка однофайловых сборок (если требуется).

## **Требования к окружению**
### Минимальные версии:
- **Node.js**: 18.0.0+
- **pnpm**: 8.0.0+

Убедитесь, что вы используете соответствующую версию Node.js для работы с пакетом.
