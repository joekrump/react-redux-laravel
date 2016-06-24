import SortableList from 'react-sortable-list'
import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'

export default class TestComponent extends Component {
  render () {
    let colors = ["Red","Green","Blue","Yellow","Black","White","Orange"];

    return (
      <div>
        <SortableList data={colors} />
      </div>
    )
  }
}