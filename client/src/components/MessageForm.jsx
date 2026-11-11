import { Formik, Form, Field } from "formik";

const MessageForm = ({
  initialBody = "",
  onSubmit,
  submitText = "Send",
  onCancel,
  className = "edit-form",
}) => {
  const handleSubmit = (values, formikBag) => {
    const body = values.body.trim();

    if (!body) return;

    onSubmit(body);
    formikBag.resetForm();
  };
  return (
    <Formik initialValues={{ body: initialBody }} onSubmit={handleSubmit}>
      <Form className={className}>
        <Field
          name="body"
          className="input"
          placeholder="Message..."
          autoComplete="off"
          autoFocus={!!onCancel}
        />
        <button type="submit" className="btn">
          {submitText}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </Form>
    </Formik>
  );
};

export default MessageForm;
