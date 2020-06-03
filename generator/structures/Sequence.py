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
        return self.generate_sequence(element_count)

    def generate_sequence(self, element_count):
        result = []
        if self.permutation:
            seq = self.permutations()
        else:
            seq = self.sequence(element_count)
        result = seq
        return result

    def sequence(self, element_count):
        result = []
        for _ in range(element_count):
            result.append(random.randint(
                self.element_value_range[0], self.element_value_range[1]))
        return result

    def permutations(self):
        result = []
        return result
