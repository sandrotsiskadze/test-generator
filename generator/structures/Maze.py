class Maze:
    def __init__(self, width_range=(0, 10), height_range=(0, 10), path_symbol="O", wall_symbol="X", connected=False):
        self.width_range = width_range
        self.height_range = height_range
        self.path_symbol = path_symbol
        self.wall_symbol = wall_symbol
        self.connected = connected
