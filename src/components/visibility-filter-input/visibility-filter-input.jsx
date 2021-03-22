import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="Search for Title"
    style={{ width: '20rem' }}
    className="mb-3"
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);