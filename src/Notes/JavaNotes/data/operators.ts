import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'operators',
    title: 'Operators and expressions',
    summary: 'Build expressions, compare values, combine boolean conditions, and update variables.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    sections: [
        {
            id: 'operators-and-conditions',
            title: 'Operators, expressions, and conditions',
            bullets: [
                'An operator performs an operation on values. Those values are its operands.',
                'An expression combines values and operators to produce a value, such as count + 1.',
                'A condition is an expression whose result is boolean: true or false.',
                '= assigns a value. == compares values. These operators have different jobs.',
                'Use parentheses to group an expression. Multiplication and division run before addition and subtraction.',
                'With a String operand, + joins text. Other + operations add numbers.',
                '&& and || use short-circuit evaluation. && skips the right side when the left side is false. || skips it when the left side is true.',
            ],
            table: {
                columns: ['Operator', 'Operation'],
                rows: [
                    ['+  -  *  /  %', 'Add, subtract, multiply, divide, and take the remainder.'],
                    ['==  !=  <  <=  >  >=', 'Compare values and return a boolean.'],
                    ['&&  ||  !', 'Boolean AND, OR, and NOT.'],
                    ['+=  -=  *=  /=  %=', 'Calculate and assign the result back to the variable.'],
                    ['++  --', 'Increase or decrease a variable by one. Prefix changes it before its expression value is used; postfix changes it afterward.'],
                ],
            },
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        int count = 3;
        count += 2;
        boolean enough = count >= 4;
        boolean even = count % 2 == 0;
        System.out.println(count);
        System.out.println(enough && !even);
        System.out.println("count=" + count);
    }
}`,
                result: '5\ntrue\ncount=5',
            }],
        },
    ],
};

export default note;
