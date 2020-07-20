import networkx as nx
import random


class CoordinateSpace:
    def __init__(self, width_range=(0, 10), height_range=(0, 10), vector_count_range=(0, 10)):
        self.width_range = width_range
        self.height_range = height_range
        self.vector_count_range = vector_count_range

    def get_vectors(self):
        width = self.width_range[1] - self.width_range[0]
        height = self.height_range[1] - self.height_range[0]
        vector_count = random.randint(
            self.vector_count_range[0], self.vector_count_range[1])

        return self.generate_vectors(width, height, vector_count)

    def generate_vectors(self, width, height, vector_count):
        if width == 0 or height == 0:
            return nx.Graph()

        maximal_edges = width * height

        edge_count = vector_count

        g = nx.DiGraph()

        if edge_count >= maximal_edges / 2:
            x = self.width_range[0]
            y = self.height_range[0]
            edge_index = 0
            number_of_edges = 0
            while number_of_edges < edge_count:
                if random.randrange(maximal_edges - edge_index) < edge_count - number_of_edges:
                    g.add_edge(x, y)
                    number_of_edges += 1
                edge_index += 1
                y += 1
                if y == self.height_range[1] + 1:
                    x += 1
                    y = self.height_range[0]
        else:
            number_of_edges = 0
            while number_of_edges < edge_count:
                x = random.randint(self.width_range[0], self.width_range[1])
                y = random.randint(self.height_range[0], self.height_range[1])

                if g.has_edge(x, y):
                    continue
                g.add_edge(x, y)
                number_of_edges += 1

        return g
