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

vector<int> generateRandomOrder(int n) {
    vector<int> result;
    for (int i = 1; i <= n; ++i) {
        result.push_back(i);
    }
    unsigned seed = chrono::system_clock::now().time_since_epoch().count();
    shuffle(result.begin(), result.end(), default_random_engine(seed));
    return result;
}

int main() {
    srand(time(0));
    int t = getRandomNumber(1, TEST_CASES);
    cout << t << endl;;
    while(t--) {
        int n = getRandomNumber(1, LEN);
        cout << n << endl;
        vector<int> A = generateRandomOrder(n - 1);
        for(int i=0; i<n-1; i++) {
            cout << A[i] << " ";
        }
        cout << endl;
    }
}
`;