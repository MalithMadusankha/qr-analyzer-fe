import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { CreatePatient } from "../service/StudentService";

export default function NewPatientForm({ toggle, setSuccess }) {
  const [name, setName] = useState("");
  const [student_id, setStudent_id] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");

  const [errMsage, setErrMsage] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // submit form data to server or perform other actions
    let patientObj = {
      name,
      student_id,
      course,
      email,
    };
    try {
      const res = await CreatePatient(patientObj);
      console.error("res", res);
      setIsLoading(false);
      setIsError(false);
      setIsSuccess(true);
      setSuccess(true);
    } catch (error) {
      setIsSuccess(false);
      setIsLoading(false);
      setIsError(true);
      console.log("error ddd", error);
      setErrMsage(error.response.data.message);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* Alerts */}
        {isLoading ? (
          <Alert color="primary"> Loading . . .</Alert>
        ) : isSuccess ? (
          <Alert color="success"> Student Created</Alert>
        ) : (
          isError && (
            <div>
              {errMsage.map((err, index) => (
                <Row key={index}>
                  <Alert color="danger"> {err}</Alert>
                </Row>
              ))}
            </div>
          )
        )}

        <Row>
          <Col>
            <FormGroup>
              <Label className="text-primary" for="name">
                Name*
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Nilundi Madusahani"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label className="text-primary" for="student_id">
                Student ID*
              </Label>
              <Input
                type="text"
                name="student_id"
                id="student_id"
                placeholder="984585565v"
                required
                value={student_id}
                onChange={(e) => setStudent_id(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        {/* Course With Email */}
        <Row>
          <Col>
            <FormGroup>
              <Label className="text-primary" for="course">
                Course
              </Label>
              <Input
                type="text"
                name="course"
                id="course"
                placeholder="Software engineering"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label className="text-primary" for="email">
                Email
              </Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="amadi@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <div className="mt-5 d-flex justify-content-end">
          <Button
            className="mx-2"
            color="secondary"
            onClick={() =>
              isError || isSuccess ? window.location.reload() : toggle()
            }
          >
            Cancel
          </Button>
          <Button color="success" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}
