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
        graph = g.get_graph()
        print(graph.edges.data())
        fn = nx.DiGraph()
        fn.add_nodes_from(graph.nodes)
        fn.add_edges_from(graph.edges.data())
        print(fn.edges.data())
        final_edge_count = nx.number_of_edges(fn)
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
            while nx.number_of_edges(fn) < final_edge_count + new_edge_count:
                x = random.randint(0, nx.number_of_nodes(fn) - 2)
                fn.add_edge(new_node, x, weight=random.randint(self.capacity_range[0], self.capacity_range[1]))
            start = new_node
        else:
            x = random.randint(0, len(starts) - 1)
            start = starts[x]
            for node in starts:
                if node == start:
                    continue
                fn.add_edge(start, node, weight=random.randint(self.capacity_range[0], self.capacity_range[1]))
        if not sinks:
            new_node = nx.number_of_nodes(fn)
            new_edge_count = random.randint(1, nx.number_of_nodes(fn))
            while nx.number_of_edges(fn) < final_edge_count + new_edge_count:
                x = random.randint(0, nx.number_of_nodes(fn) - 2)
                fn.add_edge(x, new_node, weight=random.randint(self.capacity_range[0], self.capacity_range[1]))
            sink = new_node
        else:
            x = random.randint(0, len(sinks) - 1)
            sink = sinks[x]
            for node in sinks:
                if node == sink:
                    continue
                fn.add_edge(node, sink, weight=random.randint(self.capacity_range[0], self.capacity_range[1]))
        return (start, sink, fn)
