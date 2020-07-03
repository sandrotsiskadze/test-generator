from django.urls import path
from . import views

app_name = 'generator'
urlpatterns = [
    path('', views.index, name='index'),
    path('graph/', views.graph, name='graph'),
    path('tree/', views.tree, name='tree'),
    path('flow_network/', views.flow_network, name='flow_network'),
    path('sequence/', views.sequence, name='sequence'),
    path('maze/', views.maze, name='maze'),
    path('string/', views.string_, name='string')
]
