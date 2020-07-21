import networkx as nx
import random


class FlowNetwork:
    def __init__(self, capacity_range=(0, 20), vertex_count_range=(0, 10), edge_count_range=(0, 10)):
        self.capacity_range = capacity_range
        self.vertex_count_range = vertex_count_range
        self.edge_count_range = edge_count_range

    def get_flow_network(self):
        while True:
            vertex_count = random.randint(
                self.vertex_count_range[0], self.vertex_count_range[1])

            minimal_edges = vertex_count - 1
            maximal_edges = vertex_count * (vertex_count - 1) / 2

            minimal = max(minimal_edges, self.edge_count_range[0])
            maximal = min(maximal_edges, self.edge_count_range[1])

            if minimal > maximal:
                return nx.Graph()

            edge_count = random.randint(minimal, maximal)

            source = 0
            sink = vertex_count - 1

            maximal_neighbor = vertex_count - 2

            in_sequence = [1] * vertex_count
            in_sequence[source] = 0
            degree_sum = edge_count - (vertex_count - 1)
            i = 1
            while degree_sum > 0 and i < vertex_count:
                if i == sink:
                    degree = random.randint(
                        1, min(maximal_neighbor, degree_sum))
                else:
                    degree = random.randint(
                        1, min(maximal_neighbor - 1, degree_sum))
                in_sequence[i] += degree
                degree_sum -= degree
                i += 1

            out_sequence = [1] * vertex_count
            out_sequence[sink] = 0
            degree_sum = edge_count - (vertex_count - 1)
            i = 0
            while degree_sum > 0 and i < vertex_count - 1:
                if i == source:
                    degree = random.randint(
                        1, min(maximal_neighbor, degree_sum))
                else:
                    degree = random.randint(
                        1, min(maximal_neighbor - 1, degree_sum))
                out_sequence[i] += degree
                degree_sum -= degree
                i += 1

            try:
                fn = nx.directed_havel_hakimi_graph(in_sequence, out_sequence)
                break
            except:
                continue

        fn = self.add_weight_to_edges(fn)

        return (source, sink, fn)

    def add_weight_to_edges(self, g):
        for edge in g.edges:
            g.edges[edge]['weight'] = random.randint(
                self.capacity_range[0], self.capacity_range[1])
        return g
