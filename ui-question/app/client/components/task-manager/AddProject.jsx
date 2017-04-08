/* @flow */
import React from 'react';
import style from './style.scss';

export default class AddProject extends React.PureComponent {
  state: { input: string } = {
    input: ''
  };

  onChange = (e: Object) => this.setState({ input: e.target.value });

  onKeyUp = (e: Object) => {
    if (e.keyCode === 13) {
      this.props.callback(this.state.input);
      this.setState({ input: '' });
    }
  };

  props: {
    callback: Function
  };

  render() {
    return (
      <div className={style.AddProject}>
        <h4>add project</h4>
        <input
          type='text'
          onKeyUp={this.onKeyUp}
          onChange={this.onChange}
          value={this.state.input}
        />
      </div>
    );
  }
}
