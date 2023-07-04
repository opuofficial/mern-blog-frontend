import React from "react";
import "./newsletter.css";
import { Input, Button } from "antd";

function NewsLetter() {
  return (
    <div className="newsletter">
      <h4>Newsletter</h4>

      <Input placeholder="Your Email" />
      <Button type="primary" block>
        Subscribe
      </Button>
      <small>Subscribe to our newsletter and stay updated.</small>
    </div>
  );
}

export default NewsLetter;
