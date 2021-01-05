from django.contrib import admin

from .models import Video, People, Tag, Note, Note_Author, Video_Tag, Video_Note

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    pass

@admin.register(People)
class PeopleAdmin(admin.ModelAdmin):
    pass

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass

@admin.register(Video_Tag)
class Video_TagAdmin(admin.ModelAdmin):
    pass

@admin.register(Video_Note)
class Video_NoteAdmin(admin.ModelAdmin):
    pass

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    pass

@admin.register(Note_Author)
class Note_AuthorAdmin(admin.ModelAdmin):
    pass