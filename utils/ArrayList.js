/**
 * @module Match
 * @namespace utils
 */
(function(namespace) {
	/**
	 * Fast Array with better performance that regular Array
	 * in terms of iteration and removal of items
	 *
	 * @class ArrayList
	 * @constructor
	 */
	function ArrayList() {
		/**
		 * @private
		 * @property _list
		 * @type Array
		 */
	    this._list = new Array(10);
		/**
		 * @private
		 * @property size
		 * @type int
		 */
	    this.size = 0;
	}
	/**
	 * Add an item to the list
	 * @method push
	 */
    ArrayList.prototype.push = function (item) {
        if ( this.size == this._list.length ) {
        	this._list.length += 10;
        }
        this._list[this.size] = item;
        return this.size++;
    };
	/**
	 * Clears the internal array releasing memory.
	 * NOTE: This method might call the GC and cause undesired performance issues
	 * @method removeAll
	 */
    ArrayList.prototype.clear = function (i) {
		this.removeAll();
		this._list = new Array(10);
	};
	/**
	 * Resets the size of the array to 0 so newer objects will replace current.
	 * @method removeAll
	 */
    ArrayList.prototype.removeAll = function (i) {
		this.size = 0;
	};
	/**
	 * Gets the item in the given index
	 * @method push
	 */
    ArrayList.prototype.get = function (i) {
        return this._list[i];
    };
	/**
	 * Quickly removes an item from the list
	 * NOTE: The list will end up unsorted. If you need the list to keep it's order
	 * please call remove instead
	 * @method quickRemove
	 * @param {int} i index of the element to remove
	 */
    ArrayList.prototype.quickRemove = function (i) {
        this._list[i] = null;
        this._swap(i, this.size - 1);
        this.size--;
    };
	/**
	 * Removes an item from the list
	 * @method remove
	 * @param {int} i index of the element to remove
	 */
    ArrayList.prototype.remove = function (i) {
        this._list.splice(i, 1);
        this.size--;
    };
	/**
	 * Iterates through all items and calls the given function. The function will
	 * receive the item, the index and the list
	 * @method each
	 * @param {Function} fnc
	 */
    ArrayList.prototype.each = function (fnc) {

        var l = this._list,
            s = this.size;

        for ( var i = 0; i < s; i++ ) {
            fnc(l[i], i, this);
        }

    };
	/**
	 * Swaps the location of two items
	 * @method _swap
	 * @param {int} from
	 * @param {int} to
	 */
    ArrayList.prototype._swap = function (from, to) {

        var f = this._list[from],
            t = this._list[to];

        this._list[from] = t;
        this._list[to] = f;

    };

	namespace.ArrayList = ArrayList;

})(M);