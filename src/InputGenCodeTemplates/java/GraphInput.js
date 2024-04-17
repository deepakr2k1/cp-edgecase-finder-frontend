export default `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int TEST_CASES = 1;
        int LEN = 10;
        Random rand = new Random();

        int t = rand.nextInt(TEST_CASES) + 1;
        System.out.println(t);
        while (t-- > 0) {
            int n = rand.nextInt(LEN) + 1;
            int m = rand.nextInt((n * (n - 1)) / 2) + 1;
            System.out.println(n + " " + m);

            List<List<Integer>> adj = getRandomGraph(n, m);
            for (int i = 0; i < n; i++) {
                for (int x : adj.get(i)) {
                    if (i < x) {
                        System.out.println((i + 1) + " " + (x + 1));
                    }
                }
            }
            System.out.println();
        }
    }

    public static List<List<Integer>> getRandomGraph(int n, int m) {
        int maxEdges = n * (n - 1) / 2;
        m = Math.min(maxEdges, m);

        int edgesAdded = 0;
        Map<Pair<Integer, Integer>, Boolean> isEdge = new HashMap<>();
        List<List<Integer>> graph = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        Random rand = new Random();
        while (edgesAdded < m) {
            int u = rand.nextInt(n);
            int v = rand.nextInt(n);

            if (u != v && !isEdge.getOrDefault(new Pair<>(u, v), false)) {
                graph.get(u).add(v);
                graph.get(v).add(u);
                isEdge.put(new Pair<>(u, v), true);
                isEdge.put(new Pair<>(v, u), true);
                edgesAdded++;
            }
        }
        return graph;
    }
}
`;