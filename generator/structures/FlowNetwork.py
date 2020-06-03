import networkx as nx
import random
from . import GraphStructure as gr


class FlowNetwork:
    def __init__(self, capacity_range=(0, 20), vertex_count_range=(0, 10), edge_count_range=(0, 10)):
        self.capacity_range = capacity_range
        self.vertex_count_range = vertex_count_range
        self.edge_count_range = edge_count_range

    def get_flow_network(self):
        g = gr.GraphStructure(directed=True, connected=True, edge_weighted=True, edge_weight_range=self.capacity_range,
                              vertex_count_range=self.vertex_count_range, edge_count_range=self.edge_count_range)
        edges = g.get_graph()
        fn = nx.DiGraph()
        fn.add_edges_from(edges)
        edge_count = nx.number_of_edges(fn)
        edges_left = self.edge_count_range[1] - edge_count
        added_edge_count = random.randint(0, edges_left)
        final_edge_count = edge_count + added_edge_count
        while nx.number_of_edges(fn) != final_edge_count:
            x = random.randint(0, len(edges) - 1)
            fn.add_edge(tuple(edges[x])[1], tuple(edges[x])[0])
        start = 0
        sink = 0
        starts = []
        sinks = []
        for i in range(nx.number_of_nodes(fn)):
            if fn.in_degree(i) == 0:
                starts.append(i)
            if fn.out_degree(i) == 0:
                sinks.append(i)
        if not starts:
            new_node = nx.number_of_nodes(fn)
            new_edge_count = random.randint(1, nx.number_of_nodes(fn))
            while nx.number_of_edges(fn) != final_edge_count + new_edge_count:
                x = random.randint(0, nx.number_of_nodes(fn))
                if x == new_node:
                    continue
                fn.add_edge(new_node, x)
            start = new_node
        else:
            x = random.randint(0, len(starts) - 1)
            start = starts[x]
            for node in starts:
                if node == start:
                    continue
                fn.add_edge(start, node)
        if not sinks:
            new_node = nx.number_of_nodes(fn)
            new_edge_count = random.randint(1, nx.number_of_nodes(fn))
            while nx.number_of_edges(fn) != final_edge_count + new_edge_count:
                x = random.randint(0, nx.number_of_nodes(fn))
                if x == new_node:
                    continue
                fn.add_edge(x, new_node)
            sink = new_node
        else:
            x = random.randint(0, len(sinks) - 1)
            sink = sinks[x]
            for node in sinks:
                if node == sink:
                    continue
                fn.add_edge(node, sink)
        return fn.edges.data()
