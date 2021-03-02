from django.urls import path, include
from .views import index, Login, Register, activeSession, userIdValid, getUserHabits, getUserOptionals, getFriends, filterFriends, getLeaderboard

urlpatterns = [
    path('users', index.as_view()),
    path('login', Login.as_view()),
    path('register', Register.as_view()),
    path('activeSession', activeSession.as_view()),
    path('userIdValid', userIdValid.as_view()),
    path('getUserHabits', getUserHabits.as_view()),
    path('getUserOptionals', getUserOptionals.as_view()),
    path('getFriends', getFriends.as_view()),
    path('filterFriends', filterFriends.as_view()),
    path('getLeaderboard', getLeaderboard.as_view()),
]
