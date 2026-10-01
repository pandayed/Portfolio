import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'equality-and-hashing',
    title: 'Equality, hashing, and set keys',
    summary: 'Understand why defining __eq__ alone makes instances unhashable and how to use immutable values as keys.',
    updatedOn: '2026-10-01',
    sections: [
        {
            id: 'equality-without-hash',
            title: 'What happens to the original User',
            paragraphs: ['Sets and dictionary keys require hashable objects. When a class defines __eq__ but does not define __hash__, Python sets __hash__ to None. Its instances therefore cannot be inserted into a set or used as dictionary keys.'],
            examples: [{
                code: [
                    'class User:',
                    '    def __init__(self, name):',
                    '        self.name = name',
                    '',
                    '    def __eq__(self, other):',
                    '        return self.name == other.name',
                    '',
                    '',
                    'users = {User("Mia")}',
                ].join('\n'),
                result: "With the intended line breaks, insertion raises TypeError: unhashable type: 'User'. The pasted run-together class definition is invalid Python. The original __eq__ also assumes other has a name attribute; comparison with an unrelated object can raise AttributeError.",
            }],
        },
        {
            id: 'hash-contract',
            title: 'The equality and hash rule',
            bullets: [
                'If a == b, then hash(a) must equal hash(b). Objects with the same hash need not be equal.',
                'A key’s hash must stay stable while that key is stored in a set or dictionary. Changing a field used by equality and hashing breaks reliable lookup.',
                'Adding only __hash__ to the original mutable User is unsafe because name can change after insertion.',
            ],
        },
        {
            id: 'safe-user',
            title: 'A safely hashable User',
            paragraphs: ['Use immutable fields for value equality. A frozen dataclass generates matching equality and hash behavior for these string fields. Frozen prevents normal field reassignment, and strings themselves are immutable.'],
            examples: [{
                code: [
                    'from dataclasses import dataclass',
                    '',
                    '',
                    '@dataclass(frozen=True)',
                    'class User:',
                    '    name: str',
                    '',
                    '',
                    'first = User("Mia")',
                    'second = User("Mia")',
                    'print(first == second)',
                    'print(len({first, second}))',
                    'print({first: "active"}[second])',
                ].join('\n'),
                result: 'The lines are True, 1, and active. Equal Users share a hash, so the set keeps one value and the dictionary can look up the value with an equal User.',
            }],
            bullets: ['Type annotations alone do not enforce that name is a string at runtime. Avoid mutable values in fields used for hashing.', 'If identity rather than field value should define equality, leave both __eq__ and __hash__ at their default implementations.'],
        },
    ],
};

export default note;
