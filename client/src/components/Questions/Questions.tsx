import {
  Form,
  FormInput,
  FormSelect,
  LargeField,
  MediumField,
} from "@base-components";
import { FormStateContext } from "@context";
import { Box } from "@mui/material";
import { makeStyles } from "@styling";
import { Questions as QuestionsType, Question } from "@types";
import produce from "immer";
import React, { useContext, useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
import { BASE_QUESTIONS } from "@constants";

const useStyles = makeStyles()((theme) => {
  return {
    questionsContainerWrapper: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2, 0),
      [theme.breakpoints.up("lg")]: {
        minWidth: 720,
      },
    },
    constQuestionsContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
    },
    eachQuestionRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      height: theme.spacing(7),
      padding: theme.spacing(0, 1),
    },
    eachQuestion: {
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      padding: theme.spacing(1, 2),
      width: "100%",
      textAlign: "left",
    },
    eachQuestionInput: {
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
      padding: theme.spacing(1, 0),
      width: "100%",
      flexShrink: 1,
    },
    eachQuestionTextInput: {
      "& input": {
        height: theme.spacing(4),
        borderRadius: 10,
        fontSize: theme.spacing(1.5),
      },
    },
    categoryQuestionsContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      width: "100%",
      flexDirection: "column",
    },
    categoryHeading: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
      textTransform: "capitalize",
    },
  };
});

export type EachQuestionType = {
  questionComp: Question;
  value: string;
};

export const Questions: React.FC<{
  submitRef: React.MutableRefObject<null>;
}> = ({ submitRef }) => {
  const { form, setForm } = useContext(FormStateContext);
  let questionsToRender = {} as Record<string, Question>;

  const formReturn = useForm({
    mode: "onBlur",
    defaultValues: form.steps.questions.value,
  });

  const {
    formState: { errors },
    clearErrors,
  } = formReturn;
  const { isDirty } = useFormState({
    control: formReturn.control,
  });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.questions.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  const onSubmit = (value: QuestionsType) => {
    console.log(form.steps.questions.value);
    setForm(
      produce((formState) => {
        formState.steps.questions = {
          value,
          valid: true,
          dirty: false,
        };
        formState.selectedIndex += 1;
      })
    );
  };

  const onChange = (value: string, name: any) => {
    clearErrors(name);
    setForm(
      produce((formState) => {
        formState.steps.questions.value[name] = value;
      })
    );
  };

  const { classes } = useStyles();

  const EachQuestion: React.FC<EachQuestionType> = ({
    questionComp,
    value,
  }) => {
    const { id = "", type = "", question = "", options = [] } = questionComp;
    return (
      <Box className={classes.eachQuestionRow}>
        <Box className={classes.eachQuestion}>{question}</Box>
        <Box className={classes.eachQuestionInput}>
          {type && type == "select" && (
            <FormSelect
              form={formReturn}
              name={id}
              wrapper={MediumField}
              options={[...options]}
              defaultValue={value}
              label={question}
              onChange={(value: string) => onChange(value, id)}
              required={questionComp.rules?.required}
            />
          )}
          {type && type == "input" && (
            <FormInput
              className={classes.eachQuestionTextInput}
              onChange={(value: string) => onChange(value, id)}
              name={id}
              form={formReturn}
              wrapper={LargeField}
              placeHolder="Enter your text here"
              required={questionComp.rules?.required}
            />
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Form onSubmit={onSubmit} form={formReturn}>
      <Box className={classes.questionsContainerWrapper}>
        <Box className={classes.constQuestionsContainer}>
          {Object.entries(BASE_QUESTIONS).map(([id, question]) => {
            return (
              <EachQuestion
                value={form.steps.questions.value[id]}
                key={id}
                questionComp={question}
              />
            );
          })}
        </Box>
        <button
          style={{ display: "none" }}
          ref={submitRef}
          type="submit"
        ></button>
      </Box>
    </Form>
  );
};
