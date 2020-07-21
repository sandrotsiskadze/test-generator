import networkx as nx
import random


class GraphStructure:
    def __init__(self, directed=False, connected=False, acyclic=False, one_cycle=False, complete=False, bipartite=False, loop=False, multi=False,
                 vertex_weighted=False, vertex_weight_range=(0, 10), edge_weighted=False, edge_weight_range=(0, 10),
                 vertex_count_range=(0, 10), edge_count_range=(0, 10)):
        self.directed = directed
        self.connected = connected
        self.acyclic = acyclic
        self.one_cycle = one_cycle
        self.complete = complete
        self.loop = loop
        self.multi = multi
        self.bipartite = bipartite
        self.vertex_weighted = vertex_weighted
        self.vertex_weight_range = vertex_weight_range
        self.edge_weighted = edge_weighted
        self.edge_weight_range = edge_weight_range
        self.vertex_count_range = vertex_count_range
        self.edge_count_range = edge_count_range

    def get_graph(self):
        vertex_count = random.randint(
            self.vertex_count_range[0], self.vertex_count_range[1])

        if vertex_count == 0:
            return nx.Graph()

        if self.connected:
            g = self.connected_graph(vertex_count)
        elif self.acyclic:
            g = self.acyclic_graph(vertex_count)
        elif self.one_cycle:
            g = self.one_cycle_graph(vertex_count)
        elif self.complete:
            g = self.complete_graph(vertex_count)
        elif self.bipartite:
            g = self.bipartite_graph(vertex_count)
        else:
            g = self.default_graph(vertex_count)

        if self.vertex_weighted:
            g = self.add_weight_to_nodes(g)
        if self.edge_weighted:
            g = self.add_weight_to_edges(g)

        return g

    def default_graph(self, vertex_count):
        minimal_edges = 0
        minimal = max(minimal_edges, self.edge_count_range[0])

        if self.multi:
            edge_count = random.randint(
                minimal, self.edge_count_range[1])

            g = nx.empty_graph(vertex_count, nx.MultiDiGraph()
                               if self.directed else nx.MultiGraph())
        else:
            maximal_edges = vertex_count * \
                (vertex_count - 1) if self.directed else vertex_count * \
                (vertex_count - 1) / 2
            if self.loop:
                maximal_edges += vertex_count

            maximal = min(maximal_edges, self.edge_count_range[1])

            if minimal > maximal:
                return nx.Graph()

            edge_count = random.randint(minimal, maximal)

            g = nx.empty_graph(vertex_count, nx.DiGraph()
                               if self.directed else nx.Graph())

        if not self.multi and edge_count >= maximal_edges / 2:
            x = 0
            y = 0
            edge_index = 0
            number_of_edges = 0
            while number_of_edges < edge_count:
                if x != y or self.loop:
                    if random.randrange(maximal_edges - edge_index) < edge_count - number_of_edges:
                        g.add_edge(x, y)
                        number_of_edges += 1
                    edge_index += 1
                y += 1
                if y == vertex_count:
                    x += 1
                    y = 0 if self.directed else x

        else:
            number_of_edges = 0
            while number_of_edges < edge_count:
                x = random.randint(0, vertex_count - 1)
                y = random.randint(0, vertex_count - 1)

                if (x == y and not self.loop) or (not self.multi and g.has_edge(x, y)):
                    continue
                g.add_edge(x, y)
                number_of_edges += 1

        return g

    def connected_graph(self, vertex_count):
        g = nx.random_tree(vertex_count)
        if self.directed:
            g = self.shuffle(g)

        minimal_edges = vertex_count - 1
        minimal = max(minimal_edges, self.edge_count_range[0])

        if self.multi:
            edge_count = random.randint(
                minimal, self.edge_count_range[1])

            g = nx.MultiDiGraph(g) if self.directed else nx.MultiGraph(g)
        else:
            maximal_edges = vertex_count * \
                (vertex_count - 1) if self.directed else vertex_count * \
                (vertex_count - 1) / 2

            maximal = min(maximal_edges, self.edge_count_range[1])
            if self.loop:
                maximal_edges += vertex_count

            if minimal > maximal:
                return nx.Graph()

            edge_count = random.randint(minimal, maximal)

        if not self.multi and edge_count >= maximal_edges / 2:
            x = 0
            y = 0
            edge_index = 0
            number_of_edges = 0
            while number_of_edges < edge_count:
                if g.has_edge(x, y):
                    number_of_edges += 1
                    edge_index += 1
                elif x != y or self.loop:
                    if random.randrange(maximal_edges - edge_index) < edge_count - number_of_edges:
                        g.add_edge(x, y)
                        number_of_edges += 1
                    edge_index += 1
                y += 1
                if y == vertex_count:
                    x += 1
                    y = 0 if self.directed else x
        else:
            number_of_edges = vertex_count - 1
            while number_of_edges < edge_count:
                x = random.randint(0, vertex_count - 1)
                y = random.randint(0, vertex_count - 1)

                if (x == y and not self.loop) or (not self.multi and g.has_edge(x, y)):
                    continue
                g.add_edge(x, y)
                number_of_edges += 1

        return g

    def shuffle(self, g_tmp):
        g = nx.DiGraph()

        for edge in g_tmp.edges:
            coin = random.randint(0, 1)
            x = edge[coin]
            y = edge[1 - coin]
            g.add_edge(x, y)

        return g

    def acyclic_graph(self, vertex_count):
        g = nx.random_tree(vertex_count)

        minimal_edges = vertex_count - 1
        minimal = max(minimal_edges, self.edge_count_range[0])

        if self.multi:
            edge_count = random.randint(
                minimal, self.edge_count_range[1])

            g = nx.MultiGraph(g)
        else:
            maximal_edges = vertex_count * (vertex_count - 1) / 2
            maximal = min(maximal_edges, self.edge_count_range[1])

            if minimal > maximal:
                return nx.Graph()

            edge_count = random.randint(minimal, maximal)

        if not self.multi and edge_count >= maximal_edges / 2:
            x = 0
            y = 0
            edge_index = 0
            number_of_edges = 0
            while number_of_edges < edge_count:
                if g.has_edge(x, y):
                    number_of_edges += 1
                    edge_index += 1
                elif x != y:
                    if random.randrange(maximal_edges - edge_index) < edge_count - number_of_edges:
                        g.add_edge(x, y)
                        number_of_edges += 1
                    edge_index += 1
                y += 1
                if y == vertex_count:
                    x += 1
                    y = x
        else:
            number_of_edges = vertex_count - 1
            while number_of_edges < edge_count:
                x = random.randint(0, vertex_count - 1)
                y = random.randint(0, vertex_count - 1)

                if x == y or (not self.multi and g.has_edge(x, y)):
                    continue
                g.add_edge(x, y)
                number_of_edges += 1

        if self.multi:
            g_tmp = nx.MultiDiGraph()
        else:
            g_tmp = nx.DiGraph()
        g_tmp.add_edges_from(g.edges)
        g = g_tmp

        return g

    def one_cycle_graph(self, vertex_count):
        if vertex_count == 1 and not self.loop:
            return nx.Graph()

        if self.directed:
            minimal_edges = vertex_count
            minimal = max(minimal_edges, self.edge_count_range[0])

            maximal_edges = vertex_count * (vertex_count - 1) / 2 + 1
            maximal = min(maximal_edges, self.edge_count_range[1])

            if minimal > maximal:
                return nx.Graph()

            edge_count = random.randint(minimal, maximal)

            limit_on_cycle_size = [0] * (vertex_count + 2)

            limit_on_cycle_size[1] = 0
            limit_on_cycle_size[2] = 0
            limit_on_cycle_size[3] = 1
            limit_on_cycle_size[4] = 2
            for i in range(5, vertex_count + 2):
                limit_on_cycle_size[i] = (i - 2) + limit_on_cycle_size[i - 1]

            maximal_cycle_size = 0
            for i in range(1, vertex_count + 2):
                if edge_count > maximal_edges - limit_on_cycle_size[i]:
                    maximal_cycle_size = i - 1
                    break

            if maximal_cycle_size == 2 and self.loop:
                maximal_cycle_size = random.randint(1, 2)

            g = nx.empty_graph(vertex_count)

            nodes = list(range(vertex_count))
            cycle_cluster = []
            cycle_nodes = []
            cycle_cluster_set = [0] * vertex_count
            cycle_nodes_set = [0] * vertex_count

            ancestor_in_cycle = [0] * vertex_count
            descendant_in_cycle = [0] * vertex_count

            cycle_nodes_count = random.randint(
                1 if self.loop else 2, maximal_cycle_size)
            for _ in range(cycle_nodes_count):
                x = random.randint(0, len(nodes) - 1)
                node = nodes[x]
                cycle_cluster.append(node)
                cycle_nodes.append(node)
                cycle_cluster_set[node] = 1
                cycle_nodes_set[node] = 1
                ancestor_in_cycle[node] = 1
                descendant_in_cycle[node] = 1
                del nodes[x]

            g = nx.empty_graph(vertex_count, nx.DiGraph())

            nx.add_cycle(g, cycle_nodes)

            new_maximal_edges = cycle_nodes_count + (vertex_count - cycle_nodes_count) * (
                vertex_count - cycle_nodes_count - 1) / 2 + cycle_nodes_count * (vertex_count - cycle_nodes_count)

            if edge_count >= new_maximal_edges / 2:
                x_ind = 0
                y = 0
                edge_index = 0
                number_of_edges = cycle_nodes_count
                while number_of_edges < edge_count:
                    x = cycle_cluster[x_ind]
                    if x != y and not (cycle_nodes_set[x] and cycle_nodes_set[y]) and not (g.has_edge(x, y) or g.has_edge(y, x)):
                        if random.randrange(new_maximal_edges - edge_index) < edge_count - number_of_edges:
                            if ancestor_in_cycle[x] and descendant_in_cycle[y]:
                                g.add_edge(y, x)
                                if not cycle_cluster_set[y]:
                                    cycle_cluster.append(y)
                                    cycle_cluster_set[y] = 1
                                number_of_edges += 1
                            elif ancestor_in_cycle[y] and descendant_in_cycle[x]:
                                g.add_edge(x, y)
                                if not cycle_cluster_set[y]:
                                    cycle_cluster.append(y)
                                    cycle_cluster_set[y] = 1
                                number_of_edges += 1
                            else:
                                x_bc = x
                                y_bc = y
                                x_tmp = min(x, y)
                                y_tmp = max(x, y)
                                x = x_tmp
                                y = y_tmp

                                g.add_edge(x, y)

                                if ancestor_in_cycle[x]:
                                    ancestor_in_cycle[y] = 1
                                if descendant_in_cycle[y]:
                                    descendant_in_cycle[x] = 1

                                if not cycle_cluster_set[x]:
                                    cycle_cluster.append(x)
                                    cycle_cluster_set[x] = 1
                                if not cycle_cluster_set[y]:
                                    cycle_cluster.append(y)
                                    cycle_cluster_set[y] = 1

                                number_of_edges += 1

                                x = x_bc
                                y = y_bc
                        edge_index += 1
                    y += 1
                    if y == vertex_count:
                        x_ind += 1
                        y = 0
                        if x_ind == vertex_count:
                            x_ind = 0
                            edge_index = 0
            else:
                number_of_edges = cycle_nodes_count
                while number_of_edges < edge_count:
                    x_ind = random.randint(0, len(cycle_cluster) - 1)
                    x = cycle_cluster[x_ind]
                    if cycle_nodes_set[x]:
                        y_ind = random.randint(0, len(nodes) - 1)
                        y = nodes[y_ind]
                    else:
                        y = random.randint(0, vertex_count - 1)

                    if x == y or (g.has_edge(x, y) or g.has_edge(y, x)):
                        continue

                    if ancestor_in_cycle[x] and descendant_in_cycle[y]:
                        g.add_edge(y, x)
                        if not cycle_cluster_set[y]:
                            cycle_cluster.append(y)
                            cycle_cluster_set[y] = 1
                        number_of_edges += 1
                    elif ancestor_in_cycle[y] and descendant_in_cycle[x]:
                        g.add_edge(x, y)
                        if not cycle_cluster_set[y]:
                            cycle_cluster.append(y)
                            cycle_cluster_set[y] = 1
                        number_of_edges += 1
                    else:
                        x_tmp = min(x, y)
                        y_tmp = max(x, y)
                        x = x_tmp
                        y = y_tmp

                        g.add_edge(x, y)

                        if ancestor_in_cycle[x]:
                            ancestor_in_cycle[y] = 1
                        if descendant_in_cycle[y]:
                            descendant_in_cycle[x] = 1

                        if not cycle_cluster_set[x]:
                            cycle_cluster.append(x)
                            cycle_cluster_set[x] = 1
                        if not cycle_cluster_set[y]:
                            cycle_cluster.append(y)
                            cycle_cluster_set[y] = 1

                        number_of_edges += 1
        else:
            g = nx.random_tree(vertex_count)

            edge_count = vertex_count

            number_of_edges = vertex_count - 1
            while number_of_edges < edge_count:
                x = random.randint(0, vertex_count - 1)
                y = random.randint(0, vertex_count - 1)
                if (x == y and not self.loop) or g.has_edge(x, y):
                    continue
                g.add_edge(x, y)
                number_of_edges += 1

        return g

    def complete_graph(self, vertex_count):
        g = nx.complete_graph(vertex_count, nx.DiGraph()
                              if self.directed else nx.Graph())
        return g

    def bipartite_graph(self, vertex_count):
        if vertex_count == 1:
            return nx.Graph()

        first_set = random.randint(0, vertex_count - 1)
        second_set = vertex_count - first_set

        if first_set == 0 or second_set == 0:
            return nx.empty_graph(vertex_count)

        minimal_edges = 0
        minimal = max(minimal_edges, self.edge_count_range[0])

        if self.multi:
            edge_count = random.randint(
                minimal, self.edge_count_range[1])

            g = nx.empty_graph(vertex_count, nx.MultiDiGraph()
                               if self.directed else nx.MultiGraph())
        else:
            maximal_edges = first_set * second_set * \
                2 if self.directed else first_set * second_set
            maximal = min(maximal_edges, self.edge_count_range[1])

            if minimal > maximal:
                return nx.Graph()

            edge_count = random.randint(minimal, maximal)

            g = nx.empty_graph(vertex_count, nx.DiGraph()
                               if self.directed else nx.Graph())

        if not self.multi and edge_count >= maximal_edges / 2:
            x = 0
            y = first_set
            starter = first_set
            terminator = vertex_count
            edge_index = 0
            number_of_edges = 0
            while number_of_edges < edge_count:
                if random.randrange(maximal_edges - edge_index) < edge_count - number_of_edges:
                    g.add_edge(x, y)
                    number_of_edges += 1
                edge_index += 1
                y += 1
                if y == terminator:
                    x += 1
                    if x == starter:
                        starter = 0
                        terminator = first_set
                    y = starter
        else:
            number_of_edges = 0
            while number_of_edges < edge_count:
                x = random.randint(0, first_set - 1)
                y = random.randint(first_set, vertex_count - 1)
                if self.directed:
                    coin = random.randint(0, 1)
                    if coin == 1:
                        tmp = x
                        x = y
                        y = tmp

                if not self.multi and g.has_edge(x, y):
                    continue
                g.add_edge(x, y)
                number_of_edges += 1

        return g

    def add_weight_to_nodes(self, g):
        for node in g.nodes:
            g.nodes[node]['weight'] = random.randint(
                self.vertex_weight_range[0], self.vertex_weight_range[1])
        return g

    def add_weight_to_edges(self, g):
        for edge in g.edges:
            g.edges[edge]['weight'] = random.randint(
                self.edge_weight_range[0], self.edge_weight_range[1])
        return g
