"""Habit URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import settings
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# from ..views import index
# from "../frontend/views" 
# from ..frontend.views import index

# handler404 = 'backend.views.page_not_found'
# handler403 = 'backend.views.permission_denied_view'
# handler500 = 'backend.views.error_view'
 
urlpatterns = [
    path('admin/admin', admin.site.urls),
    path('', include('frontend.urls')),
    path('api/', include('backend.urls')),
]
# urlpatterns += ("r'^.*$'",index)
# urlpatterns(r'^.*$', TemplateView.as_view(), name="home")
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
