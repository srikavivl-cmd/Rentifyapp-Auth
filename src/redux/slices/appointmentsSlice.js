import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = '/api';

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async (userId = null, { rejectWithValue }) => {
    try {
      let url = `${API_BASE}/appointments`;
      if (userId) url += `?userId=${userId}`;
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      return rejectWithValue('Failed to fetch appointments');
    }
  }
);

export const fetchOwnerAppointments = createAsyncThunk(
  'appointments/fetchOwner',
  async (ownerId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/appointments?ownerId=${ownerId}`);
      return await res.json();
    } catch (error) {
      return rejectWithValue('Failed to fetch appointments');
    }
  }
);

export const createAppointment = createAsyncThunk(
  'appointments/create',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...appointmentData,
          status: 'pending',
          timestamp: new Date().toISOString(),
        }),
      });
      return await res.json();
    } catch (error) {
      return rejectWithValue('Failed to create appointment');
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  'appointments/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return await res.json();
    } catch (error) {
      return rejectWithValue('Failed to update appointment');
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    clearAppointments: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOwnerAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOwnerAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export const { clearAppointments } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
