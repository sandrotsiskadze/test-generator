import networkx as nx
import random


class GraphStructure:
    def __init__(self, directed=False, connected=False, acyclic=False, complete=False, bipartite=False, loop=False, multi=False,
                 vertex_weighted=False, vertex_weight_range=(0, 10), edge_weighted=False, edge_weight_range=(0, 10),
                 vertex_count_range=(0, 10), edge_count_range=(0, 10)):
        self.directed = directed
        self.connected = connected
        self.acyclic = acyclic
        self.complete = complete
        self.loop = loop
        self.multi = multi
        self.bipartite = bipartite
        self.vertex_weighted = vertex_weighted
        self.vertex_weight_range = vertex_weight_range
        self.edge_weighted = edge_weighted
        self.edge_weight_range = edge_weight_range
        self.vertex_count_range = vertex_count_range
        self.edge_count_range = edge_count_range

    def get_graph(self):
        vertex_count = random.randint(
            self.vertex_count_range[0], self.vertex_count_range[1])
        edge_count = random.randint(
            self.edge_count_range[0], self.edge_count_range[1])
        return self.generate_graph(vertex_count, edge_count)

    def generate_graph(self, vertex_count, edge_count):
        result = []
        if self.connected:
            g = self.connected_graph(vertex_count, edge_count)
        elif self.acyclic:
            g = self.acyclic_graph(vertex_count, edge_count)
        elif self.complete:
            g = self.complete_graph(vertex_count)
        elif self.bipartite:
            g = self.bipartite_graph(vertex_count, edge_count)
        else:
            g = self.default_graph(vertex_count, edge_count)
        if self.loop:
            g = self.add_loop(vertex_count, edge_count, g)
        if self.multi:
            g = self.to_multi(vertex_count, edge_count, g)
        if self.vertex_weighted:
            for node in g.nodes:
                g.nodes[node]['weight'] = random.randint(
                    self.vertex_weight_range[0], self.vertex_weight_range[1])
        if self.edge_weighted:
            for edge in g.edges:
                g.edges[edge]['weight'] = random.randint(
                    self.edge_weight_range[0], self.edge_weight_range[1])
        result = list(g.edges)
        print(len(result))

        return result

    def default_graph(self, vertex_count, edge_count):
        g = nx.gnm_random_graph(
            vertex_count, edge_count, directed=self.directed)
        return g

    def connected_graph(self, vertex_count, edge_count):
        g = nx.random_tree(vertex_count)
        while nx.number_of_edges(g) != edge_count:
            x = random.randint(0, vertex_count-1)
            y = random.randint(0, vertex_count-1)
            if x == y:
                continue
            g.add_edge(x, y)
        return g

    def acyclic_graph(self, vertex_count, edge_count):
        g = nx.gn_graph(vertex_count)
        while nx.number_of_edges(g) != edge_count:
            x = random.randint(0, vertex_count-1)
            y = random.randint(0, vertex_count-1)
            if x == y:
                continue
            g.add_edge(max(x, y), min(x, y))
        return g

    def complete_graph(self, vertex_count):
        g = nx.complete_graph(vertex_count)
        return g

    def bipartite_graph(self, vertex_count, edge_count):
        first_set = random.randint(0, vertex_count)
        secon_set = vertex_count-first_set
        g = nx.bipartite.gnmk_random_graph(
            first_set, secon_set, edge_count, directed=self.directed)
        return g

    def add_loop(self, vertex_count, edge_count, graph):
        edges_left = self.edge_count_range[1]-edge_count
        added_loops = random.randint(0, edges_left)
        for _ in range(added_loops):
            x = random.randint(0, vertex_count-1)
            graph.add_edge(x, x)
        return graph

    def to_multi(self, vertex_count, edge_count, graph):
        edges_left = self.edge_count_range[1]-edge_count
        augmented_edges = random.randint(0, edges_left)
        print(edges_left, augmented_edges)
        edges = list(graph.edges)
        if self.directed:
            g = nx.MultiDiGraph()
        else:
            g = nx.MultiGraph()
        g.add_nodes_from(graph.nodes)
        g.add_edges_from(graph.edges)
        for _ in range(augmented_edges):
            x = random.randint(0, vertex_count-1)
            g.add_edge(tuple(edges[x])[0], tuple(edges[x])[1])
        return g
