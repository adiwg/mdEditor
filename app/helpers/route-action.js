import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';

export default class RouteActionHelper extends Helper {
  compute([actionName, ...params]) {
    const owner = getOwner(this);
    
    // Return a function that will be called when the action is triggered
    return (...args) => {
      // Get the application route to send the action through the route hierarchy
      const applicationRoute = owner.lookup('route:application');
      const allArgs = [...params, ...args];
      
      if (applicationRoute) {
        // Send the action through the route hierarchy
        applicationRoute.send(actionName, ...allArgs);
      }
    };
  }
}
