export default `#include<bits/stdc++.h>
using namespace std;

const int TEST_CASES = 1;
const int LEN = 10;

int getRandomNumber(int a, int b) {
    return a + rand() % (b - a + 1);
}

string getRandomString(int n) {
    const string charset = "abcdefghijklmnopqrstuvwxyz";
    string result;
    for (int i = 0; i < n; ++i) {
        result += charset[rand() % charset.length()];
    }
    return result;
}

struct pair_hash {
    template <class T1, class T2>
    size_t operator () (const pair<T1, T2>& p) const {
        auto hash1 = hash<T1>{}(p.first);
        auto hash2 = hash<T2>{}(p.second);
        return hash1 ^ hash2;
    }
};

vector<vector<int>> getRandomGraph(long long int n, long long int m) {
    long long int maxEdges = n * (n-1) / 2;
    m = min(maxEdges, m);
    
    int edgesAdded = 0;
    unordered_map<pair<int, int>, bool, pair_hash> isEdge;
    
    vector<vector<int>> graph(n);
    
    while (edgesAdded < m) {
        int u = rand() % n;
        int v = rand() % n;

        if (u != v && !isEdge[make_pair(u,v)]) {
            graph[u].push_back(v);
            graph[v].push_back(u);
            isEdge[make_pair(u, v)] = true;
            isEdge[make_pair(v, u)] = true;
            edgesAdded++;
        }
    }
    return graph;
}

int main() {
    srand(time(0));
    int t = getRandomNumber(1, TEST_CASES);
    cout << t << endl;;
    while(t--) {
        int n = getRandomNumber(1, LEN);
        int m = getRandomNumber(1, (n * (n-1)) / 2);
        cout << n << " " << m << endl;
        
        vector<vector<int>> adj = getRandomGraph(n, m);
        for(int i=0; i<n; i++) {
            for(int x: adj[i]) {
                if(i < x) {
                    cout << i + 1 << " " << x + 1 << endl;
                }
            }
        }
        cout << endl;
    }
}
`;