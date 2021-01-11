"""Admin actions"""
def make_genre(modeladmin, request, queryset):
    queryset.update(is_genre=True)
def unmake_genre(modeladmin, request, queryset):
    queryset.update(is_genre=False)

def make_comment(modeladmin, request, queryset):
    queryset.update(is_comment=True)
def unmake_comment(modeladmin, request, queryset):
    queryset.update(is_comment=False)