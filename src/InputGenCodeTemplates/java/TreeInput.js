export default `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        int TEST_CASES = 1;
        int LEN = 10;
        Random rand = new Random();

        int t = rand.nextInt(TEST_CASES) + 1;
        System.out.println(t);
        while (t-- > 0) {
            int n = rand.nextInt(LEN) + 1;
            System.out.println(n);
            List<Integer> A = generateRandomOrder(n - 1);
            for (int i = 0; i < n - 1; i++) {
                System.out.print(A.get(i) + " ");
            }
            System.out.println();
        }
    }

    public static List<Integer> generateRandomOrder(int n) {
        List<Integer> result = new ArrayList<>();
        for (int i = 1; i <= n; ++i) {
            result.add(i);
        }
        Collections.shuffle(result);
        return result;
    }
}
`;