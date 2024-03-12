import { Form, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading, ReloadData } from "../../redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminCertifications() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { certifications } = portfolioData;
  const [showAddEditModel, setShowAddEditModel] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(false);
  const [type = "add", setType] = React.useState("add");
  const { form } = Form.useForm();
  const onFinish = async (values) => {
    try {
      //   const tempTechnologies = values.technologies.split(",");
      //   values.technologies = tempTechnologies;
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-certification", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-certification", values);
      }
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModel(false);
        setSelectedItemForEdit(null);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
        //form.resetFields();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-certification", {
        _id: item._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModel(true);
          }}
        >
          Add Certification
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1">
        {certifications.map((certification) => (
          <div className="shadow border border-gray-200 p-5 flex flex-col gap-5">
            <h1 className="text-secondary text-xl font-bold">
              {certification.title}
            </h1>
            <hr />
            <img
              src={certification.image}
              alt=""
              className="h-60 w-80 rounded"
            />
            <h1>{certification.description}</h1>
            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2 "
                onClick={() => {
                  onDelete(certification);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2 "
                onClick={() => {
                  setSelectedItemForEdit(certification);
                  setShowAddEditModel(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {(type === "add" || selectedItemForEdit) && (
        <Modal
          visible={showAddEditModel}
          title={
            selectedItemForEdit ? "Edit Certification" : "Add Certification"
          }
          footer={null}
          onCancel={() => {
            setShowAddEditModel(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={
              {
                ...selectedItemForEdit,
                technologies: selectedItemForEdit?.technologies?.join(", "),
              } || {}
            }
          >
            <Form.Item name="title" label="Title">
              <input placeholder="Title" />
            </Form.Item>
            <Form.Item name="image" label="Image">
              <input placeholder="Image" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <textarea placeholder="Description" />
            </Form.Item>
            <Form.Item name="link" label="Link">
              <input placeholder="Link" />
            </Form.Item>

            <div className="flex justify-end">
              <button
                className="border-primary text-primary px-5 py-2"
                onClick={() => {
                  setShowAddEditModel(false);
                  setSelectedItemForEdit(null);
                }}
              >
                Cancel
              </button>
              <button className="bg-primary text-white px-5 py-2">
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminCertifications;
