import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const dbPath = join(process.cwd(), 'db.json');

export function getData() {
  const raw = readFileSync(dbPath, 'utf-8');
  return JSON.parse(raw);
}

export function saveData(data) {
  writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function getUsers() {
  return [...getData().users];
}

export function getUserById(id) {
  const users = getData().users;
  return users.find((u) => u.id === Number(id) || u.id === id);
}

export function getUserByEmail(email) {
  const users = getData().users;
  return users.filter((u) => u.email === email);
}

export function createUser(userData) {
  const data = getData();
  const newId = Math.max(...data.users.map((u) => u.id), 0) + 1;
  const newUser = { id: newId, ...userData };
  data.users.push(newUser);
  saveData(data);
  return newUser;
}

export function updateUser(id, updates) {
  const data = getData();
  const index = data.users.findIndex((u) => u.id === Number(id) || u.id === id);
  if (index === -1) return null;
  data.users[index] = { ...data.users[index], ...updates };
  saveData(data);
  return data.users[index];
}

export function deleteUser(id) {
  const data = getData();
  const index = data.users.findIndex((u) => u.id === Number(id) || u.id === id);
  if (index === -1) return false;
  data.users.splice(index, 1);
  saveData(data);
  return true;
}

export function getProperties(filters = {}) {
  let properties = [...getData().properties];

  if (filters.highlight === 'true') {
    properties = properties.filter((p) => p.highlight === true);
  }

  if (filters.city) {
    properties = properties.filter((p) => p.city === filters.city);
  }

  if (filters.ownerId) {
    properties = properties.filter((p) => p.ownerId === Number(filters.ownerId));
  }

  if (filters._sort) {
    const order = filters._order === 'desc' ? -1 : 1;
    properties.sort((a, b) => {
      if (a[filters._sort] < b[filters._sort]) return -1 * order;
      if (a[filters._sort] > b[filters._sort]) return 1 * order;
      return 0;
    });
  }

  if (filters._limit) {
    properties = properties.slice(0, Number(filters._limit));
  }

  return properties;
}

export function getPropertyById(id) {
  const properties = getData().properties;
  return properties.find((p) => p.id === Number(id) || p.id === id);
}

export function createProperty(propertyData) {
  const data = getData();
  const newProperty = { ...propertyData };
  if (!newProperty.id) {
    newProperty.id = Math.max(...data.properties.map((p) => Number(p.id) || 0), 0) + 1;
  }
  data.properties.push(newProperty);
  saveData(data);
  return newProperty;
}

export function updateProperty(id, updates) {
  const data = getData();
  const index = data.properties.findIndex((p) => p.id === Number(id) || p.id === id);
  if (index === -1) return null;
  data.properties[index] = { ...data.properties[index], ...updates };
  saveData(data);
  return data.properties[index];
}

export function deleteProperty(id) {
  const data = getData();
  const index = data.properties.findIndex((p) => p.id === Number(id) || p.id === id);
  if (index === -1) return false;
  data.properties.splice(index, 1);
  saveData(data);
  return true;
}

export function getAppointments(filters = {}) {
  let appointments = [...getData().appointments];

  if (filters.userId) {
    appointments = appointments.filter((a) => a.userId === Number(filters.userId));
  }

  if (filters.ownerId) {
    appointments = appointments.filter((a) => a.ownerId === Number(filters.ownerId));
  }

  return appointments;
}

export function getAppointmentById(id) {
  const appointments = getData().appointments;
  return appointments.find((a) => a.id === Number(id) || a.id === id);
}

export function createAppointment(appointmentData) {
  const data = getData();
  const newId = Math.max(...data.appointments.map((a) => a.id), 0) + 1;
  const newAppointment = { id: newId, ...appointmentData };
  data.appointments.push(newAppointment);
  saveData(data);
  return newAppointment;
}

export function updateAppointment(id, updates) {
  const data = getData();
  const index = data.appointments.findIndex((a) => a.id === Number(id) || a.id === id);
  if (index === -1) return null;
  data.appointments[index] = { ...data.appointments[index], ...updates };
  saveData(data);
  return data.appointments[index];
}

export function deleteAppointment(id) {
  const data = getData();
  const index = data.appointments.findIndex((a) => a.id === Number(id) || a.id === id);
  if (index === -1) return false;
  data.appointments.splice(index, 1);
  saveData(data);
  return true;
}
