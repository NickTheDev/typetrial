/**
 * Represents a one-way text binding between the DOM and a data value.
 *
 * @author NickTheDev
 * @version 1.0
 */
class Binding {

    /**
     * Creates a new binding with the specified value and target.
     *
     * @param {Object} value Initial value of this binding.
     * @param {HTMLElement} target Element to bind to.
     */
    constructor(value, target) {
        this.data = value;
        this.target = target;
    }

    /**
     * Gets the value of this binding.
     *
     * @returns {Object} Binding value.
     */
    get value() {
        return this.data;
    }

    /**
     * Sets the value of this binding and updates its target.
     *
     * @param {Object} value Value of this binding.
     */
    set value(value) {
        this.data = value;

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
    static create(value, id) {
        return new Binding(value, document.getElementById(id));
    }

}