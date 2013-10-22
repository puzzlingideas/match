(function(namespace) {

	function ArrayList() {
	    this._list = new Array(10);
	    this.size = 0;
	}

    ArrayList.prototype.push = function (item) {
        //this._list.push(item);
        if ( this.size == this._list.length ) {
        	this._list.length += 10;
        }
        this._list[this.size] = item;
        return this.size++;
    };

    ArrayList.prototype.get = function (i) {
        return this._list[i];
    };

    ArrayList.prototype.quickRemove = function (i) {
        this._list[i] = null;
        this._swap(i, this.size - 1);
        this.size--;
    };

    ArrayList.prototype.remove = function (i) {
        this._list.splice(i, 1);
        this.size--;
        // this._list[i] = null;
        // this.size--;
    };

    ArrayList.prototype.each = function (fnc) {

        var l = this._list,
            s = this.size;

        for ( var i = 0; i < s; i++ ) {
            fnc(l[i], i, this);
        }

		// var l = this._list,
  //           s = this.size,
  //           c;

  //       for ( var i = 0; i < s; i++ ) {
  //           c = l[i];
  //           if ( c ) {
  //               fnc(l[i], i, this);
  //           }
  //       }

    };

    ArrayList.prototype._swap = function (from, to) {

        var f = this._list[from],
            t = this._list[to];

        this._list[from] = t;
        this._list[to] = f;

    };

	namespace.ArrayList = ArrayList;

})(M);