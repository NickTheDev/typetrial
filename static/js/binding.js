"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a one-way text binding between a DOM element and a data value.
 *
 * @author NickTheDev
 * @version 1.0
 */
var Binding = function () {

    /**
     * Creates a new binding with the specified value and target.
     *
     * @param {Object} value Initial value of this binding.
     * @param {HTMLElement} target Element to bind to.
     */
    function Binding(value, target) {
        _classCallCheck(this, Binding);

        this._data = value;
        this.target = target;
        this.value = value;
    }

    /**
     * Gets the value of this binding.
     *
     * @returns {Object} Binding value.
     */


    _createClass(Binding, [{
        key: "value",
        get: function get() {
            return this._data;
        }

        /**
         * Sets the value of this binding and updates its target.
         *
         * @param {Object} value Value of this binding.
         */
        ,
        set: function set(value) {
            this._data = value;

            if (this.target.nodeName === "INPUT") {
                this.target.value = value.toString();
            } else {
                this.target.textContent = value.toString();
            }
        }

        /**
         * Creates a new binding with the value and ID. by locating the target in the DOM using the specified ID.
         *
         * @param {Object} value Value of the binding.
         * @param {String} id ID of the target of the binding.
         * @returns {Binding} New binding.
         */

    }], [{
        key: "of",
        value: function of(id) {
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

            return new Binding(value || "", document.getElementById(id));
        }
    }]);

    return Binding;
}();