export default `#include<bits/stdc++.h>
using namespace std;

const int TEST_CASES = 1;
const int LEN = 10;
const int MAX_NUM = 30;

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

int main() {
    srand(time(0));
    int t = getRandomNumber(1, TEST_CASES);
    cout << t << endl;
    while(t--) {
        int n = getRandomNumber(1, LEN);
        cout << n << endl;
        cout << getRandomString(n) << endl;
    }
}
`;
