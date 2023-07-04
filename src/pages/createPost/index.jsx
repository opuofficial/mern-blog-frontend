import React, { useEffect, useState } from "react";
import "./createPost.css";
import JoditEditor from "jodit-react";
import { Button, Input, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import useApi from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("");

  const { sendRequest, data: topics } = useApi();
  const { sendRequest: sendRequest2, data, error } = useApi();

  useEffect(() => {
    sendRequest("GET", `/topic`);
  }, []);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handlePublish = async (e) => {
    e.preventDefault();

    if (!postTitle || !postContent || !postCategory) {
      return;
    }

    const data = {
      title: postTitle,
      content: postContent,
      topic: postCategory,
    };

    if (file) {
      const formData = new FormData();
      formData.append("thumbnail", file);

      const response = await sendRequest2(
        "POST",
        "/user/upload-thumbnail",
        formData
      );

      data.thumbnail = response.data.filename;
      sendRequest2("POST", "/user/create-post", data);
    }
  };

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data]);

  return (
    <section id="create__post">
      <h2 className="heading">Create Post</h2>

      <form onSubmit={handlePublish}>
        <div className="input__group">
          <label htmlFor="">Post Title</label>
          <Input
            placeholder="Your Post Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>
        <div className="input__group">
          <label htmlFor="">Post Content</label>
          <JoditEditor value={postContent} onChange={setPostContent} />
        </div>

        <div className="input__group">
          <label htmlFor="">Post Category</label>
          <div className="select__category">
            <Select
              showSearch
              placeholder="Select a category"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={topics?.data.map((topic) => ({
                value: topic._id,
                label: topic.name,
              }))}
              value={postCategory}
              onChange={(value) => setPostCategory(value)}
            />
          </div>
        </div>

        <div className="input__group">
          <label htmlFor="">Post Thumbnail</label>

          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive && "drag__active"}`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div>Drop the image here ...</div>
            ) : (
              <div>
                <FontAwesomeIcon icon={faPlus} className="plus__icon" />
                <div>Select or Drag and drop an image here</div>
              </div>
            )}
          </div>

          {file && (
            <div className="preview__image">
              <img src={URL.createObjectURL(file)} alt="Selected file" />
            </div>
          )}
        </div>

        <Button
          type="primary"
          block
          size="large"
          className="publish__button"
          htmlType="submit"
        >
          <FontAwesomeIcon icon={faPencil} />
          <span>Publish</span>
        </Button>
      </form>
    </section>
  );
}

export default CreatePost;
