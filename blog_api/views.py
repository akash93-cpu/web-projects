from rest_framework import generics
from BLOG.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions, AllowAny
from rest_framework import viewsets
from rest_framework import filters
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions


    
class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only.'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


class PostList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    serializer_class = PostSerializer
    queryset = Post.objects.all()

    # permission_classes = [IsAuthenticated]
    # serializer_class = PostSerializer

    # def get_queryset(self):
    #     user = self.request.user
    #     return Post.objects.filter(author=user)

class PostDetail(generics.RetrieveAPIView):

    serializer_class = PostSerializer

    def get_object(self, queryset=None, **kwargs):

        item = self.kwargs.get('pk')
        return get_object_or_404(Post, slug=item)

    # def get_queryset(self):
    #     slug = self.request.query_params.get('slug', None)
    #     print(slug)
    #     return Post.objects.filter(slug=slug)

class PostListDetailfilter(generics.ListAPIView):

    permission_classes = [permissions.IsAuthenticated]

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']

# class PostSearch(generics.ListAPIView):
#     permission_classes = [AllowAny]
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['^slug']

class CreatePost(generics.CreateAPIView):

    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class AdminPostDetail(generics.RetrieveAPIView):

    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class EditPost(generics.RetrieveUpdateAPIView, PostUserWritePermission):

    permission_classes = [PostUserWritePermission]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

class DeletePost(generics.RetrieveDestroyAPIView):

    permission_classes = [permissions.IsAdminUser]
    serializer_class = PostSerializer
    queryset = Post.objects.all()


