
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(node) {
    if (this.head == null) {
      this.head = node;
      this.tail = node;
    } else {
      let currentNode = this.head;
      while (currentNode != null) {
        if (currentNode.key == node.key) {
          currentNode.value = node.value;
          return;
        }
        currentNode = currentNode.next;
      }
      
      this.tail.next = node;
      this.tail = node;
    }
  }

  find(key) {
    let currentNode = this.head;

    do {
      if (currentNode.key == key) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    while (currentNode != null);

    return null;
  }

  pop(key) {
    if (this.size() == 0) console.log("not found!");

    if (this.size() == 1) {
      if (this.head.key == key) {
        this.head = null;
        this.tail = null;
        console.log("removed!");
      } else {
        console.log("not found!");
      }
    } else {
      let currentNode = this.head;

      if (currentNode.key == key) {
        this.head = null;
        this.tail = null;
        console.log("removed!");
        return;
      }

      while (currentNode.next != null) {
        let nextNode = currentNode.next;

        if (nextNode.key == key) {
          currentNode.next = nextNode.next;
          console.log("removed!");
          return;
        }
        currentNode = nextNode;
      }
      console.log("not found!");
    }
  }

  size() {
    let size = 0;
    let currentNode = this.head;

    while(currentNode != null) {
      size++;
      currentNode = currentNode.next;
    }

    return size;
  }

  getEvery(property, node = this.head) {
    if (this.head == null) return null;

    let currentNode = node;

    if (currentNode == this.tail) {
      let array = new Array();
      array.push(node[property]);
      return array;
    }
    
    let resultOfNextNode = this.getEvery(property, currentNode.next);
    resultOfNextNode.push(node[property]);
    return resultOfNextNode;
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}


class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null);
    this.occupied = 0;
  } 

  hash(key) {
    let hashCode = 0;
        
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.buckets.length;
    }
  
    return hashCode; 
  }

  set(key, value) {
    if (this.occupied > this.buckets.length * 0.77) {
      this.addBuckets();
    }

    let hash = this.hash(key);
    if (this.buckets[hash] == null) {
      this.buckets[hash] = new LinkedList();
      this.occupied++;
    }

    let pair = new Node(key, value);
    this.buckets[hash].add(pair);
  }

  get(key) {
    let bucket = this.buckets[this.hash(key)];
    let node = bucket.find(key);

    if (node) {
      return node.value;
    }
    return null;
  }

  has(key) {
    let bucket = this.buckets[this.hash(key)];
    let node = bucket.find(key);

    if (node) {
      return true;
    }
    return false;
  }

  remove(key) {
    let hash = this.hash(key);
    let bucket = this.buckets[hash];
    bucket.pop(key);
  }

  length() {
    let storedKeys = 0;
    this.buckets.forEach(bucket => {
      if (bucket == null) return;
      storedKeys += bucket.size();
    });
    return storedKeys;
  }

  clear() {
    this.buckets = new Array(16).fill(null);
  }

  keys() {
    let allKeys = [];

    this.buckets.forEach(bucket => {
      if (bucket != null) {
        allKeys = allKeys.concat(bucket.getEvery('key'));
      }
    })
    
    return allKeys;
  }

  values() {
    let allValues = [];

    this.buckets.forEach(bucket => {
      if (bucket == null) return;
      allValues = allValues.concat(bucket.getEvery('value'));
    })

    return allValues;
  }

  entries() {
    let allEntries = [];

    this.buckets.forEach(bucket => {
      if (bucket == null) return;

      let keys = bucket.getEvery('key');
      let values = bucket.getEvery('value');

      let length = keys.length || values.length;

      for (let i = 0; i < length; i++) {
        let keyValuePairs = [];

        keyValuePairs.push(keys[i]);
        keyValuePairs.push(values[i]);
  
        allEntries.push(keyValuePairs);
      }

    })
    
    return allEntries;
  }



  addBuckets() {
    let length = this.buckets.length;
    for (let i = 0; i < length; i++) {
      let newBucket = null;
      this.buckets.push(newBucket);
    }
  }

  getSize() {
    return this.buckets.length;
  }
}


module.exports = { HashMap };