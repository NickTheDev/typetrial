/**
 * Represents a one-way text binding between a DOM element and a data value.
 *
 * @author NickTheDev
 * @version 1.0
 */
class Binding {

    /**
     * Creates a new binding with the specified value and target.
     *
     * @param {Object} value Initial value of this binding.
     * @param {String} target Element to bind to.
     */
    constructor(value, target) {
        this._data = value;

        document.addEventListener("DOMContentLoaded", () => {
            this.target = document.getElementById(target);
            this.value = value;
        });

    }

    /**
     * Gets the value of this binding.
     *
     * @returns {Object} Binding value.
     */
    get value() {
        return this._data;
    }

    /**
     * Sets the value of this binding and updates its target.
     *
     * @param {Object} value Value of this binding.
     */
    set value(value) {
        this._data = value;

        if(this.target.nodeName === "INPUT") {
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
    static of(id, value = "") {
        return new Binding(value, id);
    }

}