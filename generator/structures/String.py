import string
import random


class String:
    def __init__(self, element_count_range=(0, 10), alphabet=string.printable):
        self.element_count_range = element_count_range
        self.alphabet = alphabet

    def get_string(self):
        element_count = random.randint(
            self.element_count_range[0], self.element_count_range[1])
        return self.generate_string(element_count)

    def generate_string(self, element_count):
        result = ""
        for _ in range(element_count):
            result += str(random.choice(self.alphabet))
        return result
