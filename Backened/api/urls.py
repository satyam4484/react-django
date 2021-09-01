from django.db.models import base
from django.urls import path
from django.urls.conf import include 
from rest_framework.routers import DefaultRouter
from .views import Fetchdata

router = DefaultRouter()
router.register('getdata',Fetchdata,basename="getdata")
urlpatterns = [
    path('todo/',include(router.urls)),
]
