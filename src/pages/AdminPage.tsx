import { HiDotsVertical } from "react-icons/hi";
import { DashBoardBoxComponent } from "../components";
import { FaUserCircle } from "react-icons/fa";
import Button from '@mui/material/Button';
import Chart from "react-google-charts";
import { FormControl, MenuItem, Paper, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Grid2 } from '@mui/material';
import { Grid } from "@mui/system";

const AdminPage = () => {
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 9],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  const [sortBy, setSortBy] = useState('');
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value: any, row: any) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  const handleChangeSortBy = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const options = {
    backgroundColor: 'transparent',
  };
  return (
    <>
      <div className="right-content">
        <div className="row dashboardBoxWapperRow" style={{ marginLeft: 0 ,width:'100%'}}>
          <Grid2 container sx={{ padding: 0 ,width:'100%'}}>
            <Grid2 size={{xl:8, lg: 8, md: 12 }}>  
              <div className="dashboardBoxWapper">
                <Grid2 container spacing={2} sx={{display:'flex',flexWrap:'wrap',marginRight:{lg:2}}}>
                  {/* <DashBoardBoxComponent color={["#1da256", "#48d483"]} icon={<FaUserCircle />} title="Người dùng" grow={true} />
                  <DashBoardBoxComponent color={["#c012e2", "#db64fe"]} icon={<FaUserCircle />} title="Người dùng" grow={true} />
                  <DashBoardBoxComponent color={["#2c78e5", "#60aff5"]} icon={<FaUserCircle />} title="Người dùng" grow={false} />
                  <DashBoardBoxComponent color={["#e1950e", "#f3cd29"]} icon={<FaUserCircle />} title="Người dùng" grow={true} /> */}

                  <Grid size={{lg:6,md:6,sm:12,xs:12}}>
                    <DashBoardBoxComponent color={["#1da256", "#48d483"]} icon={<FaUserCircle />} title="Người dùng" grow={true} />
                  </Grid>
                  <Grid size={{lg:6,md:6,sm:12,xs:12}}>
                    <DashBoardBoxComponent color={["#c012e2", "#db64fe"]} icon={<FaUserCircle />} title="Người dùng" grow={true} />
                  </Grid>
                  <Grid size={{lg:6,md:6,sm:12,xs:12}}>
                    <DashBoardBoxComponent color={["#2c78e5", "#60aff5"]} icon={<FaUserCircle />} title="Người dùng" grow={true} />
                  </Grid>
                  <Grid size={{lg:6,md:6,sm:12,xs:12}}>
                    <DashBoardBoxComponent color={["#e1950e", "#f3cd29"]} icon={<FaUserCircle />} title="Người dùng" grow={true} />
                  </Grid>
                  
                </Grid2>
              </div>
            </Grid2>
            <Grid2 size={{xl:4,lg: 4, md: 12, sm: 12, xs: 12 }} >
              <div className="box graphBox">
                <div className="d-flex align-items-center w-100">
                  <h4 className="text-white mb-0 mt-0" >TỔNG DOANH THU</h4>
                  <Button className="ml-auto toggleIcon">
                    <HiDotsVertical />
                  </Button>
                </div>
                <h3 className="text-white">2.500.000 VNĐ</h3>
                <p>2.000.000 VNĐ trong tháng trước</p>
                <div>
                  <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}

                    width={"100%"}
                    height={"200px"}
                  />
                </div>
              </div>
            </Grid2>
          </Grid2>
        </div>
        <div style={{
          margin: '20px 0',
          borderRadius: 10,
          backgroundColor: 'white',
          padding: 30,

        }}>
          <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#403e57' }}>
            Vé đã bán được
          </h3>
          <div>
            <Paper sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
              />
            </Paper>
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminPage;
