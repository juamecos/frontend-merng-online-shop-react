import React from 'react';
import { USERS_LIST_QUERY } from '../../../graphql/query/user';
import Table from '../../../shared/table';
import TableButtons from '../../../shared/table/TableButtons';
import '../../../scss/index.scss';
import {
  optionsWithDetails,
  userFormBasicDialog,
} from '../../../shared/alerts/alerts';
import { block, register, update } from '../../../services/user.service';
import { basicAlert } from '../../../shared/alerts/toast';
import { TYPE_ALERT } from '../../../shared/alerts/values.config';

import './Users.scss';

const initializeForm = user => {
  // Get the default value
  const defaultName =
    user?.name !== undefined && user.name !== '' ? user.name : '';
  const defaultLastame =
    user?.lastname !== undefined && user.lastname !== '' ? user.lastname : '';
  const defaultEmail =
    user?.email !== undefined && user.email !== '' ? user.email : '';
  const roles = new Array(2);
  roles[0] =
    user?.role !== undefined && user.role === 'ADMIN' ? 'selected' : '';
  roles[1] =
    user?.role !== undefined && user.role === 'CLIENT' ? 'selected' : '';
  return `
<input id="name" value="${defaultName}" class="swal2-input" placeholder="Name" required>
<input id="lastname" value="${defaultLastame}" class="swal2-input" placeholder="Last Name" required>
<input id="email" value="${defaultEmail}" class="swal2-input" placeholder="Email" required>
<select id="role" class="swal2-input">
<option value="Select a role" selected disabled>Select a role</option>
<option value="ADMIN" ${roles[0]}>Admin</option>
<option value="CLIENT" ${roles[1]}>Client</option>
</select>
`;
};

export const takeUsersAction = async (action, rowData) => {
  const html = initializeForm(rowData);

  switch (action) {
    case 'add':
      addForm(html);
      break;
    case 'edit':
      updateForm(html, rowData);
      break;
    case 'info':
      const result = await optionsWithDetails(
        'Details',
        `${rowData.name} (${rowData.lastname})`,
        375,
        '<i class="fas fa-edit"></i> Edit',
        '<i class="fas fa-lock"></i> Block'
      );
      if (result === false) {
        blockForm(rowData);
        return;
      }
      if (result === true) {
        updateForm(html, rowData);
        return;
      }
      break;
    case 'block':
      blockForm(rowData);
      break;
    default:
      break;
  }
};

const addForm = async html => {
  const result = await userFormBasicDialog('Add User', html);
  addUser(result);
};

const addUser = async result => {
  if (result.value) {
    const user = result.value;
    user.password = '1234';
    user.active = false;
    const { data } = await register(user);

    const res = data.register;
    if (res.status) {
      basicAlert(TYPE_ALERT.SUCCESS, res.message);
      return;
    }

    basicAlert(TYPE_ALERT.WARNING, res.message);
    return;
  }
};

const updateForm = async (html, rowData) => {
  const result = await userFormBasicDialog('Edit user', html);
  updateUser(result, rowData.id);
};

const updateUser = async (result, id) => {
  if (result.value) {
    const user = result.value;
    user.id = id;
    const { data } = await update(user);

    const res = data.updateUser;
    if (res.status) {
      basicAlert(TYPE_ALERT.SUCCESS, res.message);

      return;
    }
    basicAlert(TYPE_ALERT.WARNING, res.message);

    return;
  }
  return;
};

const blockForm = async rowData => {
  const result = await optionsWithDetails(
    'Block?',
    `Should you block user "${rowData.name} ${rowData.lastname}", it won't be shown in the list`,
    430,
    'Do not block',
    'Do block'
  );

  blockUser(rowData, result);
};

const blockUser = async (rowData, result) => {
  if (result === false) {
    console.log(rowData.id);
    // If result is false we want to block the genre
    const { data } = await block(rowData.id);
    console.log(data);
    const res = data.blockUser;
    if (res.status) {
      basicAlert(TYPE_ALERT.SUCCESS, res.message);

      return;
    }
    basicAlert(TYPE_ALERT.WARNING, res.message);

    return;
  }
};

const Users = () => {
  //
  const query = USERS_LIST_QUERY;

  const keyfield = 'users';

  const columns = [
    { dataField: 'id', text: 'User Id' },
    { dataField: 'name', text: 'Name' },
    { dataField: 'lastname', text: 'Lastname' },
    { dataField: 'email', text: 'Email' },
    { dataField: 'role', text: 'Permissions' },
    {
      dataField: '',
      text: 'Manage Info',
      formatter: TableButtons,
    },
  ];

  return (
    <div>
      <Table
        query={query}
        keyfield={keyfield}
        columns={columns}
        definitionKey="users"
        listKey="users"
        takeAction={takeUsersAction}
      />
    </div>
  );
};

export default Users;
