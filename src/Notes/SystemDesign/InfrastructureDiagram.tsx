import type { ReactNode } from 'react';
import './InfrastructureDiagram.css';

export type InfrastructureDiagramKind =
    | 'bare-metal'
    | 'virtual-machines'
    | 'hypervisor-comparison'
    | 'containers';

function Layer({ children }: { children: ReactNode }) {
    return <div className="InfrastructureDiagram__layer">{children}</div>;
}

function Applications({ names }: { names: string[] }) {
    return (
        <div className="InfrastructureDiagram__applications">
            {names.map((name) => <Layer key={name}>{name}</Layer>)}
        </div>
    );
}

function VirtualMachines() {
    return (
        <div className="InfrastructureDiagram__machines">
            {[['App 1'], ['App 2', 'MySQL']].map((names, index) => (
                <div className="InfrastructureDiagram__boundary" key={index}>
                    <span className="InfrastructureDiagram__label">Virtual machine {index + 1}</span>
                    <Applications names={names} />
                    <Layer>Guest Operating System</Layer>
                </div>
            ))}
        </div>
    );
}

function VirtualMachineStack({ bareMetal = false }: { bareMetal?: boolean }) {
    return (
        <div className="InfrastructureDiagram__stack">
            <VirtualMachines />
            <Layer>{bareMetal ? 'Bare Metal Hypervisor' : 'Hypervisor'}</Layer>
            {!bareMetal && <Layer>Host Operating System</Layer>}
            <Layer>Hardware</Layer>
        </div>
    );
}

const captions: Record<InfrastructureDiagramKind, string> = {
    'bare-metal': 'Applications on a bare metal server',
    'virtual-machines': 'Virtual machines with a hosted hypervisor',
    'hypervisor-comparison': 'Hosted and bare metal hypervisors',
    containers: 'Containers sharing the host operating system',
};

export default function InfrastructureDiagram({ kind }: { kind: InfrastructureDiagramKind }) {
    return (
        <figure className="InfrastructureDiagram">
            {kind === 'bare-metal' && (
                <div className="InfrastructureDiagram__stack">
                    <Applications names={['App 1', 'App 2', 'MySQL']} />
                    <Layer>Host Operating System</Layer>
                    <Layer>Hardware</Layer>
                </div>
            )}
            {kind === 'virtual-machines' && <VirtualMachineStack />}
            {kind === 'hypervisor-comparison' && (
                <div className="InfrastructureDiagram__comparison">
                    <div className="InfrastructureDiagram__comparisonItem">
                        <div className="InfrastructureDiagram__heading">Hosted hypervisor</div>
                        <VirtualMachineStack />
                        <p className="InfrastructureDiagram__detail">Relies on the host operating system</p>
                    </div>
                    <div className="InfrastructureDiagram__comparisonItem">
                        <div className="InfrastructureDiagram__heading">Bare metal hypervisor</div>
                        <VirtualMachineStack bareMetal />
                        <p className="InfrastructureDiagram__detail">Runs directly on hardware</p>
                    </div>
                </div>
            )}
            {kind === 'containers' && (
                <div className="InfrastructureDiagram__stack">
                    <div className="InfrastructureDiagram__containers">
                        {['App 1', 'App 2', 'MySQL'].map((name, index) => (
                            <div className="InfrastructureDiagram__boundary" key={name}>
                                <span className="InfrastructureDiagram__label">Container {index + 1}</span>
                                <Layer>{name}</Layer>
                            </div>
                        ))}
                    </div>
                    <Layer>Container Engine</Layer>
                    <Layer>Host Operating System</Layer>
                    <Layer>Hardware</Layer>
                </div>
            )}
            <figcaption className="InfrastructureDiagram__caption">{captions[kind]}</figcaption>
        </figure>
    );
}
