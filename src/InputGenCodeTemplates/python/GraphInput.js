export default `import random
from collections import defaultdict

TEST_CASES = 1
LEN = 10

t = random.randint(1, TEST_CASES)
print(t)
for _ in range(t):
    n = random.randint(1, LEN)
    m = random.randint(1, (n * (n - 1)) // 2)
    print(n, m)

    graph = defaultdict(list)
    edgesAdded = 0
    while edgesAdded < m:
        u, v = random.sample(range(n), 2)
        if u != v and v not in graph[u]:
            graph[u].append(v)
            graph[v].append(u)
            edgesAdded += 1

    for i in range(n):
        for j in graph[i]:
            if i < j:
                print(i + 1, j + 1)
`;