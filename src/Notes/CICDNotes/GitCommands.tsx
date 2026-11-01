import { CICD_NOTES_ROUTE, GIT_COMMANDS_ROUTE } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';

const groups = [
    {
        id: 'git-setup', title: 'Setup and repositories',
        rows: [
            ['git config --global user.name "Your Name"', '--global applies to all repositories for your user. user.name sets the commit author name.'],
            ['git config --global user.email "you@example.com"', 'user.email sets the commit author email. Omit --global for settings in the current repository only.'],
            ['git init -b main', 'Creates a repository in the current directory. -b names the initial branch main.'],
            ['git clone <url> [directory]', '<url> is the repository address. The optional directory sets the local folder name.'],
            ['git clone --branch <branch> --single-branch <url>', '--branch selects the branch to check out. --single-branch limits the fetched branch history to that branch.'],
            ['git clone --depth 1 <url>', '--depth 1 downloads a shallow history with only the latest commit on the selected branch. Common in CI checkouts.'],
            ['git help <command>', 'Opens the manual for a command, such as git help log.'],
        ],
    },
    {
        id: 'git-inspect', title: 'Status, differences, and history',
        rows: [
            ['git status --short --branch', '--short uses compact output. --branch includes branch and tracking information.'],
            ['git diff', 'Shows unstaged changes to tracked files.'],
            ['git diff --staged', '--staged compares staged changes with the latest commit.'],
            ['git diff <base> <branch> -- <path>', 'Compares the two commit snapshots for a path. -- separates revisions from file paths.'],
            ['git log --oneline --graph --decorate -n 10', '--oneline shortens each commit. --graph draws history connections. --decorate shows branch and tag names. -n 10 limits the output to ten commits.'],
            ['git log --all -- <path>', '--all includes all refs, such as local and remote-tracking branches. <path> limits the history to that file or directory.'],
            ['git show <commit>', 'Shows commit details and its changes. <commit> can be a commit ID, branch, or tag.'],
            ['git blame -L 10,20 -- <file>', '-L 10,20 limits output to lines 10 through 20. Shows the last commit that changed each line.'],
            ['git reflog', 'Shows recent local reference movements, including branch switches and resets. Useful for finding earlier commit IDs.'],
        ],
    },
    {
        id: 'git-commit', title: 'Staging and commits',
        rows: [
            ['git add <path>', 'Stages the current changes at a file or directory path for the next commit.'],
            ['git add -A', '-A stages additions, modifications, and deletions across the repository.'],
            ['git add -p', '-p lets you choose individual change blocks to stage.'],
            ['git restore --staged -- <file>', '--staged removes the file changes from staging. Keeps the working file changes.'],
            ['git commit -m "Fix login redirect"', '-m supplies the commit message. Records staged changes.'],
            ['git commit -am "Update tracked files"', '-a stages modified and deleted tracked files before committing. It does not include new untracked files. -m supplies the message.'],
            ['git commit --amend --no-edit', '--amend replaces the latest commit and includes staged changes. --no-edit keeps its message. Changes the commit ID; use on commits that have not been shared.'],
            ['git rm --cached -- <file>', '--cached removes a tracked file from the index but keeps the local file. Commit the removal; an ignore rule is needed to keep it untracked.'],
        ],
    },
    {
        id: 'git-branches', title: 'Branches and combining changes',
        rows: [
            ['git branch -a', '-a lists local and remote-tracking branches.'],
            ['git switch -c <branch>', '-c creates a branch from the current commit and switches to it.'],
            ['git switch <branch>', 'Switches to an existing branch.'],
            ['git switch --track origin/<branch>', '--track creates a local branch that tracks the named remote branch and switches to it.'],
            ['git branch -m <new-name>', '-m renames the current branch.'],
            ['git branch -d <branch>', '-d deletes a local branch only when Git considers it merged into its upstream, or HEAD when no upstream is set. Cannot delete the checked-out branch.'],
            ['git merge <branch>', 'Combines the named branch into the current branch. May move the branch forward directly or create a merge commit.'],
            ['git merge --no-ff <branch>', '--no-ff creates a merge commit even when a fast-forward is possible.'],
            ['git rebase <base>', 'Replays current branch commits on a new base. Rewrites commit IDs; use for commits that have not been shared.'],
            ['git rebase --continue', '--continue resumes after conflicts are resolved and the resolved files are staged.'],
            ['git rebase --abort', '--abort cancels the rebase and returns the branch to its original state.'],
            ['git merge --abort', '--abort attempts to cancel an unfinished merge. Pre-existing uncommitted changes may prevent full recovery.'],
            ['git cherry-pick <commit>', 'Applies the changes from one commit to the current branch as a new commit.'],
        ],
    },
    {
        id: 'git-remotes', title: 'Remotes, fetching, and pushing',
        rows: [
            ['git remote -v', '-v shows the fetch and push addresses for each remote. A remote is a named repository address.'],
            ['git remote add origin <url>', 'Adds a remote named origin. origin is a conventional name, not a keyword.'],
            ['git fetch origin --prune', 'Downloads objects and updates remote-tracking branches. --prune removes remote-tracking branches deleted on the remote. Does not merge into the current branch.'],
            ['git fetch --unshallow', '--unshallow downloads the missing history when the source repository has complete history. Useful when a shallow CI checkout needs older commits.'],
            ['git pull --ff-only', 'Fetches from the configured upstream and updates the current branch only if no merge commit is needed. Fails when the histories have diverged.'],
            ['git pull --rebase', 'Fetches and replays local commits on the upstream branch. Rewrites those local commit IDs.'],
            ['git push -u origin <branch>', 'Uploads the local branch. -u, also called --set-upstream, records its tracking branch for later pull and push commands.'],
            ['git push origin --delete <branch>', '--delete removes the named branch from the remote.'],
            ['git push --force-with-lease origin <branch>', 'Replaces remote history only if the remote branch matches the locally expected value. Background fetches can weaken this check. Use only for an agreed history rewrite.'],
        ],
    },
    {
        id: 'git-undo', title: 'Stashing and undoing changes',
        rows: [
            ['git stash push -u -m "Work in progress"', 'Temporarily saves changes and clears them from the working tree. -u includes untracked files, but not ignored files. -m labels the stash.'],
            ['git stash list', 'Lists saved stashes.'],
            ['git stash apply "stash@{0}"', 'Applies the latest stash and keeps it saved. Conflicts may need manual resolution.'],
            ['git stash pop', 'Applies the latest stash and removes it if application succeeds. Keeps the stash when conflicts occur.'],
            ['git restore -- <file>', 'Discards unstaged tracked-file changes by restoring from the index. Those discarded edits are not saved by this command.'],
            ['git restore --source=<commit> -- <file>', '--source selects the commit to copy the file from. Changes the working file without staging it.'],
            ['git revert <commit>', 'Creates a new commit that reverses an earlier commit. Preserves existing history.'],
            ['git reset --soft HEAD~1', 'Moves the branch back one commit. --soft keeps the changes staged. HEAD means the current commit; HEAD~1 means its first parent.'],
            ['git reset --mixed HEAD~1', 'Moves the branch back one commit. --mixed keeps the file changes but unstages them. This is the default reset mode.'],
            ['git reset --hard <commit>', 'Moves the branch and resets the index and tracked files. Discards tracked changes and may overwrite untracked files in the way.'],
            ['git clean -n -d', '-n previews untracked files that would be removed. -d includes untracked directories. Ignored files are excluded by default.'],
            ['git clean -f -d', '-f performs the removal. Deletes untracked files and directories; Git cannot recover files it never tracked.'],
        ],
    },
    {
        id: 'git-tags', title: 'Tags and releases',
        rows: [
            ['git tag', 'Lists local tags.'],
            ['git tag -a v1.0.0 -m "Release 1.0.0"', '-a creates an annotated tag at the current commit. -m supplies its message.'],
            ['git push origin v1.0.0', 'Uploads the named tag. A normal branch push does not upload every tag.'],
            ['git describe --tags --always', '--tags considers lightweight and annotated tags reachable from the commit. --always falls back to an abbreviated commit ID when no suitable tag exists.'],
        ],
    },
];

const GitCommands = () => (
    <ArticleLayout title="Git commands" route={GIT_COMMANDS_ROUTE} sections={[
        { id: 'git-command-parts', title: 'Options, flags, and arguments' },
        ...groups.map(({ id, title }) => ({ id, title })),
    ]} backRoute={CICD_NOTES_ROUTE} backLabel="Back to CI/CD notes">
        <section className="Article__section" aria-labelledby="git-command-parts">
            <h2 id="git-command-parts" className="SectionTitle">Options, flags, and arguments</h2>
            <ul className="Article__notes">
                <li><code>git commit -m "Fix login"</code>: <code>commit</code> is the subcommand. <code>-m</code> is an option; <code>"Fix login"</code> is its value.</li>
                <li>An option changes command behavior. A flag is commonly an option without a value, such as <code>--staged</code>. Short options use one hyphen; long options use two.</li>
                <li>An argument supplies a target, such as the file in <code>git add README.md</code> or the branch in <code>git switch main</code>.</li>
                <li><code>&lt;branch&gt;</code>, <code>&lt;file&gt;</code>, and <code>&lt;commit&gt;</code> stand for actual values. Square brackets mark optional arguments; the brackets are not typed.</li>
                <li><code>--</code> ends option parsing. Commands such as <code>git diff</code> also use it to separate revisions from paths.</li>
                <li>Options are command-specific. For example, <code>-m</code> means a message for <code>git commit</code> and rename for <code>git branch</code>.</li>
            </ul>
        </section>
        {groups.map(({ id, title, rows }) => (
            <section key={id} className="Article__section" aria-labelledby={id}>
                <h2 id={id} className="SectionTitle">{title}</h2>
                <div className="Article__tableWrap">
                    <table className="Article__table">
                        <thead><tr><th>Command</th><th>Options, arguments, and effect</th></tr></thead>
                        <tbody>{rows.map(([command, meaning]) => (
                            <tr key={command}><td><code>{command}</code></td><td>{meaning.split(/(--?[\w-]+(?:=\d+)?|\b(?:user\.name|user\.email|origin|main|HEAD~1|HEAD)\b|<[^>]+>)/g).map((part, index) => (
                                /^(--?[\w-]+(?:=\d+)?|user\.name|user\.email|origin|main|HEAD~1|HEAD|<[^>]+>)$/.test(part) ? <code key={index}>{part}</code> : part
                            ))}</td></tr>
                        ))}</tbody>
                    </table>
                </div>
            </section>
        ))}
    </ArticleLayout>
);

export default GitCommands;
