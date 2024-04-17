export default `import random

TEST_CASES = 1
LEN = 10
MAX_NUM = 30

t = random.randint(1, TEST_CASES)
print(t)
for _ in range(t):
    n = random.randint(1, LEN)
    print(n)
    print(*[random.randint(1, MAX_NUM) for _ in range(n)])
`;
