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
        if self.connected:
            edge_count = random.randint(
                vertex_count - 1, min(self.edge_count_range[1], vertex_count**2))
            g = self.connected_graph(vertex_count, edge_count)
        elif self.acyclic:
            edge_count = random.randint(
                vertex_count - 1, self.edge_count_range[1])
            g = self.acyclic_graph(vertex_count, edge_count)
        elif self.complete:
            edge_count = (vertex_count * (vertex_count - 1))/2
            g = self.complete_graph(vertex_count)
        elif self.bipartite:
            edge_count = random.randint(
                self.edge_count_range[0], self.edge_count_range[1])
            g = self.bipartite_graph(vertex_count, edge_count)
        else:
            edge_count = random.randint(
                self.edge_count_range[0], self.edge_count_range[1])
            g = self.default_graph(vertex_count, edge_count)
        if self.multi:
            g = self.to_multi(g)
        if self.loop:
            g = self.add_loop(g)
        if self.vertex_weighted:
            g = self.add_weight_to_nodes(g)
        if self.edge_weighted:
            g = self.add_weight_to_edges(g)

        return g

    def default_graph(self, vertex_count, edge_count):
        g = nx.gnm_random_graph(
            vertex_count, edge_count, directed=self.directed)
        return g

    def connected_graph(self, vertex_count, edge_count):
        g = nx.random_tree(vertex_count)
        nodes = list(g.nodes)
        if len(nodes) < 2:
            return g
        while nx.number_of_edges(g) < edge_count:
            x = random.randint(0, len(nodes) - 1)
            x_val = nodes[x]
            tmp = nodes[x]
            nodes[x] = nodes[len(nodes) - 1]
            nodes[len(nodes) - 1] = tmp
            y = random.randint(0, len(nodes) - 2)
            y_val = nodes[y]
            tmp = nodes[x]
            nodes[x] = nodes[len(nodes) - 1]
            nodes[len(nodes) - 1] = tmp
            g.add_edge(x_val, y_val)
        if self.directed:
            g = self.to_directed(g)
        return g

    def acyclic_graph(self, vertex_count, edge_count):
        g = nx.gn_graph(vertex_count)
        nodes = list(g.nodes)
        if len(nodes) < 2:
            return g
        while nx.number_of_edges(g) < edge_count:
            x = random.randint(0, len(nodes) - 1)
            x_val = nodes[x]
            tmp = nodes[x]
            nodes[x] = nodes[len(nodes) - 1]
            nodes[len(nodes) - 1] = tmp
            y = random.randint(0, len(nodes) - 2)
            y_val = nodes[y]
            tmp = nodes[x]
            nodes[x] = nodes[len(nodes) - 1]
            nodes[len(nodes) - 1] = tmp
            g.add_edge(max(x_val, y_val), min(x_val, y_val))
        return g

    def complete_graph(self, vertex_count):
        g = nx.complete_graph(vertex_count)
        return g

    def bipartite_graph(self, vertex_count, edge_count):
        first_set = random.randint(0, vertex_count - 1)
        secon_set = vertex_count - first_set
        g = nx.bipartite.gnmk_random_graph(
            first_set, secon_set, edge_count, directed=self.directed)
        return g

    def to_directed(self, graph):
        g = nx.DiGraph()
        g.add_nodes_from(graph.nodes)
        edges = list(graph.edges)
        for edge in edges:
            coin = random.randint(0, 1)
            if coin == 0:
                x = tuple(edge)[0]
                y = tuple(edge)[1]
            else:
                x = tuple(edge)[1]
                y = tuple(edge)[0]
            g.add_edge(x, y)
        return g

    def add_loop(self, graph):
        edge_count = nx.number_of_edges(graph)
        edges_left = self.edge_count_range[1] - edge_count
        added_edge_count = random.randint(0, edges_left)
        final_edge_count = edge_count + added_edge_count
        vertex_count = nx.number_of_nodes(graph)
        while nx.number_of_edges(graph) < final_edge_count:
            if vertex_count - 1 <= 0:
                break
            x = random.randint(0, vertex_count - 1)
            graph.add_edge(x, x)
        return graph

    def to_multi(self, graph):
        edge_count = nx.number_of_edges(graph)
        edges_left = self.edge_count_range[1] - edge_count
        added_edge_count = random.randint(0, edges_left)
        final_edge_count = edge_count + added_edge_count
        if self.directed:
            g = nx.MultiDiGraph()
        else:
            g = nx.MultiGraph()
        g.add_nodes_from(graph.nodes)
        g.add_edges_from(graph.edges)
        edges = list(graph.edges)
        while nx.number_of_edges(g) < final_edge_count:
            if len(edges) - 1 <= 0:
                break
            x = random.randint(0, len(edges) - 1)
            g.add_edge(tuple(edges[x])[0], tuple(edges[x])[1])
        return g

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
