import logging
from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from django.urls import reverse
from django.utils.http import urlencode
from django.utils.html import format_html

from .models import Video, People, Tag, Note, Note_Author, Video_Tag, Video_Note
from .resources import VideoResource, TagResource, PeopleResource, Video_TagResource, Video_NoteResource, NoteResource, \
    Note_AuthorResource
from .actions import make_genre, unmake_comment, unmake_genre, make_comment


@admin.register(Video)
class VideoAdmin(ImportExportModelAdmin):
    resource_class = VideoResource
    def producer_id(self, obj):
        logging.info('self', self)
        logging.info('obj', obj)
        url = (
            reverse("admin:kinoview_peoples_change")
            + "?"
            + urlencode({"id": f"{obj.id}"})
        )
        return format_html('<a href="{}">{}</a>', url, name)
    list_display=['title','issue_year', 'country','duration', 'rating', 'price', 'producer_id']
    search_fields=["title__lower__contains"]


@admin.register(People)
class PeopleAdmin(ImportExportModelAdmin):
    resource_class = PeopleResource


@admin.register(Tag)
class TagAdmin(ImportExportModelAdmin):
    resource_class = TagResource
    actions=[make_genre, unmake_genre]
    list_filter=["is_genre"]


@admin.register(Video_Tag)
class Video_TagAdmin(ImportExportModelAdmin):
    resource_class = Video_TagResource
    list_display=['tag_id', 'video_id']
    list_display_links=['tag_id', 'video_id']


@admin.register(Video_Note)
class Video_NoteAdmin(ImportExportModelAdmin):
    resource_class = Video_NoteResource
    list_display=['note_id', 'video_id']
    list_display_links=['note_id', 'video_id']

@admin.register(Note)
class NoteAdmin(ImportExportModelAdmin):
    resource_class = NoteResource
    actions=[make_comment, unmake_comment]
    list_filter=["is_comment"]


@admin.register(Note_Author)
class Note_AuthorAdmin(ImportExportModelAdmin):
    resource_class = Note_AuthorResource