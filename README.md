# Инженерное проектирование Абрамов В.Н. 181-322

## Используемые технологии

- Python 3
- Django
- DjangoRESTFramework

## Типовые запросы к БД:

1. `SELECT * FROM kinoview_video` - получаем список всех видео
2. `SELECT id, name FROM kinoview_tag WHERE is_genre` - получаем список всех категорий для видео
3. `SELECT note.id as id, title, body, posted, is_comment, author.name as author FROM kinoview_note note INNER JOIN kinoview_note_author author on note.author_id_id = author.id` - получаем список всех заметок (статей и комментариев) вместе с именами их авторов
4. `SELECT video.id as video_id, title, duration, people.name as producer FROM kinoview_video video INNER JOIN kinoview_people people on video.producer_id_id = people.id` - краткий список видео с продюсером
5. `SELECT video_note.video_id_id as video_id, video_note.note_id_id as note_id, note.title, note.body, note.posted FROM kinoview_video_note video_note INNER JOIN kinoview_note note on note_id = note.id WHERE video_id = 4` - получаем все статьи для определённого видео

## Ссылки

- [Github repo](https://github.com/fusioneery/ip-django)
- [FIT Link to test](http://ip-5-sem.std-670.ist.mospolytech.ru/)

## Пользователи для входа:

- Админ: vlad/vladvlad
- Пользователь (только просмотр данных): user/useruser
