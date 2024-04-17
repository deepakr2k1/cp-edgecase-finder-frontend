export default `import random
import string

TEST_CASES = 1
LEN = 10

t = random.randint(1, TEST_CASES)
print(t)
for _ in range(t):
    n = random.randint(1, LEN)
    print(n)
    print(''.join(random.choices(string.ascii_lowercase, k=n)))
`;
