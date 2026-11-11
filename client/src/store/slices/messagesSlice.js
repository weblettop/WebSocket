import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http as API } from "../../api";

const MESSAGES_SLICE_NAME = "messages";

export const getMessagesThunk = createAsyncThunk(
  `${MESSAGES_SLICE_NAME}/get`,
  async (payload, thunkAPI) => {
    try {
      const response = await API.getMessages(payload);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

const initialState = {
  messages: [],
  isFetching: false,
  error: null,
  limit: 10,
};

const messagesSlice = createSlice({
  name: MESSAGES_SLICE_NAME,
  initialState,
  reducers: {
    newMessageSuccess: (state, { payload }) => {
      state.error = null;
      if (state.messages.length >= state.limit) {
        state.messages.splice(0, 1);
      }
      state.messages.push(payload);
    },
    newMessageError: (state, { payload }) => {
      state.error = payload;
    },
    deleteMessageSuccess: (state, { payload: id }) => {
      state.error = null;
      state.messages = state.messages.filter((m) => m._id !== id);
    },
    deleteMessageError: (state, { payload }) => {
      state.error = payload;
    },
    updateMessageSuccess: (state, { payload }) => {
      state.error = null;
      state.messages = state.messages.map((m) =>
        m._id === payload._id ? payload : m
      );
    },
    updateMessageError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessagesThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getMessagesThunk.fulfilled, (state, { payload }) => {
      state.messages = [];
      state.isFetching = false;
      state.messages.push(...payload.reverse());
    });
    builder.addCase(getMessagesThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer, actions } = messagesSlice;

export const {
  newMessageSuccess,
  newMessageError,
  deleteMessageSuccess,
  deleteMessageError,
  updateMessageSuccess,
  updateMessageError,
} = actions;
export default reducer;
