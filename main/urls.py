from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from users.views import CustomTokenObtainPairView


urlpatterns = [

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('blog_api.urls', namespace='blog_api')),
    path('admin/', admin.site.urls),
    path('api/user/', include('users.urls', namespace='users')),
    path('', include('BLOG.urls', namespace='BLOG')),

]
