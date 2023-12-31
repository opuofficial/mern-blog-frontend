import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

let user = {
  token: "",
  id: "",
  username: "",
  profilePicture: "",
  bookmarks: "",
};

const getUser = JSON.parse(localStorage.getItem("user"));

if (getUser) {
  user = getUser;
}

const initialState = {
  user: user,
  isLoggedIn: !!getUser,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleBookmark: (state, action) => {
      const bookmarkId = action.payload;
      const { user } = state;
      const updatedBookmarks = [...user.bookmarks];

      const index = updatedBookmarks.indexOf(bookmarkId);
      if (index !== -1) {
        // If the bookmark ID is already in the array, remove it
        updatedBookmarks.splice(index, 1);
      } else {
        // If the bookmark ID is not in the array, add it
        updatedBookmarks.push(bookmarkId);
      }

      state.user = {
        ...user,
        bookmarks: updatedBookmarks,
      };

      // Update the user object in local storage
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {
          token: "",
          id: "",
          username: "",
          profilePicture: "",
          bookmarks: "",
        };
        state.isLoggedIn = false;
      });
  },
});

export const { toggleBookmark, reset } = authSlice.actions;
export default authSlice.reducer;
