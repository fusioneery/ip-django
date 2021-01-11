from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models.functions import Lower


class People(models.Model):
    name = models.CharField(max_length=255)
    class Meta:
        verbose_name_plural = 'Люди'
    def __str__(self):
        return f"{self.name}"


class Video(models.Model):
    models.CharField.register_lookup(Lower, "lower")
    title = models.CharField(max_length=255)
    duration = models.PositiveSmallIntegerField()
    rating = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=3.5)
    issue_year = models.PositiveSmallIntegerField(blank=True)
    country = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    image = models.CharField(max_length=2048, blank=True)
    price = models.PositiveSmallIntegerField(default=0)
    video_url = models.CharField(max_length=2048, blank=True)
    relevant_ids = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='videos')
    producer_id = models.ForeignKey(People, on_delete=models.CASCADE, blank=True, null=True, related_name='people')

    def __str__(self):
        return f"{self.title}, {self.issue_year}"
    class Meta:
        verbose_name_plural = 'Видео'


class Video_Actors(models.Model):
    video_id = models.ForeignKey(Video, on_delete=models.CASCADE)
    people_id = models.ForeignKey(People, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.video_id.title}: {self.people_id.name}"
    class Meta:
        verbose_name_plural = 'Видео-Актёры'

class Tag(models.Model):
    name = models.CharField(max_length=255)
    is_genre = models.BooleanField(default=False)
    class Meta:
        verbose_name_plural = 'Теги'
    def __str__(self):
        if (self.is_genre):
            return f"Жанр: {self.name}"
        return f"{self.name}"


class Video_Tag(models.Model):
    video_id = models.ForeignKey(Video, on_delete=models.CASCADE)
    tag_id = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name='tags')
    class Meta:
        verbose_name_plural = 'Видео-Теги'
    def __str__(self):
        return f"{self.video_id.title}: {self.tag_id.name}"


class Note_Author(models.Model):
    name = models.CharField(max_length=255)
    class Meta:
        verbose_name_plural = 'Авторы заметок'
    def __str__(self):
        return f"{self.name}"


class Note(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField(blank=True)
    posted = models.DateTimeField(auto_now_add=True)
    is_comment = models.BooleanField(default=False)
    author_id = models.ForeignKey(Note_Author, on_delete=models.CASCADE, related_name='authors')
    class Meta:
        verbose_name_plural = 'Заметки'
    def __str__(self):
        if (self.is_comment):
            return f"Комментарий: {self.title}"
        return f"{self.title}"


class Video_Note(models.Model):
    note_id = models.ForeignKey(Note, on_delete=models.CASCADE, related_name='notes')
    video_id = models.ForeignKey(Video, on_delete=models.CASCADE)
    class Meta:
        verbose_name_plural = 'Видео-Заметки'
    def __str__(self):
        return f"{self.note_id.title}: {self.video_id.title}"
