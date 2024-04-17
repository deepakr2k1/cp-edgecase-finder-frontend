export default `import java.util.Random;

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
            System.out.println(getRandomString(n));
        }
    }

    public static String getRandomString(int n) {
        String charset = "abcdefghijklmnopqrstuvwxyz";
        StringBuilder result = new StringBuilder();
        Random rand = new Random();
        for (int i = 0; i < n; ++i) {
            result.append(charset.charAt(rand.nextInt(charset.length())));
        }
        return result.toString();
    }
}
`;
