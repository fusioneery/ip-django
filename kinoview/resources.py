from import_export import resources
from .models import Tag, Video_Tag, Video, Video_Note, Video_Actors, Note, Note_Author, People


class VideoResource(resources.ModelResource):
    class Meta:
        model = Video


class TagResource(resources.ModelResource):
    class Meta:
        model = Tag


class PeopleResource(resources.ModelResource):
    class Meta:
        model = People

class Video_TagResource(resources.ModelResource):
    class Meta:
        model = Video_Tag


class Video_NoteResource(resources.ModelResource):
    class Meta:
        model = Video_Note


class Video_ActorsResource(resources.ModelResource):
    class Meta:
        model = Video_Actors


class Note_AuthorResource(resources.ModelResource):
    class Meta:
        model = Note_Author


class NoteResource(resources.ModelResource):
    class Meta:
        model = Note
