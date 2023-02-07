import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MDEditor from "@uiw/react-md-editor";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { callCreatePost, callFetchTags, ICreatePostRequest } from "../apis";
import { ErrorMessages } from "../configs";
import { useToast } from "../hooks";
import { setLoading, setTags } from "../redux/main";
import { RootState } from "../redux/store";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CreatePostFormWrapper = styled("div")(({ theme }) => ({
  // height: "28.125em",
  // width: "100%",
}));

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string(),
  selectedTags: Yup.array().of(Yup.string()),
  newTags: Yup.array().of(Yup.string()),
});

export const CreatePostPage = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { showToast } = useToast();
  const userInfo = useSelector((state: RootState) => state.user);
  const tags = useSelector((state: RootState) => state.app.tags);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      selectedTags: [] as string[],
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));

      try {
        const { _id } = await callCreatePost(
          values as unknown as ICreatePostRequest
        );

        showToast({
          alertType: "success",
          message: "Created post successfully",
        });

        setTimeout(() => {
          navigator(`/post/detail?id=${_id}`);
        });
      } catch (error: any) {
        showToast({
          alertType: "error",
          message: ErrorMessages[error.response.data.code as string],
        });
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const tags = await callFetchTags();
      if (Array.isArray(tags)) {
        dispatch(setTags(tags));
      }
    } catch (error) {
      // don't need alert this error
    }
  };

  useEffect(() => {
    if (!userInfo || !userInfo.email) {
      navigator("/signin?redirect=/post/create");
    }
  }, [userInfo]);

  return (
    <CreatePostFormWrapper>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                pb: 1,
                pt: 7,
              }}
            >
              <Typography
                align="center"
                color="primary"
                variant="h3"
                className="text-bold"
              >
                CREATE POST
              </Typography>
            </Box>

            <TextField
              error={Boolean(formik.touched.title && formik.errors.title)}
              fullWidth
              helperText={formik.touched.title && formik.errors.title}
              label="Post title"
              margin="normal"
              name="title"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.title}
              variant="outlined"
            />

            <MDEditor
              id="content"
              className="w-full my-4"
              style={{
                width: "100%",
              }}
              value={formik.values.content}
              onChange={(md) => {
                formik.handleChange({
                  target: { name: "content", value: md },
                });
              }}
            />

            <Autocomplete
              multiple
              freeSolo
              limitTags={10}
              id="multiple-limit-tags"
              options={tags}
              value={formik.values.selectedTags}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 4 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue("selectedTags", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Post tags"
                  style={{ backgroundColor: "#fff" }}
                />
              )}
            />

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={!formik.dirty || !formik.isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                CREATE
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </CreatePostFormWrapper>
  );
};
