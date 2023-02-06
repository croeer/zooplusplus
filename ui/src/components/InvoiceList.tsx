import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridApi, GridCellValue, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import QrCode2Icon from '@mui/icons-material/QrCode2';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'invoiceNumber',
    headerName: 'Rechnungsnummer',
    width: 150,
    editable: false,
  },
  {
    field: 'invoiceDate',
    headerName: 'Rechnungsdatum',
    width: 150,
    // type: 'Date',
    editable: false,
  },
  {
    field: 'invoiceAmount',
    headerName: 'Rechnungsbetrag',
    description: 'This column has a value getter and is not sortable.',
    width: 160,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return '';
      }

      const valueFormatted = (params.value).toLocaleString( 'de-de', {style: 'currency', currency: 'EUR'});
      return `${valueFormatted}`;
    },
  },
  {
    field: 'invoiceStatus',
    headerName: 'Status',
    width: 110,
    editable: true,
  },
  {
    field: "action",
    headerName: "QR-Code anzeigen",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation(); // don't select this row after clicking

        const api: GridApi = params.api;
        const thisRow: Record<string, GridCellValue> = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return <Button onClick={onClick}><QrCode2Icon /></Button>;
    }
  },
];

const rows = [
  { id: 1, invoiceNumber: '0288274201', invoiceDate:'28.10.2021', invoiceAmount: 57.46  },
  { id: 2, invoiceNumber: '0288274258', invoiceDate:'13.11.2021', invoiceAmount: 29.42  },
  { id: 3, invoiceNumber: '0288274279', invoiceDate:'01.12.2021', invoiceAmount: 64.57  },
  { id: 4, invoiceNumber: '0288274244', invoiceDate:'28.12.2021', invoiceAmount: 56.76  },
  { id: 5, invoiceNumber: '0288274251', invoiceDate:'10.01.2022', invoiceAmount: 39.89  },
  { id: 6, invoiceNumber: '0288274265', invoiceDate:'20.01.2022', invoiceAmount: 117.32 },
  { id: 7, invoiceNumber: '0288274225', invoiceDate:'03.03.2022', invoiceAmount: 35.13  },
  { id: 8, invoiceNumber: '0288274247', invoiceDate:'22.03.2022', invoiceAmount: 53.94  },
  { id: 9, invoiceNumber: '0288274206', invoiceDate:'01.04.2022', invoiceAmount: 63.70  },
  { id: 10, invoiceNumber: '024XTCS682', invoiceDate:'24.04.2022', invoiceAmount: 52.92  },
  { id: 11, invoiceNumber: '024XTCS343', invoiceDate:'04.05.2022', invoiceAmount: 28.95  },
  { id: 12, invoiceNumber: '024XTCS514', invoiceDate:'12.05.2022', invoiceAmount: 69.80  },
  { id: 13, invoiceNumber: '024XTCS623', invoiceDate:'30.05.2022', invoiceAmount: 55.47  },
  { id: 14, invoiceNumber: '024XTCS326', invoiceDate:'14.06.2022', invoiceAmount: 44.99  },
  { id: 15, invoiceNumber: '025XTCS600', invoiceDate:'16.08.2022', invoiceAmount: 30.00  },
  { id: 16, invoiceNumber: '025XTCS425', invoiceDate:'21.08.2022', invoiceAmount: 36.82  },
  { id: 17, invoiceNumber: '025XTCS518', invoiceDate:'31.08.2022', invoiceAmount: 33.88  },
  { id: 18, invoiceNumber: '025XTCS412', invoiceDate:'21.09.2022', invoiceAmount: 53.54  },
  { id: 19, invoiceNumber: '026XTCS668', invoiceDate:'27.09.2022', invoiceAmount: 33.09  },
  { id: 20, invoiceNumber: '026XTCS562', invoiceDate:'10.10.2022', invoiceAmount: 82.05  },
  { id: 21, invoiceNumber: '026XTCS005', invoiceDate:'26.10.2022', invoiceAmount: 28.86  },
  { id: 22, invoiceNumber: '026XTCS489', invoiceDate:'07.11.2022', invoiceAmount: 40.17  },
  { id: 23, invoiceNumber: '026XTCS485', invoiceDate:'21.11.2022', invoiceAmount: 67.72  },
  { id: 24, invoiceNumber: '026XTCS929', invoiceDate:'09.12.2022', invoiceAmount: 79.39  },
];

export default function InvoiceList() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
        <h1>Offene Rechnungen</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}