class RouteItems {
  get rules() {
    return {
      toi: "integer",
    };
  }

  get messages() {
    return {
      "toi.integer": "TOI's deve ser um valor númerico",
    };
  }
}

module.exports = new RouteItems();
