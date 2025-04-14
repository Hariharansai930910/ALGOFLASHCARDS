Here are the optimized Python implementations for:

1. **Implement Trie (Prefix Tree)**  
2. **Design Add and Search Words Data Structure**  
3. **Word Search II**  

Each comes with time and space complexity analysis.

---

### **1. Implement Trie (Prefix Tree)**

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.isWord = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.isWord = True

    def search(self, word):
        node = self._find(word)
        return node is not None and node.isWord

    def startsWith(self, prefix):
        return self._find(prefix) is not None

    def _find(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node
```

**Time Complexity:**
- `insert`: O(L)  
- `search`: O(L)  
- `startsWith`: O(L)  
Where **L** is the length of the word.

**Space Complexity:** O(N)  
Where **N** is the total number of characters inserted.

### 1. **Implement Trie (Prefix Tree)**

**✅ One-liner:**  
Use a nested dictionary where each node is a character map, ending with a special end marker.

**👶 3-liner for kids:**  
We build a tree where each letter has its own branch.  
We follow each letter step by step when adding a word.  
A special symbol tells us when a word ends.

**🧠 Mnemonics:**
- "Start root" → `self.root = {}`
- "Insert char by char" → `node = node.setdefault(char, {})`
- "Mark end of word" → `node['#'] = True`

---

### **2. Design Add and Search Words Data Structure**

```python
class WordDictionary:
    def __init__(self):
        self.root = {}

    def addWord(self, word):
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node['#'] = True  # End of word

    def search(self, word):
        def dfs(node, i):
            if i == len(word):
                return '#' in node
            if word[i] == '.':
                return any(dfs(child, i + 1) for child in node if child != '#')
            return word[i] in node and dfs(node[word[i]], i + 1)

        return dfs(self.root, 0)
```

**Time Complexity:**
- `addWord`: O(L)  
- `search`: Worst case O(26^L) if all characters are `.`  
Where **L** is the length of the word.

**Space Complexity:** O(N)  
Where **N** is the total number of characters inserted.

### 2. **Design Add and Search Words Data Structure**

**✅ One-liner:**  
Extend Trie with DFS to handle wildcards (`.`) during search.

**👶 3-liner for kids:**  
We store words in a special tree (Trie).  
When searching, we can use `.` to mean any letter.  
We check all possible paths for matches.

**🧠 Mnemonics:**
- "Dot means explore" → `if char == '.': try all children`
- "End match" → `if at end and '#' in node: return True`
- "DFS search" → `searchHelper(word, index, node)`


---

### **3. Word Search II**

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None  # Store word at the end

class Solution:
    def findWords(self, board, words):
        root = TrieNode()

        # Build Trie
        for word in words:
            node = root
            for ch in word:
                if ch not in node.children:
                    node.children[ch] = TrieNode()
                node = node.children[ch]
            node.word = word

        res = []
        rows, cols = len(board), len(board[0])

        def dfs(r, c, node):
            char = board[r][c]
            if char not in node.children:
                return
            nxt_node = node.children[char]
            if nxt_node.word:
                res.append(nxt_node.word)
                nxt_node.word = None  # Avoid duplicates

            board[r][c] = '#'
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != '#':
                    dfs(nr, nc, nxt_node)
            board[r][c] = char

        for r in range(rows):
            for c in range(cols):
                dfs(r, c, root)

        return res
```

**Time Complexity:**  
- Building Trie: O(W * L)  
- DFS Search: O(M * N * 4^L)  
  - Where M × N is board size, L is max word length, W is number of words

**Space Complexity:** O(W * L) for Trie + O(L) recursion depth


### 3. **Word Search II**

**✅ One-liner:**  
Build a Trie of words, then DFS through board to match prefixes.

**👶 3-liner for kids:**  
We put all words into a search tree (Trie).  
Then we walk around the board letter by letter.  
If we match a word path, we add it to our answers.

**🧠 Mnemonics:**
- "Build Trie first" → `for word in words: insert(word)`
- "Explore neighbors" → `dfs(i, j, node)`
- "Found word" → `if '#' in node: add to result`

---

