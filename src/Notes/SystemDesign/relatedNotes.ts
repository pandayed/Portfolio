const distributedSystems = '26524eb1ed548063b5bee98feef734e1';
const microservices = '29e24eb1ed54800e96ded1bdda790278';
const saga = '29024eb1ed548099a309fe43f0bc16c6';
const cloudNative = '33324eb1ed5480bd90f4dc0b5c030205';
const twoPhaseCommit = '26c24eb1ed5480f1a65ecb09e8303e62';
const kafka = '26524eb1ed5480988bd6d71c87e555a7';
const rabbitmq = '2e824eb1ed5480eca2def2b63356ddac';
const backoff = '30624eb1ed5480a9af1ce93d818aff43';
const deadLetterQueue = '30124eb1ed5480e999dff56c7a3fc5f4';
const apiGateway = '27a24eb1ed54805e9270ec526332708d';
const containers = '33124eb1ed5480498f70e7010ffc7c92';

export const relatedSystemDesignNotes: ReadonlyMap<string, readonly string[]> = new Map([
    [distributedSystems, [microservices, saga, cloudNative, twoPhaseCommit]],
    [microservices, [distributedSystems, saga, cloudNative, apiGateway]],
    [saga, [distributedSystems, microservices, cloudNative, twoPhaseCommit, kafka, rabbitmq]],
    [cloudNative, [distributedSystems, microservices, saga, containers]],
    [twoPhaseCommit, [distributedSystems, saga]],
    [kafka, [rabbitmq, saga, deadLetterQueue, backoff]],
    [rabbitmq, [kafka, saga, deadLetterQueue, backoff]],
    [backoff, [saga, kafka, rabbitmq, deadLetterQueue]],
    [deadLetterQueue, [saga, kafka, rabbitmq, backoff]],
    [apiGateway, [microservices, cloudNative]],
    [containers, [cloudNative]],
]);
