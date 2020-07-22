from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import ast
import types
import string
from functools import reduce
import networkx as nx
from .structures import GraphStructure as gr
from .structures import TreeStructure as tr
from .structures import FlowNetwork as fn
from .structures import Sequence as sq
from .structures import Maze as mz
from .structures import String as st
from .structures import CoordinateSpace as cs

# Create your views here.

filter_data = []
map_data = []
reduce_data = []
answer_data = ()
is_str = False
is_arr_tree = False
is_maze = False


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

    g_struct = gr.GraphStructure(directed, connected, acyclic, one_cycle, complete, bipartite, loop, multi, vertex_weighted,
                                 vertex_weight_range, edge_weighted, edge_weight_range, vertex_count_range, edge_count_range)
    res = g_struct.get_graph()

    g = res

    node_weights = []
    if vertex_weighted:
        nodes = list(g.nodes.data('weight'))
        for node in nodes:
            node_weights.append(node[1])
    else:
        nodes = list(g.nodes)

    if edge_weighted:
        if multi and (not one_cycle and not complete):
            edges = list(g.edges.data('weight', keys=False))
        else:
            edges = list(g.edges.data('weight'))
    else:
        if multi and (not one_cycle and not complete):
            edges = list(g.edges(keys=False))
        else:
            edges = list(g.edges)

    vertex_count = len(nodes)
    edge_count = len(edges)

    response = ''
    response += str(vertex_count) + '\n'
    response += str(edge_count) + '\n'
    if vertex_weighted:
        for node in node_weights:
            response += str(node) + '\n'
    for edge in edges:
        response += str(edge).strip('()').replace(',', '') + '\n'

    global filter_data
    filter_data = edges
    global map_data
    map_data = edges
    global reduce_data
    reduce_data = edges
    global answer_data
    if vertex_weighted:
        answer_data = (vertex_count, edge_count, node_weights, edges)
    else:
        answer_data = (vertex_count, edge_count, edges)
    global is_str
    is_str = False
    global is_arr_tree
    is_arr_tree = False
    global is_maze
    is_maze = False

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
        if mydata['ArrayBased'] == 'on':
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

    t_struct = tr.TreeStructure(array, connected, binary, balanced, vertex_weighted, vertex_weight_range, edge_weighted, edge_weight_range,
                                maximal_children_count, vertex_count_range)
    res = t_struct.get_tree()

    t = res[0]
    arr = res[1]

    node_weights = []
    if vertex_weighted:
        nodes = list(t.nodes.data('weight'))
        for node in nodes:
            node_weights.append(node[1])
    else:
        nodes = list(t.nodes)

    if edge_weighted:
        edges = list(t.edges.data('weight'))
    else:
        edges = list(t.edges)

    vertex_count = len(nodes)
    edge_count = len(edges)

    response = ''
    response += str(vertex_count) + '\n'
    if arr:
        response += str(len(arr)) + '\n'
        response += str(arr).strip('[]').replace(',', '')
    else:
        response += str(edge_count) + '\n'
        if vertex_weighted:
            for node in node_weights:
                response += str(node) + '\n'
        for edge in edges:
            response += str(edge).strip('()').replace(',', '') + '\n'

    global filter_data
    global map_data
    global reduce_data
    global answer_data
    if arr:
        filter_data = arr
        map_data = arr
        reduce_data = arr
        answer_data = (vertex_count, len(arr), arr)
    else:
        if vertex_weighted:
            filter_data = edges
            map_data = edges
            reduce_data = edges
            answer_data = (vertex_count, edge_count, node_weights, edges)
        else:
            filter_data = edges
            map_data = edges
            reduce_data = edges
            answer_data = (vertex_count, edge_count, edges)
    global is_str
    is_str = False
    global is_arr_tree
    is_arr_tree = True if arr else False
    global is_maze
    is_maze = False

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

    f_struct = fn.FlowNetwork(
        capacity_range, vertex_count_range, edge_count_range)
    res = f_struct.get_flow_network()

    source = res[0]
    sink = res[1]
    f = res[2]

    nodes = list(f.nodes)

    edges = list(f.edges.data('weight'))

    vertex_count = len(nodes)
    edge_count = len(edges)

    response = ''
    response += str(vertex_count) + '\n'
    response += str(edge_count) + '\n'
    response += str(source) + ' ' + str(sink) + '\n'
    for edge in edges:
        response += str(edge).strip('()').replace(',', '') + '\n'

    global filter_data
    filter_data = edges
    global map_data
    map_data = edges
    global reduce_data
    reduce_data = edges
    global answer_data
    answer_data = (vertex_count, edge_count, source, sink, edges)
    global is_str
    is_str = False
    global is_arr_tree
    is_arr_tree = False
    global is_maze
    is_maze = False

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

    s_struct = sq.Sequence(element_count_range, element_value_range,
                           permutation, permutation_number, query, query_count)
    res = s_struct.get_sequence()

    s = res[0]
    q = res[1]

    element_count = len(s)
    new_query_count = len(q)

    response = ''
    response += str(element_count) + '\n'
    for element in s:
        response += str(element) + '\n'
    if q:
        response += str(query_count) + '\n'
        for element in q:
            response += str(element).strip('()').replace(',', '') + '\n'

    global filter_data
    filter_data = s
    global map_data
    map_data = s
    global reduce_data
    reduce_data = s
    global answer_data
    if q:
        answer_data = (element_count, s, new_query_count, q)
    else:
        answer_data = (element_count, s)
    global is_str
    is_str = False
    global is_arr_tree
    is_arr_tree = False
    global is_maze
    is_maze = False

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
    if 'DimensionXFrom' in mydata and 'DimensionXTo' in mydata:
        if mydata['DimensionXFrom'] and mydata['DimensionXTo']:
            width_range = (int(mydata['DimensionXFrom']), int(
                mydata['DimensionXTo']))
    if 'DimensionYFrom' in mydata and 'DimensionYTo' in mydata:
        if mydata['DimensionYFrom'] and mydata['DimensionYTo']:
            height_range = (int(mydata['DimensionYFrom']),
                            int(mydata['DimensionYTo']))
    if 'WallCharacter' in mydata:
        if mydata['WallCharacter']:
            wall_symbol = mydata['WallCharacter']
    if 'PathCharacter' in mydata:
        if mydata['PathCharacter']:
            path_symbol = mydata['PathCharacter']
    if 'Connected' in mydata:
        if mydata['Connected'] == 'on':
            connected = True

    m_struct = mz.Maze(width_range, height_range,
                       path_symbol, wall_symbol, connected)
    res = m_struct.get_maze()

    m = res

    width = len(m[0])
    height = len(m)

    response = ''
    response += str(width) + '\n'
    response += str(height) + '\n'
    for i in m:
        response += str(i).strip('[]').replace(',',
                                               '').replace(' ', '').replace('\'', '') + '\n'

    global filter_data
    filter_data = m
    global map_data
    map_data = m
    global reduce_data
    reduce_data = m
    global answer_data
    answer_data = (width, height, m)
    global is_str
    is_str = False
    global is_arr_tree
    is_arr_tree = False
    global is_maze
    is_maze = True

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

    s_struct = st.String(element_count_range, alphabet)
    res = s_struct.get_string()

    s = res

    element_count = len(s)
    alphabet_count = len(alphabet)

    response = ''
    response += str(alphabet_count) + '\n'
    response += alphabet + '\n'
    response += str(element_count) + '\n'
    response += s + '\n'

    global filter_data
    filter_data = s
    global map_data
    map_data = s
    global reduce_data
    reduce_data = s
    global answer_data
    answer_data = (alphabet_count, alphabet, element_count, s)
    global is_str
    is_str = True
    global is_arr_tree
    is_arr_tree = False
    global is_maze
    is_maze = False

    return HttpResponse(response)


@csrf_exempt
def coordinate_space(request):
    width_range = (0, 10)
    height_range = (0, 10)
    vector_count_range = (0, 10)
    dict_str = request.body.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    if 'DimensionXFrom' in mydata and 'DimensionXTo' in mydata:
        if mydata['DimensionXFrom'] and mydata['DimensionXTo']:
            width_range = (int(mydata['DimensionXFrom']),
                           int(mydata['DimensionXTo']))
    if 'DimensionYFrom' in mydata and 'DimensionYTo' in mydata:
        if mydata['DimensionYFrom'] and mydata['DimensionYTo']:
            height_range = (int(mydata['DimensionYFrom']),
                            int(mydata['DimensionYTo']))
    if 'VectorCountFrom' in mydata and 'VectorCountTo' in mydata:
        if mydata['VectorCountFrom'] and mydata['VectorCountTo']:
            vector_count_range = (int(mydata['VectorCountFrom']),
                                  int(mydata['VectorCountTo']))

    c_struct = cs.CoordinateSpace(
        width_range, height_range, vector_count_range)
    res = c_struct.get_vectors()

    c = res

    vectors = list(c.edges)

    vector_count = len(vectors)

    response = ''
    response += str(vector_count) + '\n'
    for vector in vectors:
        response += str(vector).strip('()').replace(',', '') + '\n'

    global filter_data
    filter_data = vectors
    global map_data
    map_data = vectors
    global reduce_data
    reduce_data = vectors
    global answer_data
    answer_data = (vector_count, vectors)
    global is_str
    is_str = False
    global is_arr_tree
    is_arr_tree = False
    global is_maze
    is_maze = False

    return HttpResponse(response)


@csrf_exempt
def code(request):
    dict_str = request.body.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    code = ''
    if 'UserCode' in mydata:
        code = mydata['UserCode']
    try:
        code_obj = compile(code, '<string>', 'exec')
    except Exception as e:
        return HttpResponse(str(e))
    new_func = types.FunctionType(code_obj.co_consts[0], globals())
    res = None
    if 'UserChoice' in mydata:
        if mydata['UserChoice'] == '1':
            try:
                res = list(map(new_func, map_data))
            except Exception as e:
                return HttpResponse(e)
        elif mydata['UserChoice'] == '2':
            try:
                res = list(filter(new_func, filter_data))
            except Exception as e:
                return HttpResponse(e)
        elif mydata['UserChoice'] == '3':
            try:
                res = reduce(new_func, reduce_data)
            except Exception as e:
                return HttpResponse(e)
        else:
            try:
                res = new_func(answer_data)
            except Exception as e:
                return HttpResponse(e)

    response = ''
    if mydata['UserChoice'] == '3' or mydata['UserChoice'] == '4':
        response = str(res)
    else:
        if is_maze:
            for i in res:
                response += str(i).strip('[]').replace(',',
                                                    '').replace(' ', '').replace('\'', '') + '\n'
        elif is_arr_tree:
            response += str(res).strip('[]').replace(',', '')
        else:
            for x in res:
                response += str(x) if is_str else str(x).strip(
                    '()').strip('[]').replace(',', '') + '\n'

    return HttpResponse(response)


def index(request):
    return render(request, 'generator/index.html', {})
