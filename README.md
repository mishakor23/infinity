# Задача
Реализовать фронтенд часть бесконечной загрузки статей с бекенда.

# Детали
Данные получаются по апишке (описание ниже) после нажатия на кнопку Load More.
Если ответ успешный, то отобразить новые статьи.
Запрос успешный если код `200`:

```
[
    {
      "id": 1,
      "title": "Foo bar",
      "description": "Foo bar baz baz bar foo",
      "uri": "/foo/bar",
      "tags": ["foo", "bar", "baz"]
    },
    // etc
]
```

У каждой статьи должен быть список тегов из массива `tags`. Каждая статья имеет длинное описание, которое должно быть обрезано до пяти полных слов, после чего добавлено троеточие и элемент "Expand". По нажатию на Expand должно отобразиться полное описание и элемент "Collapse". По нажатию на Collapse описание должно быть вновь обрезано.
Если ответ с ошибкой (они будут выскакивать со случайной вероятностью), то в модальном окне отобразить соответствующую ошибку:

| Код | Сообщение |
|-----|-----------|
|400  |Произошла ошибка|
|401  |Пожалуйста, авторизуйтесь|
|403  |У вас нет доступа к ленте статей|
|500  |Внутренняя ошибка сервера, попробуйте позже|

Модальное окно может быть закрыто по нажатию на кнопку "Close" или по клику вне его.

Всю работу вести только в папке `public`

# Технические ограничения
Разрешается использовать лишь нативные JS, CSS, HTML. Любые фреймворки запрещены.
HTML5 и CSS3 будет плюсом.

# Описание API
`GET /api/v1/articles?limit=5` (будут загружены 5 статей, параметры приведены в качестве примера).

Если запрос успешный, код `200`:
```
[
    {
      "id": 1,
      "title": "Foo bar",
      "description": "Foo bar baz baz bar foo",
      "uri": "/foo/bar",
      "tags": ["foo", "bar", "baz"]
    },
    // etc
]
```

Если ошибка, HTTP код `400`/`401`/`403`/`500` без тела ответа.

# Запуск сервера

```sh
$ cd infinity-posts
$ npm install
$ npm start
```
Открыть в браузере [http://localhost:3000/](http://localhost:3000/)
