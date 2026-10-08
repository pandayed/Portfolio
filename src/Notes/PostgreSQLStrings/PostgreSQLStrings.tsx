import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import { POSTGRESQL_STRINGS_ROUTE, POSTGRESQL_NOTES_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const textValuesQuery = `SELECT
    'O''Reilly'::text AS quoted_name,
    ''::text AS empty_text,
    NULL::text AS missing_text;`;

const concatenateQuery = `SELECT
    'Post' || 'greSQL' AS with_operator,
    CONCAT('Order ', 42) AS with_function,
    CONCAT_WS(' ', 'Ada', NULL, 'Lovelace') AS full_name;`;

const nullQuery = `SELECT
    'Ada' || NULL::text AS operator_null,
    CONCAT('Ada', NULL::text) AS concat_null,
    'Ada' || COALESCE(NULL::text, '') AS with_default;`;

const caseQuery = `SELECT
    LOWER('PostgreSQL') AS lower_case,
    UPPER('PostgreSQL') AS upper_case,
    INITCAP('hello SQL world') AS title_case;`;

const lengthQuery = `-- Byte counts below assume a UTF8 database.
SELECT
    LENGTH('café') AS characters,
    CHAR_LENGTH('café') AS same_characters,
    OCTET_LENGTH('café') AS bytes;`;

const extractQuery = `SELECT
    SUBSTRING('PostgreSQL' FROM 5 FOR 3) AS middle,
    LEFT('PostgreSQL', 4) AS first_four,
    RIGHT('PostgreSQL', 3) AS last_three;`;

const overlayQuery = `SELECT OVERLAY('123-456' PLACING 'XXX' FROM 1 FOR 3)
    AS masked_text;`;

const trimQuery = `SELECT
    TRIM('  Ada  ') AS trimmed,
    LTRIM('  Ada  ') AS left_trimmed,
    RTRIM('  Ada  ') AS right_trimmed,
    BTRIM('xyAdaxy', 'xy') AS custom_trimmed;`;

const blankQuery = `SELECT
    NULLIF(TRIM('   '), '') AS blank_as_null,
    COALESCE(NULLIF(TRIM('   '), ''), 'Unknown') AS display_name;`;

const positionQuery = `SELECT
    POSITION('SQL' IN 'PostgreSQL') AS sql_position,
    STRPOS('PostgreSQL', 'SQL') AS same_position,
    STRPOS('PostgreSQL', 'xyz') AS not_found;`;

const replaceQuery = `SELECT
    REPLACE('red-red-blue', 'red', 'green') AS replaced,
    TRANSLATE('a-b/c', '-/', '') AS removed_characters,
    TRANSLATE('abc', 'ac', 'XY') AS mapped_characters;`;

const splitQuery = `SELECT
    SPLIT_PART('ada@example.com', '@', 1) AS user_name,
    SPLIT_PART('ada@example.com', '@', 2) AS domain,
    STRING_TO_ARRAY('red,green,blue', ',') AS colors;`;

const padQuery = `SELECT
    LPAD('42', 5, '0') AS padded_left,
    RPAD('PG', 5, '.') AS padded_right,
    LPAD('123456', 4, '0') AS shortened;`;

const repeatQuery = `SELECT
    REPEAT('ha', 3) AS repeated,
    REVERSE('abc') AS reversed;`;

const likeQuery = `SELECT
    'PostgreSQL' LIKE 'Post%' AS prefix_match,
    'PostgreSQL' LIKE '%SQL' AS suffix_match,
    'PostgreSQL' ILIKE '%sql%' AS ignore_case,
    'cat' LIKE 'c_t' AS one_character;`;

const escapeQuery = `SELECT
    '50% off' LIKE '50!% off' ESCAPE '!' AS literal_percent,
    'a_b' LIKE 'a!_b' ESCAPE '!' AS literal_underscore;`;

const regexQuery = `SELECT
    'Order 42' ~ '[0-9]+' AS contains_digits,
    'Order 42' ~ '^[0-9]+$' AS only_digits,
    'PostgreSQL' ~* 'sql$' AS ignore_case;`;

const regexReplaceQuery = `SELECT
    REGEXP_REPLACE('a1b2c3', '[0-9]', '') AS first_removed,
    REGEXP_REPLACE('a1b2c3', '[0-9]', '', 'g') AS all_removed;`;

const formatQuery = `SELECT FORMAT('Hello, %s! You have %s orders.', 'Ada', 3)
    AS message;`;

const aggregateQuery = `WITH people(team, name) AS (
    VALUES
        ('A', 'Bob'),
        ('A', 'Ada'),
        ('A', NULL),
        ('B', 'Cara')
)
SELECT team, STRING_AGG(name, ', ' ORDER BY name) AS names
FROM people
GROUP BY team
ORDER BY team;`;

const PostgreSQLStrings = () => (
    <ArticleLayout
        title="String functions and operations in PostgreSQL"
        route={POSTGRESQL_STRINGS_ROUTE}
        sections={sections}
        backRoute={POSTGRESQL_NOTES_ROUTE}
        backLabel="Back to PostgreSQL notes"
    >
        <section className="Article__section" aria-labelledby="text-values">
            <h2 id="text-values" className="SectionTitle">Text values and quotes</h2>
            <ul className="Article__notes">
                <li>A string is a sequence of characters, such as a name or an email address.</li>
                <li><code>text</code> stores variable-length strings. <code>varchar(n)</code> limits them to <code>n</code> characters.</li>
                <li><code>char(n)</code> pads values with spaces. Most string functions convert it to <code>text</code> and remove its trailing padding.</li>
                <li>Single quotes mark a string value. Write two single quotes to include one quote inside it.</li>
                <li>Double quotes mark an identifier, such as a column name. They do not mark a string value.</li>
                <li><code>::text</code> is a cast. It converts a value to the <code>text</code> type.</li>
                <li><code>''</code> is an empty string. <code>NULL</code> means a missing or unknown value.</li>
                <li>These examples use <code>SELECT</code> to show results. They do not change stored values.</li>
                <li>The examples assume ordinary case-sensitive text comparison rules. PostgreSQL 18 also supports custom collations that can change substring matching.</li>
            </ul>
            <CodeBlock language="sql">{textValuesQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">quoted_name</th><th scope="col">empty_text</th><th scope="col">missing_text</th></tr></thead>
                    <tbody><tr><td>O'Reilly</td><td><code>''</code> (empty)</td><td>NULL</td></tr></tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="concatenate-text">
            <h2 id="concatenate-text" className="SectionTitle">Join text and handle NULL</h2>
            <ul className="Article__notes">
                <li>Concatenation joins strings into one string.</li>
                <li><code>||</code> joins two values. At least one must be a string for text concatenation.</li>
                <li><code>CONCAT</code> joins several values and converts them to text.</li>
                <li><code>CONCAT_WS(separator, ...)</code> puts a separator between values. WS means “with separator”.</li>
            </ul>
            <CodeBlock language="sql">{concatenateQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">with_operator</th><th scope="col">with_function</th><th scope="col">full_name</th></tr></thead>
                    <tbody><tr><td>PostgreSQL</td><td>Order 42</td><td>Ada Lovelace</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>||</code> returns <code>NULL</code> if either value is <code>NULL</code>.</li>
                <li><code>CONCAT</code> and <code>CONCAT_WS</code> skip <code>NULL</code> value arguments. They keep empty strings.</li>
                <li><code>CONCAT_WS</code> returns <code>NULL</code> if its separator is <code>NULL</code>.</li>
                <li><code>COALESCE(value, fallback)</code> returns the first non-<code>NULL</code> value.</li>
            </ul>
            <CodeBlock language="sql">{nullQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">operator_null</th><th scope="col">concat_null</th><th scope="col">with_default</th></tr></thead>
                    <tbody><tr><td>NULL</td><td>Ada</td><td>Ada</td></tr></tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="change-case">
            <h2 id="change-case" className="SectionTitle">Change letter case</h2>
            <ul className="Article__notes">
                <li><code>LOWER</code> changes letters to lowercase. <code>UPPER</code> changes them to uppercase.</li>
                <li><code>INITCAP</code> makes the first letter of each word uppercase and the rest lowercase.</li>
                <li><code>INITCAP</code> treats letters and numbers as word characters. Other characters separate words.</li>
                <li>Case conversion follows the applicable locale rules. A locale defines language and regional behavior.</li>
            </ul>
            <CodeBlock language="sql">{caseQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">lower_case</th><th scope="col">upper_case</th><th scope="col">title_case</th></tr></thead>
                    <tbody><tr><td>postgresql</td><td>POSTGRESQL</td><td>Hello Sql World</td></tr></tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="measure-text">
            <h2 id="measure-text" className="SectionTitle">Count characters and bytes</h2>
            <ul className="Article__notes">
                <li><code>LENGTH(text)</code> and <code>CHAR_LENGTH(text)</code> count characters, including spaces.</li>
                <li><code>OCTET_LENGTH</code> counts bytes. A character can use more than one byte.</li>
                <li>In UTF8, the precomposed <code>é</code> in this example uses two bytes.</li>
                <li>Unicode characters that combine into one visible symbol can count as several characters.</li>
                <li><code>LENGTH('')</code> returns 0. <code>LENGTH(NULL::text)</code> returns <code>NULL</code>.</li>
            </ul>
            <CodeBlock language="sql">{lengthQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">characters</th><th scope="col">same_characters</th><th scope="col">bytes</th></tr></thead>
                    <tbody><tr><td>4</td><td>4</td><td>5</td></tr></tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="extract-text">
            <h2 id="extract-text" className="SectionTitle">Extract part of a string</h2>
            <ul className="Article__notes">
                <li><code>SUBSTRING(text FROM start FOR count)</code> extracts characters from a position.</li>
                <li>The first character is at position 1. Omit <code>FOR count</code> to read to the end.</li>
                <li><code>SUBSTR(text, start, count)</code> is another form of the same operation.</li>
                <li><code>LEFT(text, n)</code> takes the first <code>n</code> characters. <code>RIGHT(text, n)</code> takes the last <code>n</code>.</li>
                <li>For negative <code>n</code>, <code>LEFT</code> excludes the last <code>|n|</code> characters. <code>RIGHT</code> excludes the first <code>|n|</code>.</li>
            </ul>
            <CodeBlock language="sql">{extractQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">middle</th><th scope="col">first_four</th><th scope="col">last_three</th></tr></thead>
                    <tbody><tr><td>gre</td><td>Post</td><td>SQL</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>OVERLAY</code> replaces characters at a position. <code>FOR</code> sets how many original characters to remove.</li>
            </ul>
            <CodeBlock language="sql">{overlayQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">masked_text</th></tr></thead>
                    <tbody><tr><td>XXX-456</td></tr></tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="trim-text">
            <h2 id="trim-text" className="SectionTitle">Trim spaces and handle empty text</h2>
            <ul className="Article__notes">
                <li><code>TRIM(text)</code> and <code>BTRIM(text)</code> remove spaces from both ends.</li>
                <li><code>LTRIM</code> removes them from the left. <code>RTRIM</code> removes them from the right.</li>
                <li>They keep spaces inside the string. By default, they do not remove tabs or newlines.</li>
                <li>The optional characters argument is a set of characters to remove from the ends. It is not a whole substring.</li>
                <li><code>BTRIM(text, 'xy')</code> removes any leading or trailing <code>x</code> and <code>y</code> characters.</li>
            </ul>
            <CodeBlock language="sql">{trimQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">trimmed</th><th scope="col">left_trimmed</th><th scope="col">right_trimmed</th><th scope="col">custom_trimmed</th></tr></thead>
                    <tbody><tr><td><code>'Ada'</code></td><td><code>'Ada&#160;&#160;'</code></td><td><code>'&#160;&#160;Ada'</code></td><td><code>'Ada'</code></td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>Quotes in this output table show where spaces remain. They are not part of the result.</li>
                <li><code>NULLIF(value, '')</code> returns <code>NULL</code> when the value is empty.</li>
                <li>Use <code>COALESCE(NULLIF(TRIM(name), ''), 'Unknown')</code> to display a fallback for missing, empty, or space-only names.</li>
            </ul>
            <CodeBlock language="sql">{blankQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">blank_as_null</th><th scope="col">display_name</th></tr></thead>
                    <tbody><tr><td>NULL</td><td>Unknown</td></tr></tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="find-replace-text">
            <h2 id="find-replace-text" className="SectionTitle">Find and replace text</h2>
            <ul className="Article__notes">
                <li><code>POSITION(substring IN text)</code> returns the first matching position, starting at 1.</li>
                <li><code>STRPOS(text, substring)</code> does the same thing with the arguments in the other order.</li>
                <li>Both return 0 if the substring is absent. With the comparison rules used here, these searches are case-sensitive.</li>
            </ul>
            <CodeBlock language="sql">{positionQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">sql_position</th><th scope="col">same_position</th><th scope="col">not_found</th></tr></thead>
                    <tbody><tr><td>8</td><td>8</td><td>0</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>REPLACE(text, from, to)</code> replaces every occurrence of an exact substring.</li>
                <li><code>TRANSLATE(text, from, to)</code> maps individual characters by their positions in <code>from</code> and <code>to</code>.</li>
                <li>If <code>to</code> is shorter than <code>from</code>, characters without a replacement are deleted.</li>
            </ul>
            <CodeBlock language="sql">{replaceQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">replaced</th><th scope="col">removed_characters</th><th scope="col">mapped_characters</th></tr></thead>
                    <tbody><tr><td>green-green-blue</td><td>abc</td><td>XbY</td></tr></tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="split-text">
            <h2 id="split-text" className="SectionTitle">Split text into parts</h2>
            <ul className="Article__notes">
                <li>A delimiter is the text that separates parts, such as a comma or <code>@</code>.</li>
                <li><code>SPLIT_PART(text, delimiter, n)</code> returns one part. Part numbers start at 1.</li>
                <li>A positive part number beyond the available parts returns an empty string.</li>
                <li><code>STRING_TO_ARRAY(text, delimiter)</code> returns all parts as a text array. An array stores several values together.</li>
                <li>The delimiter is literal text. Use <code>REGEXP_SPLIT_TO_ARRAY</code> when the separator is a pattern.</li>
            </ul>
            <CodeBlock language="sql">{splitQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">user_name</th><th scope="col">domain</th><th scope="col">colors</th></tr></thead>
                    <tbody><tr><td>ada</td><td>example.com</td><td><code>{'{red,green,blue}'}</code></td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>The braces show PostgreSQL's array display format.</li>
                <li>Splitting an email at <code>@</code> extracts text. It does not validate the email address.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="pad-repeat-text">
            <h2 id="pad-repeat-text" className="SectionTitle">Pad, repeat, and reverse text</h2>
            <ul className="Article__notes">
                <li><code>LPAD(text, length, fill)</code> adds characters on the left until the total length is reached.</li>
                <li><code>RPAD</code> adds them on the right. The default fill is a space.</li>
                <li>Both truncate the original string on the right when it is longer than the requested length.</li>
                <li>Cast a number to <code>text</code> before padding it, such as <code>LPAD(order_id::text, 5, '0')</code>.</li>
            </ul>
            <CodeBlock language="sql">{padQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">padded_left</th><th scope="col">padded_right</th><th scope="col">shortened</th></tr></thead>
                    <tbody><tr><td>00042</td><td>PG...</td><td>1234</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>REPEAT(text, count)</code> repeats the string. <code>REVERSE(text)</code> reverses character order.</li>
            </ul>
            <CodeBlock language="sql">{repeatQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">repeated</th><th scope="col">reversed</th></tr></thead>
                    <tbody><tr><td>hahaha</td><td>cba</td></tr></tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="match-patterns">
            <h2 id="match-patterns" className="SectionTitle">Match with LIKE and ILIKE</h2>
            <ul className="Article__notes">
                <li><code>LIKE</code> checks a pattern against the whole string.</li>
                <li><code>%</code> matches zero or more characters. <code>_</code> matches exactly one character.</li>
                <li><code>'Post%'</code> checks a prefix. <code>'%SQL'</code> checks a suffix. <code>'%SQL%'</code> checks for text anywhere.</li>
                <li><code>ILIKE</code> ignores letter case according to the active locale.</li>
                <li>A collation defines text comparison rules. These examples use case-sensitive rules for <code>LIKE</code>. Custom collations can change that behavior.</li>
                <li>Use <code>NOT LIKE</code> or <code>NOT ILIKE</code> to reject a pattern.</li>
            </ul>
            <CodeBlock language="sql">{likeQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">prefix_match</th><th scope="col">suffix_match</th><th scope="col">ignore_case</th><th scope="col">one_character</th></tr></thead>
                    <tbody><tr><td>true</td><td>true</td><td>true</td><td>true</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>ESCAPE</code> chooses a character that makes the next wildcard literal.</li>
                <li>Here, <code>!%</code> means the percent character and <code>!_</code> means the underscore character.</li>
            </ul>
            <CodeBlock language="sql">{escapeQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">literal_percent</th><th scope="col">literal_underscore</th></tr></thead>
                    <tbody><tr><td>true</td><td>true</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>WHERE name ILIKE 'ada%'</code> keeps names that start with Ada, ignoring case.</li>
                <li>A pattern comparison with a <code>NULL</code> value returns <code>NULL</code>. <code>WHERE</code> keeps only true results.</li>
                <li>Use <code>IS NULL</code> to find missing text. Comparing with <code>= NULL</code> does not work.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="regular-expressions">
            <h2 id="regular-expressions" className="SectionTitle">Match and replace with regex</h2>
            <ul className="Article__notes">
                <li>A regular expression, or regex, describes a text pattern with rules such as character ranges and repetition.</li>
                <li><code>~</code> checks a case-sensitive regex. <code>~*</code> ignores case.</li>
                <li><code>!~</code> and <code>!~*</code> reject a match.</li>
                <li>Regex can match anywhere in the string. Use <code>^</code> for the start and <code>$</code> for the end.</li>
                <li><code>[0-9]</code> matches one digit. <code>+</code> means one or more repetitions.</li>
                <li><code>^[0-9]+$</code> requires the whole string to contain one or more digits.</li>
            </ul>
            <CodeBlock language="sql">{regexQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">contains_digits</th><th scope="col">only_digits</th><th scope="col">ignore_case</th></tr></thead>
                    <tbody><tr><td>true</td><td>false</td><td>true</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>REGEXP_REPLACE(text, pattern, replacement)</code> replaces the first match.</li>
                <li>The <code>'g'</code> flag means global. It replaces all matches.</li>
                <li>If there is no match, <code>REGEXP_REPLACE</code> returns the original text.</li>
            </ul>
            <CodeBlock language="sql">{regexReplaceQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">first_removed</th><th scope="col">all_removed</th></tr></thead>
                    <tbody><tr><td>ab2c3</td><td>abc</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>SIMILAR TO</code> uses SQL regex syntax and matches the whole string. It is different from <code>~</code>.</li>
                <li>Regex operators do not support nondeterministic collations. Such collations can treat different text representations as equal.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="format-text">
            <h2 id="format-text" className="SectionTitle">Format display text</h2>
            <ul className="Article__notes">
                <li><code>FORMAT</code> inserts values into a template. <code>%s</code> inserts a value as text.</li>
                <li><code>%%</code> inserts a literal percent sign. A <code>NULL</code> argument for <code>%s</code> becomes empty text.</li>
                <li>The result is text. Keep numbers as numbers when calculating or sorting by their numeric value.</li>
            </ul>
            <CodeBlock language="sql">{formatQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">message</th></tr></thead>
                    <tbody><tr><td>Hello, Ada! You have 3 orders.</td></tr></tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="aggregate-text">
            <h2 id="aggregate-text" className="SectionTitle">Join rows with STRING_AGG</h2>
            <ul className="Article__notes">
                <li><code>CONCAT</code> joins values within one row. <code>STRING_AGG</code> is an aggregate that joins values from many rows.</li>
                <li><code>STRING_AGG(value, separator ORDER BY ...)</code> puts the separator between non-<code>NULL</code> values.</li>
                <li>The <code>ORDER BY</code> inside the function controls the order of joined values.</li>
                <li>Without that ordering, the order of joined values is unspecified.</li>
                <li><code>GROUP BY team</code> produces one result per team. The final <code>ORDER BY team</code> sorts those result rows.</li>
                <li>The <code>WITH</code> clause names a temporary query result. <code>VALUES</code> supplies the example rows.</li>
            </ul>
            <CodeBlock language="sql">{aggregateQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">team</th><th scope="col">names</th></tr></thead>
                    <tbody><tr><td>A</td><td>Ada, Bob</td></tr><tr><td>B</td><td>Cara</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>STRING_AGG</code> skips <code>NULL</code> values but keeps empty strings.</li>
                <li>It returns <code>NULL</code> if there are no input rows or every input value is <code>NULL</code>.</li>
                <li><code>STRING_AGG(DISTINCT name, ', ' ORDER BY name)</code> removes duplicate names before joining them.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="references">
            <h2 id="references" className="SectionTitle">PostgreSQL references</h2>
            <ul className="Article__notes">
                <li><a className="Link" href="https://www.postgresql.org/docs/current/functions-string.html">String functions and operators</a></li>
                <li><a className="Link" href="https://www.postgresql.org/docs/current/functions-matching.html">Pattern matching</a></li>
                <li><a className="Link" href="https://www.postgresql.org/docs/current/functions-aggregate.html">Aggregate functions</a></li>
                <li><a className="Link" href="https://www.postgresql.org/docs/current/datatype-character.html">Character types</a></li>
                <li><a className="Link" href="https://www.postgresql.org/docs/18/release-18.html">PostgreSQL 18 changes to text matching</a></li>
            </ul>
        </section>
    </ArticleLayout>
);

export default PostgreSQLStrings;
