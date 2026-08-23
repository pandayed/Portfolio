






- In consistent hashing, the a hash function is deciced.
- The based on the output of the hash function a ring (hypothetical) is created.
- So, if the hash function outputs values from 0 to 9, then the hypothetical ring has 10 positions, 0 to 9, and then circling back to 0.
- The servers are given indentifiers.
- The identifiers are then hashed to get the position on the ring.

For example: server identifier = abc; hash(abc) = 5; so the server sits at position 5 on the ring.

- Each server is responsible for the portion of the ring between it and the next server in clockwise order.

- The data that is to be stored/updated/deleted just like the primitive hashing has a key, and generally the same hash fucntion as used for the ring and servers is used to hash the data key. So that hash outputs are comparable. The system can use a different hash function but the hash spaces must be equivalent, because if the ring/server hash produces 0-9 space and the data hash produces 0-99 space, it would increase unnecessary complexity as the to map the data key space which is 0-99 to the ring space which is 0-9.
