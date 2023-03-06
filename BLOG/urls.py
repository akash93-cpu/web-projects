from django.urls import path
from django.views.generic import TemplateView

app_name = 'BLOG'

urlpatterns = [
    path('', TemplateView.as_view(template_name="BLOG/index.html")),
]