# Инженерное проектирование Абрамов В.Н. 181-322

## Используемые технологии

- Python 3
- Django
- DjangoRESTFramework

## Как запустить

1. Установить python>=3
2. Установить зависимости
3. python manage.py makemigrations
4. python manage.py makemigrations kinoview
5. python manage.py loaddata db_dump.json
6. python manage.py runserver

## Типовые запросы к БД:

1. `SELECT video.id as video_id, title, duration, image, tag.name as tag_name FROM kinoview_video_tag video_tag INNER JOIN kinoview_video video on video_tag.video_id_id = video.id INNER JOIN kinoview_tag tag on video_tag.tag_id_id = tag.id WHERE tag_name = 'новый год'` - получаем подборку фильмов по тегу
2. `SELECT id, name FROM kinoview_tag WHERE is_genre` - получаем список всех категорий для видео
3. `SELECT note.id as id, title, body, posted, is_comment, author.name as author FROM kinoview_note note INNER JOIN kinoview_note_author author on note.author_id_id = author.id` - получаем список всех заметок (статей и комментариев) вместе с именами их авторов
4. `SELECT video.id as video_id, title, duration, people.name as producer FROM kinoview_video video INNER JOIN kinoview_people people on video.producer_id_id = people.id` - краткий список видео с продюсером
5. `SELECT video_note.video_id_id as video_id, video_note.note_id_id as note_id, note.title, note.body, note.posted FROM kinoview_video_note video_note INNER JOIN kinoview_note note on note_id = note.id WHERE video_id = 4` - получаем все статьи для определённого видео

## Ссылки

- [Github repo](https://github.com/fusioneery/ip-django)
- [Landing](http://ip-5-sem-landing.std-670.ist.mospolytech.ru/)
- [FIT Link to Admin panel (CRUD)](http://ip-6.std-670.ist.mospolytech.ru/)
- [FIT Link to Frontend](http://ip-6-front.std-670.ist.mospolytech.ru/)

## Пользователи для входа:

- Админ: vlad/vladvlad
- Пользователь (только просмотр данных): user/useruser
