import React from 'react';
import classNames from 'classnames';
import _ from 'underscore';
const {debounce} = _;

class TextField extends React.Component {
  constructor() {
    super();
    this.getElement = this.getElement.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  getElement() {
    return this.textfield;
  }
  onChangeHandler(e) {
    const {onChangeHandler} = this.props;
    onChangeHandler(this.textfield);
  }
  renderTextField(type, inputId, pattern) {
    const {name, rows} = this.props;
    const textfieldRef = (c) => {
      this.textfield = c;
    };
    if (type === 'textarea') {
      return (
        <textarea
          className="mdl-textfield__input"
          type="text"
          rows= {rows && !isNaN(rows) ? rows : 1}
          id={inputId}
          ref = {textfieldRef}
          name = {name}
          onChange = {debounce(this.onChangeHandler, 250)}
        >
        </textarea>
      );
    }
    return (
      <input
        className="mdl-textfield__input"
        type={type}
        id={inputId}
        name = {name}
        ref = {textfieldRef}
        pattern = {pattern && typeof pattern === 'string' ? pattern : null}
        onChange = {debounce(this.onChangeHandler, 250)}
      />
    );
  }
  renderExpandingIcon(id) {
    const {expandingMaterialIcon, expandingFontIcon} = this.props;
    const className = expandingMaterialIcon ? 'material-icons' :
      `fa ${expandingFontIcon ? expandingFontIcon : 'fa-search'}`;
    return (expandingMaterialIcon && typeof expandingMaterialIcon === 'string') ||
      (expandingFontIcon && typeof expandingFontIcon === 'string') ? (
      <label
        className="mdl-button mdl-js-button mdl-button--icon"
        htmlFor={id}
      >
        <i className={className}>
          {expandingMaterialIcon ? expandingMaterialIcon : ''}
        </i>
      </label>
    ) : null;
  }
  render() {
    const {
      placeholder,
      expandingMaterialIcon,
      expandingFontIcon,
      errorLabel,
      pattern,
      classes,
      shouldFloat,
      id,
      type
    } = this.props;
    const inputId = id && typeof id === 'string' ? `text-field-${id}` : 'text-field-default';
    const className = classNames(
      'mdl-textfield mdl-js-textfield',
      'comp-lib-v1-atom-text-field',
      classes && typeof classes === 'string' ? classes : null,
      {
        'mdl-textfield--floating-label': shouldFloat,
        'mdl-textfield--expandable': expandingMaterialIcon || expandingFontIcon
      }
    );
    const trueType = type &&
      typeof type === 'string' && (
        type === 'text' ||
        type === 'number' ||
        type === 'textarea' ||
        type === 'email' ||
        type === 'number' ||
        type === 'password' ||
        type === 'search' ||
        type === 'url'
      ) ? type : 'text';
    return (
      <div
        className={className}
      >
        {this.renderExpandingIcon(inputId)}
        <div
          className = {expandingFontIcon || expandingMaterialIcon ?
            'mdl-textfield__expandable-holder' :
            null
          }
        >
          {this.renderTextField(trueType, inputId, pattern)}
          <label
            className="mdl-textfield__label"
            htmlFor={inputId}
          >
            {placeholder && typeof placeholder === 'string' ? placeholder : 'Placeholder Text'}
          </label>
          <span
            className="mdl-textfield__error"
          >
            {errorLabel && typeof errorLabel === 'string' ? errorLabel : 'Placeholder Error'}
          </span>
        </div>
      </div>
    );
  }
}

export default TextField;