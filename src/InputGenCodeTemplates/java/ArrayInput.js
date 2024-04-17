export default `import java.util.Random;

public class Main {
    public static void main(String[] args) {
        int TEST_CASES = 1;
        int LEN = 10;
        int MAX_NUM = 30;
        Random rand = new Random();

        int t = rand.nextInt(TEST_CASES) + 1;
        System.out.println(t);
        while (t-- > 0) {
            int n = rand.nextInt(LEN) + 1;
            System.out.println(n);
            for (int i = 0; i < n; i++) {
                System.out.print(rand.nextInt(MAX_NUM) + 1 + " ");
            }
            System.out.println();
        }
    }
}
`;
