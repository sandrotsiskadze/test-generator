from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import ast
import types
import string
import networkx as nx
from .structures import GraphStructure as gr
from .structures import TreeStructure as tr
from .structures import FlowNetwork as fn
from .structures import Sequence as sq
from .structures import Maze as mz
from .structures import String as st

# Create your views here.

result = []


@csrf_exempt
def graph(request):
    directed = False
    multi = False
    loop = False
    connected = False
    acyclic = False
    one_cycle = False
    complete = False
    bipartite = False
    vertex_weighted = False
    vertex_weight_range = (0, 10)
    edge_weighted = False
    edge_weight_range = (0, 10)
    vertex_count_range = (0, 10)
    edge_count_range = (0, 10)
    dict_str = request.body.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    if 'GraphType' in mydata:
        if '1' in mydata['GraphType']:
            directed = True
        if '2' in mydata['GraphType']:
            multi = True
        if '3' in mydata['GraphType']:
            loop = True
    if 'GraphKind' in mydata:
        if mydata['GraphKind'] == 2:
            connected = True
        elif mydata['GraphKind'] == 3:
            acyclic = True
        elif mydata['GraphKind'] == 4:
            one_cycle = True
        elif mydata['GraphKind'] == 5:
            complete = True
        elif mydata['GraphKind'] == 6:
            bipartite = True
    if 'VertexWeighted' in mydata:
        if mydata['VertexWeighted'] == 'on':
            vertex_weighted = True
    if 'VertexWeightFrom' in mydata and 'VertexWeightTo' in mydata:
        if mydata['VertexWeightFrom'] and mydata['VertexWeightTo']:
            vertex_weight_range = (
                int(mydata['VertexWeightFrom']), int(mydata['VertexWeightTo']))
    if 'EdgeWeighted' in mydata:
        if mydata['EdgeWeighted'] == 'on':
            edge_weighted = True
    if 'EdgeWeightFrom' in mydata and 'EdgeWeightTo' in mydata:
        if mydata['EdgeWeightFrom'] and mydata['EdgeWeightTo']:
            edge_weight_range = (
                int(mydata['EdgeWeightFrom']), int(mydata['EdgeWeightTo']))
    if 'VertexCountRangeFrom' in mydata and 'VertexCountRangeTo' in mydata:
        if mydata['VertexCountRangeFrom'] and mydata['VertexCountRangeTo']:
            vertex_count_range = (int(mydata['VertexCountRangeFrom']), int(
                mydata['VertexCountRangeTo']))
    if 'EdgeCountRangeFrom' in mydata and 'EdgeCountRangeTo' in mydata:
        if mydata['EdgeCountRangeFrom'] and mydata['EdgeCountRangeTo']:
            edge_count_range = (int(mydata['EdgeCountRangeFrom']), int(
                mydata['EdgeCountRangeTo']))

    g = gr.GraphStructure(directed, connected, acyclic, one_cycle, complete, bipartite, loop, multi, vertex_weighted,
                          vertex_weight_range, edge_weighted, edge_weight_range, vertex_count_range, edge_count_range)
    res = g.get_graph()

    if vertex_weighted:
        nodes = list(res.nodes.data('weight'))
    else:
        nodes = list(res.nodes)

    if edge_weighted:
        edges = list(res.edges.data('weight'))
    else:
        edges = list(res.edges)

    global result
    result = edges

    response = ''
    response += str(nx.number_of_nodes(res)) + '\n'
    response += str(nx.number_of_edges(res)) + '\n'
    if vertex_weighted:
        for node in nodes:
            response += str(node[1]) + '\n'
    for edge in edges:
        response += str(edge).strip('()').replace(',', '') + '\n'
    return HttpResponse(response)


@csrf_exempt
def tree(request):
    array = False
    connected = False
    binary = False
    balanced = False
    vertex_weighted = False
    vertex_weight_range = (0, 10)
    edge_weighted = False
    edge_weight_range = (0, 10)
    maximal_children_count = 10
    vertex_count_range = (0, 10)
    dict_str = request.body.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    if 'TreeType' in mydata:
        if mydata['TreeType'] == 2:
            connected = True
        elif mydata['TreeType'] == 3:
            binary = True
        elif mydata['TreeType'] == 4:
            balanced = True
    if 'ArrayBased' in mydata:
        if ['ArrayBased'] == 'on':
            array = True
    if 'VertexWeighted' in mydata:
        if mydata['VertexWeighted'] == 'on':
            vertex_weighted = True
    if 'VertexWeightFrom' in mydata and 'VertexWeightTo' in mydata:
        if mydata['VertexWeightFrom'] and mydata['VertexWeightTo']:
            vertex_weight_range = (
                int(mydata['VertexWeightFrom']), int(mydata['VertexWeightTo']))
    if 'EdgeWeighted' in mydata:
        if mydata['EdgeWeighted'] == 'on':
            edge_weighted = True
    if 'EdgeWeightFrom' in mydata and 'EdgeWeightTo' in mydata:
        if mydata['EdgeWeightFrom'] and mydata['EdgeWeightTo']:
            edge_weight_range = (
                int(mydata['EdgeWeightFrom']), int(mydata['EdgeWeightTo']))
    if 'VertexCountRangeFrom' in mydata and 'VertexCountRangeTo' in mydata:
        if mydata['VertexCountRangeFrom'] and mydata['VertexCountRangeTo']:
            vertex_count_range = (int(mydata['VertexCountRangeFrom']), int(
                mydata['VertexCountRangeTo']))
    if 'MaximalChildren' in mydata:
        if mydata['MaximalChildren']:
            maximal_children_count = int(mydata['MaximalChildren'])

    t = tr.TreeStructure(array, connected, binary, balanced, vertex_weighted, vertex_weight_range, edge_weighted, edge_weight_range,
                         maximal_children_count, vertex_count_range)
    res = t.get_tree()

    if vertex_weighted:
        nodes = list(res.nodes.data('weight'))
    else:
        nodes = list(res.nodes)

    if edge_weighted:
        edges = list(res.edges.data('weight'))
    else:
        edges = list(res.edges)

    global result
    result = edges

    response = ''
    response += str(nx.number_of_nodes(res)) + '\n'
    response += str(nx.number_of_edges(res)) + '\n'
    if vertex_weighted:
        for node in nodes:
            response += str(node[1]) + '\n'
    for edge in edges:
        response += str(edge).strip('()').replace(',', '') + '\n'
    return HttpResponse(response)


@csrf_exempt
def flow_network(request):
    capacity_range = (0, 10)
    vertex_count_range = (0, 10)
    edge_count_range = (0, 10)
    dict_str = request.body.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    if 'VertexCountRangeFrom' in mydata and 'VertexCountRangeTo' in mydata:
        if mydata['VertexCountRangeFrom'] and mydata['VertexCountRangeTo']:
            vertex_count_range = (int(mydata['VertexCountRangeFrom']), int(
                mydata['VertexCountRangeTo']))
    if 'EdgeCountRangeFrom' in mydata and 'EdgeCountRangeTo' in mydata:
        if mydata['EdgeCountRangeFrom'] and mydata['EdgeCountRangeTo']:
            edge_count_range = (int(mydata['EdgeCountRangeFrom']), int(
                mydata['EdgeCountRangeTo']))
    if 'MaximalWeight' in mydata:
        if mydata['MaximalWeight']:
            capacity_range = (0, int(mydata['MaximalWeight']))

    f = fn.FlowNetwork(capacity_range, vertex_count_range, edge_count_range)
    res = f.get_flow_network()

    edges = list(res[2].edges.data('weight'))

    global result
    result = edges

    response = ''
    response += str(nx.number_of_nodes(res[2])) + '\n'
    response += str(nx.number_of_edges(res[2])) + '\n'
    response += str(res[0]) + ' ' + str(res[1]) + '\n'
    for edge in edges:
        response += str(edge).strip('()').replace(',', '') + '\n'

    return HttpResponse(response)


@csrf_exempt
def sequence(request):
    element_count_range = (0, 10)
    element_value_range = (0, 10)
    permutation = False
    permutation_number = 5
    query = False
    query_count = 5
    dict_str = request.body.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    if 'ElementCountRangeFrom' in mydata and 'ElementCountRangeTo' in mydata:
        if mydata['ElementCountRangeFrom'] and mydata['ElementCountRangeTo']:
            element_count_range = (int(mydata['ElementCountRangeFrom']), int(
                mydata['ElementCountRangeTo']))
    if 'ElementValueRangeFrom' in mydata and 'ElementValueRangeTo' in mydata:
        if mydata['ElementValueRangeFrom'] and mydata['ElementValueRangeTo']:
            element_value_range = (int(mydata['ElementValueRangeFrom']), int(
                mydata['ElementValueRangeTo']))
    if 'Permutation' in mydata:
        if mydata['Permutation'] == 'on':
            permutation = True
    if 'PermutationNumber' in mydata:
        if mydata['PermutationNumber']:
            permutation_number = int(mydata['PermutationNumber'])
    if 'Query' in mydata:
        query = True
    if 'QueryCount' in mydata:
        if mydata['QueryCount']:
            query_count = int(mydata['QueryCount'])

    s = sq.Sequence(element_count_range, element_value_range,
                    permutation, permutation_number, query, query_count)
    res = s.get_sequence()

    global result
    result = res[0]

    response = ''
    response += str(len(res[0])) + '\n'
    for element in res[0]:
        response += str(element) + '\n'
    if res[1]:
        response += str(len(res[1])) + '\n'
        for element in res[1]:
            response += str(element).strip('()').replace(',', '') + '\n'

    return HttpResponse(response)


@csrf_exempt
def maze(request):
    width_range = (0, 10)
    height_range = (0, 10)
    path_symbol = 'O'
    wall_symbol = 'X'
    connected = False
    dict_str = request.body.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    if 'DimensionX' in mydata:
        if mydata['DimensionX']:
            height_range = (0, int(mydata['DimensionX']))
    if 'DimensionY' in mydata:
        if mydata['DimensionY']:
            width_range = (0, int(mydata['DimensionY']))
    if 'WallCharacter' in mydata:
        if mydata['WallCharacter']:
            wall_symbol = mydata['WallCharacter']
    if 'PathCharacter' in mydata:
        if mydata['PathCharacter']:
            path_symbol = mydata['PathCharacter']
    if 'Connected' in mydata:
        if mydata['Connected'] == 'on':
            connected = True

    m = mz.Maze(width_range, height_range, path_symbol, wall_symbol, connected)
    res = m.get_maze()

    global result
    result = res

    response = ''
    for i in range(len(res)):
        response += str(res[i]).strip('[]').replace(',', '') + '\n'

    return HttpResponse(response)


@csrf_exempt
def string_(request):
    element_count_range = (0, 10)
    alphabet = string.printable
    dict_str = request.body.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    if 'ElementCountRangeFrom' in mydata and 'ElementCountRangeTo' in mydata:
        if mydata['ElementCountRangeFrom'] and mydata['ElementCountRangeTo']:
            element_count_range = (int(mydata['ElementCountRangeFrom']), int(
                mydata['ElementCountRangeTo']))
    if 'Alphabet' in mydata:
        if mydata['Alphabet']:
            alphabet = mydata['Alphabet']

    s = st.String(element_count_range, alphabet)
    res = s.get_string()

    global result
    result = res

    response = ''
    response += str(len(res[0])) + '\n'
    response += res[0] + '\n'
    response += str(len(res[1])) + '\n'
    response += res[1] + '\n'

    return HttpResponse(response)


@csrf_exempt
def code(request):
    code = "def sandro(x):\n\treturn x**2"
    code_obj = compile(code, '<string>', 'exec')
    new_func = types.FunctionType(code_obj.co_consts[0], globals())
    print(list(map(new_func, result)))
    return HttpResponse('')


def index(request):
    # s = sq.Sequence(element_count_range=(9, 10), query=True, query_count=5)
    # string = "def sandro(x):\n\treturn x**2"
    # code_obj = compile(string, '<string>', 'exec')
    # new_func = types.FunctionType(code_obj.co_consts[0], globals())
    # print(list(map(new_func, s.get_sequence())))
    # s = st.String()
    # print(s.get_string())
    # f = fn.FlowNetwork()
    # result = f.get_flow_network()
    # print(result)
    return render(request, 'generator/index.html', {})
