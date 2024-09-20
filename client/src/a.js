const ProblemSetExamples = {
  TwoSum: [
    {
      input: "[2, 7, 11, 15], 9",
      output: [0, 1],
    },
    {
      input: "[3, 2, 4], 6",
      output: [1, 2],
    },
    {
      input: "[3, 3], 6",
      output: [0, 1],
    },
    // Add more examples if needed
  ],

  AddTwoNumbers: [
    {
      input: "{2 -> 4 -> 3}, {5 -> 6 -> 4}",
      output: "{7 -> 0 -> 8}",
    },
    {
      input: "{5}, {5}",
      output: "{0 -> 1}",
    },
    {
      input: "{1 -> 8}, {0}",
      output: "{1 -> 8}",
    },
    // Add more examples if needed
  ],

  LongestSubstringWithoutRepeatingCharacters: [
    {
      input: "abcabcbb",
      output: 3,
    },
    {
      input: "bbbbb",
      output: 1,
    },
    {
      input: "pwwkew",
      output: 3,
    },
    // Add more examples if needed
  ],

  MedianOfTwoSortedArrays: [
    {
      input: "[1, 3], [2]",
      output: 2.0,
    },
    {
      input: "[1, 2], [3, 4]",
      output: 2.5,
    },
    {
      input: "[0, 0], [0, 0]",
      output: 0.0,
    },
    // Add more examples if needed
  ],

  LongestPalindromicSubstring: [
    {
      input: "babad",
      output: "bab",
    },
    {
      input: "cbbd",
      output: "bb",
    },
    {
      input: "a",
      output: "a",
    },
    // Add more examples if needed
  ],

  ZigZagConversion: [
    {
      input: "PAYPALISHIRING, 3",
      output: "PAHNAPLSIIGYIR",
    },
    {
      input: "PAYPALISHIRING, 4",
      output: "PINALSIGYAHRPI",
    },
    {
      input: "AB, 1",
      output: "AB",
    },
    // Add more examples if needed
  ],

  ReverseInteger: [
    {
      input: 123,
      output: 321,
    },
    {
      input: -123,
      output: -321,
    },
    {
      input: 120,
      output: 21,
    },
    // Add more examples if needed
  ],

  StringToInteger: [
    {
      input: "42",
      output: 42,
    },
    {
      input: "   -42",
      output: -42,
    },
    {
      input: "4193 with words",
      output: 4193,
    },
    // Add more examples if needed
  ],

  RegularExpressionMatching: [
    {
      input: "aa, a*",
      output: true,
    },
    {
      input: "mississippi, mis*is*p*.",
      output: false,
    },
    {
      input: "ab, .*",
      output: true,
    },
    // Add more examples if needed
  ],
};

export default ProblemSetExamples;
