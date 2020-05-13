from django.shortcuts import render
from .structures import GraphStructure as gr

# Create your views here.


def index(request):
    g = gr.GraphStructure()
    edges = g.get_graph()
    print(edges)
    return render(request, 'generator/index.html', {})
