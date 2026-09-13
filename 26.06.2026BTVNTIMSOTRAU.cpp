#include <iostream>
using namespace std;

int main() {
    for (int traudung = 0; traudung <= 100; traudung++) {
        for (int traunam = 0; traunam <= 100 - traudung; traunam++) {

            int traugia = 100 - traudung - traunam;

            if (traugia % 3 == 0 &&
                traudung * 15 + traunam * 9 + traugia / 3 == 100) {

                cout << "Trau dung: " << traudung
                     << " | Trau nam: " << traunam
                     << " | Trau gia: " << traugia
                     << endl;
            }
        }
    }

    return 0;
}