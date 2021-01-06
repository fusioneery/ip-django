from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from .models import Video, People, Tag, Note, Note_Author, Video_Tag, Video_Note
from .resources import VideoResource, TagResource, PeopleResource, Video_TagResource, Video_NoteResource, NoteResource, \
    Note_AuthorResource


@admin.register(Video)
class VideoAdmin(ImportExportModelAdmin):
    resource_class = VideoResource


@admin.register(People)
class PeopleAdmin(ImportExportModelAdmin):
    resource_class = PeopleResource


@admin.register(Tag)
class TagAdmin(ImportExportModelAdmin):
    resource_class = TagResource


@admin.register(Video_Tag)
class Video_TagAdmin(ImportExportModelAdmin):
    resource_class = Video_TagResource


@admin.register(Video_Note)
class Video_NoteAdmin(ImportExportModelAdmin):
    resource_class = Video_NoteResource


@admin.register(Note)
class NoteAdmin(ImportExportModelAdmin):
    resource_class = NoteResource


@admin.register(Note_Author)
class Note_AuthorAdmin(ImportExportModelAdmin):
    resource_class = Note_AuthorResource
