import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
import { Z_STREAM_ERROR } from "zlib";
import { make_cols } from "./MakeColumns";
import { SheetJSFT } from "./types";
import { links } from "../Config";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  fileUpload: {
    position: "relative",
    top: "80px",
    paddingBottom: 100,
    paddingLeft: 50
  },
  true: {
    backgroundColor: "#dc718f"
  },
  false: {
    backgroundColor: "#65da65"
  },
  message: {
    backgroundColor: "#ffc107"
  },
  formCode: {
    position: "relative",
    top: 150,
    left: "40%"
  }
}));

function fileUpload(props) {
  const classes = useStyles();
  const [file, setFile] = useState(undefined);
  const [data, setData] = useState([]);
  const [cols, setCols] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("upload the file");
  const [toggleButton, setToggleButton] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = event => {
    debugger;
    console.log(event);
    if (event.code === "252510") {
      setToggleButton(true);
    }
  };

  const handleChange = e => {
    const files = e.target.files;
    setMessage("");
    setError(false);

    if (files && files[0]) setFile(files);
  };

  const postQuestions = data => {
    fetch(links.backendURL + "questions?date=" + `${data.date}`)
      .then(questionsJosn => {
        return questionsJosn.json();
      })
      .then(res => {
        if (res.length > 0) {
          setMessage("already exists");
          setError(true);
        } else {
          let userOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          };
          fetch(links.backendURL + "questions", userOptions)
            .then(response => {
              return response.json();
            })
            .then(res => {
              console.log(res);
            });
        }
      });
  };

  const handleFile = () => {
    /* Boilerplate to set up FileReader */
    let currentFile = file[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      let address_of_cell = "A2";
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const date = ws[address_of_cell];
      /* Convert array of arrays */
      const date_value = date ? date.w : undefined;
      const data = XLSX.utils.sheet_to_json(ws, { raw: true });
      let obj = {};
      obj["date"] = date_value;
      if (data.length != 20) {
        setMessage("array size more than 20");
        setError(true);
        setFile(undefined);
        setData(data);
        return;
      }
      for (let i = 0; i < data.length; i++) {
        if (typeof data[i].date === "string") {
          if (
            data[i].date.replace(/\s/g, "") === "" ||
            data[i].question.replace(/\s/g, "") === "" ||
            data[i].answer.replace(/\s/g, "") === "" ||
            data[i].__EMPTY != undefined ||
            data.length != 20
          ) {
            setMessage("empty date or question or answer");
            setError(true);
            break;
          }
        }
        if (data[i].__EMPTY != undefined) {
          setMessage("empty date or question or answer");
          setError(true);
          break;
        }
        if (!error) {
          setMessage("successful");
        }
        delete data[i].date;
      }

      obj["questions"] = data;
      /* Update state */
      setData(obj);
      setCols(make_cols(ws["!ref"]));
      postQuestions(obj);
      setFile(undefined);
      console.log(obj);
      //}
    };

    if (rABS) {
      reader.readAsBinaryString(currentFile);
    } else {
      reader.readAsArrayBuffer(currentFile);
    }
  };

  return (
    <div className={classes.formCode}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        {toggleButton === false ? (
          <React.Fragment>
            {" "}
            <div>
              <label className={classes.mobilenumber}>Code</label>
              <input
                name="code"
                type="tel"
                ref={register({
                  required: true
                })}
                className={classes.mobileInput}
              />
            </div>
            <div className={classes.submitButton}>
              <Button
                variant="contained"
                className={classes.feedbackButton}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <div className={classes.fileUpload}>
            <label className="btn btn-default">
              <input type="file" accept={SheetJSFT} onChange={handleChange} />
            </label>

            <button
              className="btn btn-success"
              disabled={!file}
              onClick={handleFile}
            >
              Upload
            </button>

            <div className={classes.message} role="alert">
              {message}
            </div>
            {error ? (
              <pre className={classes.true}>
                {JSON.stringify(data, null, 2)}
              </pre>
            ) : (
              <pre className={classes.false}>
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default fileUpload;
