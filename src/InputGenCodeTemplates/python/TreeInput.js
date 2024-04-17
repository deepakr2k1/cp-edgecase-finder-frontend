export default `import random
import itertools

TEST_CASES = 1
LEN = 10

t = random.randint(1, TEST_CASES)
print(t)
for _ in range(t):
    n = random.randint(1, LEN)
    print(n)
    A = random.sample(range(1, n), n - 1)
    print(*A)
`;