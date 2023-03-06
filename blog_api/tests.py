from django.test import TestCase

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from BLOG.models import Post, Category
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient

class TestPosts(APITestCase):

    
    def test_view_posts(self):

        url = reverse('blog_api:listpost')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_post(self):

        User = get_user_model()

        self.test_category = Category.objects.create(name='django')
        self.testuser1 = User.objects.create_superuser(
            user_name='test_user1', password='123456789', first_name='testuser1', email='testuser1@email.com'
        )

        self.client.login(user_name=self.testuser1.user_name, password='123456789')

        data = {"title": "new", "author":1,
        "excerpt":"new", "content": "new"}
        url = reverse('blog_api:createpost')

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)