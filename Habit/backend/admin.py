from django.contrib import admin

from .models import Users, Optional, Habits, UserHabits, UserFriends

admin.site.register(Users)
admin.site.register(Optional)
admin.site.register(Habits)
admin.site.register(UserHabits)
admin.site.register(UserFriends)