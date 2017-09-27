import React, { Component } from 'react';
import './Row.css';

class Row extends Component {
  getList(list) {
    if (list.length === 0) return;

    const listItems = list.map( (value, index) => <li key={index}>{value}</li>);

    return (
      <div className="description">
        <ul>{listItems}</ul>
      </div>
    );
  }

  getPeriod(start, end) {
    let period = start;

    if (end !== '') {
      period += '<span class="divider">–</span>' + end;
    }

    return (
      <div className="label period" dangerouslySetInnerHTML={this.createMarkup(period)} />
    );
  }

  createMarkup(content) {
    return {__html: content};
  }

  render() {
    return (
      <div className="row">
        {this.getPeriod(this.props.start, this.props.end)}
        <div className="title">
          <h3 dangerouslySetInnerHTML={this.createMarkup(this.props.title)} />
          <div className="label">{this.props.label}</div>
        </div>
        {this.getList(this.props.list)}
      </div>
    );
  }
}

Row.defaultProps = {
  title: '',
  label: '',
  start: '',
  end: '',
  list: []
}

export default Row;