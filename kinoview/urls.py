from django.contrib import admin
from django.urls import path, include
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as djangofilters
from rest_framework import routers, serializers, viewsets, filters, generics

from .models import Video, Tag, Note, People, Video_Tag, Video_Note, Video_Actors, Note_Author

class PeopleSerializer(serializers.ModelSerializer):
    class Meta:
        model = People
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class Video_ActorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video_Actors
        fields = '__all__'

class VideoSerializer(serializers.ModelSerializer):
    producer_id = PeopleSerializer()
    class Meta:
        model = Video
        fields = '__all__'

class Note_AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note_Author
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):
    author_id = Note_AuthorSerializer()
    class Meta:
        model = Note
        fields = '__all__'

class Video_TagSerializer(serializers.ModelSerializer):
    video_id = VideoSerializer()
    tag_id = TagSerializer()
    class Meta:
        model = Video_Tag
        fields = '__all__'

class Video_NoteSerializer(serializers.ModelSerializer):
    video_id = VideoSerializer()
    note_id = NoteSerializer()
    class Meta:
        model = Video_Note
        fields = '__all__'

class VideoFilter(djangofilters.FilterSet):
    min_price = djangofilters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = djangofilters.NumberFilter(field_name="price", lookup_expr='lte')
    min_duration = djangofilters.NumberFilter(field_name="duration", lookup_expr='gte')
    max_duration = djangofilters.NumberFilter(field_name="duration", lookup_expr='lte')
    min_issue_year = djangofilters.NumberFilter(field_name="issue_year", lookup_expr='gte')
    max_issue_year = djangofilters.NumberFilter(field_name="issue_year", lookup_expr='lte')
    min_rating = djangofilters.NumberFilter(field_name="rating", lookup_expr='gte')
    max_rating = djangofilters.NumberFilter(field_name="rating", lookup_expr='lte')
    class Meta:
        model = Video
        fields = ['country', 'producer_id__name']

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_class = VideoFilter
    search_fields = ['title']

class Video_TagViewSet(viewsets.ModelViewSet):
    queryset = Video_Tag.objects.all()
    serializer_class = Video_TagSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['tag_id__name', 'tag_id__is_genre']

class Video_NoteViewSet(viewsets.ModelViewSet):
    queryset = Video_Note.objects.all()
    serializer_class = Video_NoteSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['note_id__author_id__name', 'note_id__is_comment', 'video_id__id']

router = routers.DefaultRouter()

router.register(r'videos', VideoViewSet)
router.register(r'tags', Video_TagViewSet)
router.register(r'notes', Video_NoteViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', admin.site.urls)
]