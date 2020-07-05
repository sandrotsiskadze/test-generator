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

    def get_tree(self):
        maximal_children_count = random.randint(0, self.maximal_children_count)
        vertex_count = random.randint(
            self.vertex_count_range[0], self.vertex_count_range[1])
        if self.connected:
            t = self.connected_tree(maximal_children_count, vertex_count)
        elif self.binary:
            t = self.binary_tree(vertex_count)
        elif self.balanced:
            t = self.balanced_tree(maximal_children_count, vertex_count)
        else:
            t = self.default_tree(maximal_children_count, vertex_count)
        if self.vertex_weighted:
            t = self.add_weight_to_nodes(t)
        if self.edge_weighted:
            t = self.add_weight_to_edges(t)

        return t

    def default_tree(self, maximal_children_count, vertex_count):
        counter = 0
        tmp_vertex_count = random.randint(0, vertex_count - counter)
        t = self.connected_tree(maximal_children_count, tmp_vertex_count)
        counter += tmp_vertex_count
        while counter < vertex_count:
            tmp_vertex_count = random.randint(0, vertex_count - counter)
            t_tmp = self.connected_tree(
                maximal_children_count, tmp_vertex_count)
            counter += tmp_vertex_count
            t = nx.disjoint_union(t, t_tmp)
        return t

    def connected_tree(self, maximal_children_count, vertex_count):
        if vertex_count <= 1:
            t = nx.Graph()
            t.add_node(1)
            return t
        degree_sequence = [1] * vertex_count
        degree_sum = 2 * (vertex_count - 1) - vertex_count
        i = 0
        while degree_sum > 0 and i < vertex_count:
            if i == vertex_count - 1:
                degree = degree_sum
            else:
                degree = random.randint(
                    0, min(maximal_children_count - 1, degree_sum))
            degree_sequence[i] += degree
            degree_sum -= degree
            i += 1
        t = nx.degree_sequence_tree(degree_sequence)
        return t

    def binary_tree(self, vertex_count):
        t = self.connected_tree(2, vertex_count)
        return t

    def balanced_tree(self, maximal_children_count, vertex_count):
        t = nx.full_rary_tree(maximal_children_count, vertex_count)
        return t

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
