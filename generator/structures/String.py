import string
import random


class String:
    def __init__(self, element_count_range=(0, 10), alphabet=string.printable):
        self.element_count_range = element_count_range
        self.alphabet = alphabet

    def get_string(self):
        result = ""
        element_count = random.randint(
            self.element_count_range[0], self.element_count_range[1])
        for _ in range(element_count):
            result += str(random.choice(self.alphabet))
        return (self.alphabet, result)
