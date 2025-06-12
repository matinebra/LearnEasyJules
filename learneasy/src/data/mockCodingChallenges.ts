// src/data/mockCodingChallenges.ts
export interface TestCase {
  input: string;
  expectedOutput: string;
  actualOutput?: string; // For displaying results
  passed?: boolean;      // For displaying results
}

export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  defaultCode: Record<string, string>; // Language -> Code
  testCases: TestCase[];
  explanation: {
    text: string[];
    diagram?: string; // Placeholder for diagram image/component
  };
}

export const mockCodingChallenges: Record<string, CodingChallenge> = {
  'two-sum': {
    id: 'two-sum',
    title: 'Two Sum',
    description: "Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`_.

You may assume that each input would have **exactly one solution**, and you may not use the _same_ element twice.

You can return the answer in any order.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "**Only one valid answer exists.**"
    ],
    defaultCode: {
      javascript: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Write your code here\n};",
      python: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write your code here\n        pass"
    },
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]" },
      { input: "nums = [3,3], target = 6", expectedOutput: "[0,1]" },
    ],
    explanation: {
      text: [
        "The problem asks us to find two numbers in a given array that add up to a specific target.",
        "A naive approach would be to use nested loops to check every pair of numbers. This would have a time complexity of O(n^2).",
        "A more optimal approach is to use a hash map (or a JavaScript object) to store the numbers we have seen so far and their indices. For each number, we calculate its complement (target - current_number). If the complement is already in the hash map, we have found our pair.",
        "This approach has a time complexity of O(n) because we iterate through the array only once."
      ],
      diagram: "Diagram: Hash map approach for Two Sum (Placeholder)"
    }
  },
  // Add another challenge if desired
};
