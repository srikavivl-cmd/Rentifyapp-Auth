import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = '/api';

export const fetchProperties = createAsyncThunk(
  'properties/fetchAll',
  async (filters = {}, { rejectWithValue }) => {
    try {
      let url = `${API_BASE}/properties`;
      const params = new URLSearchParams();

      if (filters.highlight === true) params.append("highlight", "true");
      if (filters._sort) params.append("_sort", filters._sort);
      if (filters._order) params.append("_order", filters._order);
      if (filters._limit) params.append("_limit", filters._limit);
      if (filters.city) params.append("city", filters.city);

      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url, { cache: "no-store" });
      return await res.json();
    } catch (error) {
      return rejectWithValue("Failed to fetch properties");
    }
  }
);


export const fetchPropertyById = createAsyncThunk(
  'properties/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/properties/${id}`);
      return await res.json();
    } catch (error) {
      return rejectWithValue('Failed to fetch property');
    }
  }
);

export const createProperty = createAsyncThunk(
  'properties/create',
  async (propertyData, { rejectWithValue }) => {
    try {
      const numericId = Date.now();
      const res = await fetch(`${API_BASE}/properties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...propertyData, 
          id: numericId 
        }),
      });
      return await res.json();
    } catch (error) {
      return rejectWithValue('Failed to create property');
    }
  }
);

export const updateProperty = createAsyncThunk(
  'properties/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/properties/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return { id, ...data };
    } catch (error) {
      return rejectWithValue('Failed to update property');
    }
  }
);

export const deleteProperty = createAsyncThunk(
  'properties/delete',
  async (id, { rejectWithValue }) => {
    try {
      await fetch(`${API_BASE}/properties/${id}`, { method: 'DELETE' });
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete property');
    }
  }
);

const initialState = {
  items: [],
  currentProperty: null,
  loading: false,
  error: null,
  filters: {
    city: '',
    type: '',
    minPrice: '',
    maxPrice: '',
  },
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProperty = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
         if (index !== -1) {state.items[index] = {...state.items[index], ...action.payload    };}
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setFilters, clearFilters, clearCurrentProperty } = propertiesSlice.actions;
export default propertiesSlice.reducer;
