import { useEffect, useState } from 'react';
import ApiService from '../../utils/axios';
import Table from '../table';
import { ApiPaths } from '../../constants';

const headCells = [
  {
    id: 'first_name',
    numeric: false,
    disablePadding: false,
    label: 'First Name',
    sortable: true
  },
  // {
  //   id: 'last_name',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Last Name',
  //   sortable: true
  // },
  // {
  //   id: 'email',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Email',
  //   sortable: true
  // },
  // {
  //   id: 'payment_method',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Payment Method',
  //   sortable: true
  // },
  // {
  //   id: 'address_line1',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Address Line 1',
  //   sortable: true
  // },
  // {
  //   id: 'address_line2',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Address Line 2',
  //   sortable: true
  // },
  // {
  //   id: 'state',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'State',
  //   sortable: true
  // },
  // {
  //   id: 'city',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'City',
  //   sortable: true
  // },
  // {
  //   id: 'pin_code',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Pin',
  //   sortable: true
  // },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
    sortable: false
  }
];

export default function CorporateList() {
  const rowId = localStorage.getItem('editableRowId') || null;
  const [editableRowId, setEditableRowId] = useState(rowId);
  const [order, setOrder] = useState('DESC');
  const [orderBy, setOrderBy] = useState('email');
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState('');
  const [editData, setEditData] = useState({ first_name: '' });
  const [refreshList, setRefreshList] = useState('some-random-string');
  const handleEditClick = (id) => {
    setEditableRowId(id);
    localStorage.setItem('editableRowId', id);
  };

  const handleSaveClick = () => {
    ApiService.put(`/users/${editableRowId}`, editData)
      .then((result) => {
        const randomString = Math.random().toString(36).slice(2);
        setEditableRowId(null);
        localStorage.setItem('editableRowId', null);
        setRefreshList(randomString);
      })
      .catch((error) => {
        console.error('Error in saving user details', error);
      });
  };

  const handleCancelClick = () => {
    setEditableRowId(null);
    localStorage.setItem('editableRowId', null);
  };

  useEffect(() => {
    const queryString = `?page=${page}&orderBy=${orderBy}&order=${order}&limit=${rowsPerPage}${filters}`;
    ApiService.get(ApiPaths.USER_LIST + queryString).then((result) => {
      const originalItems = result.data.items.map((item) => {
        return {
          ...item,
          first_name_original: item.first_name,
          last_name_original: item.last_name,
          address_line1_original: item.address_line1,
          address_line2_original: item.address_line2,
          state_original: item.state,
          city_original: item.city,
          pin_code_original: item.pin_code
        };
      });

      const items = originalItems.map((item) => {
        return {
          ...item,
          actions: (
            <button onClick={() => handleEditClick(item.id)}>Edit</button>
          )
        };
      });
      setCount(result.data.pagination.totalItems);

      setRows(items);
    });
  }, [page, order, orderBy, filters, rowsPerPage, refreshList]);

  const setValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    editData[name] = value;

    setEditData({ ...editData });
  };

  useEffect(() => {
    const items = rows.map((item) => {
      return {
        ...item,
        first_name:
          editableRowId === item.id ? (
            <input
              name='first_name'
              id='first_name'
              type='text'
              value={editData.first_name}
              onChange={setValue}
            />
          ) : (
            item.first_name_original
          ),
        actions:
          editableRowId === item.id ? (
            <>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <button onClick={() => handleEditClick(item.id)}>Edit</button>
          )
      };
    });
    setRows(items);
  }, [editableRowId, editData]);

  useEffect(() => {
    if (editableRowId) {
      const row = rows.find((item) => item.id === editableRowId);
      if (row) {
        const editableData = {
          first_name: row.first_name_original,
          last_name: row.last_name_original,
          address_line1: row.address_line1_original,
          address_line2: row.address_line2_original,
          state: row.state_original,
          city: row.city_original,
          pin_code: row.pin_code_original
        };
        setEditData({ ...editableData });
      }
    }
  }, [editableRowId]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'ASC';
    setOrder(isAsc ? 'DESC' : 'ASC');
    setOrderBy(property);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Table
      headCells={headCells}
      tableHeading={`User List`}
      rows={rows}
      page={page}
      count={count}
      onPageChange={handlePageChange}
      order={order}
      orderBy={orderBy}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      onRequestSort={handleRequestSort}
    />
  );
}
