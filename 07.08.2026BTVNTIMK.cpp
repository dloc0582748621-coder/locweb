#include <bits/stdc++.h>
using namespace std;
int tongchuso (long long n)
{
    int S = 0;
    while (n != 0)
    {
        S = S + n % 10;
        n = n / 10;
                    } 
    return S;
                      }
int main ()
{
	printf(" input:");
    long long n;
  cin >> n;ý 
   printf(" output:");   
   cout << tongchuso(n);
    	
    return 0;
                          }
