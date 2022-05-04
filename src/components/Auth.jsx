import { Component } from "react";

export default class Auth extends Component {
  constructor() {
    super()
    this.Authenticated = false;
  }

  login(cb) {
    this.Authenticated = true;
    cb();
  }

  logout(cb) {
    this.Authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.Authenticated;
  }
}
