import EmberObject from '@ember/object';

export default function createIdentifier(total) {
  const identifiers = [];

  for (let i = 0; i < total; i++) {
    const identifier = EmberObject.create({
      identifier: 'identifier' + i,
      namespace: 'namespace' + i,
      version: 'version' + i,
      description: 'description' + i,
      authority: {
        title: 'title' + i,
      },
    });

    identifiers.push(identifier);
  }

  return identifiers;
}
