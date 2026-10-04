import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'virtual-environments',
    title: 'Python virtual environments',
    summary: 'Create a project environment, install packages, check the interpreter, and recreate dependencies.',
    updatedOn: '2026-10-04',
    sections: [
        {
            id: 'project-packages',
            title: 'Give each project its own packages',
            paragraphs: [
                'A virtual environment is a folder with a Python interpreter entry point and its own installed third-party packages. It is based on a Python installation already on your computer. The built-in venv module creates this folder.',
                'Suppose one project needs version 1 of a library and another needs version 2. Installing both into one Python environment can cause a conflict. With a separate environment for each project, each project can use its required version.',
            ],
            bullets: [
                'venv creates the environment. pip installs packages into it. Neither command changes your source code.',
                'The environment uses the base Python’s standard library. By default, it does not include third-party packages installed in the base environment or other virtual environments.',
                'A virtual environment does not isolate files, network access, or operating-system permissions. Code still runs as your user.',
                'An environment variable is a named setting such as PATH. A .env file commonly holds such settings. Neither is a Python virtual environment.',
            ],
        },
        {
            id: 'create',
            title: 'Create the environment',
            paragraphs: [
                'Install Python 3 first. Open a terminal and run one of the command blocks below. Both create a project folder named weather-app and an environment inside it named .venv. If you already have a project, open its folder and run only the venv command.',
                'The -m option runs a module using the selected Python interpreter. In python3 -m venv .venv, venv is the module and .venv is the destination folder. The name .venv is a convention, not a requirement.',
            ],
            examples: [{
                title: 'macOS/Linux (bash or zsh)',
                language: 'text',
                code: [
                    'mkdir weather-app',
                    'cd weather-app',
                    'python3 -m venv .venv',
                ].join('\n'),
                result: 'A successful creation usually prints nothing. The .venv folder now exists, but the shell has not activated it.',
            }, {
                title: 'Windows (PowerShell or Command Prompt)',
                language: 'text',
                code: [
                    'mkdir weather-app',
                    'cd weather-app',
                    'python -m venv .venv',
                ].join('\n'),
                result: 'The same .venv folder is created. If your installation exposes Python through py instead, use py -m venv .venv.',
            }],
            bullets: [
                'The interpreter used to run venv determines the environment’s Python version. Check python3 --version or python --version before creating it.',
                'venv does not download another Python version. To use a different version, install that version first and create an environment with its interpreter.',
                'If Linux reports that venv or ensurepip is unavailable, install the venv support package specified by your Linux distribution, then retry.',
            ],
        },
        {
            id: 'folder',
            title: 'Keep source files outside .venv',
            paragraphs: [
                'Save your own code beside .venv. The environment is generated content that you can recreate. The layout below shows a macOS/Linux environment with some files omitted.',
            ],
            examples: [{
                title: 'Project layout',
                language: 'text',
                code: [
                    'weather-app/',
                    '├── main.py',
                    '└── .venv/',
                    '    ├── pyvenv.cfg',
                    '    ├── bin/',
                    '    │   ├── python',
                    '    │   └── activate',
                    '    └── lib/',
                    '        └── pythonX.Y/',
                    '            └── site-packages/',
                ].join('\n'),
            }],
            bullets: [
                'pyvenv.cfg records information about the base Python and whether system packages are included.',
                'bin/python is the environment’s interpreter entry point. It may be a copy or a link to the base interpreter.',
                'site-packages contains installed third-party packages. X.Y stands for the Python version, such as 3.14.',
                'Windows uses Scripts\\python.exe and Scripts\\Activate.ps1. Its packages normally live in Lib\\site-packages.',
            ],
        },
        {
            id: 'activate',
            title: 'Activate it in the current terminal',
            paragraphs: [
                'Activation puts the environment’s bin or Scripts folder at the start of PATH. PATH is the list of folders the shell searches for commands. After activation, the python command normally selects the environment’s interpreter.',
                'Run the command for your shell from weather-app/. Choose one command, not all three. Your prompt may show (.venv), depending on your shell settings.',
            ],
            examples: [{
                title: 'macOS/Linux (bash or zsh)',
                language: 'text',
                code: 'source .venv/bin/activate',
            }, {
                title: 'Windows PowerShell',
                language: 'text',
                code: '.\\.venv\\Scripts\\Activate.ps1',
            }, {
                title: 'Windows Command Prompt',
                language: 'text',
                code: '.venv\\Scripts\\activate.bat',
            }],
            bullets: [
                'Activation changes this shell session. Opening a new terminal requires activation again.',
                'Activation does not install packages or upgrade the Python interpreter in the environment. It can change which Python version the shell’s python command selects.',
                'Changing folders does not automatically switch environments. Activate the correct project environment when switching projects.',
                'If PowerShell blocks Activate.ps1, use the interpreter path directly as shown below. Activation is optional.',
            ],
        },
        {
            id: 'check-interpreter',
            title: 'Check which Python and pip you are using',
            paragraphs: [
                'The prompt alone does not prove which interpreter will run your code. sys.executable shows the running interpreter’s path. sys.prefix points to its environment, while sys.base_prefix points to the base Python installation.',
            ],
            examples: [{
                title: 'Run after activation',
                language: 'text',
                code: [
                    'python -c "import sys; print(sys.executable); print(sys.prefix != sys.base_prefix)"',
                    'python -m pip --version',
                ].join('\n'),
                result: 'The first command prints an interpreter path inside .venv and then True. The pip command reports a location inside .venv. Exact paths and versions depend on your computer.',
            }],
            bullets: [
                'python -m pip runs pip through that Python interpreter. A bare pip command may resolve to a different installation.',
                'In your editor, select .venv/bin/python on macOS/Linux or .venv\\Scripts\\python.exe on Windows. The editor’s Run button may use a different interpreter from your terminal.',
            ],
        },
        {
            id: 'install-and-run',
            title: 'Install a package and run your code',
            paragraphs: [
                'With the environment active, install Requests, a third-party HTTP library. pip normally downloads packages from the Python Package Index (PyPI), so this step needs internet access. It also installs the package’s required dependencies.',
                'Save main.py in weather-app/. This example imports Requests without making a network request.',
            ],
            examples: [{
                title: 'Install into the active environment',
                language: 'text',
                code: 'python -m pip install requests',
                result: 'Installation messages and selected versions vary. After a successful install, this environment’s Python can import requests.',
            }, {
                title: 'main.py',
                code: [
                    'import requests',
                    '',
                    'print(requests.__name__)  # requests',
                ].join('\n'),
            }, {
                title: 'Run from weather-app/',
                language: 'text',
                code: 'python main.py',
                result: 'The output is requests.',
            }],
            bullets: [
                'python -m pip list shows installed packages and their versions.',
                'python -m pip show requests shows metadata and the installation location.',
                'python -m pip uninstall requests removes Requests from this environment. It does not automatically remove its dependencies.',
            ],
        },
        {
            id: 'without-activation',
            title: 'Use the environment without activation',
            paragraphs: [
                'You can select the interpreter by its path. This works from a terminal without activation and is useful in scripts or when PowerShell blocks activation. Run these commands from weather-app/.',
            ],
            examples: [{
                title: 'macOS/Linux',
                language: 'text',
                code: [
                    '.venv/bin/python -m pip install requests',
                    '.venv/bin/python main.py',
                ].join('\n'),
                result: 'Packages install into .venv, and main.py prints requests.',
            }, {
                title: 'Windows (PowerShell or Command Prompt)',
                language: 'text',
                code: [
                    '.\\.venv\\Scripts\\python.exe -m pip install requests',
                    '.\\.venv\\Scripts\\python.exe main.py',
                ].join('\n'),
                result: 'The same environment installs and imports Requests, even when the terminal prompt has no (.venv) prefix.',
            }],
        },
        {
            id: 'save-dependencies',
            title: 'Save dependencies and recreate the environment',
            paragraphs: [
                'A requirements.txt file lists packages to install. After installing the packages for this example, use pip freeze to save the installed versions. The shell’s > operator writes the output to a file and replaces any existing contents of that file.',
            ],
            examples: [{
                title: 'Save from the active project environment',
                language: 'text',
                code: 'python -m pip freeze > requirements.txt',
                result: 'requirements.txt contains Requests and its installed dependencies, normally as name==version lines. Exact versions depend on what was installed.',
            }, {
                title: 'Restore in a fresh project checkout (macOS/Linux)',
                language: 'text',
                code: [
                    'python3 -m venv .venv',
                    'source .venv/bin/activate',
                    'python -m pip install -r requirements.txt',
                ].join('\n'),
                result: 'pip reads the file and installs its listed packages into the new environment.',
            }, {
                title: 'Restore in a fresh project checkout (Windows PowerShell)',
                language: 'text',
                code: [
                    'python -m venv .venv',
                    '.\\.venv\\Scripts\\python.exe -m pip install -r requirements.txt',
                ].join('\n'),
            }],
            bullets: [
                'freeze includes installed dependencies of your dependencies and any unrelated packages you added. Use a dedicated project environment to keep this list relevant.',
                'freeze reports installed packages. It does not create a dependency lockfile or record the Python version and operating system. Matching package versions alone cannot guarantee identical behavior across computers.',
                'Record the project’s Python version separately. Recreate the environment using that version, and check that its packages support the target platform.',
                'For projects already using a dependency manager and lockfile, follow that project’s workflow rather than replacing it with freeze.',
            ],
        },
        {
            id: 'leave-and-recreate',
            title: 'Deactivate, ignore, and recreate .venv',
            paragraphs: [
                'deactivate restores the shell settings changed by activation. It does not delete the environment or uninstall its packages. You can activate the same folder again later.',
            ],
            examples: [{
                title: 'Leave an activated environment',
                language: 'text',
                code: 'deactivate',
            }, {
                title: 'Add this line to the project’s .gitignore',
                language: 'text',
                code: '.venv/',
                result: 'Git ignores the generated environment folder. Keep main.py, requirements.txt, and .gitignore in version control.',
            }],
            bullets: [
                'To start over, save the dependency file, deactivate, and close programs using the environment. Delete only the .venv folder, then create it again and reinstall the dependencies.',
                'After moving a project or changing its Python version, recreate .venv. Installed scripts can contain absolute paths, so copying the folder to another location or computer can break it.',
                'Keep project code outside .venv so recreating the environment does not delete your work.',
            ],
        },
        {
            id: 'common-errors',
            title: 'Find the cause of common errors',
            bullets: [
                'ModuleNotFoundError after installation: the program may use a different interpreter, the install may have failed, or the import name may differ from the install name. Check sys.executable and python -m pip show before installing again.',
                'Packages install globally: check python -m pip --version and use the explicit .venv interpreter path to target the project environment.',
                'externally-managed-environment: pip may be targeting a Python installation managed by the operating system. Create a virtual environment and use its interpreter.',
                'Activation file not found: check that creation succeeded, that the terminal is in the project folder, and that you chose the command for your shell.',
                'The terminal works but the editor fails: inspect the editor’s selected interpreter. Terminal activation does not automatically configure every editor or notebook kernel.',
            ],
            paragraphs: [[
                'See the ',
                { text: 'Python venv documentation', href: 'https://docs.python.org/3/library/venv.html' },
                ', the ',
                { text: 'package installation guide', href: 'https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/' },
                ', and the ',
                { text: 'pip freeze documentation', href: 'https://pip.pypa.io/en/stable/cli/pip_freeze/' },
                ' for the full command references.',
            ]],
        },
    ],
};

export default note;
