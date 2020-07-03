import networkx as nx
import random


class Sequence:
    def __init__(self, element_count_range=(0, 10), element_value_range=(0, 10), permutation=False, permutation_number=5, query=False, query_count=5):
        self.element_count_range = element_count_range
        self.element_value_range = element_value_range
        self.permutation = permutation
        self.permutation_number = permutation_number
        self.query = query
        self.query_count = query_count

    def get_sequence(self):
        element_count = random.randint(
            self.element_count_range[0], self.element_count_range[1])
        if self.permutation:
            seq = self.generate_permution()
        else:
            seq = self.generate_sequence(element_count)
        queries = []
        if self.query:
            queries = self.generate_queries(
                self.permutation_number if self.permutation else element_count)
        return (seq, queries)

    def generate_sequence(self, element_count):
        result = []
        for _ in range(element_count):
            result.append(random.randint(
                self.element_value_range[0], self.element_value_range[1]))
        return result

    def generate_permution(self):
        result = []
        nums = list(range(1, self.permutation_number + 1))
        for _ in range(self.permutation_number):
            if len(nums) == 1:
                result.append(nums[0])
                del nums[0]
            else:
                x = random.randint(0, len(nums) - 1)
                result.append(nums[x])
                del nums[x]
        return result

    def generate_queries(self, element_count):
        g = nx.gnm_random_graph(element_count, self.query_count)
        return g.edges
