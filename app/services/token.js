import Service, { inject as service } from '@ember/service';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

const SB_TOKEN_KEY = 'sbToken';

export default class TokenService extends Service {
  @service flashMessages;

  @tracked token = null;
  @tracked userName = null;
  @tracked expiry = null;

  setup() {
    const storedToken = window.sessionStorage.getItem(SB_TOKEN_KEY);
    if (storedToken) {
      const addedToken = this.addToken(storedToken);
      if (!addedToken) {
        window.sessionStorage.removeItem(SB_TOKEN_KEY);
      }
    }
  }

  @action
  addToken(rawToken) {
    const parsed = this.parseToken(rawToken);
    if (parsed) {
      if (this.isExpired(parsed.expiry)) {
        this.flashMessages.danger('Token is expired');
      } else {
        this.token = parsed.token;
        this.userName = parsed.userName;
        this.expiry = parsed.expiry;
        window.sessionStorage.setItem(SB_TOKEN_KEY, rawToken);
      }
    } else {
      this.flashMessages.danger('Token is invalid');
    }
    return this.token;
  }

  parseToken(rawToken) {
    const parsedValues = {};
    let parsedToken = null;
    try {
      parsedToken = JSON.parse(rawToken);
    } catch(e) {
      return false;
    }
    const { access_token, refresh_token } = parsedToken;
    if (access_token) {
      const parsedAccess = this.parseTokenPayload(access_token);
      if (!!parsedAccess) {
        const userName = parsedAccess.preferred_username || parsedAccess.email;
        if (!!userName) {
          parsedValues.userName = userName;
        }
      }
    }
    if (refresh_token) {
      const parsedRefresh = this.parseTokenPayload(refresh_token);
      if (!!parsedRefresh) {
        const expiry = parsedRefresh.exp;
        if (!!expiry) {
          parsedValues.expiry = new Date(expiry * 1000);
          parsedValues.token = refresh_token;
        }
      }
      
    }
    if (parsedValues.userName && parsedValues.token && parsedValues.expiry) {
      return parsedValues;
    }
    return false;
  }

  isExpired(expiry) {
    return expiry < new Date();
  }

  parseTokenPayload(token) {
    const payload = token.split('.')[1]; // JWT payload is second dot-delimited item
    if (!!payload) {
      try {
        return JSON.parse(atob(payload));
      } catch(e) {
        return false;
      }
    }
    return false;
  }
}