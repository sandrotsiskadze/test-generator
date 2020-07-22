import networkx as nx
import random


class TreeStructure:
    def __init__(self, array=False, connected=False, binary=False, balanced=False, vertex_weighted=False, vertex_weight_range=(0, 10),
                 edge_weighted=False, edge_weight_range=(0, 10), maximal_children_count=10, vertex_count_range=(0, 10)):
        self.array = array
        self.connected = connected
        self.binary = binary
        self.balanced = balanced
        self.vertex_weighted = vertex_weighted
        self.vertex_weight_range = vertex_weight_range
        self.edge_weighted = edge_weighted
        self.edge_weight_range = edge_weight_range
        self.maximal_children_count = maximal_children_count
        self.vertex_count_range = vertex_count_range
        self.arr = None

    def get_tree(self):
        vertex_count = random.randint(
            self.vertex_count_range[0], self.vertex_count_range[1])

        if vertex_count == 0:
            return nx.Graph()

        if vertex_count == 1:
            return nx.empty_graph(1)

        if self.connected:
            t = self.connected_tree(vertex_count)
        elif self.binary:
            t = self.binary_tree(vertex_count)
        elif self.balanced:
            t = self.balanced_tree(vertex_count)
        else:
            t = self.default_tree(vertex_count)

        if self.vertex_weighted:
            t = self.add_weight_to_nodes(t)
        if self.edge_weighted:
            t = self.add_weight_to_edges(t)

        return (t, self.arr)

    def generate_tree(self, vertex_count, maximal_children_count):
        if vertex_count == 1:
            return nx.empty_graph(1)

        if vertex_count == 0 or maximal_children_count == 0:
            return nx.Graph()

        degree_sequence = [1] * vertex_count
        degree_sum = 2 * (vertex_count - 1) - vertex_count
        i = 0
        while degree_sum > 0 and i < vertex_count - 2:
            degree = random.randint(
                1, min(maximal_children_count, degree_sum))
            degree_sequence[i] += degree
            degree_sum -= degree
            i += 1
        t = nx.degree_sequence_tree(degree_sequence)

        return t

    def default_tree(self, vertex_count):
        maximal_children_count = random.randint(
            0, min(self.maximal_children_count, vertex_count - 1))

        if maximal_children_count == 0:
            return nx.empty_graph(vertex_count)

        t = nx.Graph()

        counter = 0
        while counter < vertex_count:
            tmp_vertex_count = random.randint(0, vertex_count - counter)
            t_tmp = self.generate_tree(
                tmp_vertex_count, maximal_children_count)
            counter += tmp_vertex_count
            t = nx.disjoint_union(t, t_tmp)

        return t

    def connected_tree(self, vertex_count):
        maximal_children_count = random.randint(
            1, min(self.maximal_children_count, vertex_count - 1))

        t = self.generate_tree(vertex_count, maximal_children_count)

        return t

    def binary_tree(self, vertex_count):
        t = self.generate_tree(vertex_count, 2)

        if self.array:
            self.arr = self.transform_into_array(t, vertex_count)

        return t

    def balanced_tree(self, vertex_count):
        maximal_children_count = random.randint(
            1, min(self.maximal_children_count, vertex_count - 1))

        t = nx.full_rary_tree(maximal_children_count, vertex_count)

        return t

    def transform_into_array(self, t, vertex_count):
        positions = [0] * vertex_count
        node = 0
        children = list(t.neighbors(node))
        if len(children) > 0:
            child = children[0]
            positions[child] = positions[node] * 2 + 1
        if len(children) > 1:
            child = children[1]
            positions[child] = positions[node] * 2 + 2
        for node in t.nodes:
            if node == 0:
                continue
            children = list(t.neighbors(node))
            if len(children) > 1:
                child = children[1]
                positions[child] = positions[node] * 2 + 1
            if len(children) > 2:
                child = children[2]
                positions[child] = positions[node] * 2 + 2
        result = [-1] * (max(positions) + 1)
        for i in range(len(positions)):
            result[positions[i]] = i
        return result

    def add_weight_to_nodes(self, graph):
        for node in graph.nodes:
            graph.nodes[node]['weight'] = random.randint(
                self.vertex_weight_range[0], self.vertex_weight_range[1])
        return graph

    def add_weight_to_edges(self, graph):
        for edge in graph.edges:
            graph.edges[edge]['weight'] = random.randint(
                self.edge_weight_range[0], self.edge_weight_range[1])
        return graph
