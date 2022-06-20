import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useSelector, useDispatch } from "react-redux";
import { withFormik } from "formik";
import {
  CREATE_PROPJECT_API,
  GET_ALL_PROJECT_CATEGORY_API,
} from "../../Redux/Constants/ProjectConstant";
function CreateProject(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    arrProjectCategory,
    setFieldValue,
  } = props;

  //
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };
  //

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_API });
  }, []);
  return (
    <div className="container m-5">
      <h3>CreateProject</h3>
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <p>Name</p>
          <input
            onChange={handleChange}
            className="form-control"
            name="projectName"
          />
        </div>
        <div className="form-group">
          <p>Description</p>
          <Editor
            name="description"
            initialValue=""
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <div className="form-group">
          <select
            onChange={handleChange}
            name="categoryId"
            className="form-control"
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-outline-primary" type="submit">
          Create project
        </button>
      </form>
    </div>
  );
}

let CreateProjectFromirk = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id,
    };
  },
  // validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(true);
    props.dispatch({ type: CREATE_PROPJECT_API, project: values });
  },
  displayName: "Create Project",
})(CreateProject);

const mapStateToProps = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
  };
};
export default connect(mapStateToProps)(CreateProjectFromirk);
