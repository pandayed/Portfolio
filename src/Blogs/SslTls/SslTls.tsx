import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../ArticleLayout/ArticleLayout';
import { SSL_TLS_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const SslTls = () => {
    return (
        <ArticleLayout title="SSL and TLS" route={SSL_TLS_ROUTE} sections={sections}>
            <section className="Article__section">
                <p>
                    SSL and TLS are the same protocol under two names. SSL is the old name and every
                    SSL version is deprecated. TLS is the name of the versions still in use. A
                    product sold today as an &quot;SSL certificate&quot; is a certificate for TLS.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="names">
                <h2 id="names" className="SectionTitle">
                    SSL is the old name
                </h2>
                <p>
                    Netscape wrote SSL. SSL 2.0 shipped in 1995 and SSL 3.0 in 1996. The IETF took
                    the protocol over, changed the name, and published TLS 1.0 in 1999 as RFC 2246.
                    TLS 1.0 is close to SSL 3.0 but the two do not interoperate.
                </p>
                <p>
                    The old name stayed in product names, library names and configuration options.
                    OpenSSL is still called OpenSSL. That is history, not a second protocol.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="what-tls-gives-you">
                <h2 id="what-tls-gives-you" className="SectionTitle">
                    What TLS gives you
                </h2>
                <p>TLS sits between TCP and the application protocol. It provides three things.</p>
                <ul className="Article__notes">
                    <li>
                        Encryption. Anyone reading the wire sees ciphertext, not the request or the
                        response.
                    </li>
                    <li>
                        Integrity. Any change to the bytes in transit is detected and the connection
                        fails.
                    </li>
                    <li>
                        Identity. The server proves it owns the name the client asked for. The
                        client is usually not asked to prove anything.
                    </li>
                </ul>
                <p>
                    HTTPS is HTTP running inside a TLS connection. The same applies to SMTP, IMAP
                    and other protocols that have a TLS variant.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="certificates">
                <h2 id="certificates" className="SectionTitle">
                    Certificates and who signs them
                </h2>
                <p>
                    A certificate binds a public key to a set of names. The names live in the
                    Subject Alternative Name field. A client checks the name it asked for against
                    that field, not against the Common Name, which browsers stopped reading years
                    ago.
                </p>
                <p>
                    A certificate authority signs the certificate. The client does not trust the
                    server certificate directly. It trusts a small set of root certificates shipped
                    with the operating system or the browser, and follows the chain from the server
                    certificate up to one of those roots.
                </p>
                <p>
                    A self-signed certificate has no chain to a trusted root, so the client rejects
                    it. Encryption still works. Identity is what fails.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="handshake">
                <h2 id="handshake" className="SectionTitle">
                    The handshake
                </h2>
                <p>
                    The handshake agrees on keys and checks the server identity before any
                    application data is sent. These are the steps in TLS 1.3.
                </p>
                <ol className="Article__steps">
                    <li>
                        The client sends ClientHello: the TLS versions it supports, the cipher
                        suites it supports, the server name it wants, and a key share.
                    </li>
                    <li>
                        The server replies with ServerHello: the chosen cipher suite and its own key
                        share. Both sides now derive the same keys and everything after this point
                        is encrypted.
                    </li>
                    <li>
                        The server sends its certificate chain and a CertificateVerify, which is a
                        signature over the handshake made with the certificate&apos;s private key.
                    </li>
                    <li>
                        Both sides send Finished, a check over everything exchanged so far. A
                        mismatch means the handshake was tampered with and the connection is
                        dropped.
                    </li>
                </ol>
                <p>
                    That is one round trip. TLS 1.2 needs two, because the client cannot guess the
                    key exchange method and has to wait for the server to pick one.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="versions">
                <h2 id="versions" className="SectionTitle">
                    Versions and their status
                </h2>
                <div className="Article__tableWrap">
                    <table className="Article__table">
                        <thead>
                            <tr>
                                <th scope="col">Version</th>
                                <th scope="col">Year</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">SSL 2.0</th>
                                <td>1995</td>
                                <td>Prohibited by RFC 6176</td>
                            </tr>
                            <tr>
                                <th scope="row">SSL 3.0</th>
                                <td>1996</td>
                                <td>Prohibited by RFC 7568</td>
                            </tr>
                            <tr>
                                <th scope="row">TLS 1.0</th>
                                <td>1999</td>
                                <td>Deprecated by RFC 8996</td>
                            </tr>
                            <tr>
                                <th scope="row">TLS 1.1</th>
                                <td>2006</td>
                                <td>Deprecated by RFC 8996</td>
                            </tr>
                            <tr>
                                <th scope="row">TLS 1.2</th>
                                <td>2008</td>
                                <td>In use, RFC 5246</td>
                            </tr>
                            <tr>
                                <th scope="row">TLS 1.3</th>
                                <td>2018</td>
                                <td>In use, RFC 8446</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Only TLS 1.2 and TLS 1.3 should be enabled. RFC 8996 deprecated TLS 1.0 and 1.1
                    in 2021, and the major browsers removed them in 2020.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="changes-in-1-3">
                <h2 id="changes-in-1-3" className="SectionTitle">
                    What TLS 1.3 removed
                </h2>
                <p>
                    TLS 1.2 accumulated options, and most of the attacks on TLS were attacks on the
                    weak ones. TLS 1.3 deletes them instead of leaving them configurable.
                </p>
                <ul className="Article__notes">
                    <li>
                        RSA key exchange is gone. Every key exchange is now ephemeral, so recording
                        the traffic today and stealing the private key later does not decrypt it.
                    </li>
                    <li>
                        Only AEAD ciphers remain. RC4, 3DES, CBC mode and MD5 and SHA-1 signatures
                        are removed.
                    </li>
                    <li>
                        Compression and renegotiation are removed. Both were the basis of practical
                        attacks.
                    </li>
                    <li>
                        Five cipher suites are defined, down from over thirty. There is much less to
                        configure wrongly.
                    </li>
                </ul>
            </section>

            <section className="Article__section" aria-labelledby="limits">
                <h2 id="limits" className="SectionTitle">
                    What TLS does not do
                </h2>
                <p>
                    TLS protects the connection. It says nothing about the server at the other end.
                    A valid certificate proves control of the domain name. It does not prove the
                    site is honest, and a phishing site can get one in minutes.
                </p>
                <p>
                    TLS also does not hide who you talk to. The destination IP address is visible,
                    and in most connections the server name in ClientHello is sent in the clear
                    before encryption starts. Encrypted Client Hello covers that name, but it needs
                    support on both sides and is not yet the default.
                </p>
            </section>
        </ArticleLayout>
    );
};

export default SslTls;
