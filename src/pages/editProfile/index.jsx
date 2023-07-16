import React, { useEffect, useState } from "react";
import "./editProfile.css";
import { Button, Col, Input, Row } from "antd";
const { TextArea } = Input;
import twitterIcon from "../../assets/twitter.svg";
import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/linkedin.svg";
import useApi from "../../hooks/useApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function EditProfile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { sendRequest, data, isLoading, error } = useApi();
  const { sendRequest: sendRequest2, data: data2 } = useApi();
  const [file, setFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [social, setSocial] = useState({
    twitter: "",
    github: "",
    linkedin: "",
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handleSocialChange = (event) => {
    const { name, value } = event.target;
    setSocial((prevSocial) => ({ ...prevSocial, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);

      sendRequest2("PUT", "/user/upload-profile-picture", formData);
    }

    const data = {
      about: about,
      social: social,
    };

    sendRequest2("PUT", "/user/edit-profile", data);
  };

  useEffect(() => {
    if (data2) {
      navigate("/user/profile");
    }
  }, [data2]);

  useEffect(() => {
    sendRequest("GET", `/user/edit-profile`);
  }, []);

  useEffect(() => {
    if (data) {
      const { email, username, about, social, profilePicture } = data.data;
      setEmail(email);
      setUsername(username);
      setProfilePicture(profilePicture);
      setAbout(about);
      setSocial(social);
    }
  }, [data]);

  if (isLoading) {
    return;
  }

  return (
    <section id="edit__profile">
      <h2 className="heading">Edit Profile</h2>

      <div className="edit__profile__container">
        <div className="profile__picture">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : profilePicture
                ? "http://localhost:5000/profile-pictures/" + profilePicture
                : ""
            }
            alt=""
          />

          <Button type="primary">
            <input type="file" name="" id="" onChange={handleFileChange} />
            Choose Picture
          </Button>
        </div>

        <Row>
          <Col xs={{ span: 24 }} md={{ span: 18 }} lg={{ span: 16 }}>
            <form onSubmit={handleUpdateProfile}>
              <div className="input__group">
                <label htmlFor="">Email</label>
                <Input value={email} disabled />
              </div>
              <div className="input__group">
                <label htmlFor="">Username</label>
                <Input value={username} disabled />
              </div>

              <div className="input__group">
                <label htmlFor="">About</label>
                <TextArea rows={3} value={about} onChange={handleAboutChange} />
              </div>

              <div className="social__links">
                <div className="input__group">
                  <Input
                    placeholder="Twitter"
                    prefix={<img src={twitterIcon} />}
                    name="twitter"
                    value={social?.twitter}
                    onChange={handleSocialChange}
                  />
                </div>
                <div className="input__group">
                  <Input
                    placeholder="Github"
                    prefix={<img src={githubIcon} />}
                    name="github"
                    value={social?.github}
                    onChange={handleSocialChange}
                  />
                </div>
                <div className="input__group">
                  <Input
                    placeholder="Linkedin"
                    prefix={<img src={linkedinIcon} />}
                    name="linkedin"
                    value={social?.linkedin}
                    onChange={handleSocialChange}
                  />
                </div>
              </div>

              <div className="button__group">
                <Link to="/user/profile">
                  <Button type="primary" danger>
                    Cancel
                  </Button>
                </Link>
                <Button type="primary" htmlType="submit">
                  Update Profile
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default EditProfile;
