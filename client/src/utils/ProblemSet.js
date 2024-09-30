const ProblemSet = [
  {
    problemID : 1,
    problem: "TwoSum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    constraints: {
      c1: "An array of integers (0 <= nums.length <= 10^5, -10^9 <= nums[i] <= 10^9)",
      c2: "An integer (-10^9 <= target <= 10^9)",
    },
    expectedValue:
      "An array of two integers representing the indices of the two numbers.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    template : {
        cpp : `#include <bits/stdc++.h>;
using namespace std;

int main() {
        
    // you code here
        
    return 0;
}
        `,
       java : `import java.util.*;

public class DSAExample {
    public static void main(String[] args) {
        // Your code here
    }
}
`
    },
    solution: {
      cpp: `#include<iostream>
  #include<vector>
  #include<unordered_map>
  using namespace std;
  
  vector<int> twoSum(vector<int>& nums, int target) {
      unordered_map<int, int> hash_map;
      vector<int> result;
  
      for (int i = 0; i < nums.size(); ++i) {
          int complement = target - nums[i];
          if (hash_map.find(complement) != hash_map.end()) {
              result.push_back(hash_map[complement]);
              result.push_back(i);
              return result;
          }
          hash_map[nums[i]] = i;
      }
  
      return result;
  }`,
      java: `import java.util.HashMap;
  
  class TwoSum {
      public int[] twoSum(int[] nums, int target) {
          HashMap<Integer, Integer> map = new HashMap<>();
  
          for (int i = 0; i < nums.length; i++) {
              int complement = target - nums[i];
              if (map.containsKey(complement)) {
                  return new int[]{map.get(complement), i};
              }
              map.put(nums[i], i);
          }
  
          return new int[]{};
      }
  }`,
    },
    demo : [
      {
        input : "Input : [2, 7, 11, 15]",
        output: "[0 , 1]",
      },
      {
        input: "Input : [3, 2, 4]",
        output: "[1, 2]",
      },
      {
        input: "Input : [3, 3]",
        output: "[0, 1]",
      },
    ]
  },

  {
    problemID : 2,
    problem: "Add Two Numbers",
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit.",
    difficulty: "Medium",
    tags: ["Linked List", "Math"],
    constraints: {
      c1: "A linked list representing a non-negative integer.",
      c2: "A linked list representing a non-negative integer.",
    },
    expectedValue: "A new linked list representing the sum of the two numbers.",
    timeComplexity:
      "O(max(m, n)), where m and n are the lengths of the two linked lists.",
    spaceComplexity: "O(max(m, n))",
    template : {
        cpp : `#include <bits/stdc++.h>;
using namespace std;

int main() {
        
    // you code here
        
    return 0;
}
        `,
       java : `import java.util.*;

public class DSAExample {
    public static void main(String[] args) {
        // Your code here
    }
}
`
    },
    solution: {
      cpp: `#include<iostream>
  using namespace std;
  
  // Definition for singly-linked list.
  struct ListNode {
      int val;
      ListNode *next;
      ListNode(int x) : val(x), next(NULL) {}
  };
  
  ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
      ListNode dummy(0);
      ListNode* current = &dummy;
      int carry = 0;
  
      while (l1 || l2 || carry) {
          int sum = (l1 ? l1->val : 0) + (l2 ? l2->val : 0) + carry;
          carry = sum / 10;
          
          current->next = new ListNode(sum % 10);
          current = current->next;
  
          if (l1) l1 = l1->next;
          if (l2) l2 = l2->next;
      }
  
      return dummy.next;
  }`,
      java: `class ListNode {
      int val;
      ListNode next;
  
      ListNode(int x) {
          val = x;
      }
  }
  
  public class AddTwoNumbers {
      public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
          ListNode dummy = new ListNode(0);
          ListNode current = dummy;
          int carry = 0;
  
          while (l1 != null || l2 != null || carry != 0) {
              int sum = (l1 != null ? l1.val : 0) + (l2 != null ? l2.val : 0) + carry;
              carry = sum / 10;
  
              current.next = new ListNode(sum % 10);
              current = current.next;
  
              if (l1 != null) l1 = l1.next;
              if (l2 != null) l2 = l2.next;
          }
  
          return dummy.next;
      }
  }`,
    },
    demo : [
      {
        input: "Input : {2 -> 4 -> 3}, {5 -> 6 -> 4}",
        output: "{7 -> 0 -> 8}",
      },
      {
        input: "Input : {5}, {5}",
        output: "{0 -> 1}",
      },
      {
        input: "Input : {1 -> 8}, {0}",
        output: "{1 -> 8}",
      },
      // Add more examples if needed
    ],
  },

  {
    problemID : 3,
    problem: "Longest Substring Without Repeating Characters",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    tags: ["Hash Table","String"],
    constraints: {
      c1: "Input Input : ring (0 <= s.length <= 5 * 10^4)",
    },
    expectedValue:
      "An integer representing the length of the longest substring without repeating characters.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(m, n)), where m is the size of the character set.",
    template : {
        cpp : `#include <bits/stdc++.h>;
using namespace std;

int main() {
        
    // you code here
        
    return 0;
}
        `,
       java : `import java.util.*;

public class DSAExample {
    public static void main(String[] args) {
        // Your code here
    }
}
`
    },
    solution: {
      cpp: `#include<iostream>
  #include<unordered_set>
  using namespace std;
  
  int lengthOfLongestSubstring(string s) {
      unordered_set<char> charSet;
      int maxLength = 0, left = 0, right = 0;
  
      while (right < s.length()) {
          if (charSet.find(s[right]) == charSet.end()) {
              charSet.insert(s[right]);
              maxLength = max(maxLength, right - left + 1);
              right++;
          } else {
              charSet.erase(s[left]);
              left++;
          }
      }
  
      return maxLength;
  }`,
      java: `import java.util.HashSet;
  
  public class LongestSubstringWithoutRepeatingCharacters {
      public int lengthOfLongestSubstring(String s) {
          HashSet<Character> charSet = new HashSet<>();
          int maxLength = 0, left = 0, right = 0;
  
          while (right < s.length()) {
              if (!charSet.contains(s.charAt(right))) {
                  charSet.add(s.charAt(right));
                  maxLength = Math.max(maxLength, right - left + 1);
                  right++;
              } else {
                  charSet.remove(s.charAt(left));
                  left++;
              }
          }
  
          return maxLength;
      }
  }`,
    },
    demo : [
      {
        input: "Input : abcabcbb",
        output: `3`,
      },
      {
        input: "Input : bbbbb",
        output: `1`,
      },
      {
        input: "Input : pwwkew",
        output: `3`,
      },
      // Add more examples if needed
    ],
  },

  {
    problemID : 4,
    problem: "Median Of Two Sorted Arrays",
    description:
      "There are two sorted arrays nums1 and nums2 of size m and n respectively. Find the median of the two sorted arrays.",
    difficulty: "Hard",
    tags: ["Array", "Binary Search"],
    constraints: {
      c1: "Sorted array (0 <= nums1.length <= 1000)",
      c2: "Sorted array (0 <= nums2.length <= 1000)",
    },
    expectedValue: "A double representing the median of the two sorted arrays.",
    timeComplexity:
      "O(log(min(m, n))), where m and n are the lengths of the two arrays.",
    spaceComplexity: "O(1)",
    template : {
        cpp : `#include <bits/stdc++.h>;
using namespace std;

int main() {
        
    // you code here
        
    return 0;
}
        `,
       java : `import java.util.*;

public class DSAExample {
    public static void main(String[] args) {
        // Your code here
    }
}
`
    },
    solution: {
      cpp: `#include<iostream>
  #include<vector>
  using namespace std;
  
  double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
      if (nums1.size() > nums2.size()) {
          swap(nums1, nums2);
      }
  
      int m = nums1.size();
      int n = nums2.size();
      int left = 0, right = m;
      int partitionX, partitionY, maxX, maxY;
  
      while (left <= right) {
          partitionX = (left + right) / 2;
          partitionY = (m + n + 1) / 2 - partitionX;
  
          maxX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];
          maxY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];
  
          int minX = (partitionX == m) ? INT_MAX : nums1[partitionX];
          int minY = (partitionY == n) ? INT_MAX : nums2[partitionY];
  
          if (maxX <= minY && maxY <= minX) {
              if ((m + n) % 2 == 0) {
                  return (double)(max(maxX, maxY) + min(minX, minY)) / 2;
              } else {
                  return max(maxX, maxY);
              }
          } else if (maxX > minY) {
              right = partitionX - 1;
          } else {
              left = partitionX + 1;
          }
      }
  
      throw invalid_argument("Input Input : rays are not sorted!");
  }`,
      java: `public class MedianOfTwoSortedArrays {
      public double findMedianSortedArrays(int[] nums1, int[] nums2) {
          if (nums1.length > nums2.length) {
              int[] temp = nums1;
              nums1 = nums2;
              nums2 = temp;
          }
  
          int m = nums1.length;
          int n = nums2.length;
          int left = 0, right = m;
          int partitionX, partitionY, maxX, maxY;
  
          while (left <= right) {
              partitionX = (left + right) / 2;
              partitionY = (m + n + 1) / 2 - partitionX;
  
              maxX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
              maxY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
  
              int minX = (partitionX == m) ? Integer.MAX_VALUE : nums1[partitionX];
              int minY = (partitionY == n) ? Integer.MAX_VALUE : nums2[partitionY];
  
              if (maxX <= minY && maxY <= minX) {
                  if ((m + n) % 2 == 0) {
                      return (double) (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;
                  } else {
                      return Math.max(maxX, maxY);
                  }
              } else if (maxX > minY) {
                  right = partitionX - 1;
              } else {
                  left = partitionX + 1;
              }
          }
  
          throw new IllegalArgumentException("Input Input : rays are not sorted!");
      }
  }`,
    },
    demo : [
      {
        input: "Input : [1, 3], [2]",
        output: `2.0`,
      },
      {
        input: "Input : [1, 2], [3, 4]",
        output: `2.5`,
      },
      {
        input: "Input : [0, 0], [0, 0]",
        output: `0.0`,
      },
      // Add more examples if needed
    ],
  },

  {
    problemID : 5,
    problem: "Longest Palindromic Substring",
    description:
      "Given a string s, return the longest palindromic substring in s.",
    difficulty: "Medium",
    tags: ["String", "DynamicProgramming"],
    constraints: {
      c1: "Input Input : ring (1 <= s.length <= 1000)",
    },
    expectedValue: "A string representing the longest palindromic substring.",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(n^2)",
    template : {
        cpp : `#include <bits/stdc++.h>;
using namespace std;

int main() {
        
    // you code here
        
    return 0;
}
        `,
       java : `import java.util.*;

public class DSAExample {
    public static void main(String[] args) {
        // Your code here
    }
}
`
    },
    solution: {
      cpp: `#include<iostream>
  #include<vector>
  using namespace std;
  
  string longestPalindrome(string s) {
      int n = s.length();
      vector<vector<bool>> dp(n, vector<bool>(n, false));
      int start = 0, maxLength = 1;
  
      for (int i = 0; i < n; ++i) {
          dp[i][i] = true;
      }
  
      for (int len = 2; len <= n; ++len) {
          for (int i = 0; i <= n - len; ++i) {
              int j = i + len - 1;
  
              if (len == 2 && s[i] == s[j]) {
                  dp[i][j] = true;
                  start = i;
                  maxLength = len;
              } else if (s[i] == s[j] && dp[i + 1][j - 1]) {
                  dp[i][j] = true;
                  start = i;
                  maxLength = len;
              }
          }
      }
  
      return s.substr(start, maxLength);
  }`,
      java: `public class LongestPalindromicSubstring {
      public String longestPalindrome(String s) {
          int n = s.length();
          boolean[][] dp = new boolean[n][n];
          int start = 0, maxLength = 1;
  
          for (int i = 0; i < n; ++i) {
              dp[i][i] = true;
          }
  
          for (int len = 2; len <= n; ++len) {
              for (int i = 0; i <= n - len; ++i) {
                  int j = i + len - 1;
  
                  if (len == 2 && s.charAt(i) == s.charAt(j)) {
                      dp[i][j] = true;
                      start = i;
                      maxLength = len;
                  } else if (s.charAt(i) == s.charAt(j) && dp[i + 1][j - 1]) {
                      dp[i][j] = true;
                      start = i;
                      maxLength = len;
                  }
              }
          }
  
          return s.substring(start, start + maxLength);
      }
  }`,
    },
    demo : [
      {
        input: "Input : babad",
        output: "bab",
      },
      {
        input: "Input : cbbd",
        output: "bb",
      },
      {
        input: "Input : a",
        output: "a",
      },
      // Add more examples if needed
    ],
  },

  {
    problemID : 6 ,
    problem: "ZigZag Conversion",
    description:
      "The string 'PAYPALISHIRING' is written in a zigzag pattern on a given number of rows like this.",
    difficulty: "Medium",
    tags: ["String"],
    constraints: {
      c1: "Input Input : ring (1 <= s.length <= 1000)",
      c2: "Number of rows (1 <= numRows <= 1000)",
    },
    expectedValue:
      "A string representing the zigzag conversion of the input Input : ring.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    template : {
        cpp : `#include <bits/stdc++.h>;
using namespace std;

int main() {
        
    // you code here
        
    return 0;
}
        `,
       java : `import java.util.*;

public class DSAExample {
    public static void main(String[] args) {
        // Your code here
    }
}
`
    },
    solution: {
      cpp: `#include<iostream>
  #include<vector>
  using namespace std;
  
  string convert(string s, int numRows) {
      if (numRows == 1 || numRows >= s.length()) {
          return s;
      }
  
      vector<string> rows(numRows, "");
      int currentRow = 0;
      bool goingDown = false;
  
      for (char c : s) {
          rows[currentRow] += c;
          if (currentRow == 0 || currentRow == numRows - 1) {
              goingDown = !goingDown;
          }
          currentRow += goingDown ? 1 : -1;
      }
  
      string result = "";
      for (string row : rows) {
          result += row;
      }
  
      return result;
  }`,
      java: `public class ZigZagConversion {
      public String convert(String s, int numRows) {
          if (numRows == 1 || numRows >= s.length()) {
              return s;
          }
  
          StringBuilder[] rows = new StringBuilder[numRows];
          for (int i = 0; i < numRows; i++) {
              rows[i] = new StringBuilder();
          }
  
          int currentRow = 0;
          boolean goingDown = false;
  
          for (char c : s.toCharArray()) {
              rows[currentRow].append(c);
              if (currentRow == 0 || currentRow == numRows - 1) {
                  goingDown = !goingDown;
              }
              currentRow += goingDown ? 1 : -1;
          }
  
          StringBuilder result = new StringBuilder();
          for (StringBuilder row : rows) {
              result.append(row);
          }
  
          return result.toString();
      }
  }`,
    },
    demo : [
      {
        input: "Input : PAYPALISHIRING, 3",
        output: "PAHNAPLSIIGYIR",
      },
      {
        input: "Input : PAYPALISHIRING, 4",
        output: "PINALSIGYAHRPI",
      },
      {
        input: "Input : AB, 1",
        output: "AB",
      },
      // Add more examples if needed
    ],
  },

  {
    problemID : 7,
    problem: "Reverse Integer",
    description:
      "Given a signed 32-bit integer x, return x with its digits reversed.",
    difficulty: "Easy",
    tags: ["Math"],
    constraints: {
      c1: "A signed 32-bit integer (-2^31 <= x <= 2^31 - 1)",
    },
    expectedValue: "A signed 32-bit integer with reversed digits.",
    timeComplexity: "O(log(x))",
    spaceComplexity: "O(1)",
    template : {
        cpp : `#include <bits/stdc++.h>;
using namespace std;

int main() {
        
    // you code here
        
    return 0;
}
        `,
       java : `import java.util.*;

public class DSAExample {
    public static void main(String[] args) {
        // Your code here
    }
}
`
    },
    solution: {
      cpp: `#include<iostream>
  using namespace std;
  
  int reverse(int x) {
      long result = 0;
  
      while (x != 0) {
          result = result * 10 + x % 10;
          x /= 10;
      }
  
      if (result < INT_MIN || result > INT_MAX) {
          return 0;
      
  
      return static_cast<int>(result);
  }`,
      java: `public class ReverseInteger {
      public int reverse(int x) {
          long result = 0;
  
          while (x != 0) {
              result = result * 10 + x % 10;
              x /= 10;
          }
  
          if (result < Integer.MIN_VALUE || result > Integer.MAX_VALUE) {
              return 0;
          
  
          return (int) result;
      }
  }`,
    },
    demo : [
      {
        input: 23,
        output: 321,
      },
      {
        input: -123,
        output: -321,
      },
      {
        input: 20,
        output: 21,
      },
      // Add more examples if needed
    ],
  },

  {
    problemID : 8,
    problem: "String To Integer (atoi)",
    description:
      "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.",
    difficulty: "Medium",
    tags: ["String"],
    constraints: {
      c1: "Input Input : ring (0 <= s.length <= 200)",
    },
    expectedValue: "A 32-bit signed integer converted from the input Input : ring.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    template : {
        cpp : `#include <bits/stdc++.h>;
using namespace std;

int main() {
        
    // you code here
        
    return 0;
}
        `,
       java : `import java.util.*;

public class DSAExample {
    public static void main(String[] args) {
        // Your code here
    }
}
`
    },
    solution: {
      cpp: `#include<iostream>
  using namespace std;
  
  int myAtoi(string s) {
      int i = 0;
      while (i < s.length() && s[i] == ' ') {
          i++;
      }
  
      if (i == s.length()) {
          return 0;
      
  
      int sign = 1;
      if (s[i] == '+' || s[i] == '-') {
          sign = (s[i++] == '-') ? -1 : 1;
      }
  
      long result = 0;
      while (i < s.length() && isdigit(s[i])) {
          result = result * 10 + (s[i++] - '0');
          if (result * sign < INT_MIN) {
              return INT_MIN;
          } else if (result * sign > INT_MAX) {
              return INT_MAX;
          }
      }
  
      return static_cast<int>(result * sign);
  }`,
      java: `public class StringToInteger {
      public int myAtoi(String s) {
          int i = 0;
          while (i < s.length() && s.charAt(i) == ' ') {
              i++;
          }
  
          if (i == s.length()) {
              return 0;
          
  
          int sign = 1;
          if (s.charAt(i) == '+' || s.charAt(i) == '-') {
              sign = (s.charAt(i++) == '-') ? -1 : 1;
          }
  
          long result = 0;
          while (i < s.length() && Character.isDigit(s.charAt(i))) {
              result = result * 10 + (s.charAt(i++) - '0');
              if (result * sign < Integer.MIN_VALUE) {
                  return Integer.MIN_VALUE;
              } else if (result * sign > Integer.MAX_VALUE) {
                  return Integer.MAX_VALUE;
              }
          }
  
          return (int) (result * sign);
      }
  }`,
    },
    demo : [
      {
        input: "Input : 42",
        output: 42,
      },
      {
        input: "Input :    -42",
        output: -42,
      },
      {
        input: "Input : 4193 with words",
        output: 4193,
      },
      // Add more examples if needed
    ],
  },

  {
    problemID : 9,
    problem: "Regular Expression Matching",
    description:
      "Implement regular expression matching with support for '.' and '*'.",
    difficulty: "Hard",
    tags: ["String", "Backtracking"],
    constraints: {
      c1: "Input Input : ring (0 <= s.length <= 20)",
      c2: "Input Input : ttern (0 <= p.length <= 30)",
    },
    expectedValue:
      "A boolean indicating whether the input Input : ring matches the pattern.",
    timeComplexity:
      "O(sp), where s and p are the lengths of the input Input : ring and pattern, respectively.",
    spaceComplexity: "O(sp)",
    template : {
        cpp : `#include <bits/stdc++.h>;
using namespace std;

int main() {
        
    // you code here
        
    return 0;
}
        `,
       java : `import java.util.*;

public class DSAExample {
    public static void main(String[] args) {
        // Your code here
    }
}
`
    },
    solution: {
      cpp: `#include<iostream>
  #include<vector>
  using namespace std;
  
  bool isMatch(string s, string p) {
      int m = s.length();
      int n = p.length();
      vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
      dp[0][0] = true;
  
      for (int j = 1; j <= n; ++j) {
          if (p[j - 1] == '*') {
              dp[0][j] = dp[0][j - 2];
          }
      }
  
      for (int i = 1; i <= m; ++i) {
          for (int j = 1; j <= n; ++j) {
              if (p[j - 1] == s[i - 1] || p[j - 1] == '.') {
                  dp[i][j] = dp[i - 1][j - 1];
              } else if (p[j - 1] == '*') {
                  dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (s[i - 1] == p[j - 2] || p[j - 2] == '.'));
              }
          }
      }
  
      return dp[m][n];
  }`,
      java: `public class RegularExpressionMatching {
      public boolean isMatch(String s, String p) {
          int m = s.length();
          int n = p.length();
          boolean[][] dp = new boolean[m + 1][n + 1];
          dp[0][0] = true;
  
          for (int j = 1; j <= n; ++j) {
              if (p.charAt(j - 1) == '*') {
                  dp[0][j] = dp[0][j - 2];
              }
          }
  
          for (int i = 1; i <= m; ++i) {
              for (int j = 1; j <= n; ++j) {
                  if (p.charAt(j - 1) == s.charAt(i - 1) || p.charAt(j - 1) == '.') {
                      dp[i][j] = dp[i - 1][j - 1];
                  } else if (p.charAt(j - 1) == '*') {
                      dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (s.charAt(i - 1) == p.charAt(j - 2) || p.charAt(j - 2) == '.'));
                  }
              }
          }
  
          return dp[m][n];
      }
  }`,
    },
    demo : [
      {
        input: "Input : aa, a*",
        output: true,
      },
      {
        input: "Input : mississippi, mis*is*p*.",
        output: false,
      },
      {
        input: "Input : ab, .*",
        output: true,
      },
      // Add more examples if needed
    ],
  },


];
  



export default ProblemSet;
