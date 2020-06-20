from django.shortcuts import render
from .structures import Sequence as sq
import types
from .structures import String as st
from .structures import GraphStructure as gr

# Create your views here.


def graph(request):
    g = gr.GraphStructure()
    edges = g.get_graph()
    return render(request, 'generator/index.html', {'sandro': edges})


def index(request):
    # s = sq.Sequence(element_count_range=(9, 10), query=True, query_count=5)
    # string = "def sandro(x):\n\treturn x**2"
    # code_obj = compile(string, '<string>', 'exec')
    # new_func = types.FunctionType(code_obj.co_consts[0], globals())
    # print(list(map(new_func, s.get_sequence())))
    # s = st.String()
    # print(s.get_string())
    return render(request, 'generator/index.html', {})
