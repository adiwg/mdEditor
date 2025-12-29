import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import HashPoll from 'mdeditor/mixins/hash-poll';
import RouteExtensionMixin from '../../../../mixins/route-extension';

@classic
export default class EditRoute extends Route.extend(
  HashPoll,
  RouteExtensionMixin
) {}
