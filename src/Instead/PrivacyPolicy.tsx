import './PrivacyPolicy.css';
import '../CommonClasses/CommonClasses.css';

import Page from '../Page/Page';
import { PROJECTS_ROUTE, toHref } from '../routing/routes';

const CONTACT_EMAIL = 'lalbiharipandeyg@gmail.com';

interface Permission {
    name: string;
    reason: string;
}

const permissions: Permission[] = [
    { name: 'tabs', reason: 'Read the URL of the tab you are looking at, to get its hostname.' },
    { name: 'storage', reason: 'Save the time on your own machine.' },
    { name: 'idle', reason: 'Stop the timer when you stop using the machine.' },
    { name: 'alarms', reason: 'Run a once-a-minute check so long sessions are still counted.' },
    { name: 'favicon', reason: 'Show each site icon from the icons the browser already has.' },
];

/* Privacy policy for the Instead extension. The Chrome Web Store listing
   links straight to this page, so it has to stand on its own. */
const PrivacyPolicy = () => {
    return (
        <Page title="Instead - Privacy Policy">
            <p className="PrivacyPolicy__updated">
                <time dateTime="2026-09-13">Last updated 13 Sep 2026</time>
            </p>

            <section className="PrivacyPolicy__section">
                <p>
                    Instead keeps all of your data on your own computer. It does not send anything
                    anywhere. There is no server, no account and no sync.
                </p>
            </section>

            <section className="PrivacyPolicy__section">
                <h2 className="SectionTitle">What it stores</h2>
                <ul className="PrivacyPolicy__notes">
                    <li>
                        The hostname of each site you spend time on, such as{' '}
                        <code>github.com</code>, and the time spent on it that day.
                    </li>
                    <li>The site being timed right now and the moment its timer started.</li>
                </ul>
                <p>
                    Time is only counted for the tab you are looking at, in the focused window,
                    while you are active.
                </p>
            </section>

            <section className="PrivacyPolicy__section">
                <h2 className="SectionTitle">What it does not store</h2>
                <p>
                    Instead does not read or store full URLs, page titles, page content, what you
                    type, your search terms, your IP address, your name or your email. It does not
                    inject any script into the pages you visit.
                </p>
            </section>

            <section className="PrivacyPolicy__section">
                <h2 className="SectionTitle">Where it is stored</h2>
                <p>
                    In the browser's local extension storage, on the device you installed it on.
                    Nothing is uploaded. There are no analytics, no adverts and no third parties.
                </p>
            </section>

            <section className="PrivacyPolicy__section">
                <h2 className="SectionTitle">How long it is kept</h2>
                <p>
                    Instead keeps the last 90 days and deletes anything older on its own. You can
                    delete everything at any time with Clear history in the extension. Uninstalling
                    the extension also deletes it.
                </p>
            </section>

            <section className="PrivacyPolicy__section">
                <h2 className="SectionTitle">Permissions</h2>
                <ul className="PrivacyPolicy__notes">
                    {permissions.map((permission) => (
                        <li key={permission.name}>
                            <span className="PrivacyPolicy__term">{permission.name}</span>{' '}
                            {permission.reason}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="PrivacyPolicy__section">
                <h2 className="SectionTitle">Changes</h2>
                <p>
                    If this policy changes, the date at the top of this page changes with it.
                </p>
            </section>

            <section className="PrivacyPolicy__section">
                <h2 className="SectionTitle">Contact</h2>
                <p>
                    Questions about this policy go to{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="Link">
                        {CONTACT_EMAIL}
                    </a>
                    .
                </p>
            </section>

            <a href={toHref(PROJECTS_ROUTE)} className="Link Link--standalone PrivacyPolicy__back">
                Back to projects
            </a>
        </Page>
    );
};

export default PrivacyPolicy;
