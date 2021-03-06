import random


class Maze:
    def __init__(self, width_range=(0, 10), height_range=(0, 10), path_symbol="O", wall_symbol="X", connected=False):
        self.width_range = width_range
        self.height_range = height_range
        self.path_symbol = path_symbol
        self.wall_symbol = wall_symbol
        self.connected = connected

    def get_maze(self):
        width = random.randint(self.width_range[0], self.width_range[1])
        height = random.randint(self.height_range[0], self.height_range[1])

        if self.connected:
            m = self.connected_maze(width, height)
        else:
            m = self.default_maze(width, height)

        return m

    def default_maze(self, width, height):
        m = [[self.wall_symbol] * width for _ in range(height)]
        total_cell_num = width * height
        path_num = random.randint(0, total_cell_num // 2)
        cells = []
        for i in range(height):
            for j in range(width):
                cells.append((i, j))
        for _ in range(path_num):
            cell_ind = random.randint(0, len(cells) - 1)
            m[cells[cell_ind][0]][cells[cell_ind][1]] = self.path_symbol
            del cells[cell_ind]
        return m

    def connected_maze(self, width, height):
        m = [[self.wall_symbol] * width for _ in range(height)]
        total_cell_num = width * height
        path_num = random.randint(0, total_cell_num // 2)

        cell = [random.randint(0, height - 1), random.randint(0, width - 1)]
        m[cell[0]][cell[1]] = self.path_symbol

        past_direction = random.randint(0, 3)

        number_of_path = 0
        while number_of_path < path_num:
            direction = random.randint(0, 5)
            if direction == 4 or direction == 5:
                direction = past_direction
            if direction == 0:
                if cell[0] != 0:
                    cell[0] -= 1
            elif direction == 1:
                if cell[0] != height - 1:
                    cell[0] += 1
            elif direction == 2:
                if cell[1] != 0:
                    cell[1] -= 1
            else:
                if cell[1] != width - 1:
                    cell[1] += 1
            if m[cell[0]][cell[1]] == self.wall_symbol:
                m[cell[0]][cell[1]] = self.path_symbol
                number_of_path += 1
            past_direction = direction
        return m
