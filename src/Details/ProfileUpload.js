import React, { useState } from "react";
import "../App.css";
import { Row, Col, Form } from "react-bootstrap";
import UserContext from "../Context/UserContext";
import { Image } from "antd";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Modal, Button } from "antd";

class ProfileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      image: "",
      src: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 1.3 / 1.5,
      },
      isModalVisible: false,
    };
  }
  onSelectFile = (e) => {
   
    if(e.target.files[0].size > 1048000){
      alert("File is too big!");
      
   }else{
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
      this.showModal();
    }
  }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );

      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
    // As Base64 string
    const base64Image = canvas.toDataURL("image/jpeg");
    return base64Image;
  }
  componentDidMount() {
    const { details } = this.context;
    console.log(this.state.image, "image");
    console.log(details, "compound");
    if (details == "" || details == null || details == undefined) {
    } else {
      this.setState({
        image:
          details.photo == "" || undefined || null
            ? "https://www.mayyam.in/css/images/noavatar.jpg"
            : details.photo,
      });
    }
  }
  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };
  uploadCroppedImage = async () => {
    const files = this.state.croppedImageUrl;
    console.log(files, "files");
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "matprofileimage");

    this.setState({
      loading: true,
    });

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/insankarii/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);

    this.setState({
      image: file.secure_url,
      loading: false,
    });
    fetch("http://localhost:3000/set-details", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        fields: {
          photo: this.state.image,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "image");
      });
  };

  handleOk = () => {
    this.setState({
      isModalVisible: false,
    });
    this.uploadCroppedImage();
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    });
  };
  render() {
    const { crop, croppedImageUrl, src } = this.state;

    const ImageLoading = () => {
      return <div className="loader1"></div>;
    };
    const clearImage = () => {
      alert("clicked");
      fetch("http://localhost:3000/set-details", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          fields: {
            photo: "",
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "image");
          this.setState({
            image: "https://www.mayyam.in/css/images/noavatar.jpg",
          });
        });
    };

    return (
      <>
        {this.state.loading ? (
          <Col className="imageLoading">
            <ImageLoading />
          </Col>
        ) : (
          <Image
            width="100%"
            src={
              this.state.image == undefined ||
              this.state.image == "" ||
              this.state.image == null
                ? "https://www.mayyam.in/css/images/noavatar.jpg"
                : this.state.image
            }
          />
        )}

        <Form>
          <Form.Group className="mb-3">
            <Col className="profile-image-div">
              <Form.Control
                type="file"
                name="file"
                accept="image/*"
                id="upload-btn"
                hidden
                onChange={this.onSelectFile}
              />
              <Form.Label htmlFor="upload-btn" className="profile-btn">
                Upload Image
              </Form.Label>
              <Form.Label className="profile-btn" onClick={clearImage}>
                Clear Image
              </Form.Label>
            </Col>
          </Form.Group>
        </Form>
        <Modal
          title="Crop"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          
          {src && (
            <div className='modal-div'>
              <div>
              <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
              </div>
              <div className='cropedImg-div'>
              {croppedImageUrl && (
                <img
                  src={croppedImageUrl}
                  style={{ height: "auto", width: "100%" }}
                />
              )}
              </div>
            </div>
          )}
        </Modal>
      </>
    );
  }
}
ProfileUpload.contextType = UserContext;
export default ProfileUpload;
