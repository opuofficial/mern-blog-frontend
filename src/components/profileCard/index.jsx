import React from "react";
import "./profileCard.css";
import { Col, Row } from "antd";
import twitterIcon from "../../assets/twitter.svg";
import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/linkedin.svg";

function ProfileCard({ profile }) {
  const { username, profilePicture, about, social } = profile;

  return (
    <div className="profile__card">
      <Row gutter={[20, 20]}>
        <Col sm={{ span: 6 }}>
          <div className="author__image">
            <img
              src={"http://localhost:5000/profile-pictures/" + profilePicture}
              alt=""
            />
          </div>
          {social && (
            <div className="social__links">
              {social.twitter && (
                <a
                  href={`http://${social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={twitterIcon} alt="" />
                </a>
              )}
              {social.github && (
                <a
                  href={`http://${social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={githubIcon} alt="" />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={`http://${social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedinIcon} alt="" />
                </a>
              )}
            </div>
          )}
        </Col>
        <Col sm={{ span: 18 }}>
          <div className="author__name__bio">
            <div className="author__name">{username}</div>
            <div className="author__bio">{about}</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProfileCard;
