import networkx as nx
import random
from . import GraphStructure as gr


class Sequence:
    def __init__(self, element_count_range=(0, 10), element_value_range=(0, 10), permutation=False, permutation_number=5, query=False, query_count=5):
        self.element_count_range = element_count_range
        self.element_value_range = element_value_range
        self.permutation = permutation
        self.permutation_number = permutation_number
        self.query = query
        self.query_count = query_count

    def get_sequence(self):
        if self.permutation:
            seq = self.generate_permution()
        else:
            seq = self.generate_sequence()
        queries = []
        if self.query:
            queries = self.generate_queries(len(seq))
        return (seq, queries)

    def generate_sequence(self):
        element_count = random.randint(
            self.element_count_range[0], self.element_count_range[1])
        result = []
        for _ in range(element_count):
            result.append(random.randint(
                self.element_value_range[0], self.element_value_range[1]))
        return result

    def generate_permution(self):
        result = list(range(1, self.permutation_number + 1))
        random.shuffle(result)
        return result

    def generate_queries(self, element_count):
        maximal_query = element_count * (element_count - 1) / 2
        g_struct = gr.GraphStructure(vertex_count_range=(
            element_count, element_count), edge_count_range=(0, min(maximal_query, self.query_count)))
        g = g_struct.get_graph()
        return list(g.edges)
