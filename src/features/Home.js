import React, { Component } from 'react';
import { Col, Grid, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  constructor(props) {
    super(props);
    const images = [
      {
        id: 'placeholder_1',
        url: 'http://fillmurray.com/200/200'
      },
      {
        id: 'placeholder_2',
        url: 'http://fillmurray.com/200/200'
      },
      {
        id: 'placeholder_3',
        url: 'http://fillmurray.com/200/200'
      }
    ];
    this.state = {
      images
    };
  }

  render() {
    const images = this.state.images.map(image => {
      return (
        <div key={image.id}>
          <div style={{minHeight: '215px'}}>
            <i className="bottom-icon material-icons main-close">close</i>
            <Image style={{ width: '100%' }} src={image.url} responsive />
          </div>
        </div>
      );
    });

    return (
      <div>
        {images}
        <Grid className="bottom-nav">
          <Row className="show-grid">
            <Col xs={4} className="col-bottom">
              <Link to="/app/album"><i className="bottom-icon material-icons">collections</i></Link>
            </Col>
            <Col xs={4} className="col-bottom">
              <i className="bottom-icon material-icons">camera_alt</i>
            </Col>
            <Col xs={4} className="col-bottom">
              <i className="bottom-icon material-icons">assignment_return</i>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
