/* eslint-disable ember/no-mixins */
import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import HashPoll from 'mdeditor/mixins/hash-poll';

@classic
export default class EditRoute extends Route.extend(HashPoll) {}