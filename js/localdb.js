var localdb = {

  db: "localdb",

  init: function(name) {
    this.db = name;
    if (!this.has())
      this.clear();
  },

  has: function() {
    return (localStorage.getItem(this.db) != null);
  },

  save: function(data) {
    localStorage.setItem(this.db, JSON.stringify(data));
    return true;
  },

  get: function(info) {
    if (this.has()) {
      var obj = JSON.parse(localStorage.getItem(this.db));
      for (key in obj)
        if (key == info)
          return obj[key];
    } else {
      return false;
    }
  },

  set: function(info, data) {
    var aux = {};
    if (this.has())
      aux = JSON.parse(localStorage.getItem(this.db));
    aux[info] = data;
    localStorage.setItem(this.db, JSON.stringify(aux));
  },

  clear: function() {
    localStorage.removeItem(this.db);
  },

  getObject: function() {
    return JSON.parse(localStorage.getItem(this.db));
  }

};
