from rest_framework import viewsets
from .models import post
from .serializers import todoSerializer
# Create your views here.
class Fetchdata(viewsets.ModelViewSet):
    queryset = post.objects.all()
    serializer_class = todoSerializer