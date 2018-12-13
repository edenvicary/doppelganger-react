import React, { Component } from 'react';
import { Col, Grid, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../helpers/auth';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';

const appTokenKey = "appToken";

export default class Home extends Component {
  constructor(props) {
    super(props);
    const allPhotos = [
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
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      allPhotos
    };
  }

  handleLogout() {
    logout()
    .then(() => {
      localStorage.removeItem(appTokenKey);
      this.props.history.push("/login");
    });
  }

  async handleUploadSuccess(filename) {
    try {
      let {
        bucket,
        fullPath
      } = await firebase
        .storage()
        .ref('images')
        .child(filename)
        .getMetadata();
      console.log('bucket', bucket);
      console.log('fullPath', fullPath);
      let downloadURL = await firebase
        .storage()
        .ref('images')
        .child(filename)
        .getDownloadURL();
      console.log('downloadURL', downloadURL);
      let {
        uid,
        email,
        displayName
      } = await firebase.auth().currentUser;
      let newPhoto = {
        url: downloadURL,
        userName: displayName,
        userId: uid,
        email,
        bucket,
        fullPath
      }
      console.log('newPhoto', newPhoto);
      await firebase.firestore().collection('photos').add(newPhoto);
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    const allImages = this.state.allPhotos.map(photo => {
      return (
        <div key={photo.id}>
          <div style={{minHeight: '215px'}}>
            <i className="bottom-icon material-icons main-close">close</i>
            <Image style={{ width: '100%' }} src={photo.url} responsive />
          </div>
        </div>
      );
    });

    return (
      <div>
        {allImages}
        <Grid className="bottom-nav">
          <Row className="show-grid">
            <Col xs={4} className="col-bottom">
              <Link to="/app/album"><i className="bottom-icon material-icons">collections</i></Link>
            </Col>
            <Col xs={4} className="col-bottom">
              <label>
                <i className="bottom-icon material-icons">camera_alt</i>
                <FileUploader
                  hidden
                  accept="image/*"
                  storageRef={firebase.storage().ref('images')}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.hanldeUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                />
              </label>
            </Col>
            <Col onClick={this.handleLogout} xs={4} className="col-bottom">
              <i className="bottom-icon material-icons">assignment_return</i>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
