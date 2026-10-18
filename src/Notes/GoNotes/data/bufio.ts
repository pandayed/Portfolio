import type { GoNote } from '../types';

const note = {
    notionId: 'go-bufio',
    slug: 'bufio',
    title: 'bufio',
    updatedOn: '2026-10-18',
    blocks: [
        { id: 'bufio-role', type: 'sub_header', richText: [['Buffered input and output']] },
        { id: 'bufio-definition', type: 'bulleted_list', richText: [['bufio', [['c']]], [' is a standard library package for buffered reading and writing. A buffer holds bytes in memory between the program and its input or output.']] },
        { id: 'bufio-interfaces', type: 'bulleted_list', richText: [['It wraps an '], ['io.Reader', [['c']]], [' or '], ['io.Writer', [['c']]], ['. Files, network connections, and in-memory data can use the same API.']] },
        { id: 'bufio-batching', type: 'bulleted_list', richText: [['Reading ahead and grouping small writes can reduce calls to the underlying input or output. Buffering does not make every operation faster.']] },
        { id: 'bufio-choices', type: 'bulleted_list', richText: [['Scanner', [['c']]], [' splits input into tokens. '], ['Reader', [['c']]], [' gives more control over reads. '], ['Writer', [['c']]], [' buffers output.']] },

        { id: 'bufio-scanner', type: 'sub_header', richText: [['Scanner and tokens']] },
        { id: 'bufio-token', type: 'bulleted_list', richText: [['A token is one piece returned by a splitting rule. '], ['bufio.NewScanner', [['c']]], [' uses lines as tokens and removes their line endings.']] },
        { id: 'bufio-scan', type: 'bulleted_list', richText: [['Scan()', [['c']]], [' advances to the next token. It returns false at the end of input or after an error.']] },
        { id: 'bufio-scan-error', type: 'bulleted_list', richText: [['Err()', [['c']]], [' reports a scanning error after the loop. Normal end of input produces a nil error.']] },
        { id: 'bufio-text', type: 'bulleted_list', richText: [['Text()', [['c']]], [' returns the current token as a new string. '], ['Bytes()', [['c']]], [' returns a byte slice that may be overwritten by the next scan. Copy the slice if it must be kept.']] },
        { id: 'bufio-split', type: 'bulleted_list', richText: [['Split(bufio.ScanWords)', [['c']]], [' changes the rule to whitespace-separated words. '], ['ScanBytes', [['c']]], [' and '], ['ScanRunes', [['c']]], [' split by bytes and UTF-8 characters.']] },
        { id: 'bufio-limit', type: 'bulleted_list', richText: [['The default maximum token buffer is 64 KiB. The largest accepted token may be smaller because a delimiter can also need space.']] },
        { id: 'bufio-buffer', type: 'bulleted_list', richText: [['Buffer(initialBuffer, max)', [['c']]], [' configures storage before scanning begins. An oversized token stops the scanner with an error.']] },
        {
            id: 'bufio-scan-example', type: 'example', example: {
                title: 'A scanner reads lines including the final line', language: 'go',
                description: ['The example uses only the Go standard library.', 'Save the code as main.go. The input is a string with no newline after the last line.'],
                code: `package main

import (
    "bufio"
    "fmt"
    "log"
    "strings"
)

func main() {
    scanner := bufio.NewScanner(strings.NewReader("Go\\nGin"))
    scanner.Buffer(make([]byte, 4096), 1024*1024)

    for scanner.Scan() {
        fmt.Println(scanner.Text())
    }
    if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }
}`,
                commands: 'go run main.go',
                result: 'Go\nGin',
                explanation: ['The scanner returns both lines without their line endings.', 'The initial buffer has 4096 bytes. It can grow up to the configured limit of 1 MiB.', 'Err is nil because the scanner reaches the end without a reading or token-size error.'],
            },
        },

        { id: 'bufio-reader', type: 'sub_header', richText: [['Reader and delimiters']] },
        { id: 'bufio-reader-construction', type: 'bulleted_list', richText: [['bufio.NewReader', [['c']]], [' creates a buffered reader. '], ['NewReaderSize', [['c']]], [' requests a buffer size.']] },
        { id: 'bufio-read-string', type: 'bulleted_list', richText: [['ReadString(delimiter)', [['c']]], [' reads through a delimiter byte and includes it in the result. '], ['ReadBytes', [['c']]], [' returns the same kind of result as a byte slice.']] },
        { id: 'bufio-reader-eof', type: 'bulleted_list', richText: [['A read can return data together with '], ['io.EOF', [['c']]], [' when input ends before the delimiter. Process that data before handling the error.']] },
        { id: 'bufio-reader-length', type: 'bulleted_list', richText: [['ReadString', [['c']]], [' can collect a result larger than the reader buffer. Large input can still consume large amounts of memory.']] },
        { id: 'bufio-reader-control', type: 'bulleted_list', richText: [['Peek', [['c']]], [' looks at buffered bytes without advancing. '], ['ReadByte', [['c']]], [' reads one byte, and '], ['ReadRune', [['c']]], [' reads one UTF-8 character.']] },
        { id: 'bufio-reader-owner', type: 'bulleted_list', richText: [['A reader or scanner may read ahead. Reading directly from the underlying source afterward can skip bytes already held in its buffer.']] },

        { id: 'bufio-writer', type: 'sub_header', richText: [['Writer and flushing']] },
        { id: 'bufio-new-writer', type: 'bulleted_list', richText: [['bufio.NewWriter', [['c']]], [' wraps an output destination. Small writes can remain in memory until the buffer fills or '], ['Flush()', [['c']]], [' is called.']] },
        { id: 'bufio-writer-newline', type: 'bulleted_list', richText: [['A newline does not automatically flush a buffered writer.']] },
        { id: 'bufio-flush-error', type: 'bulleted_list', richText: [['Both writes and '], ['Flush()', [['c']]], [' can fail. A successful write can mean only that bytes entered the buffer.']] },
        { id: 'bufio-file-close', type: 'bulleted_list', richText: [['For a buffered file, flushing happens before closing the file. Closing the underlying file does not flush this separate buffer.']] },
        {
            id: 'bufio-copy-example', type: 'example', example: {
                title: 'A reader preserves the final fragment and a writer flushes it', language: 'go',
                description: ['Save this separate program as main.go. It uses only the Go standard library.', 'The input ends after Gin without a final newline. The destination is an in-memory bytes.Buffer.'],
                code: `package main

import (
    "bufio"
    "bytes"
    "fmt"
    "io"
    "log"
    "strings"
)

func main() {
    reader := bufio.NewReader(strings.NewReader("Go\\nGin"))
    var destination bytes.Buffer
    writer := bufio.NewWriter(&destination)

    for {
        text, readErr := reader.ReadString('\\n')
        if len(text) > 0 {
            if _, err := writer.WriteString(text); err != nil {
                log.Fatal(err)
            }
        }
        if readErr != nil {
            if readErr != io.EOF {
                log.Fatal(readErr)
            }
            break
        }
    }

    if err := writer.Flush(); err != nil {
        log.Fatal(err)
    }
    fmt.Printf("%q\\n", destination.String())
}`,
                commands: 'go run main.go',
                result: '"Go\\nGin"',
                explanation: ['The first read returns Go with its newline. The second returns Gin together with io.EOF.', 'The loop writes returned text before checking readErr, so the final fragment is preserved.', 'Flush sends the pending bytes to destination. The quoted output shows the newline as an escaped character.'],
            },
        },
        { id: 'bufio-references', type: 'sub_header', richText: [['References']] },
        { id: 'bufio-docs', type: 'bulleted_list', richText: [['bufio package documentation', [['a', 'https://pkg.go.dev/bufio']]]] },
    ],
} as const satisfies GoNote;

export default note;
